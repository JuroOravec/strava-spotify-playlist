/** Track data */
export interface TrackModel {
  /** ID of service that provides playlist / tracks */
  playlistProviderId: string;
  /** Track Id */
  trackId: string;
  /** Track title */
  title?: string;
  /** Track album title */
  album?: string;
  /** Track artist name */
  artist?: string;
  /** Track duration (s) */
  duration?: number;
}

export type TrackMeta = Pick<TrackModel, 'playlistProviderId' | 'trackId'>;

export type TrackInput = Pick<TrackModel, 'playlistProviderId' | 'trackId'>;

/** Track played by a user at certain time */
export interface UserTrackModel {
  /** User Id */
  internalUserId: string;
  /** ID of service that provides playlist / tracks */
  playlistProviderId: string;
  /** Track Id */
  trackId: string;
  /** Timestamp (s) when the track started */
  startTime: number;
}

export type UserTrackInput = UserTrackModel;

export interface UserTrackRangesInput {
  internalUserId: string;
  after?: number;
  before?: number;
}

/** Track in a playlist at certain position */
export interface PlaylistTrackModel {
  /** ID of service that provides playlist / tracks */
  playlistProviderId: string;
  /** Playlist Id */
  playlistId: string;
  /** Track Id */
  trackId: string;
  /** Timestamp (ms) when the track started */
  startTime: number;
}

export type PlaylistTrackInput = PlaylistTrackModel;

export type PlaylistTrackInputByPlaylist = Pick<
  PlaylistTrackModel,
  'playlistProviderId' | 'playlistId'
>;

export interface TrackStore {
  install: () => Promise<void>;
  close: () => Promise<void>;

  deleteUserTracksOlderThan: (
    timestamp: number
  ) => Promise<UserTrackModel[] | null>;
  getPlaylistTracksByPlaylists: (
    input: PlaylistTrackInputByPlaylist[]
  ) => Promise<(PlaylistTrackModel[] | null)[]>;
  getTracks: (input: TrackInput[]) => Promise<(TrackModel[] | null)[]>;
  getUserTracksByRanges: (
    input: UserTrackRangesInput[]
  ) => Promise<(UserTrackModel[] | null)[]>;
  upsertPlaylistTracks: (
    playlistTracks: PlaylistTrackModel[]
  ) => Promise<(PlaylistTrackModel | null)[]>;
  upsertTracks: (tracks: TrackModel[]) => Promise<(TrackMeta | null)[]>;
  upsertUserTracks: (
    userTrackData: UserTrackModel[]
  ) => Promise<(UserTrackModel | null)[]>;
}
