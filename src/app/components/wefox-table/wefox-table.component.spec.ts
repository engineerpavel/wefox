import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WefoxTableComponent } from './wefox-table.component';

describe('WefoxTableComponent', () => {
  let component: WefoxTableComponent;
  let fixture: ComponentFixture<WefoxTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WefoxTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WefoxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
