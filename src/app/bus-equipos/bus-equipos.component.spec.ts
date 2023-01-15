import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusEquiposComponent } from './bus-equipos.component';

describe('BusEquiposComponent', () => {
  let component: BusEquiposComponent;
  let fixture: ComponentFixture<BusEquiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusEquiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
