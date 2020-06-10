import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { LoginAct } from '../../loginact.service';
import { RequimttoComponent } from 'src/app/components/requimtto/requimtto.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            {
                path: '',
                loadChildren: 'src/app/modules/principal/principal.module#PrincipalModule', canActivate: [LoginAct]
            },
            {
                path: 'config/tooling',
                loadChildren: 'src/app/modules/tooling/tooling.module#ToolingModule', canActivate: [LoginAct]
            },
            {
                path: 'config/countermask',
                loadChildren: 'src/app/modules/countermask/countermask.module#CountermaskModule', canActivate: [LoginAct]
            },
            {
                path: 'checklist/questions',
                loadChildren: 'src/app/modules/questions/questions.module#QuestionsModule', canActivate: [LoginAct]
            },
            {
                path:'requimtto', component: RequimttoComponent
            }
           
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
