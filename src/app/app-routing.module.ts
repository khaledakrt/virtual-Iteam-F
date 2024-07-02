import { FaqModule } from './demo/components/view/faq/faq.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { TeacherDashboardComponent } from './demo/components/teacher/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './demo/components/student/student-dashboard/student-dashboard.component';
import { LoginComponent } from './demo/components/auth/login/login.component';
import { AdminDashboardComponent } from './demo/components/admin/admin-dashboard/admin-dashboard.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'dashboard', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },

                ]
            },
            {path:'login',component:LoginComponent},

            {
              path: 'admin', component:AdminDashboardComponent ,
              children: [
                { path: 'teacher-list', loadChildren: () => import('./demo/components/admin/ad-teachers/ad-teachers.module').then(m => m.AdTeachersModule) },
                { path: 'student-list', loadChildren: () => import('./demo/components/admin/ad-students/ad-students.module').then(m => m.AdStudentsModule) },
                { path: 'group-list', loadChildren: () => import('./demo/components/admin/ad-groups/ad-groups.module').then(m => m.AdGroupsModule) },
                { path: 'vm-list', loadChildren: () => import('./demo/components/admin/ad-vms/ad-vms.module').then(m => m.AdVmsModule) },
                { path: 'request-list', loadChildren: () => import('./demo/components/admin/ad-requests/ad-requests.module').then(m => m.AdRequestsModule) },
                { path: 'users-list', loadChildren: () => import('./demo/components/admin/ad-vms/ad-vms.module').then(m => m.AdVmsModule) },
                { path: 'users-create', loadChildren: () => import('./demo/components/admin/ad-add-users/ad-add-users.module').then(m => m.AdAddUsersModule) },


         
              ]
          },
            {
              path: 'teacher', component:TeacherDashboardComponent ,
              children: [
                { path: 'student', loadChildren: () => import('./demo/components/teacher/my-student/my-student.module').then(m => m.MyStudentModule) },
                { path: 'profil', loadChildren: () => import('./demo/components/teacher/teacher-profil/teacher-profil.module').then(m => m.TeacherProfilModule) },
                { path: 'my-requests', loadChildren: () => import('./demo/components/teacher/my-requests/my-requests.module').then(m => m.MyRequestsModule) }


              ]
          },
          {
            path: 'student', component:StudentDashboardComponent ,
            children: [

              { path: 'profil', loadChildren: () => import('./demo/components/student/student-profil/student-profil.module').then(m => m.StudentProfilModule) },
              { path: 'teachers', loadChildren: () => import('./demo/components/student/student-profil/student-profil.module').then(m => m.StudentProfilModule) },
              { path: 'my-vms', loadChildren: () => import('./demo/components/student/my-vms/my-vms.module').then(m => m.MyVmsModule) }


              
            ]
        },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },

            { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },

       // AppRoutingModule
{
    path: '',
    loadChildren: () => import('../app/demo/components/view/landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'blogs',
    loadChildren: () => import('../app/demo/components/view/blogs-view/blogs-view.module').then(m => m.BlogsViewModule),
  },

  {
    path: 'section',
    loadChildren: () => import('../app/demo/components/view/sections-view/sections-view.module').then(m => m.SectionsViewModule),
  },

  {
    path: 'faq',
  loadChildren: () => import('../app/demo/components/view/faq/faq.module').then(m=>m.FaqModule)  },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
