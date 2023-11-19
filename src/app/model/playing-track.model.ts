import { Track } from './track.model';

export interface PlayingTrack {
  progress_ms: number;
  item: Track;
}
