import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAbposdetComponent } from './doc-abposdet.component';

describe('DocAbposdetComponent', () => {
  let component: DocAbposdetComponent;
  let fixture: ComponentFixture<DocAbposdetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocAbposdetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocAbposdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
