import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpricecontractaddComponent } from './userpricecontractadd.component';

describe('UserpricecontractaddComponent', () => {
  let component: UserpricecontractaddComponent;
  let fixture: ComponentFixture<UserpricecontractaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpricecontractaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpricecontractaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
