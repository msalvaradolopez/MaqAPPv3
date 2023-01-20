import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConInsPecComponent } from './con-ins-pec.component';

describe('ConInsPecComponent', () => {
  let component: ConInsPecComponent;
  let fixture: ComponentFixture<ConInsPecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConInsPecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConInsPecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
