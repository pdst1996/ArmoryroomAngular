import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InOutToolingsComponent } from './in-out-toolings.component';

describe('InOutToolingsComponent', () => {
  let component: InOutToolingsComponent;
  let fixture: ComponentFixture<InOutToolingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InOutToolingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InOutToolingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
