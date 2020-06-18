import { async, TestBed } from '@angular/core/testing';
import { ShowToolingsComponent } from './show-toolings.component';
describe('ShowToolingsComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ShowToolingsComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ShowToolingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=show-toolings.component.spec.js.map