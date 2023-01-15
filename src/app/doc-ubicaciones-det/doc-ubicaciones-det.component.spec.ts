import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocUbicacionesDetComponent } from './doc-ubicaciones-det.component';

describe('DocUbicacionesDetComponent', () => {
  let component: DocUbicacionesDetComponent;
  let fixture: ComponentFixture<DocUbicacionesDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocUbicacionesDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocUbicacionesDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
