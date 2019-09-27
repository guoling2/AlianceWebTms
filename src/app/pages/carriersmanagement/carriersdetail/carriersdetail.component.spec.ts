import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriersdetailComponent } from './carriersdetail.component';

describe('CarriersdetailComponent', () => {
  let component: CarriersdetailComponent;
  let fixture: ComponentFixture<CarriersdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarriersdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarriersdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
