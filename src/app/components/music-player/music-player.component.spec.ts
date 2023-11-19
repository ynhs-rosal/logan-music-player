import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { MusicPlayerComponent } from './music-player.component';
import { TrackService } from 'src/app/services/track.service';
import { of } from 'rxjs';

import { mockTrack, mockPlayingTrack } from '../../model/mocks/track.mock';
import { FormatMilisecondsPipe } from 'src/app/utils/format-miliseconds.pipe';
import { ProgressPercentagePipe } from 'src/app/utils/progress-percentage.pipe';

class MockTrackService {
  getTrack$ = () => of(mockTrack);
  getPlayingTrack$ = () => of(mockPlayingTrack);
  startOrResumePlayback$ = () => of(true);
  pausePlayback$ = () => of(true);
}

describe('MusicPlayerComponent', () => {
  let component: MusicPlayerComponent;
  let fixture: ComponentFixture<MusicPlayerComponent>;
  let trackServie: TrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MusicPlayerComponent,
        FormatMilisecondsPipe,
        ProgressPercentagePipe,
      ],
      providers: [{ provide: TrackService, useClass: MockTrackService }],
    });
    trackServie = TestBed.inject(TrackService);
    fixture = TestBed.createComponent(MusicPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should display the track title and the artist', () => {
      const title = fixture.nativeElement.querySelector(
        '.logan-music-player__track--title'
      );
      const artist = fixture.nativeElement.querySelector(
        '.logan-music-player__track--artist'
      );
      expect(
        `${title.textContent.trim()} by ${artist.textContent.trim()}`
      ).toBe('greedy by Tate McRae');
    });
    it('should display the initial progress and duration of the track', () => {
      const durations = fixture.nativeElement.querySelectorAll(
        '.logan-music-player__track--progress-duration'
      );
      expect(
        `${durations[0].textContent.trim()} - ${durations[1].textContent.trim()}`
      ).toBe('0:00 - 2:11');
    });
    it('should display play button', () => {
      const playButton = fixture.nativeElement.querySelector(
        '.logan-music-player__track--action--play'
      );
      expect(playButton).toBeTruthy();
    });
    it('should display pause button', () => {
      component.isTrackPlaying = true;
      fixture.detectChanges();
      const pauseButton = fixture.nativeElement.querySelector(
        '.logan-music-player__track--action--pause'
      );
      expect(pauseButton).toBeTruthy();
    });
  });

  describe('startOrResumePlayback', () => {
    it('should call startOrResumePlayback$ with 0 position', () => {
      spyOn(trackServie, 'startOrResumePlayback$').and.returnValue(of(true));
      component.startOrResumePlayback();
      clearInterval(component.progressTracker);
      expect(trackServie.startOrResumePlayback$).toHaveBeenCalledWith(
        mockPlayingTrack.item.uri,
        0
      );
    });
    it('should call startOrResumePlayback$ with playing track position', () => {
      spyOn(trackServie, 'getPlayingTrack$').and.returnValue(
        of({ ...mockPlayingTrack, progress_ms: 30435 })
      );
      spyOn(trackServie, 'startOrResumePlayback$').and.returnValue(of(true));
      component.startOrResumePlayback();
      clearInterval(component.progressTracker);
      expect(trackServie.startOrResumePlayback$).toHaveBeenCalledWith(
        mockPlayingTrack.item.uri,
        30435
      );
    });
    it('should call startOrResumePlayback$ with 0 position if not the currently playing track', () => {
      spyOn(trackServie, 'getPlayingTrack$').and.returnValue(
        of({
          item: {
            ...mockPlayingTrack.item,
            uri: 'spotify:track:2Zo1PcszsT9WQ0ANntJbID',
          },
          progress_ms: 30435,
        })
      );
      spyOn(trackServie, 'startOrResumePlayback$').and.returnValue(of(true));
      component.startOrResumePlayback();
      clearInterval(component.progressTracker);
      expect(trackServie.startOrResumePlayback$).toHaveBeenCalledWith(
        mockPlayingTrack.item.uri,
        0
      );
    });
    it('should update progressMs', fakeAsync(() => {
      component.startOrResumePlayback();
      tick(1000);
      clearInterval(component.progressTracker);
      expect(component.progressMs).toBe(1000);
    }));
    it('should reset progressMs if it reaches durationMs', fakeAsync(() => {
      component.durationMs = 2000;
      component.startOrResumePlayback();
      tick(2000);
      expect(component.progressMs).toBe(0);
    }));
  });

  describe('pausePlayback', () => {
    it('should set isTrackPlaying to false', () => {
      component.isTrackPlaying = true;
      component.pausePlayback();
      expect(component.isTrackPlaying).toBeFalsy();
    });
  });
});
