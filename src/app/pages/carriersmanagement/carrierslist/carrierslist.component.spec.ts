import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierslistComponent } from './carrierslist.component';

describe('CarrierslistComponent', () => {
  let component: CarrierslistComponent;
  let fixture: ComponentFixture<CarrierslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrierslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
