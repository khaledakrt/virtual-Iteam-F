import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVmsComponent } from './my-vms.component';

describe('MyVmsComponent', () => {
  let component: MyVmsComponent;
  let fixture: ComponentFixture<MyVmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyVmsComponent]
    });
    fixture = TestBed.createComponent(MyVmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
