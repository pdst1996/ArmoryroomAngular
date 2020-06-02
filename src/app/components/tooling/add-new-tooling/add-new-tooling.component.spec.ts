import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewToolingComponent } from './add-new-tooling.component';

describe('AddNewToolingComponent', () => {
  let component: AddNewToolingComponent;
  let fixture: ComponentFixture<AddNewToolingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewToolingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewToolingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
