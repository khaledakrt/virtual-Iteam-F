import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdVmsComponent } from './ad-vms.component';

describe('AdVmsComponent', () => {
  let component: AdVmsComponent;
  let fixture: ComponentFixture<AdVmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdVmsComponent]
    });
    fixture = TestBed.createComponent(AdVmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
