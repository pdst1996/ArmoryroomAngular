import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequimttoComponent } from './requimtto.component';

describe('RequimttoComponent', () => {
  let component: RequimttoComponent;
  let fixture: ComponentFixture<RequimttoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequimttoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequimttoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
