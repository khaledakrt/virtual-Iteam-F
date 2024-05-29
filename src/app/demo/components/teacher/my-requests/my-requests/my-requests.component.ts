import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/demo/service/teacher.service';
import { Teacher } from 'src/app/demo/api/teacher';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {
  teacherData: Teacher | null = null;
  idTeacher: string | null;

  constructor(private teacherService: TeacherService) {
    this.idTeacher = localStorage.getItem('id_teacher');
  }

  ngOnInit(): void {
    if (this.idTeacher) {
      this.teacherService.getTeacherById(this.idTeacher).subscribe(data => {
        if (data.photo) {
          data.photo = data.photo.replace(/\\/g, '/');
        }
        this.teacherData = data;
      });
    } else {
      console.error('No teacher ID found in localStorage');
    }
  }
}
