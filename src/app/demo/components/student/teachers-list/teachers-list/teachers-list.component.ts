import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/demo/service/teacher.service';
import { Teacher } from 'src/app/demo/api/teacher'; // Ensure Teacher interface is imported

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {
  teachers: Teacher[] = [];
  loading: boolean = false; // Add loading indicator

  constructor(
    private teacherService: TeacherService
  ) { }

  ngOnInit(): void {
    this.loading = true; // Set loading to true before API call
    this.teacherService.getTeachers()
      .subscribe(
        (data) => {
          this.teachers = data; // Assign fetched teachers to the component variable
          this.loading = false; // Set loading to false after data is fetched
        },
        (error) => {
          console.error('Error fetching teachers:', error);
          this.loading = false; // Ensure loading is set to false on error
        }
      );
  }

  getTeacherPhotoUrl(photoFileName: string): string {
    return this.teacherService.getTeacherPhotoUrl(photoFileName);
  }
}
