import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatObrasComponent } from './cat-obras.component';

describe('CatObrasComponent', () => {
  let component: CatObrasComponent;
  let fixture: ComponentFixture<CatObrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatObrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
