import { TestBed } from '@angular/core/testing';

import { ListStudentService } from './list-student.service';

describe('ListStudentService', () => {
  let service: ListStudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListStudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
