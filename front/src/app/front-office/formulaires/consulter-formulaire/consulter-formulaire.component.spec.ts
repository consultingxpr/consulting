import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterFormulaireComponent } from './consulter-formulaire.component';

describe('ConsulterFormulaireComponent', () => {
  let component: ConsulterFormulaireComponent;
  let fixture: ComponentFixture<ConsulterFormulaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterFormulaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
