// ad-teachers.component.ts
import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/demo/api/teacher';
import { TeacherService } from 'src/app/demo/service/teacher.service';
import { MessageService } from 'primeng/api';
import { Group } from 'src/app/demo/api/group'; // Import Group model if available

@Component({
  selector: 'app-ad-teachers',
  templateUrl: './ad-teachers.component.html',
  styleUrls: ['./ad-teachers.component.scss'],
  providers: [MessageService],
})
export class AdTeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  groups: Group[] = []; // Initialize groups array
  selectedClasses: string[] = []; // Array to store selected classes

  teacherDialog: boolean = false;
  deleteTeacherDialog: boolean = false;
  deleteTeachersDialog: boolean = false;
  
  teacher: Teacher = this.initializeTeacher();
  selectedTeachers: Teacher[] = [];
  submitted: boolean = false;
  selectedFile: File | null = null;
  photo: File | null = null;


  cols: any[] = [
    { field: 'nom', header: 'First Name' },
    { field: 'prenom', header: 'Last Name' },
    { field: 'email', header: 'Email' },
    { field: 'password', header: 'Password' },
    //{ field: 'role', header: 'Role' },
    //{ field: 'specialite', header: 'Specialty' },
    { field: 'classes', header: 'Classes' },
    //{ field: 'vms', header: 'vms' },
  ];

  constructor(private teacherService: TeacherService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadTeachers();
    this.loadGroups(); // Load groups data on component initialization

  }
   loadGroups() {
    this.teacherService.getGroups().subscribe((data) => { // Assuming you have a method to get groups in TeacherService
      this.groups = data; // Assign fetched groups data to the groups array
    });
  }
  getTeacherPhotoUrl(photoFileName: string): string {
    return this.teacherService.getTeacherPhotoUrl(photoFileName);
  }
  loadTeachers() {
    this.teacherService.getTeachers().subscribe((data) => {
      this.teachers = data;
      console.log(this.teachers)
    });
  }

  openNew() {
    this.teacher = this.initializeTeacher();
    this.submitted = false;
    this.teacherDialog = true;
  }

  editTeacher(teacher: Teacher) {
    this.teacher = { ...teacher };
    this.teacherDialog = true;
  }
  isGroupSelected(groupId: string): boolean {
    return this.teacher.classes.hasOwnProperty(groupId) && this.teacher.classes[groupId];
  }

  

  saveTeacher() {
  this.submitted = true;

  if (this.teacher.nom && this.teacher.prenom && this.teacher.email && this.teacher.password && this.teacher.classes) {
    const formData = new FormData();
    formData.append('nom', this.teacher.nom);
    formData.append('prenom', this.teacher.prenom);
    formData.append('email', this.teacher.email);
    formData.append('password', this.teacher.password);
    formData.append('specialite', this.teacher.specialite);

    // Add the selected groups to the FormData
    for (const groupId of Object.keys(this.teacher.classes)) {
      if (this.teacher.classes[groupId]) {
        formData.append('classes', groupId);
      }
    }

    if (this.photo) {
      formData.append('photo', this.photo);
    }

    if (this.teacher._id) {
      // Update existing teacher
      this.teacherService.updateTeacher(this.teacher._id, formData).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Teacher Updated',
            life: 3000
          });
          this.loadTeachers();
          this.teacherDialog = false;
          this.teacher = this.initializeTeacher();
        },
        (error) => {
          console.error('Error:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update teacher',
            life: 3000
          });
        }
      );
    } else {
      // Add new teacher
      this.teacherService.addTeacher(formData).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Teacher Created',
            life: 3000
          });
          this.loadTeachers();
          this.teacherDialog = false;
          this.teacher = this.initializeTeacher();
        },
        (error) => {
          console.error('Error:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create teacher',
            life: 3000
          });
        }
      );
    }
  } else {
    // Handle case where required fields are not filled
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Please fill in all required fields',
      life: 3000
    });
  }
}

  


  deleteSelectedTeachers() {
    if (this.selectedTeachers.length === 1) {
      this.deleteTeacher(this.selectedTeachers[0]);
    } else {
      this.deleteTeachersDialog = true;
    }
  }

  deleteTeacher(teacher: Teacher) {
    this.teacher = { ...teacher };
    this.deleteTeacherDialog = true; // Ensure this sets the dialog to visible
  }
  
  
  
  
  deleteConfirmed(teacher: Teacher) {
    // Implement deletion logic here
    console.log(`Deleting teacher: ${teacher.nom} ${teacher.prenom}`);
    // Close the dialog after deletion
    this.hideDialog();
  }
  
  // Method to hide the dialog
 
  confirmDeleteSelected() {
    this.deleteTeachersDialog = false;
    const selectedIds = this.selectedTeachers.map((teacher) => teacher._id);
    this.teacherService.deleteTeachers(selectedIds).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Teachers Deleted',
          life: 3000
        });
        this.loadTeachers();
        this.selectedTeachers = [];
      },
      (error) => {
        console.error(error);
        // Handle error, display an error message, etc.
      }
    );
  }

  confirmDelete() {
    this.deleteTeacherDialog = false;
    this.teacherService.deleteTeacher(this.teacher._id!).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Teacher Deleted',
        life: 3000
      });
      this.loadTeachers();
      this.teacher = this.initializeTeacher();
    });
  }

  hideDialog() {
    this.teacherDialog = false;
    this.submitted = false;
  }

  initializeTeacher(): Teacher {
    return {
      _id: '',
      nom: '',
      prenom: '',
      email: '',
      password: '',
      role: '',
      specialite: '',
      vms: '',
      classes: {}, // Initialize classes as an empty object
      photo: ''
    };
  }
  

  handlePhotoChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.photo = fileList[0];
    }
  }
  handleGroupChange(event: any, groupId: string) {
    if (!this.teacher.classes) {
        this.teacher.classes = {}; // Initialize classes if not already initialized
    }
    this.teacher.classes[groupId] = event.target.checked;
    console.log("here is groupe id ")
    console.log(groupId)
    this.updateSelectedClasses(); // Update selected classes when a group is selected/deselected
  }
  updateSelectedClasses() {
    this.selectedClasses = [];
    for (const groupId in this.teacher.classes) {
      if (this.teacher.classes[groupId]) {
        // Find the corresponding group object and push its details to the selectedClasses array
        const group = this.groups.find(group => group._id === groupId);
        console.log("here is groupe id ")
        console.log(group.id)
        if (group) {
          this.selectedClasses.push(`${group.level} ${group.specialty} ${group.number}`);
        }
      }
    }
  }
  formatClasses(classes: any): string {
    if (!classes || Object.keys(classes).length === 0) {
      return ''; // Return an empty string if classes is null or empty
    }
    
    // Get the array of selected class IDs
    const selectedClassIds = Object.keys(classes).filter(groupId => classes[groupId]);
  
    // Map each selected class ID to its corresponding class name
    const classNames = selectedClassIds.map(groupId => {
      const group = this.groups.find(group => group._id === groupId);
      return group ? `${group.level} ${group.specialty} ${group.number}` : '';
    });
  
    // Join the class names with commas and return
    return classNames.join(', ');
  }
}
