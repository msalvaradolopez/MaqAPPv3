import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConAbposComponent } from './con-abpos.component';

describe('ConAbposComponent', () => {
  let component: ConAbposComponent;
  let fixture: ComponentFixture<ConAbposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConAbposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConAbposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
