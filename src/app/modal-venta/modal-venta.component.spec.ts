import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVentaComponent } from './modal-venta.component';

describe('ModalVentaComponent', () => {
  let component: ModalVentaComponent;
  let fixture: ComponentFixture<ModalVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
