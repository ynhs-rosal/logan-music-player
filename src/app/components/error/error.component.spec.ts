import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

class MockRouter {
  navigateByUrl = () => {};
}

class MockAuthorizationService {
  getAuthorizationError$ = () => of(undefined);
}

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      providers: [
        { provide: Router, useClass: MockRouter },
        { provide: AuthorizationService, useClass: MockAuthorizationService },
      ],
    });
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call navigateByUrl', () => {
    spyOn(router, 'navigateByUrl');
    component.authenticate();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
