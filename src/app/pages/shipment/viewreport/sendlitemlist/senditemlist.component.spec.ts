import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenditemlistComponent } from './senditemlist.component';

describe('SenditemlistComponent', () => {
  let component: SenditemlistComponent;
  let fixture: ComponentFixture<SenditemlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenditemlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenditemlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
