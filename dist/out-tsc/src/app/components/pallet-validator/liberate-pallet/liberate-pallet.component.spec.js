import { async, TestBed } from '@angular/core/testing';
import { LiberatePalletComponent } from './liberate-pallet.component';
describe('LiberatePalletComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [LiberatePalletComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(LiberatePalletComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=liberate-pallet.component.spec.js.map