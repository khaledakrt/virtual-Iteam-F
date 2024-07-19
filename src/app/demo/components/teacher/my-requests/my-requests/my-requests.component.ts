import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { TeacherService } from 'src/app/demo/service/teacher.service';
import { GroupService } from 'src/app/demo/service/group.service';
import { Teacher } from 'src/app/demo/api/teacher';
import { Group } from 'src/app/demo/api/group';
import { jwtDecode } from 'jwt-decode';

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
  formData = {
    senderName: '',
    groupe: '',
    nombreLabs: '',
    systemExploitation: '', // Initialisé à une chaîne vide
    baseDonnee: '', // Initialisé à une chaîne vide
    runTimeEnvironnement: '', // Initialisé à une chaîne vide
    webServer: '' // Initialisé à une chaîne vide
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
  idTeacher: string | null = '';
  groups: Group[] = [];
  selectedGroup: Group | null = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private teacherService: TeacherService,
    private groupService: GroupService
  ) {}

  ngOnInit(): void {
    this.idTeacher = localStorage.getItem('id_teacher');
    if (!this.idTeacher) {
      console.error('No teacher ID found in localStorage');
      return;
    }

    const token = localStorage.getItem('token_teacher');
    const decodedToken: JwtPayload | null = token ? jwtDecode(token) : null;
    const senderName = decodedToken ? decodedToken.name : '';
    this.formData.senderName = senderName;

    this.teacherService.getTeacherById(this.idTeacher).subscribe(
      teacher => {
        this.teacherData = teacher;
        this.teacherService.getGroups().subscribe(
          groups => {
            this.groups = groups;
          },
          error => {
            console.error('Error fetching groups:', error);
          }
        );
      },
      error => {
        console.error('Error fetching teacher data:', error);
      }
    );
  }

  formatClasses(classIds: string[]): string {
    if (!this.groups || !classIds) {
      return '';
    }

    const classNames = classIds.map(classId => {
      const group = this.groups.find(group => group._id === classId);
      return ` ${group?.level} ${group?.specialty} ${group?.number}`; // Utilisation de ?. pour éviter les erreurs si group est null ou undefined
    });

    return classNames.join(', ');
  }

  submitForm(): void {
    if (!this.isFormValid()) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Form is not valid' });
      return;
    }

    if (this.selectedGroup) {
      this.formData.groupe = `${this.selectedGroup.level} ${this.selectedGroup.specialty} ${this.selectedGroup.number}`;
    } else {
      this.formData.groupe = '';
    }

    this.http.post('http://localhost:3000/request', this.formData).subscribe(
      response => {
        this.sentSuccessfully = true;
        this.clearForm();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form submitted successfully' });
      },
      error => {
        console.error('Error submitting form:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error submitting form' });
      }
    );
  }

  updateGroupe(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedGroupId = selectElement.value;
    this.selectedGroup = this.groups.find(group => group._id === selectedGroupId) || null;
  }

  isFormValid(): boolean {
    return !!this.formData.nombreLabs && !!this.selectedGroup;
  }

  clearForm(): void {
    this.formData = {
      senderName: '',
      groupe: '',
      nombreLabs: '',
      systemExploitation: '', // Initialisé à une chaîne vide
      baseDonnee: '', // Initialisé à une chaîne vide
      runTimeEnvironnement: '', // Initialisé à une chaîne vide
      webServer: '' // Initialisé à une chaîne vide
    };
    this.selectedGroup = null;
  }
}
