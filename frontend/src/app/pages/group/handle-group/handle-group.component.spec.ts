import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleGroupComponent } from './handle-group.component';

describe('HandleGroupComponent', () => {
  let component: HandleGroupComponent;
  let fixture: ComponentFixture<HandleGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandleGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
