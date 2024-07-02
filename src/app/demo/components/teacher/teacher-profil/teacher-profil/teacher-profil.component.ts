import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/demo/service/teacher.service';
import { Teacher } from 'src/app/demo/api/teacher';
@Component({
  selector: 'app-teacher-profil',
  templateUrl: './teacher-profil.component.html',
  styleUrls: ['./teacher-profil.component.scss']
})
export class TeacherProfilComponent implements OnInit {
  teacherData: Teacher | null = null; // Property to contain teacher data
  idTeacher: string | null;
  senderName: string | null; // Add senderName property here

  constructor(private teacherService: TeacherService) { 
    this.idTeacher = localStorage.getItem('id_teacher');
  }

  ngOnInit(): void {
    if (this.idTeacher) {
      this.teacherService.getTeacherById(this.idTeacher).subscribe(data => {
        console.log(data);
        // Replace backslashes with forward slashes in photo URL
        if (data.photo) {
          data.photo = data.photo.replace(/\\/g, '/');
        }
        this.teacherData = data; // Assign fetched data to teacherData
        this.senderName = `${data.nom} ${data.prenom}`; // Assign sender's name

      })
    } else {
      console.error('No teacher ID found in localStorage');
    }
  }

  // Method to get the URL of the teacher's photo
  getTeacherPhotoUrl(photoFileName: string): string {
    return this.teacherService.getTeacherPhotoUrl(photoFileName);
  }
}
