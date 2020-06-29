import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterDocumentComponent } from './consulter-document.component';

describe('ConsulterDocumentComponent', () => {
  let component: ConsulterDocumentComponent;
  let fixture: ComponentFixture<ConsulterDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
