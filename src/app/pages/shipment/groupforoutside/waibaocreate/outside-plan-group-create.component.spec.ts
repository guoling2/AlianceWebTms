import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsidePlanGroupCreateComponent } from './outside-plan-group-create.component';

describe('OutsidePlanGroupCreateComponent', () => {
  let component: OutsidePlanGroupCreateComponent;
  let fixture: ComponentFixture<OutsidePlanGroupCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutsidePlanGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutsidePlanGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
