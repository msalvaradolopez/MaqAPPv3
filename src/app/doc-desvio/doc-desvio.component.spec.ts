import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDesvioComponent } from './doc-desvio.component';

describe('DocDesvioComponent', () => {
  let component: DocDesvioComponent;
  let fixture: ComponentFixture<DocDesvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocDesvioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocDesvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
