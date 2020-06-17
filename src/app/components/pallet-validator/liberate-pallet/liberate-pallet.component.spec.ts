import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiberatePalletComponent } from './liberate-pallet.component';

describe('LiberatePalletComponent', () => {
  let component: LiberatePalletComponent;
  let fixture: ComponentFixture<LiberatePalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiberatePalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiberatePalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
