import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAbposComponent } from './doc-abpos.component';

describe('DocAbposComponent', () => {
  let component: DocAbposComponent;
  let fixture: ComponentFixture<DocAbposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocAbposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocAbposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
