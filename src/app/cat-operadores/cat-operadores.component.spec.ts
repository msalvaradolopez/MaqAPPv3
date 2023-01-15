import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatOperadoresComponent } from './cat-operadores.component';

describe('CatOperadoresComponent', () => {
  let component: CatOperadoresComponent;
  let fixture: ComponentFixture<CatOperadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatOperadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatOperadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
