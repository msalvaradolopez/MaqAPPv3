import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatOperadoresDetComponent } from './cat-operadores-det.component';

describe('CatOperadoresDetComponent', () => {
  let component: CatOperadoresDetComponent;
  let fixture: ComponentFixture<CatOperadoresDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatOperadoresDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatOperadoresDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
