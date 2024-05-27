import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/demo/service/teacher.service';

@Component({
  selector: 'app-teacher-profil',
  templateUrl: './teacher-profil.component.html',
  styleUrls: ['./teacher-profil.component.scss']
})
export class TeacherProfilComponent implements OnInit {
  teacherData: any; // Déclaration de la propriété teacherData
idTeacher:String;
  constructor(private teacherService: TeacherService) { 
    this.idTeacher=localStorage.getItem('id_teacher')
  }

  ngOnInit(): void {
    // Récupérer les données de l'enseignant depuis le service
    this.teacherService.getTeachers().subscribe(data => {
      console.log(data)
      this.teacherData = data; // Attribuer les données récupérées à teacherData
    });
  }
}
