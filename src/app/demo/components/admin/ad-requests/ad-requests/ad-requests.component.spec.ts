// ad-add-users.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdRequestsComponent } from './ad-requests.component';

describe('AdRuestsComponent', () => {
  let component: AdRequestsComponent;
  let fixture: ComponentFixture<AdRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdRequestsComponent]
    });
    fixture = TestBed.createComponent(AdRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
