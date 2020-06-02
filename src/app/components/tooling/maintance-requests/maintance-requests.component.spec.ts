import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintanceRequestsComponent } from './maintance-requests.component';

describe('MaintanceRequestsComponent', () => {
  let component: MaintanceRequestsComponent;
  let fixture: ComponentFixture<MaintanceRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintanceRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintanceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
