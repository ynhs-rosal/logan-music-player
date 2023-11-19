import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'logan-authorization',
  template: '',
})
export class AuthorizationComponent implements OnInit {
  ngOnInit(): void {
    let url = 'https://accounts.spotify.com/authorize';
    url = `${url}?response_type=code&client_id=${environment.clientId}&scope=${environment.scope}&redirect_uri=${environment.redirectUrl}`;
    window.location.href = url;
  }
}
