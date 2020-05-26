import { Routes, RouterModule } from '@angular/router';
import { LoginAct } from './loginact.service';
import { HomeAct } from './homeact.service';
import { NgModule } from '@angular/core';


// Define which component should be loaded based on the current URL
export const routes: Routes = [
    { path: '', loadChildren: './modules/home/home.module#HomeModule', canActivate: [LoginAct] },
    { path: 'login', loadChildren: './modules/login/login.module#LoginModule', canActivate: [HomeAct] }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: false,
            initialNavigation: "enabled"
        }
        )
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
