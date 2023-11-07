import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperComponent } from './temper.component';

describe('TemperComponent', () => {
  let component: TemperComponent;
  let fixture: ComponentFixture<TemperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
