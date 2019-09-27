import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticpriceComponent } from './logisticprice.component';

describe('LogisticpriceComponent', () => {
  let component: LogisticpriceComponent;
  let fixture: ComponentFixture<LogisticpriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticpriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
