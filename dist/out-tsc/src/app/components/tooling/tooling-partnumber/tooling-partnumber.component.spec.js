import { async, TestBed } from '@angular/core/testing';
import { ToolingPartnumberComponent } from './tooling-partnumber.component';
describe('ToolingPartnumberComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ToolingPartnumberComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ToolingPartnumberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=tooling-partnumber.component.spec.js.map