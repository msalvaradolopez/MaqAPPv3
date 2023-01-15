import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusHorasMinutosComponent } from './bus-horas-minutos.component';

describe('BusHorasMinutosComponent', () => {
  let component: BusHorasMinutosComponent;
  let fixture: ComponentFixture<BusHorasMinutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusHorasMinutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusHorasMinutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
