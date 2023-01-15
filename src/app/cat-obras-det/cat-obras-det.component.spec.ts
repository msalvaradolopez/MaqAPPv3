import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatObrasDetComponent } from './cat-obras-det.component';

describe('CatObrasDetComponent', () => {
  let component: CatObrasDetComponent;
  let fixture: ComponentFixture<CatObrasDetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatObrasDetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatObrasDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
