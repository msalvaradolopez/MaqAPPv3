import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocInsPecDetComponent } from './doc-ins-pec-det.component';

describe('DocInsPecDetComponent', () => {
  let component: DocInsPecDetComponent;
  let fixture: ComponentFixture<DocInsPecDetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocInsPecDetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocInsPecDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
