import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Error } from 'src/app/model/error.model';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'logan-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements OnInit {
  authorizationError$: Observable<Error>;

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.authorizationError$ =
      this.authorizationService.getAuthorizationError$();
  }

  authenticate(): void {
    this.router.navigateByUrl('/');
  }
}
