import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/demo/service/student.service';

@Component({
  selector: 'app-student-profil',
  templateUrl: './student-profil.component.html',
  styleUrls: ['./student-profil.component.scss']
})
export class StudentProfilComponent implements OnInit{
  studentData: any; // Déclaration de la propriété studentData
  idStudent:String;
    constructor(private studentService: StudentService) { 
      this.idStudent=localStorage.getItem('id_student')
    }
  
    ngOnInit(): void {
      // Récupérer les données de l'enseignant depuis le service
      this.studentService.getStudents(this.idStudent).subscribe(data => {
        console.log(data)
        this.studentData = data; // Attribuer les données récupérées à studentdata
      });
    }
  }