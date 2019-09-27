import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsidePlanGroupDetailComponent } from './outside-plan-group-detail.component';

describe('OutsidePlanGroupDetailComponent', () => {
  let component: OutsidePlanGroupDetailComponent;
  let fixture: ComponentFixture<OutsidePlanGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutsidePlanGroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsidePlanGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
