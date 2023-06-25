import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConDesvioComponent } from './con-desvio.component';

describe('ConDesvioComponent', () => {
  let component: ConDesvioComponent;
  let fixture: ComponentFixture<ConDesvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConDesvioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConDesvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
