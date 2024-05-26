import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/demo/api/project';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ImageService } from 'src/app/demo/service/image.service';
import { ProjectService } from 'src/app/demo/service/project.service';

@Component({
  templateUrl: './project.component.html',
  providers: [MessageService, ProjectService],
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  project: Project = {};
  projectDialog: boolean = false;
  deleteProjectDialog: boolean = false;
  deleteProjectsDialog: boolean = false;
  selectedProjects: Project[] = [];
  submitted: boolean = false;

  cols: any[] = [
    { field: 'title', header: 'Title' },
    { field: 'description', header: 'Description' },
    { field: 'image', header: 'Image' },
  ];

  constructor(private projectService: ProjectService, private messageService: MessageService, private imageService: ImageService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data.map(project => {
        project.image = this.imageService.getImageUrl(project.image);
        return project;
      });
    });
  }

  openNew() {
    this.project = {};
    this.submitted = false;
    this.projectDialog = true;
  }

  deleteSelectedProjects() {
    if (this.selectedProjects.length === 1) {
      this.deleteProject(this.selectedProjects[0]);
    } else {
      this.deleteProjectsDialog = true;
    }
  }

  confirmDeleteSelected() {
    this.deleteProjectsDialog = false;
    const selectedIds = this.selectedProjects.map(project => project._id);

    console.log(selectedIds);
    this.projectService.deleteProjects(selectedIds).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Projects Deleted', life: 3000 });
        this.projects = this.projects.filter((val) => !this.selectedProjects.includes(val));
        this.selectedProjects = [];
      },
      (error) => {
        console.error(error);
        // Handle error, display an error message, etc.
      }
    );
  }

  editProject(project: Project) {
    this.project = { ...project };
    this.projectDialog = true;
  }

  deleteProject(project: Project) {
    this.deleteProjectDialog = true;
    this.project = { ...project };
  }

  confirmDelete() {
    this.deleteProjectDialog = false;
    this.projects = this.projects.filter((val) => val._id !== this.project._id);
    this.projectService.deleteProject(this.project._id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });
      this.projects = this.projects.filter((val) => val._id !== this.project._id);
      this.project = {};
    });
  }

  hideDialog() {
    this.projectDialog = false;
    this.submitted = false;
  }

  saveProject() {
    this.submitted = true;

    if (this.project.title?.trim() && this.project.description?.trim()) {
      const formData = new FormData();

      // Append image data if available
      if (this.project.image) {
        // Convert the base64 image data to a Blob
        const blob = this.dataURItoBlob(this.project.image);

        // Append the Blob to the FormData
        formData.append('image', blob, 'image.png');
      }

      // Append other data properties
      formData.append('title', this.project.title);
      formData.append('description', this.project.description);

      // Determine whether to add or update based on the existence of _id
      if (this.project._id) {
        // Update existing project
        this.projectService.updateProjectWithImage(this.project._id, formData).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Updated', life: 3000 });
        });
      } else {
        // Add new project
        this.projectService.addProjectWithImage(formData).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Created', life: 3000 });
        });
      }

      this.projects = [...this.projects];
      this.projectDialog = false;
      this.project = {};
    }
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  handleImageChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.project.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
