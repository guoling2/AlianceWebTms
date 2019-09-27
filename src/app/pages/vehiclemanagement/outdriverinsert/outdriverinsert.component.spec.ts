import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutdriverinsertComponent } from './outdriverinsert.component';

describe('OutdriverinsertComponent', () => {
  let component: OutdriverinsertComponent;
  let fixture: ComponentFixture<OutdriverinsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutdriverinsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutdriverinsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
