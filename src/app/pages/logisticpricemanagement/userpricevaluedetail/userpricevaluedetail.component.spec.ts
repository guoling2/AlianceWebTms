import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpricevaluedetailComponent } from './userpricevaluedetail.component';

describe('UserpricevaluedetailComponent', () => {
  let component: UserpricevaluedetailComponent;
  let fixture: ComponentFixture<UserpricevaluedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpricevaluedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpricevaluedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
