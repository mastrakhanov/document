import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';


describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard]
    });
    authGuard = TestBed.inject(AuthGuard);
  });

  it('should create', () => {
    expect(authGuard).toBeTruthy();
  });
});
