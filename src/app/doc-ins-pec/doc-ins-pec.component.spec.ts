import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocInsPecComponent } from './doc-ins-pec.component';

describe('DocInsPecComponent', () => {
  let component: DocInsPecComponent;
  let fixture: ComponentFixture<DocInsPecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocInsPecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocInsPecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
