import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticpricecaclComponent } from './logisticpricecacl.component';

describe('LogisticpricecaclComponent', () => {
  let component: LogisticpricecaclComponent;
  let fixture: ComponentFixture<LogisticpricecaclComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticpricecaclComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticpricecaclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
