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
  isTeacher: boolean = false; // Default to student role
  teacherLoginForm: FormGroup;
  studentLoginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authStudentService: AuthStudentService,
    private router: Router,
    private authTeacherService: AuthTeacherService
  ) {}

  ngOnInit(): void {
    this.teacherLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.studentLoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleTab(isLogin: boolean): void {
    this.isLogin = isLogin;
  }

  toggleRole(isTeacher: boolean): void {
    this.isTeacher = isTeacher;
  }

  studentLogin(): void {
    const credentials = this.studentLoginForm.value;
    this.authStudentService.studentLogin(credentials).subscribe(response => {
      console.log(response);
      this.authStudentService.saveDataStudent(response.token);
      this.router.navigate(['/student']);
    }, error => {
      console.error('Login failed', error);
    });
  }

  teacherLogin(): void {
    const credentials = this.teacherLoginForm.value;
    this.authTeacherService.teacherLogin(credentials).subscribe(response => {
      console.log(response);
      this.authTeacherService.saveDataTeacher(response.token);
      this.router.navigate(['/teacher']);
    }, error => {
      console.error('Login failed', error);
    });
  }
}
