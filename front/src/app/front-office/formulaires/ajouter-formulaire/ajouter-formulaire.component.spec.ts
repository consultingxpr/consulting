import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterFormulaireComponent } from './ajouter-formulaire.component';

describe('AjouterFormulaireComponent', () => {
  let component: AjouterFormulaireComponent;
  let fixture: ComponentFixture<AjouterFormulaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterFormulaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
