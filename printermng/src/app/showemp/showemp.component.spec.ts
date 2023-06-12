import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowempComponent } from './showemp.component';

describe('ShowempComponent', () => {
  let component: ShowempComponent;
  let fixture: ComponentFixture<ShowempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
