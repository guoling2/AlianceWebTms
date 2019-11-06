import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderchangerouteComponent } from './orderchangeroute.component';

describe('OrderchangerouteComponent', () => {
  let component: OrderchangerouteComponent;
  let fixture: ComponentFixture<OrderchangerouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderchangerouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderchangerouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
