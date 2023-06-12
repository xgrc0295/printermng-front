import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultComponent } from './fault.component';

describe('FaultComponent', () => {
  let component: FaultComponent;
  let fixture: ComponentFixture<FaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
