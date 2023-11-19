import { PlayingTrack } from '../playing-track.model';
import { Track } from '../track.model';

export const mockTrack: Track = {
  id: '3rUGC1vUpkDG9CZFHMur1t',
  name: 'greedy',
  duration_ms: 131872,
  album: {
    id: '3UOV8XvCwMKaATRNXrYCjN',
    images: [
      {
        height: 640,
        url: 'https://i.scdn.co/image/ab67616d0000b27322fd802bc61db666c7c81aa8',
        width: 640,
      },
      {
        height: 300,
        url: 'https://i.scdn.co/image/ab67616d00001e0222fd802bc61db666c7c81aa8',
        width: 300,
      },
      {
        height: 64,
        url: 'https://i.scdn.co/image/ab67616d0000485122fd802bc61db666c7c81aa8',
        width: 64,
      },
    ],
  },
  artists: [
    {
      id: '45dkTj5sMRSjrmBSBeiHym',
      name: 'Tate McRae',
    },
  ],
  uri: 'spotify:track:3rUGC1vUpkDG9CZFHMur1t',
};

export const mockPlayingTrack: PlayingTrack = {
  progress_ms: 0,
  item: mockTrack,
};
