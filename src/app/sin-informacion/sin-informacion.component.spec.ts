import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinInformacionComponent } from './sin-informacion.component';

describe('SinInformacionComponent', () => {
  let component: SinInformacionComponent;
  let fixture: ComponentFixture<SinInformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinInformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
