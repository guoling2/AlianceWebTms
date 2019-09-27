import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendwaibaolistComponent } from './sendwaibaolist.component';

describe('SendwaibaolistComponent', () => {
  let component: SendwaibaolistComponent;
  let fixture: ComponentFixture<SendwaibaolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendwaibaolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendwaibaolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
