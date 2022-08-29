import { TestBed } from '@angular/core/testing';

import { ProductGroupResolverService } from './product-group-resolver.service';

describe('ProductGroupResolverService', () => {
  let service: ProductGroupResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductGroupResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
