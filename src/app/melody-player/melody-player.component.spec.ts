import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MelodyPlayerComponent } from './melody-player.component';

describe('MelodyPlayerComponent', () => {
  let component: MelodyPlayerComponent;
  let fixture: ComponentFixture<MelodyPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MelodyPlayerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MelodyPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
