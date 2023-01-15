import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConBitSegComponent } from './con-bit-seg.component';

describe('ConBitSegComponent', () => {
  let component: ConBitSegComponent;
  let fixture: ComponentFixture<ConBitSegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConBitSegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConBitSegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
