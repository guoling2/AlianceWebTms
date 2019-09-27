import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurdriverdetailComponent } from './ourdriverdetail.component';

describe('OurdriverdetailComponent', () => {
  let component: OurdriverdetailComponent;
  let fixture: ComponentFixture<OurdriverdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurdriverdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurdriverdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
