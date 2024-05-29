// ad-teachers.component.ts
import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/demo/api/teacher';
import { TeacherService } from 'src/app/demo/service/teacher.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ad-teachers',
  templateUrl: './ad-teachers.component.html',
  styleUrls: ['./ad-teachers.component.scss'],
  providers: [MessageService],
})
export class AdTeachersComponent implements OnInit {
  teachers: Teacher[] = [];
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
    { field: 'role', header: 'Role' },
    { field: 'specialite', header: 'Specialty' },
    { field: 'classes', header: 'Classes' },
    { field: 'vms', header: 'vms' },
  ];

  constructor(private teacherService: TeacherService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadTeachers();
  }
  getTeacherPhotoUrl(photoFileName: string): string {
    return this.teacherService.getTeacherPhotoUrl(photoFileName);
  }
  loadTeachers() {
    this.teacherService.getTeachers().subscribe((data) => {
      this.teachers = data;
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

  handlePhotoChange(event: any) {
    this.photo = event.target.files[0]; // Update this.photo instead of this.selectedFile
  }

  saveTeacher() {
    this.submitted = true;

    if (this.teacher.nom && this.teacher.prenom && this.teacher.email && this.teacher.password && this.teacher.role && this.teacher.specialite && this.teacher.classes && this.teacher.vms) {
      const formData = new FormData();
      formData.append('nom', this.teacher.nom);
      formData.append('prenom', this.teacher.prenom);
      formData.append('email', this.teacher.email);
      formData.append('password', this.teacher.password);
      formData.append('role', this.teacher.role);
      formData.append('specialite', this.teacher.specialite);
      formData.append('classes', this.teacher.classes);
      formData.append('vms', this.teacher.vms);
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
    this.deleteTeacherDialog = true;
  }

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
      classes: '',
      vms: '',
      photo: '' // Ajout de la propriété photo
    };
  }

  onGlobalFilter(event: any) {
    // Implement global filtering logic here
  }
}
