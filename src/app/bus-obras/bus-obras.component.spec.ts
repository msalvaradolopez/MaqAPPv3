import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusObrasComponent } from './bus-obras.component';

describe('BusObrasComponent', () => {
  let component: BusObrasComponent;
  let fixture: ComponentFixture<BusObrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusObrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusObrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
