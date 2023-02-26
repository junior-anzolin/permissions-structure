import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlePermissionsComponent } from './handle-permissions.component';

describe('HandlePermissionsComponent', () => {
  let component: HandlePermissionsComponent;
  let fixture: ComponentFixture<HandlePermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandlePermissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandlePermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
