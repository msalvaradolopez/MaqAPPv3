import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocBitSegDetComponent } from './doc-bit-seg-det.component';

describe('DocBitSegDetComponent', () => {
  let component: DocBitSegDetComponent;
  let fixture: ComponentFixture<DocBitSegDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocBitSegDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocBitSegDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
