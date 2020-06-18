import { async, TestBed } from '@angular/core/testing';
import { InOutToolingsComponent } from './in-out-toolings.component';
describe('InOutToolingsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [InOutToolingsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(InOutToolingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=in-out-toolings.component.spec.js.map