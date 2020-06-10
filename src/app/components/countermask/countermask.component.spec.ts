import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountermaskComponent } from './countermask.component';

describe('CountermaskComponent', () => {
  let component: CountermaskComponent;
  let fixture: ComponentFixture<CountermaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountermaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountermaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
