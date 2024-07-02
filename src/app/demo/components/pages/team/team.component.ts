import { Component, OnInit } from '@angular/core';
import { TeamMember } from 'src/app/demo/api/teamMember';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TeamMemberService } from 'src/app/demo/service/TeamMember.Service';
import { ImageService } from 'src/app/demo/service/image.service';

@Component({
  templateUrl: './team.component.html',
  providers: [MessageService, TeamMemberService],
})
export class TeamComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  teamMember: TeamMember | null = null;
  teamMemberDialog: boolean = false;
  deleteTeamMemberDialog: boolean = false;
  deleteTeamMembersDialog: boolean = false;
  selectedTeamMembers: TeamMember[] = [];
  submitted: boolean = false;

  cols: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'position', header: 'Position' },
    { field: 'image', header: 'Image' },
  ];

  constructor(private teamMemberService: TeamMemberService, private messageService: MessageService ,private imageService:ImageService) {}
  ngOnInit() {
    this.teamMemberService.getTeamMembers().subscribe((data) => {
        this.teamMembers = data.map(member => {
            member.image = this.imageService.getImageUrl(member.image);
            return member;
        });
    });
}


  openNew() {
    this.teamMember = {};
    this.submitted = false;
    this.teamMemberDialog = true;
  }

  deleteSelectedTeamMembers() {
    if (this.selectedTeamMembers.length === 1) {
      this.deleteTeamMember(this.selectedTeamMembers[0]);
    } else {
      this.deleteTeamMembersDialog = true;
    }
  }
// Add the following method for deleting multiple team members
confirmDeleteSelected() {
  this.deleteTeamMembersDialog = false;
  const selectedIds = this.selectedTeamMembers.map(member => member._id);
  
  console.log(selectedIds);
  this.teamMemberService.deleteTeamMembers(selectedIds).subscribe(
    () => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Team Members Deleted', life: 3000 });
      this.teamMembers = this.teamMembers.filter((val) => !this.selectedTeamMembers.includes(val));
      this.selectedTeamMembers = [];
    },
    (error) => {
      console.error(error);
      // Handle error, display an error message, etc.
    }
  );
}
  
  editTeamMember(teamMember: TeamMember) {
    this.teamMember = { ...teamMember };
    this.teamMemberDialog = true;
  }

  deleteTeamMember(teamMember: TeamMember) {
    this.deleteTeamMemberDialog = true;
    this.teamMember = { ...teamMember };
  }


  confirmDelete() {
    this.deleteTeamMemberDialog = false;
    this.teamMembers = this.teamMembers.filter((val) => val._id !== this.teamMember._id);
    this.teamMemberService.deleteTeamMember(this.teamMember._id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Team Member Deleted', life: 3000 });
      this.teamMembers = this.teamMembers.filter((val) => val._id !== this.teamMember._id);
      this.teamMember = {};
    });
  }

  hideDialog() {
    this.teamMemberDialog = false;
    this.submitted = false;
  }

  saveTeamMember() {
    this.submitted = true;
  
    if (this.teamMember.name?.trim() && this.teamMember.position?.trim()) {
      const formData = new FormData();
  
      // Append image data if available
      if (this.teamMember.image) {
        // Convert the base64 image data to a Blob
        const blob = this.dataURItoBlob(this.teamMember.image);
  
        // Append the Blob to the FormData
        formData.append('image', blob, 'image.png');
      }
  
      // Append other data properties
      formData.append('name', this.teamMember.name);
      formData.append('position', this.teamMember.position);
  
      // Determine whether to add or update based on the existence of _id
      if (this.teamMember._id) {
        // Update existing team member
        this.teamMemberService.updateTeamMemberWithImage(this.teamMember._id, formData).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Team Member Updated', life: 3000 });
        });
      } else {
        // Add new team member
        this.teamMemberService.addTeamMemberWithImage(formData).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Team Member Created', life: 3000 });
        });
      }
  
      this.teamMembers = [...this.teamMembers];
      this.teamMemberDialog = false;
      this.teamMember = {};
    }
  }
  
  // Convert a data URI to a Blob
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
    for (let i = 0; i < this.teamMembers.length; i++) {
      if (this.teamMembers[i]._id === id) {
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
    
    // You can handle the file, for example, by uploading it to the server
    // or displaying a preview. Assuming you want to display a preview:
    
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            // Update the team member's image property with the base64 data URL
            this.teamMember.image = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}
}
