import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerToolbarComponent } from './server-toolbar.component';

describe('ServerToolbarComponent', () => {
  let component: ServerToolbarComponent;
  let fixture: ComponentFixture<ServerToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
