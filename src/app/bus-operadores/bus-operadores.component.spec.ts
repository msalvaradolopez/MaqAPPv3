import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusOperadoresComponent } from './bus-operadores.component';

describe('BusOperadoresComponent', () => {
  let component: BusOperadoresComponent;
  let fixture: ComponentFixture<BusOperadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusOperadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusOperadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
