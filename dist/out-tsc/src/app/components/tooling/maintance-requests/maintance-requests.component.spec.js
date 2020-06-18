import { async, TestBed } from '@angular/core/testing';
import { MaintanceRequestsComponent } from './maintance-requests.component';
describe('MaintanceRequestsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [MaintanceRequestsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(MaintanceRequestsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=maintance-requests.component.spec.js.map