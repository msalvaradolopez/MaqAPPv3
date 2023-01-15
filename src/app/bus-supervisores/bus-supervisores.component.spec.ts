import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSupervisoresComponent } from './bus-supervisores.component';

describe('BusSupervisoresComponent', () => {
  let component: BusSupervisoresComponent;
  let fixture: ComponentFixture<BusSupervisoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusSupervisoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusSupervisoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
