import { async, TestBed } from '@angular/core/testing';
import { MaintenanceRequestsComponent } from './maintenance-requests.component';
describe('MaintenanceRequestsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [MaintenanceRequestsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(MaintenanceRequestsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=maintenance-requests.component.spec.js.map