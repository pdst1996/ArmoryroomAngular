import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { LoginAct } from '../../loginact.service';
import { RequimttoComponent } from 'src/app/components/requimtto/requimtto.component';
import { ToolingComponent } from 'src/app/components/tooling/tooling.component'

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            {
                path: '',
                loadChildren: 'src/app/modules/principal/principal.module#PrincipalModule', canActivate: [LoginAct]
            },
            {
                path:'requimtto', component: RequimttoComponent
            },
            {
                path:'config/tooling', component: ToolingComponent
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
