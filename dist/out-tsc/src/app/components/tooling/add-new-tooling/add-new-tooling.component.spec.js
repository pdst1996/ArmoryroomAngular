import { async, TestBed } from '@angular/core/testing';
import { AddNewToolingComponent } from './add-new-tooling.component';
describe('AddNewToolingComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [AddNewToolingComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(AddNewToolingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=add-new-tooling.component.spec.js.map