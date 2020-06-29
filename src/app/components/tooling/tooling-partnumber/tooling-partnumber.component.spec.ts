import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolingPartnumberComponent } from './tooling-partnumber.component';

describe('ToolingPartnumberComponent', () => {
  let component: ToolingPartnumberComponent;
  let fixture: ComponentFixture<ToolingPartnumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolingPartnumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolingPartnumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
