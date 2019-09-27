import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpricevalueaddComponent } from './userpricevalueadd.component';

describe('UserpricevalueaddComponent', () => {
  let component: UserpricevalueaddComponent;
  let fixture: ComponentFixture<UserpricevalueaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserpricevalueaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpricevalueaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
