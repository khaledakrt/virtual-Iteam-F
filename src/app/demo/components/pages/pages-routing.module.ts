import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
@NgModule({
    imports: [RouterModule.forChild([
        { path: 'team', loadChildren: () => import('./team/team.module').then(m => m.TeamModule) },
        { path: 'blogs', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
        { path: 'projects', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },

    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
