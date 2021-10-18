import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { documentStub } from 'src/testing/document-stub';
import { responseStub } from 'src/testing/response-stub';
import { MockAuthService } from 'src/testing/mock-auth.service';
import { MockDocumentService } from 'src/testing/mock-document.service';

import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { AppComponent } from '../app.component';
import { DocumentService } from '../services/document.service';

import { DocumentComponent } from './document.component';


describe('DocumentComponent', () => {
  let fixture: ComponentFixture<DocumentComponent>;
  let component: DocumentComponent;
  let authService: AuthService;
  let storageService: StorageService;
  let router: Router;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          {
            path: '', component: AppComponent, children: [
              { path: 'login', component: DocumentComponent },
              { path: 'document', component: DocumentComponent }
            ]
          }
        ])
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: DocumentService, useClass: MockDocumentService },
        StorageService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentComponent);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService);
    component = fixture.componentInstance;

    component.documentForm.setValue({ resolution: 'Согласен', comment: 'Комментарий' });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain documentStub title', () => {
    element = fixture.nativeElement.querySelector('h5');
    expect(element.textContent).toContain(documentStub.title);
  });

  it('should contain documentStub text1', () => {
    element = fixture.nativeElement.querySelector('p');
    expect(element.textContent).toContain(documentStub.text1);
  });

  it('should contain documentStub text2', () => {
    element = fixture.nativeElement.querySelectorAll('p')[1];
    expect(element.textContent).toContain(documentStub.text2);
  });

  it('should contain "Утверждение документа"', () => {
    element = fixture.nativeElement.querySelectorAll('h5')[1];
    expect(element.textContent).toContain('Утверждение документа');
  });

  it('should contain "Резолюция"', () => {
    element = fixture.nativeElement.querySelector('label');
    expect(element.textContent).toContain('Резолюция');
  });

  it('should contain "Комментарий"', () => {
    element = fixture.nativeElement.querySelectorAll('label')[1];
    expect(element.textContent).toContain('Комментарий');
  });

  it('should contain "Утвердить"', () => {
    element = fixture.nativeElement.querySelector('button');
    expect(element.textContent).toContain('Утвердить');
  });

  it('should contain "Отклонить"', () => {
    element = fixture.nativeElement.querySelectorAll('button')[1];
    expect(element.textContent).toContain('Отклонить');
  });

  it('should contain "Выйти"', () => {
    element = fixture.nativeElement.querySelectorAll('button')[2];
    expect(element.textContent).toContain('Выйти');
  });

  it('should call submit()', () => {
    spyOn(component, 'approve');
    element = fixture.nativeElement.querySelector('button');
    element.click();
    expect(component.approve).toHaveBeenCalledTimes(1);
  });

  it('should call submit()', () => {
    component.documentForm.setValue({ resolution: 'Не согласен', comment: 'Комментарий' });
    fixture.detectChanges();
    spyOn(component, 'approve');
    element = fixture.nativeElement.querySelectorAll('button')[1];
    element.click();
    expect(component.approve).toHaveBeenCalledTimes(1);
  });

  it('should call exit()', () => {
    spyOn(component, 'exit');
    element = fixture.nativeElement.querySelectorAll('button')[2];
    element.click();
    expect(component.exit).toHaveBeenCalledTimes(1);
  });

  it('documentForm should contain resolution and comment controls', () => {
    expect(component.documentForm.contains('resolution')).toBeTrue();
    expect(component.documentForm.contains('comment')).toBeTrue();
  });

  it('documentInfo should to be documentStub', () => {
    component.ngOnInit();
    expect(component.documentInfo).toEqual(documentStub);
  });

  it('approve() should return approveResult and isVisible should be false', () => {
    component.approve();

    const approveResult = {
      status: responseStub.status,
      message: responseStub.message,
      resolution: 'Согласен',
      comment: 'Комментарий'
    };

    expect(component.approveResult).toEqual(approveResult);
    expect(component.isVisible).toBeFalse();
  });

  it('resDetection() should change isReject', () => {
    component.documentForm.setValue({ resolution: 'Не согласен', comment: 'Комментарий' });
    fixture.detectChanges();
    component.resDetection();

    expect(component.isReject).toBeTrue();
    expect(component.isApprove).toBeFalse();
  });

  it('resDetection() should change isApprove', () => {
    component.resDetection();

    expect(component.isReject).toBeFalse();
    expect(component.isApprove).toBeTrue();
  });

  it('exit() should call authService logout() and link to /', (done) => {
    spyOn(authService, 'logout');

    fixture.ngZone.run(() => {
      component.exit();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(router.url).toBe('/');
        done();
      });
    });

    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
