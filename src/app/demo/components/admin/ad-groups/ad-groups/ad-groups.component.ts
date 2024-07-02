import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/demo/service/group.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-ad-groups',
  templateUrl: './ad-groups.component.html',
  styleUrls: ['./ad-groups.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AdGroupsComponent implements OnInit {
  groups: any[] = [];
  groupDialog: boolean = false;
  group: any = {};
  selectedGroups: any[] = [];
  cols: any[] = [
    { field: '_id', header: 'Group ID' },
    { field: 'level', header: 'Level' },
    { field: 'specialty', header: 'Specialty' },
    { field: 'number', header: 'Number' }
  ];

  constructor(
    private groupService: GroupService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  openNewGroup() {
    console.log('Opening new group dialog');
    this.group = {};
    this.groupDialog = true;
  }
  

  editGroup(group: any) {
    console.log('Edit group:', group);
    this.group = { ...group }; // Make a copy of the group object to avoid changing the original data
    this.groupDialog = true; // Open the group dialog
  }
  
  saveGroup() {
    if (this.group._id) {
      // If _id exists, it means we are editing an existing group
      this.groupService.updateGroup(this.group).subscribe(
        response => {
          this.loadGroups();
          this.groupDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Group Updated', life: 3000 });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Group Update Failed', life: 3000 });
        }
      );
    } else {
      // If _id doesn't exist, it means we are creating a new group
      this.groupService.createGroup(this.group).subscribe(
        response => {
          this.loadGroups();
          this.groupDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Group Created', life: 3000 });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Group Creation Failed', life: 3000 });
        }
      );
    }
  }

  loadGroups() {
    this.groupService.getAllGroups().subscribe(
      response => {
        this.groups = response;
      },
      error => {
        console.error('Error fetching groups:', error);
      }
    );
  }

  deleteGroup(group: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this group?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.groupService.deleteGroup(group._id).subscribe(
          response => {
            this.loadGroups();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Group Deleted', life: 3000 });
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Group Deletion Failed', life: 3000 });
          }
        );
      }
    });
  }

  deleteSelectedGroups() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected group(s)?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedGroups.forEach(group => {
          this.groupService.deleteGroup(group._id).subscribe(
            response => {
              this.loadGroups();
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Group Deleted', life: 3000 });
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Group Deletion Failed', life: 3000 });
            }
          );
        });
        this.selectedGroups = [];
      }
    });
  }

  // editGroup(group: any) {
  //   console.log('Edit group:', group);
  //   this.group = { ...group }; // Make a copy of the group object to avoid changing the original data
  //   this.groupDialog = true; // Open the group dialog
  // }

  onGlobalFilter(event: any) {
    console.log('Global filter:', event.target.value);
    // Implement global filter functionality as per your requirements
  }

  hideDialog() {
    this.groupDialog = false;
  }
}
