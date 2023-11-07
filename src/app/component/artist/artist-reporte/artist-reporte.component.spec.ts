import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistReporteComponent } from './artist-reporte.component';

describe('ArtistReporteComponent', () => {
  let component: ArtistReporteComponent;
  let fixture: ComponentFixture<ArtistReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistReporteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
