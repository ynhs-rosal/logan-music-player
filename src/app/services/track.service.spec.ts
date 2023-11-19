import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TrackService } from './track.service';
import { TestBed } from '@angular/core/testing';
import { mockPlayingTrack, mockTrack } from '../model/mocks/track.mock';
import { environment } from 'src/environments/environment';

describe('TrackService', () => {
  let service: TrackService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TrackService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  describe('getTrack$', () => {
    it('should return track', (done) => {
      service.getTrack$('ABC123').subscribe((track) => {
        expect(track).toEqual(mockTrack);
        done();
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: `${environment.spotifyUrl}/v1/tracks/ABC123`,
      });

      req.flush(mockTrack);
    });
  });

  describe('startOrResumePlayback$', () => {
    it('should return true', (done) => {
      service
        .startOrResumePlayback$('ABC123', 0)
        .subscribe((isTrackPlaying) => {
          expect(isTrackPlaying).toBeTruthy();
          done();
        });

      const req = httpController.expectOne({
        method: 'PUT',
        url: `${environment.spotifyUrl}/v1/me/player/play?device=${environment.activeDevice}`,
      });

      req.flush(true);
    });
  });

  describe('getPlayingTrack$', () => {
    it('should return playing track', (done) => {
      service.getPlayingTrack$().subscribe((track) => {
        expect(track).toEqual(mockPlayingTrack);
        done();
      });

      const req = httpController.expectOne({
        method: 'GET',
        url: `${environment.spotifyUrl}/v1/me/player/currently-playing`,
      });

      req.flush(mockPlayingTrack);
    });
  });

  describe('pausePlayback$', () => {
    it('should return true', (done) => {
      service.pausePlayback$().subscribe((isTrackPaused) => {
        expect(isTrackPaused).toBeTruthy();
        done();
      });

      const req = httpController.expectOne({
        method: 'PUT',
        url: `${environment.spotifyUrl}/v1/me/player/pause?device=${environment.activeDevice}`,
      });

      req.flush(true);
    });
  });
});
