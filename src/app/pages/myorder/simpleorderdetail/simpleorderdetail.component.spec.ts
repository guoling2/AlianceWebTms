import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleorderdetailComponent } from './simpleorderdetail.component';

describe('SimpleorderdetailComponent', () => {
  let component: SimpleorderdetailComponent;
  let fixture: ComponentFixture<SimpleorderdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleorderdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleorderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
