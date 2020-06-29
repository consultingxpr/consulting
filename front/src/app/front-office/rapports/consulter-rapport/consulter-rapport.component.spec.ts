import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterRapportComponent } from './consulter-rapport.component';

describe('ConsulterRapportComponent', () => {
  let component: ConsulterRapportComponent;
  let fixture: ComponentFixture<ConsulterRapportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterRapportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
