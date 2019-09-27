import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoselogistictrincComponent } from './choselogistictrinc.component';

describe('ChoselogistictrincComponent', () => {
  let component: ChoselogistictrincComponent;
  let fixture: ComponentFixture<ChoselogistictrincComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoselogistictrincComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoselogistictrincComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
