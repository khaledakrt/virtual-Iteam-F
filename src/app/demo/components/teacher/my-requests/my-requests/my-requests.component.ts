import { jwtDecode } from 'jwt-decode'; // Use named import

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api'; // Import MessageService

interface JwtPayload {
  name: string;
  // Add other properties if needed
}

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss'],
  providers: [MessageService], // Provide MessageService
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
  sentSuccessfully: boolean = false; // Flag to track successful submission
  view: string = 'formulerRequest'; // Default view

  // Dropdown options
  systemExploitationOptions: any[] = [
    { label: 'Windows', value: 'Windows' },
    { label: 'Ubuntu', value: 'Ubuntu' },
    { label: 'Debian', value: 'Debian' }
  ];

  baseDonneeOptions: any[] = [
    { label: 'Apache Cassandra', value: 'Apache Cassandra' },
    { label: 'Couchbase', value: 'Couchbase' },
    { label: 'MongoDB', value: 'MongoDB' },
    { label: 'Oracle', value: 'Oracle' },
    { label: 'PostgreSQL', value: 'PostgreSQL' },

    // Add other database options as needed
  ];

  runTimeEnvironnementOptions: any[] = [
    { label: 'Java', value: 'Java' },
    { label: 'PHP', value: 'PHP' },
    { label: 'Python', value: 'Python' },
    // Add other runtime environment options as needed
  ];

  webServerOptions: any[] = [
    { label: 'Apache HTTP Server', value: 'Apache HTTP Server' },
    { label: 'Nginx', value: 'Nginx' },
    { label: 'IIS', value: 'IIS' },
    // Add other web server options as needed
  ];

  constructor(private http: HttpClient, private messageService: MessageService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token_teacher');
    const decodedToken: JwtPayload | null = token ? jwtDecode(token) : null;
    const senderName = decodedToken ? decodedToken.name : '';
    this.formData.senderName = senderName;
  }

  submitForm(): void {
    // Check if any required field is empty
    if (!this.isFormValid()) {
      // Display error message if any required field is empty
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields',
        life: 3000
      });
      return; // Stop further execution
    }
  
    // If all fields are filled, send the request
    this.http.post('http://localhost:3000/request', this.formData).subscribe(
      response => {
        console.log('Request created successfully:', response);
        this.sentSuccessfully = true; // Set sentSuccessfully to true upon successful submission
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Request sent successfully',
          life: 3000
        });
        this.clearForm(); // Clear the form fields
      },
      error => {
        console.error('Error creating request:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error creating request',
          life: 3000
        });
      }
    );
  }

  clearForm(): void {
    const token = localStorage.getItem('token_teacher');
    const decodedToken: JwtPayload | null = token ? jwtDecode(token) : null;
    const senderName = decodedToken ? decodedToken.name : '';
    // Reset form data to initial values, keeping senderName intact
    this.formData = {
      senderName: senderName,
      groupe: '',
      nombreLabs: '',
      systemExploitation: '',
      baseDonnee: '',
      runTimeEnvironnement: '',
      webServer: ''
    };
  }

  isFormValid(): boolean {
    const { senderName, groupe, nombreLabs, systemExploitation, baseDonnee, runTimeEnvironnement, webServer } = this.formData;
    return !!senderName && !!groupe && !!nombreLabs && !!systemExploitation && !!baseDonnee && !!runTimeEnvironnement && !!webServer;
  }
}
