import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocBitSegDetEquipoComponent } from './doc-bit-seg-det-equipo.component';

describe('DocBitSegDetEquipoComponent', () => {
  let component: DocBitSegDetEquipoComponent;
  let fixture: ComponentFixture<DocBitSegDetEquipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocBitSegDetEquipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocBitSegDetEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
