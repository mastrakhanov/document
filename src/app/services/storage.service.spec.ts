import { TestBed } from '@angular/core/testing';

import { mockLocalStorage } from 'src/testing/mock-local-storage';

import { StorageService } from './storage.service';


describe('StorageService', () => {
  let storageService: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: StorageService, useFactory: () => new StorageService(mockLocalStorage) }]
    });
    storageService = TestBed.inject(StorageService);
  });

  it('should create', () => {
    expect(storageService).toBeTruthy();
  });

  it('get() should return values from localStorage', () => {
    mockLocalStorage.setItem('authenticate', JSON.stringify(true));
    const result = storageService.get('authenticate');
    expect(result).toBeTrue();
  });

  it('set() should add values into localStorage', () => {
    storageService.set('authenticate', false);
    const result = JSON.parse(mockLocalStorage.getItem('authenticate'));
    expect(result).toBeFalse();
  });
});
