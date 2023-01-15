import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocBitSegComponent } from './doc-bit-seg.component';

describe('DocBitSegComponent', () => {
  let component: DocBitSegComponent;
  let fixture: ComponentFixture<DocBitSegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocBitSegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocBitSegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
