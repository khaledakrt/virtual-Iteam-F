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
  selectedFile: File | null = null;
  photo: File | null = null;
  //levels: any[] = []; // Add this line to hold levels

  cols: any[] = [
    { field: 'nom', header: 'First Name' },
    { field: 'prenom', header: 'Last Name' },
    { field: 'email', header: 'Email' },
    { field: 'password', header: 'Password' },
    { field: 'role', header: 'Role' },
    { field: 'classe', header: 'Classe' },
    { field: 'vms', header: 'vms' },
    //{ field: 'photo', header: 'photo' },
    //{ field: 'levels', header: 'levels' },

  ];

  constructor(private studentService: StudentService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadStudents();
    //this.loadLevels(); // Call the method to load levels when component initializes
  }
  getStudentPhotoUrl(photoFileName: string): string {
    return this.studentService.getStudentPhotoUrl(photoFileName);
  }

  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
      //console.log(this.levels)

    });
  }

  // loadLevels() {
  //   // Call your service method to fetch levels
  //   this.studentService.getLevels().subscribe((data) => {
  //     this.levels = data;
  //   });
  // }

  openNew() {
    this.student = this.initializeStudent();
    this.submitted = false;
    this.studentDialog = true;
  }

  editStudent(student: Student) {
    this.student = { ...student };
    this.studentDialog = true;
  }

  saveStudent() {
    this.submitted = true;

    if (this.student.nom && this.student.prenom && this.student.email && this.student.password && this.student.role && this.student.classe && this.student.vms ) {
      const formData = new FormData();
      formData.append('nom', this.student.nom);
      formData.append('prenom', this.student.prenom);
      formData.append('email', this.student.email);
      formData.append('password', this.student.password);
      formData.append('role', this.student.role);
      formData.append('classe', this.student.classe);
      formData.append('vms', this.student.vms);
      if (this.photo) {
        formData.append('photo', this.photo);
      }
      if (this.student._id) {
        // Update existing student
        this.studentService.updateStudent(this.student._id,this.student).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Student Updated',
              life: 3000
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
              detail: 'Failed to update student',
              life: 3000
            });
          }
        );
      } else {
        // Add new student
        this.studentService.addStudent(formData).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Student Created',
              life: 3000
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
          life: 3000
        });
        this.loadStudents();
        this.selectedStudents = [];
      },
      (error) => {
        console.error(error);
        // Handle error, display an error message, etc.
      }
    );
  }

  confirmDelete() {
    this.deleteStudentDialog = false;
    this.studentService.deleteStudent(this.student._id!).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Student Deleted',
        life: 3000
      });
      this.loadStudents();
      this.student = this.initializeStudent();
    });
  }

  hideDialog() {
    this.studentDialog = false;
    this.submitted = false;
  }

  initializeStudent(): Student {
    return {
      _id: '',
      nom: '',
      prenom: '',
      email: '',
      password: '',
      role: '',
      classe: '',
      vms: '',
      photo: ''
    };
  }

  onGlobalFilter(event: any) {
    // Implement global filtering logic here
  }

  handlePhotoChange(event: any) {
    this.photo = event.target.files[0]; // Update this.photo instead of this.selectedFile
  }
}
