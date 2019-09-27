import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticitemdetailComponent } from './logisticitemdetail.component';

describe('LogisticitemdetailComponent', () => {
  let component: LogisticitemdetailComponent;
  let fixture: ComponentFixture<LogisticitemdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogisticitemdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogisticitemdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
