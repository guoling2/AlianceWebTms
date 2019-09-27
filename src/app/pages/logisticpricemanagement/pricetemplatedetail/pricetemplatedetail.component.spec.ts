import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricetemplatedetailComponent } from './pricetemplatedetail.component';

describe('PricetemplatedetailComponent', () => {
  let component: PricetemplatedetailComponent;
  let fixture: ComponentFixture<PricetemplatedetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricetemplatedetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricetemplatedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
