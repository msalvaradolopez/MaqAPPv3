import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusMantenimientoComponent } from './bus-mantenimiento.component';

describe('BusMantenimientoComponent', () => {
  let component: BusMantenimientoComponent;
  let fixture: ComponentFixture<BusMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusMantenimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
