import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatEquiposDetComponent } from './cat-equipos-det.component';

describe('CatEquiposDetComponent', () => {
  let component: CatEquiposDetComponent;
  let fixture: ComponentFixture<CatEquiposDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatEquiposDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatEquiposDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
