/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AutodocService } from './autodoc.service';

describe('Service: Autodoc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutodocService]
    });
  });

  it('should ...', inject([AutodocService], (service: AutodocService) => {
    expect(service).toBeTruthy();
  }));
});
