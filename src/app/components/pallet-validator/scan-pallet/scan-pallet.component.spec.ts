import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPalletComponent } from './scan-pallet.component';

describe('ScanPalletComponent', () => {
  let component: ScanPalletComponent;
  let fixture: ComponentFixture<ScanPalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanPalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanPalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
