import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosInsPecComponent } from './filtros-ins-pec.component';

describe('FiltrosInsPecComponent', () => {
  let component: FiltrosInsPecComponent;
  let fixture: ComponentFixture<FiltrosInsPecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosInsPecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosInsPecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
