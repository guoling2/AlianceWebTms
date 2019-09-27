import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderitemtagprintComponent } from './orderitemtagprint.component';

describe('OrderitemtagprintComponent', () => {
  let component: OrderitemtagprintComponent;
  let fixture: ComponentFixture<OrderitemtagprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderitemtagprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderitemtagprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
