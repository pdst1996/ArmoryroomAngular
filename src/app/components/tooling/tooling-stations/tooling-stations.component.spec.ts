import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolingStationsComponent } from './tooling-stations.component';

describe('ToolingStationsComponent', () => {
  let component: ToolingStationsComponent;
  let fixture: ComponentFixture<ToolingStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolingStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolingStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
