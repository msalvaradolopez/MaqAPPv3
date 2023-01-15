import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatEquiposComponent } from './cat-equipos.component';

describe('CatEquiposComponent', () => {
  let component: CatEquiposComponent;
  let fixture: ComponentFixture<CatEquiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatEquiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
