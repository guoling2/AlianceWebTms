import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpricevaluelistComponent } from './userpricevaluelist.component';

describe('UserpricevaluelistComponent', () => {
  let component: UserpricevaluelistComponent;
  let fixture: ComponentFixture<UserpricevaluelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpricevaluelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpricevaluelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
