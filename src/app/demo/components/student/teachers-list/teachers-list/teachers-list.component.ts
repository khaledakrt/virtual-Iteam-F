import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/demo/api/teacher';
import { StudentService } from 'src/app/demo/service/student.service';
import { TeacherService } from 'src/app/demo/service/teacher.service';
import { Student } from 'src/app/demo/api/student';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {
  teachers: Teacher[] = [];
  loading: boolean = true;
  studentId: string | null = null;
  groupId: string | null = null;
  studentData: Student | null = null;

  constructor(private studentService: StudentService, private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.studentId = localStorage.getItem('id_student');

    if (this.studentId) {
      this.studentService.getGroupIdByStudentId(this.studentId).subscribe(
        (group: any) => { // Assurez-vous que le type de group est correct ici
          console.log('Groupe de l\'étudiant:', group);
          if (group && group.ids && group.ids.length > 0) {
            this.groupId = group.ids[0]; // Utilisation de l'ID du groupe
            this.fetchTeachersByGroupId(this.groupId); // Appel pour récupérer les enseignants
          } else {
            console.error('Aucun ID de groupe trouvé pour l\'étudiant');
            this.loading = false;
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération du groupe de l\'étudiant:', error);
          this.loading = false;
        }
      );
    } else {
      console.error('Aucun ID d\'étudiant trouvé dans le stockage local');
      this.loading = false;
    }
  }

  fetchTeachersByGroupId(groupId: string): void {
    if (groupId) {
      this.teacherService.getTeachersByGroupId(groupId).subscribe(
        (teachers: Teacher[]) => {
          console.log('Enseignants du groupe:', teachers);
          this.teachers = teachers;
          this.loading = false;
        },
        (error) => {
          console.error('Erreur lors de la récupération des enseignants:', error);
          this.loading = false;
        }
      );
    } else {
      console.error('ID de groupe invalide');
      this.loading = false;
    }
  }

  
  getTeacherPhotoUrl(photoFileName: string): string {
    return this.studentService.getStudentPhotoUrl(photoFileName);
  }
  
}
