import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConUbicacionesComponent } from './con-ubicaciones.component';

describe('ConUbicacionesComponent', () => {
  let component: ConUbicacionesComponent;
  let fixture: ComponentFixture<ConUbicacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConUbicacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConUbicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
