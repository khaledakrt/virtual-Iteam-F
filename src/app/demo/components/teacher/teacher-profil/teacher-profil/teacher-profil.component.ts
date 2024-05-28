import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/demo/service/teacher.service';
import { Teacher } from 'src/app/demo/api/teacher';
@Component({
  selector: 'app-teacher-profil',
  templateUrl: './teacher-profil.component.html',
  styleUrls: ['./teacher-profil.component.scss']
})
export class TeacherProfilComponent implements OnInit {
  teacherData: Teacher | null = null; // Property to hold teacher data
  idTeacher: string | null;
  constructor(private teacherService: TeacherService) { 
    this.idTeacher = localStorage.getItem('id_teacher');
  }

  ngOnInit(): void {
    if (this.idTeacher) {
      this.teacherService.getTeacherById(this.idTeacher).subscribe(data => {
        console.log(data);
        this.teacherData = data; // Assign fetched data to teacherData
      });
    } else {
      console.error('No teacher ID found in localStorage');
    }
  }
}
