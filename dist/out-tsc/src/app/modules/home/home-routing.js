var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { LoginAct } from '../../loginact.service';
var routes = [
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
                path: 'checklist/questionnaire',
                loadChildren: 'src/app/modules/questionnaire/questionnaire.module#QuestionnaireModule', canActivate: [LoginAct]
            },
            {
                path: 'requimtto',
                loadChildren: 'src/app/modules/requimtto/requimtto.module#RequimttoModule', canActivate: [LoginAct]
            },
            {
                path: 'history',
                loadChildren: 'src/app/modules/history/history.module#HistoryModule', canActivate: [LoginAct]
            },
            {
                path: 'fill-mtto',
                loadChildren: 'src/app/modules/fill-mtto/fill-mtto.module#FillMttoModule', canActivate: [LoginAct]
            },
            {
                path: 'contact-us',
                loadChildren: 'src/app/modules/contact-us/contact-us.module#ContactUsModule', canActivate: [LoginAct]
            },
            {
                path: 'pallet-validator/scan-pallet',
                loadChildren: 'src/app/modules/pallet-validator/scan-pallet/scan-pallet.module#ScanPalletModule', canActivate: [LoginAct]
            },
            {
                path: 'pallet-validator/liberate-pallet',
                loadChildren: 'src/app/modules/pallet-validator/liberate-pallet/liberate-pallet.module#LiberatePalletModule', canActivate: [LoginAct]
            },
            {
                path: 'pallet-validator/stations-config',
                loadChildren: 'src/app/modules/pallet-validator/stations-config/stations-config.module#StationsConfigModule', canActivate: [LoginAct]
            },
            {
                path: 'config/stations',
                loadChildren: 'src/app/modules/stations/stations.module#StationsModule', canActivate: [LoginAct]
            },
            {
                path: 'maintenance-requests',
                loadChildren: 'src/app/modules/maintenance-requests/maintenance-requests.module#MaintenanceRequestsModule', canActivate: [LoginAct]
            },
            {
                path: 'tutorials',
                loadChildren: 'src/app/modules/tutorials/tutorials.module#TutorialsModule', canActivate: [LoginAct]
            }
        ]
    }
];
var HomeRoutingModule = /** @class */ (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forChild(routes),
            ],
            exports: [RouterModule]
        })
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());
export { HomeRoutingModule };
//# sourceMappingURL=home-routing.js.map