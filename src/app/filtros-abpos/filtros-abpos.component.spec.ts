import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosAbposComponent } from './filtros-abpos.component';

describe('FiltrosAbposComponent', () => {
  let component: FiltrosAbposComponent;
  let fixture: ComponentFixture<FiltrosAbposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosAbposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosAbposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
