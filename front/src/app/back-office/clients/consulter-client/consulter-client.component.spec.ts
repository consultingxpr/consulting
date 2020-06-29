import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterClientComponent } from './consulter-client.component';

describe('ConsulterClientComponent', () => {
  let component: ConsulterClientComponent;
  let fixture: ComponentFixture<ConsulterClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
