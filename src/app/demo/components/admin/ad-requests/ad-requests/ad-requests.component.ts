import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { MessageService } from 'primeng/api';
import { RequestService } from 'src/app/demo/service/request.service';

@Component({
  selector: 'app-ad-requests',
  templateUrl: './ad-requests.component.html',
  styleUrls: ['./ad-requests.component.scss'],
  providers: [MessageService],

})
export class AdRequestsComponent implements OnInit {
  requests: any[] = []; // Assuming requests is an array of any type
  request: any; // Define the request property

  view: string = 'formulerRequest'; // Add the view property
  selectedRequests: any[] = []; // Declare selectedRequests property
  requestDialog: boolean = false; // Declare requestDialog property
  deleteRequestsDialog: boolean = false; // Declare deleteRequestsDialog property
  submitted: boolean = false;

  constructor(private http: HttpClient) { } // Inject HttpClient
  validateRequest(request: any) {
    // Implement your validation logic here
    // For example, you might want to update the status of the request to "Validated"
    // You can access the request object and modify its properties as needed
    // For now, let's just log a message to the console
    console.log('Request validated:', request);
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/request') // Use this.http
      .subscribe(
        data => {
          this.requests = data;
        },
        error => {
          console.error('Error fetching requests:', error);
        }
      );
  }
  openEditWindow(request: any) {
    const editUrl = `/edit-request/${request.id}`; // Example URL for editing the request
    window.open(editUrl, '_blank', 'width=800,height=600'); // Open new window
  }
  

  // In your AdRequestsComponent class
  

  editRequest(request: any) {
    this.request = { ...request };
    this.requestDialog = true;
  }

  saveRequest() {
    // Implementation of the saveRequest function
    console.log('Request saved');
  }

  hideDialog() {
    this.requestDialog = false;
    this.submitted = false;
  }
}
