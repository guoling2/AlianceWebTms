import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricetemplateinsertComponent } from './pricetemplateinsert.component';

describe('PricetemplateinsertComponent', () => {
  let component: PricetemplateinsertComponent;
  let fixture: ComponentFixture<PricetemplateinsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricetemplateinsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricetemplateinsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
