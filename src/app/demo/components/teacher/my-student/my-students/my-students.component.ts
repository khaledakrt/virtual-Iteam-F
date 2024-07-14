import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/demo/service/student.service';
import { TeacherService } from 'src/app/demo/service/teacher.service';
import { Student } from 'src/app/demo/api/student';
import { Group } from 'src/app/demo/api/group';
import { SelectItem } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar'; // Pour p-toolbar

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.component.html',
  styleUrls: ['./my-students.component.scss']
})
export class MyStudentsComponent implements OnInit {
  students: Student[] = [];
  classes: Group[] = []; // Ensure it's initialized as an array of Group type
  selectedClassId: string;
  //selectedClassId: string | undefined;

  constructor(private studentService: StudentService, private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.fetchTeacherClasses();
  }
  fetchTeacherClasses(): void {
    const idTeacher = localStorage.getItem('id_teacher');
    if (idTeacher) {
      this.teacherService.getClassesByTeacherId(idTeacher)
        .subscribe(
          (data: any) => {
            this.classes = data.classes;
            console.log('Classes:', this.classes);
          },
          error => {
            console.error('Error fetching classes:', error);
          }
        );
    }
  }
  onClassButtonClick(selectedClass: Group): void {
    this.selectedClassId = selectedClass._id; // Assuming _id is the property you want to use
    this.fetchStudentsByGroupId(selectedClass);
  }
  // fetchTeacherClasses(): void {
  //   const idTeacher = localStorage.getItem('id_teacher');
  //   if (idTeacher) {
  //     this.teacherService.getClassesByTeacherId(idTeacher)
  //       .subscribe(
  //         (data: any) => {
  //           // Assuming data has the structure { ids: [], classes: [] }
  //           this.classes = data.classes;
  //           console.log('Classes:', this.classes);
  //         },
  //         error => {
  //           console.error('Error fetching classes:', error);
  //         }
  //       );
  //   }
  // }

  // fetchStudentsByGroupId(groupId: any): void {
  //   console.log(groupId)

  //   this.studentService.getStudentsByGroupId(groupId._id)
  //     .subscribe(
  //       (students: any[]) => {
  //         this.students = students;
  //       },
  //       (error) => {
  //         console.error('Error fetching students:', error);
  //         this.students = []; // Reset students array on error or empty result
  //       }
  //     );
  // }
  fetchStudentsByGroupId(groupId: any): void {
    this.studentService.getStudentsByGroupId(groupId._id)
      .subscribe(
        (students: any[]) => {
          this.students = students;
        },
        (error) => {
          console.error('Error fetching students:', error);
          this.students = [];
        }
      );
  }
  
  onClassChange(): void {
    if (this.selectedClassId) {
      this.fetchStudentsByGroupId(this.selectedClassId); // Ensure selectedClassId is a string
    }
  }

  getStudentPhotoUrl(photoFileName: string): string {
    return this.studentService.getStudentPhotoUrl(photoFileName);
  }
  
}
