import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConTableroComponent } from './con-tablero.component';

describe('ConTableroComponent', () => {
  let component: ConTableroComponent;
  let fixture: ComponentFixture<ConTableroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConTableroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConTableroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
