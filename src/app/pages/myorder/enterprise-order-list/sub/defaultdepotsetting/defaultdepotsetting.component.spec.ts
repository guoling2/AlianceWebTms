import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultdepotsettingComponent } from './defaultdepotsetting.component';

describe('DefaultdepotsettingComponent', () => {
  let component: DefaultdepotsettingComponent;
  let fixture: ComponentFixture<DefaultdepotsettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultdepotsettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultdepotsettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
