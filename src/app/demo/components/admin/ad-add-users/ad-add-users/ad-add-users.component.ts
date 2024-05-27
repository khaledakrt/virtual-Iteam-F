// ad-add-users.component.ts
import { Component } from '@angular/core';
import { UserService } from 'src/app/demo/service/user.service';
@Component({
  selector: 'app-ad-add-users',
  templateUrl: './ad-add-users.component.html',
  styleUrls: ['./ad-add-users.component.scss']
})
export class AdAddUsersComponent {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  role: string = 'student';
  photo: string = '';

  constructor(private userService: UserService) {}

  registerUser(): void {
    const newUser = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      role: this.role,
      photo: this.photo
    };

    this.userService.registerUser(newUser).subscribe(
      () => {
        console.log('User registered successfully');
        // Reset form fields after successful registration
        this.nom = '';
        this.prenom = '';
        this.email = '';
        this.password = '';
        this.role = 'student';
        this.photo = '';
      },
      (error) => {
        console.error('Error registering user', error);
      }
    );
  }
}
