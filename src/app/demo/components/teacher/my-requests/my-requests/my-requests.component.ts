import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { TeacherService } from 'src/app/demo/service/teacher.service';
import { StudentService } from 'src/app/demo/service/student.service'; // Import StudentService
import { Teacher } from 'src/app/demo/api/teacher';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode
import { ThirdPartyDraggable } from '@fullcalendar/interaction';

interface JwtPayload {
  name: string;
  // Add other properties if needed
}

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss'],
  providers: [MessageService],
})
export class MyRequestsComponent implements OnInit {
  count:any;
  data:any
  formData = {
    senderName: '',
    groupe: '',
    nombreLabs: '',
    systemExploitation: '',
    baseDonnee: '',
    runTimeEnvironnement: '',
    webServer: ''
  };
  sentSuccessfully: boolean = false;
  view: string = 'formulerRequest';
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
    { label: 'PostgreSQL', value: 'PostgreSQL' }
  ];
  runTimeEnvironnementOptions: any[] = [
    { label: 'Java', value: 'Java' },
    { label: 'PHP', value: 'PHP' },
    { label: 'Python', value: 'Python' }
  ];
  webServerOptions: any[] = [
    { label: 'Apache HTTP Server', value: 'Apache HTTP Server' },
    { label: 'Nginx', value: 'Nginx' },
    { label: 'IIS', value: 'IIS' }
  ];
  teacherData: Teacher | null = null;
  idTeacher: string | null;
  senderName: string | null;
  classes: { [groupId: string]: boolean } = {}; // Adjust the type of classes

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private teacherService: TeacherService,
    private studentService: StudentService // Inject StudentService
  ) {}

  ngOnInit(): void {
    this.idTeacher = localStorage.getItem('id_teacher');
    if (!this.idTeacher) {
      console.error('No teacher ID found in localStorage');
      return; // Stop further execution
    }
  
    const token = localStorage.getItem('token_teacher');
    const decodedToken: JwtPayload | null = token ? jwtDecode(token) : null;
    const senderName = decodedToken ? decodedToken.name : '';
    this.formData.senderName = senderName;
  
    // Fetch teacher data including classes
    this.teacherService.getTeacherById(this.idTeacher).subscribe(
      teacher => {
        console.log('Teacher Data:', teacher);
        // Assign teacher data including classes to teacherData
        this.teacherData = teacher;
        // Extract class names from teacherData
        this.classes = teacher.classes;
      },
      error => {
        console.error('Error fetching teacher data:', error);
      }
    );
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
        console.log(this.formData)

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

  onClassSelectChange(): void {
    const selectedClass = this.formData.groupe;
  
    // Split the selected class into individual words
    const words = selectedClass.split(' ');
  
    // Assign each word to a variable
    const word1 = words[0];
    const word2 = words[1];
    const word3 = words.length > 2 ? words[2] : ''; // Handle the case where there might be only two words
  
    // Get the count of students for the selected class
    this.studentService.getStudentCountByClass(word1, word2, word3).subscribe(
      c => {
        console.log('Student count for', selectedClass, ':', c);
        this.data = c;
        this.count = this.data.studentCount;
        this.formData.nombreLabs = this.count.toString(); // Convert count to string if necessary
  
        // You can handle the student count here, for example:
        // this.formData.studentCount = count; (if you have a studentCount field in your formData)
      },
      error => {
        console.error('Error fetching student count:', error);
      }
    );
  }
}  