import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseOrderDetailComponent } from './enterprise-order-detail.component';

describe('EnterpriseOrderDetailComponent', () => {
  let component: EnterpriseOrderDetailComponent;
  let fixture: ComponentFixture<EnterpriseOrderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseOrderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
