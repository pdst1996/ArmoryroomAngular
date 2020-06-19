import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsConfigComponent } from './stations-config.component';

describe('StationsConfigComponent', () => {
  let component: StationsConfigComponent;
  let fixture: ComponentFixture<StationsConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationsConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
