import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../model/track.model';
import { environment } from 'src/environments/environment';
import { PlayingTrack } from '../model/playing-track.model';

@Injectable({ providedIn: 'root' })
export class TrackService {
  constructor(private http: HttpClient) {}

  getTrack$(id: string): Observable<Track> {
    const url = `${environment.spotifyUrl}/v1/tracks/${id}`;
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${sessionStorage.getItem('access_token')}`
      ),
    };
    return this.http.get<Track>(url, options);
  }

  startOrResumePlayback$(
    trackUri: string,
    positionMs: number
  ): Observable<boolean> {
    const url = `${environment.spotifyUrl}/v1/me/player/play?device=${environment.activeDevice}`;
    const body = {
      uris: [trackUri],
      position_ms: positionMs,
    };

    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${sessionStorage.getItem('access_token')}`
      ),
    };
    return this.http.put<boolean>(url, body, options);
  }

  getPlayingTrack$(): Observable<PlayingTrack> {
    const url = `${environment.spotifyUrl}/v1/me/player/currently-playing`;

    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${sessionStorage.getItem('access_token')}`
      ),
    };
    return this.http.get<PlayingTrack>(url, options);
  }

  pausePlayback$(): Observable<boolean> {
    const url = `${environment.spotifyUrl}/v1/me/player/pause?device=${environment.activeDevice}`;
    let options = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${sessionStorage.getItem('access_token')}`
      ),
    };
    return this.http.put<boolean>(url, {}, options);
  }
}
