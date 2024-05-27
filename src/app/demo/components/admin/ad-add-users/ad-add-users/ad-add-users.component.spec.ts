// ad-add-users.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdAddUsersComponent } from './ad-add-users.component';

describe('AdAddUsersComponent', () => {
  let component: AdAddUsersComponent;
  let fixture: ComponentFixture<AdAddUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdAddUsersComponent]
    });
    fixture = TestBed.createComponent(AdAddUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
