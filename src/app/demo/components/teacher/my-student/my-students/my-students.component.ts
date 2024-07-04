import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/demo/service/student.service'; // Adjust the path as per your project structure
import { Student } from 'src/app/demo/api/student'; // Adjust the path as per your project structure

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.component.html',
  styleUrls: ['./my-students.component.scss']
})
export class MyStudentsComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.fetchAllStudents(); // Fetch all students when component initializes
  }

  fetchAllStudents(): void {
    this.studentService.getStudents()
      .subscribe(
        (students) => {
          this.students = students; // Assign the fetched students to the local property
        },
        (error) => {
          console.error('Error fetching all students:', error);
          // Optionally handle error scenarios here, such as displaying an error message
        }
      );
  }
  getStudentPhotoUrl(photoFileName: string): string {
    return this.studentService.getStudentPhotoUrl(photoFileName);
  }
}
