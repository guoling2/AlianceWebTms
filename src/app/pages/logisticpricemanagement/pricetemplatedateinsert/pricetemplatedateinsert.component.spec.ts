import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricetemplatedateinsertComponent } from './pricetemplatedateinsert.component';

describe('PricetemplatedateinsertComponent', () => {
  let component: PricetemplatedateinsertComponent;
  let fixture: ComponentFixture<PricetemplatedateinsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricetemplatedateinsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricetemplatedateinsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
