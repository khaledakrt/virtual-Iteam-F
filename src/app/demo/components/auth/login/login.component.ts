import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/demo/service/auth-admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  rememberMe: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthAdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      (response: any) => {
        // Assuming the response contains a token upon successful login
        const token = response.token;
        this.authService.saveDataAdmin(token)

        // Store token in local storage or session storage for future requests
        localStorage.setItem('token', token);
        // Redirect to home page or any other desired route
        this.router.navigate(['/admin']);
      },
      (error: any) => {
        // Handle login error
        console.error(error);
        // Optionally display error message to user
      }
    );
  }
}
