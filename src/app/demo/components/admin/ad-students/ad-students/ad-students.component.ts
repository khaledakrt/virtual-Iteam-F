import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/demo/api/student';
import { StudentService } from 'src/app/demo/service/student.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ad-students',
  templateUrl: './ad-students.component.html',
  styleUrls: ['./ad-students.component.scss'],
  providers: [MessageService],
})
export class AdStudentsComponent implements OnInit {
  students: Student[] = [];
  studentDialog: boolean = false;
  deleteStudentDialog: boolean = false;
  deleteStudentsDialog: boolean = false;
  student: Student = this.initializeStudent();
  selectedStudents: Student[] = [];
  submitted: boolean = false;

  cols: any[] = [
    { field: 'nom', header: 'First Name' },
    { field: 'prenom', header: 'Last Name' },
    { field: 'email', header: 'Email' },
    { field: 'password', header: 'Password' },
    { field: 'role', header: 'Role' },
    { field: 'classe', header: 'Classe' },
    { field: 'vms', header: 'vms' },
    { field: 'photo', header: 'photo' },

  ];

  constructor(
    private studentService: StudentService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
    });
  }

  openNew() {
    this.student = this.initializeStudent();
    this.submitted = false;
    this.studentDialog = true;
  }

  editStudent(student: Student) {
    this.student = { ...student };
    this.studentDialog = true;
  }

  deleteSelectedStudents() {
    if (this.selectedStudents.length === 1) {
      this.deleteStudent(this.selectedStudents[0]);
    } else {
      this.deleteStudentsDialog = true;
    }
  }

  deleteStudent(student: Student) {
    this.student = { ...student };
    this.deleteStudentDialog = true;
  }

  confirmDeleteSelected() {
    this.deleteStudentsDialog = false;
    const selectedIds = this.selectedStudents.map((student) => student._id);
    this.studentService.deleteStudents(selectedIds).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Students Deleted',
          life: 3000,
        });
        this.loadStudents();
        this.selectedStudents = [];
      },
      (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete students',
          life: 3000,
        });
      }
    );
  }

  confirmDelete() {
    this.deleteStudentDialog = false;
    this.studentService.deleteStudent(this.student._id!).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Student Deleted',
          life: 3000,
        });
        this.loadStudents();
        this.student = this.initializeStudent();
      },
      (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete student',
          life: 3000,
        });
      }
    );
  }

  hideDialog() {
    this.studentDialog = false;
    this.submitted = false;
  }

  saveStudent() {
    this.submitted = true;

    if (
      this.student.nom &&
      this.student.prenom &&
      this.student.email &&
      this.student.password &&
      this.student.role &&
      this.student.classe &&
      this.student.vms &&
      this.student.photo
    ) {
      this.studentService.addStudent(this.student).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Student Created',
            life: 3000,
          });
          this.loadStudents();
          this.studentDialog = false;
          this.student = this.initializeStudent();
        },
        (error) => {
          console.error('Error:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create student',
            life: 3000,
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please fill in all required fields',
        life: 3000,
      });
    }
  }

  initializeStudent(): Student {
    return {
      nom: '',
      prenom: '',
      email: '',
      password: '',
      role: '',
      classe: '', // Ajouté pour correspondre aux champs requis
      vms: '',
      photo: '' // Ajouté pour correspondre aux champs requis
    };
  }

  onGlobalFilter(event: any) {
    // Implement global filtering logic here
  }

  handlePhotoChange(event: any) {
    // Implement photo handling logic if needed
  }
}
