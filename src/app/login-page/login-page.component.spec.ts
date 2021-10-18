import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { MockAuthService } from 'src/testing/mock-auth.service';

import { IUser } from '../interface';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { DocumentComponent } from '../document/document.component';

import { LoginPageComponent } from './login-page.component';


describe('LoginPageComponent', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let component: LoginPageComponent;
  let authService: AuthService;
  let router: Router;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: '', component: AppComponent, children: [
              { path: 'login', component: LoginPageComponent },
              { path: 'document', component: DocumentComponent }
            ]
          }
        ])
      ],
      providers: [{ provide: AuthService, useClass: MockAuthService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;

    component.form.setValue({ name: 'name', password: 'password' });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain form', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('form');
  });

  it('should contain "Вход в систему"', () => {
    element = fixture.nativeElement.querySelector('h4');
    expect(element.textContent).toContain('Вход в систему');
  });

  it('should contain "Логин"', () => {
    element = fixture.nativeElement.querySelector('label');
    expect(element.textContent).toContain('Логин');
  });

  it('should contain "Пароль"', () => {
    element = fixture.nativeElement.querySelectorAll('label')[1];
    expect(element.textContent).toContain('Пароль');
  });

  it('should contain "Войти"', () => {
    element = fixture.nativeElement.querySelector('button');
    expect(element.textContent).toContain('Войти');
  });

  it('should call submit()', () => {
    spyOn(component, 'submit');
    element = fixture.nativeElement.querySelector('button');
    element.click();
    expect(component.submit).toHaveBeenCalledTimes(1);
  });

  it('form should contain name and password controls', () => {
    expect(component.form.contains('name')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
  });

  it('should link to /document', (done) => {
    fixture.ngZone.run(() => {
      component.ngOnInit();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(router.url).toBe('/document');
        done();
      });
    });
  });

  it('should call authService login(), reset form and link to /document', (done) => {
    spyOn(authService, 'login');

    fixture.ngZone.run(() => {
      component.submit();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(router.url).toBe('/document');
        done();
      });
    });

    const user: IUser = {
      name: 'name',
      password: 'password'
    };

    expect(authService.login).toHaveBeenCalledWith(user);
    expect(component.form.value).toEqual({ name: null, password: null });
  });
});
