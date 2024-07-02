import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdGroupsComponent } from './ad-groups.component';

describe('AdGroupsComponent', () => {
  let component: AdGroupsComponent;
  let fixture: ComponentFixture<AdGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdGroupsComponent]
    });
    fixture = TestBed.createComponent(AdGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
