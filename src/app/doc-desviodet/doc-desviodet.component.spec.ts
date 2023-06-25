import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocDesviodetComponent } from './doc-desviodet.component';

describe('DocDesviodetComponent', () => {
  let component: DocDesviodetComponent;
  let fixture: ComponentFixture<DocDesviodetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocDesviodetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocDesviodetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
