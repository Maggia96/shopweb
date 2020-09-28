import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTalleComponent } from './modal-talle.component';

describe('ModalTalleComponent', () => {
  let component: ModalTalleComponent;
  let fixture: ComponentFixture<ModalTalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
