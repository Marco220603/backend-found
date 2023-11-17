import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPlaylistinuserComponent } from './buscar-playlistinuser.component';

describe('BuscarPlaylistinuserComponent', () => {
  let component: BuscarPlaylistinuserComponent;
  let fixture: ComponentFixture<BuscarPlaylistinuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarPlaylistinuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarPlaylistinuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
