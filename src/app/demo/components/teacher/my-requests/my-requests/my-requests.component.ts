import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode'; // Utilisez la syntaxe { jwtDecode }

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {
  formData = {
    senderName: '',
    groupe: '',
    nombreLabs: '',
    systemExploitation: '',
    baseDonnee: '',
    runTimeEnvironnement: '',
    webServer: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token_teacher');
    if (token) {
      const decodedToken: any = jwtDecode(token); // Utilisez jwtDecode sans .default
      this.formData.senderName = decodedToken.name;
    }
  }

  submitForm(): void {
    this.http.post('http://localhost:3000/request', this.formData).subscribe(
      response => {
        console.log('Request created successfully:', response);
      },
      error => {
        console.error('Error creating request:', error);
      }
    );
  }
}
