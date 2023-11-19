import { Component, OnInit } from '@angular/core';
import { mergeMap, take } from 'rxjs';
import { Track } from 'src/app/model/track.model';
import { TrackService } from 'src/app/services/track.service';

@Component({
  selector: 'logan-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements OnInit {
  trackId = '3rUGC1vUpkDG9CZFHMur1t';
  track: Track;
  cover: string;
  durationMs: number = 0;
  progressMs: number = 0;
  isTrackPlaying = false;
  progressTracker;
  constructor(private trackService: TrackService) {}

  ngOnInit(): void {
    this.trackService
      .getTrack$(this.trackId)
      .pipe(take(1))
      .subscribe((track) => {
        this.track = track;
        this.cover = (track?.album?.images || []).find(
          (image) => image.height === 640
        )?.url;
        this.durationMs = track?.duration_ms;
      });
  }

  startOrResumePlayback(): void {
    this.trackService
      .getPlayingTrack$()
      .pipe(
        take(1),
        mergeMap((playingTrack) => {
          const positionMs =
            playingTrack?.item?.uri === this.track.uri &&
            playingTrack?.progress_ms !== this.track.duration_ms
              ? playingTrack?.progress_ms
              : 0;
          this.progressMs = positionMs;
          return this.trackService
            .startOrResumePlayback$(this.track.uri, positionMs)
            .pipe(take(1));
        })
      )
      .subscribe(() => {
        this.isTrackPlaying = true;
        this.updateProgress();
      });
  }

  pausePlayback(): void {
    this.trackService
      .pausePlayback$()
      .pipe(take(1))
      .subscribe(() => {
        this.isTrackPlaying = false;
        clearInterval(this.progressTracker);
      });
  }

  private updateProgress(): void {
    this.progressTracker = setInterval(() => {
      this.progressMs += 1000;
      if (this.progressMs >= this.durationMs) {
        this.progressMs = 0;
        this.isTrackPlaying = false;
        clearInterval(this.progressTracker);
      }
    }, 1000);
  }
}
