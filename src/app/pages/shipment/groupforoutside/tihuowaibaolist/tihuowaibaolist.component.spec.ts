import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TihuowaibaolistComponent } from './tihuowaibaolist.component';

describe('TihuowaibaolistComponent', () => {
  let component: TihuowaibaolistComponent;
  let fixture: ComponentFixture<TihuowaibaolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TihuowaibaolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TihuowaibaolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
