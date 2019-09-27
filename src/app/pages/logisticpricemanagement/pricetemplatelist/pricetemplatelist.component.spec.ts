import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricetemplatelistComponent } from './pricetemplatelist.component';

describe('PricetemplatelistComponent', () => {
  let component: PricetemplatelistComponent;
  let fixture: ComponentFixture<PricetemplatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricetemplatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricetemplatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
