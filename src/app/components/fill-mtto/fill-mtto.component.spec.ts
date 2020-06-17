import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillMttoComponent } from './fill-mtto.component';

describe('FillMttoComponent', () => {
  let component: FillMttoComponent;
  let fixture: ComponentFixture<FillMttoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillMttoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillMttoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
