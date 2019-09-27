import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutdriverlistComponent } from './outdriverlist.component';

describe('OutdriverlistComponent', () => {
  let component: OutdriverlistComponent;
  let fixture: ComponentFixture<OutdriverlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutdriverlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutdriverlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
