import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdTeachersComponent } from './ad-teachers.component';

describe('AdTeachersComponent', () => {
  let component: AdTeachersComponent;
  let fixture: ComponentFixture<AdTeachersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdTeachersComponent]
    });
    fixture = TestBed.createComponent(AdTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
