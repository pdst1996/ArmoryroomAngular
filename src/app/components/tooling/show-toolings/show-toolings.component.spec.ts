import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowToolingsComponent } from './show-toolings.component';

describe('ShowToolingsComponent', () => {
  let component: ShowToolingsComponent;
  let fixture: ComponentFixture<ShowToolingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowToolingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowToolingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
