import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterQuestionnaireComponent } from './consulter-questionnaire.component';

describe('ConsulterQuestionnaireComponent', () => {
  let component: ConsulterQuestionnaireComponent;
  let fixture: ComponentFixture<ConsulterQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterQuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
