import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierinsertComponent } from './carrierinsert.component';

describe('CarrierinsertComponent', () => {
  let component: CarrierinsertComponent;
  let fixture: ComponentFixture<CarrierinsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrierinsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrierinsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
