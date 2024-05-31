import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-vms',
  templateUrl: './my-vms.component.html',
  styleUrls: ['./my-vms.component.scss'],
  providers: [MessageService], // Add the provider here
})
export class MyVmsComponent {
  selectedView: string = 'Cloud'; // Default selected view
  
  // Placeholder data for the tables
  cloudData: any[] = [
    { id: 1, name: 'Cloud Data 1', region: 'Region A', status: 'Active', instanceType: 'Type 1', createdDate: '2024-05-31' },
    { id: 2, name: 'Cloud Data 2', region: 'Region B', status: 'Inactive', instanceType: 'Type 2', createdDate: '2024-05-30' },
    // Add more placeholder data as needed
  ];

  bigData: any[] = [
    { id: 1, name: 'Big Data 1', size: 'Small', status: 'Active', cluster: 'Cluster A', location: 'Location 1' },
    { id: 2, name: 'Big Data 2', size: 'Large', status: 'Inactive', cluster: 'Cluster B', location: 'Location 2' },
    // Add more placeholder data as needed
  ];

  reseauData: any[] = [
    { id: 1, name: 'Reseau 1', subnet: 'Subnet A', gateway: 'Gateway 1', status: 'Active', vlan: 'VLAN 1' },
    { id: 2, name: 'Reseau 2', subnet: 'Subnet B', gateway: 'Gateway 2', status: 'Inactive', vlan: 'VLAN 2' },
    // Add more placeholder data as needed
  ];

  constructor() {}

  // Method to update selected view
  updateSelectedView(view: string) {
    this.selectedView = view;
  }
}