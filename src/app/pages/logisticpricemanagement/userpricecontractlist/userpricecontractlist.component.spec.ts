import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpricecontractlistComponent } from './userpricecontractlist.component';

describe('UserpricecontractlistComponent', () => {
  let component: UserpricecontractlistComponent;
  let fixture: ComponentFixture<UserpricecontractlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpricecontractlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpricecontractlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
