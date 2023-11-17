import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPlaylistinuserComponent } from './listar-playlistinuser.component';

describe('ListarPlaylistinuserComponent', () => {
  let component: ListarPlaylistinuserComponent;
  let fixture: ComponentFixture<ListarPlaylistinuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPlaylistinuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPlaylistinuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
