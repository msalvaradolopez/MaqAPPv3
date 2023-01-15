import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocUbicacionesComponent } from './doc-ubicaciones.component';

describe('DocUbicacionesComponent', () => {
  let component: DocUbicacionesComponent;
  let fixture: ComponentFixture<DocUbicacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocUbicacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocUbicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
