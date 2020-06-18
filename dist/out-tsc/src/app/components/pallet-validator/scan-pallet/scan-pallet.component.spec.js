import { async, TestBed } from '@angular/core/testing';
import { ScanPalletComponent } from './scan-pallet.component';
describe('ScanPalletComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ScanPalletComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ScanPalletComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=scan-pallet.component.spec.js.map