import { TestBed } from '@angular/core/testing';
import { NgNumberInputFormatDirective } from './ng-number-input-format.directive';


describe('NgNumberInputFormatService', () => {
  let service: NgNumberInputFormatDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgNumberInputFormatDirective);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
