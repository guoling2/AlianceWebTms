import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDataListComponent } from './order-data-list.component';

describe('OrderDataListComponent', () => {
  let component: OrderDataListComponent;
  let fixture: ComponentFixture<OrderDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
