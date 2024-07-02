import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(private router: Router) { }

    ngOnInit() {
        const role = localStorage.getItem('role');

        switch (role) {
            case 'student':
                this.loadStudentMenus();
                break;
            case 'teacher':
                this.loadTeacherMenus();
                break;
            case 'admin':
                this.loadAdminMenus();
                break;
            default:
                // Handle default case here
                break;
        }
    }

    loadStudentMenus() {
        this.model = [
            {
                label: 'student',
                items: [
                    { label: 'My-virtual machines', icon: 'pi pi-fw pi-home', routerLink: ['/student/my-vms'] }]},
                    {
                        items: [
                    { label: 'profil', icon: 'pi pi-fw pi-home', routerLink: ['/student/profil'] },
                    { label: 'my-teachers', icon: 'pi pi-fw pi-home', routerLink: ['/student/teachers'] }
                ]
            },
            {
                label: 'Content Management',
                items: [
                    { label: 'Logout', icon: 'pi pi-fw pi-id-card', command: () => this.logout() }
                ]
            }
        ];
    }

    loadTeacherMenus() {
        this.model = [
            {
                label: 'teacher',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Content Management',
                items: [
                    { label: 'my Requests', icon: 'pi pi-fw pi-id-card', routerLink: ['/teacher/my-requests'] },
                    { label: 'my Students', icon: 'pi pi-fw pi-check-square', routerLink: ['/teacher/student/'] },
                    { label: 'profil', icon: 'pi pi-fw pi-check-square', routerLink: ['/teacher/profil'] },
                    { label: 'Logout', icon: 'pi pi-fw pi-id-card', command: () => this.logout() }
                ]
            }
        ];
    }

    loadAdminMenus() {
        this.model = [
            {
                label: 'admin',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Content Management',
                items: [
                    { label: 'my Virtual', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/vm-list'] },
                    { label: 'teachers', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/teacher-list/'] },
                    { label: 'students', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/student-list'] },
                    { label: 'groups', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/group-list/'] },
                    { label: 'Requests', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/request-list'] },
                    { label: 'créer nouveau user', icon: 'pi pi-fw pi-check-square', routerLink: ['/admin/users-create'] },
                    { label: 'Logout', icon: 'pi pi-fw pi-id-card', command: () => this.logout() }
                ]
            }
        ];
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/']);
    }
}
