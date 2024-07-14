// ad-students.component.ts
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/demo/api/student';
import { StudentService } from 'src/app/demo/service/student.service';
import { MessageService } from 'primeng/api';
import { Group } from 'src/app/demo/api/group'; // Import Group model if available

@Component({
  selector: 'app-ad-students',
  templateUrl: './ad-students.component.html',
  styleUrls: ['./ad-students.component.scss'],
  providers: [MessageService],
})
export class AdStudentsComponent implements OnInit {
  students: Student[] = [];
  groups: Group[] = []; // Initialize groups array
  selectedClasses: string[] = []; // Array to store selected classe

  studentDialog: boolean = false;
  deleteStudentDialog: boolean = false;
  deleteStudentsDialog: boolean = false;
  
  student: Student = this.initializeStudent();
  selectedStudents: Student[] = [];
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
    { field: 'classe', header: 'Classes' },
    //{ field: 'vms', header: 'vms' },
  ];

  constructor(private studentService: StudentService, private messageService: MessageService) {}

  ngOnInit() {
    this.loadStudents();
    this.loadGroups(); // Load groups data on component initialization

  }
   loadGroups() {
    this.studentService.getGroups().subscribe((data) => { // Assuming you have a method to get groups in StudentService
      this.groups = data; // Assign fetched groups data to the groups array
    });
  }
  getStudentPhotoUrl(photoFileName: string): string {
    return this.studentService.getStudentPhotoUrl(photoFileName);
  }
  loadStudents() {
    this.studentService.getStudents().subscribe((data) => {
      this.students = data;
      console.log(this.students)
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
  isGroupSelected(groupId: string): boolean {
    return this.student.classe.hasOwnProperty(groupId) && this.student.classe[groupId];
  }

  

  saveStudent() {
  this.submitted = true;

  if (this.student.nom && this.student.prenom && this.student.email && this.student.password && this.student.classe) {
    const formData = new FormData();
    formData.append('nom', this.student.nom);
    formData.append('prenom', this.student.prenom);
    formData.append('email', this.student.email);
    formData.append('password', this.student.password);

    // Add the selected groups to the FormData
    for (const groupId of Object.keys(this.student.classe)) {
      if (this.student.classe[groupId]) {
        formData.append('classe', groupId);
      }
    }

    if (this.photo) {
      formData.append('photo', this.photo);
    }

    if (this.student._id) {
      // Mise à jour de l'étudiant existant
      this.studentService.updateStudent(this.student._id, formData).subscribe(
        (response) => {
          console.log('Update Response:', response); // Vérifiez la réponse du backend
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Student Updated',
            life: 3000
          });
          this.loadStudents(); // Rechargez les étudiants après la mise à jour
          this.studentDialog = false; // Fermez le dialogue de détails de l'étudiant
          this.student = this.initializeStudent(); // Réinitialisez les données de l'étudiant
        },
        (error) => {
          console.error('Update Error:', error); // Affichez les détails de l'erreur
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
    this.deleteStudentDialog = true; // Ensure this sets the dialog to visible
  }
  
  
  
  
  deleteConfirmed(student: Student) {
    // Implement deletion logic here
    console.log(`Deleting student: ${student.nom} ${student.prenom}`);
    // Close the dialog after deletion
    this.hideDialog();
  }
  
  // Method to hide the dialog
 
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
      classe: {}, // Initialize classe as an empty object
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
    if (!this.student.classe) {
        this.student.classe = {}; // Initialize classe if not already initialized
    }
    this.student.classe[groupId] = event.target.checked;
    console.log("here is groupe id ")
    console.log(groupId)
    this.updateSelectedClasses(); // Update selected classe when a group is selected/deselected
  }
  updateSelectedClasses() {
    this.selectedClasses = [];
    for (const groupId in this.student.classe) {
      if (this.student.classe[groupId]) {
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
  formatClasses(classe: any): string {
    if (!classe || Object.keys(classe).length === 0) {
      return ''; // Return an empty string if classe is null or empty
    }
    
    // Get the array of selected class IDs
    const selectedClassIds = Object.keys(classe).filter(groupId => classe[groupId]);
  
    // Map each selected class ID to its corresponding class name
    const classNames = selectedClassIds.map(groupId => {
      const group = this.groups.find(group => group._id === groupId);
      return group ? `${group.level} ${group.specialty} ${group.number}` : '';
    });
  
    // Join the class names with commas and return
    return classNames.join(', ');
  }
}
