import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosDesvioComponent } from './filtros-desvio.component';

describe('FiltrosDesvioComponent', () => {
  let component: FiltrosDesvioComponent;
  let fixture: ComponentFixture<FiltrosDesvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosDesvioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrosDesvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
