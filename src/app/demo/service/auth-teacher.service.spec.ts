import { TestBed } from '@angular/core/testing';

import { AuthTeacherService } from './auth-teacher.service';

describe('AuthTeacherService', () => {
  let service: AuthTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
