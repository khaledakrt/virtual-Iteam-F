import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/demo/service/student.service';
import { Student } from 'src/app/demo/api/student';
@Component({
  selector: 'app-student-profil',
  templateUrl: './student-profil.component.html',
  styleUrls: ['./student-profil.component.scss']
})
export class StudentProfilComponent implements OnInit {
  studentData: Student | null = null; // Property to hold student data
  idStudent: string | null;

    constructor(private studentService: StudentService) { 
      this.idStudent=localStorage.getItem('id_student')
    }
  
    ngOnInit(): void {
      if (this.idStudent) {
        this.studentService.getStudentById(this.idStudent).subscribe(data => {
          console.log(data);
          if (data.photo) {
            data.photo = data.photo.replace(/\\/g, '/');
          }
          this.studentData = data; // Assign fetched data to studentData
        });
      } else {
        console.error('No student ID found in localStorage');
      }
    }
   // Method to get the URL of the teacher's photo
   getStudentPhotoUrl(photoFileName: string): string {
    return this.studentService.getStudentPhotoUrl(photoFileName);
  }
}

  