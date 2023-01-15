import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmBitSegComponent } from './frm-bit-seg.component';

describe('FrmBitSegComponent', () => {
  let component: FrmBitSegComponent;
  let fixture: ComponentFixture<FrmBitSegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrmBitSegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrmBitSegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
