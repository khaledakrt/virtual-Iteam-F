import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStudentService } from 'src/app/demo/service/auth-student.service';
import { AuthTeacherService } from 'src/app/demo/service/auth-teacher.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  isLogin: boolean = true; // Default to login tab
  isTeacher: boolean = false; // Default to student role    studentLoginForm: FormGroup;
    teacherLoginForm: FormGroup;
    studentLoginForm: FormGroup;

  
    constructor(private formBuilder: FormBuilder,
      private authStudentService: AuthStudentService,private router:Router,
      private authTeacherService: AuthTeacherService, ) {}  
    ngOnInit(): void {
      // Initialize form groups
     
  
      this.teacherLoginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
      this.studentLoginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });

 
    }
  
  
    toggleTab(isLogin: boolean) {
      this.isLogin = isLogin;
    }
  
    toggleRole(isTeacher: boolean) {
      this.isTeacher = isTeacher;
    }

    studentLogin() {
      const credentials = this.studentLoginForm.value;
      this.authStudentService.studentLogin(credentials).subscribe(response => {
        console.log(response)


        this.authStudentService.saveDataStudent(response.token) 
        this.router.navigate(['/student']);
      
      }, error => {
        // Gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur
      });
    }
  
    teacherLogin() {
      const credentials = this.teacherLoginForm.value;
      this.authTeacherService.teacherLogin(credentials).subscribe(response => {
        console.log(response)
        this.authTeacherService.saveDataTeacher(response.mytoken)
        this.router.navigate(['/teacher']);

        // Gérer la réponse, par exemple, sauvegarder les données si la connexion réussit
      }, error => {
        // Gérer les erreurs, par exemple, afficher un message d'erreur à l'utilisateur
      });
    }
  
  
 
  }

