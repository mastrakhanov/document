import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginPageComponent } from './login-page/login-page.component';
import { DocumentComponent } from './document/document.component';

import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '', component: AppComponent, children: [
              { path: 'login', component: LoginPageComponent },
              { path: 'document', component: DocumentComponent }
            ]
          }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain router-outlet', () => {
    element = fixture.nativeElement;
    expect(element.innerHTML).toContain('router-outlet');
  });
});
