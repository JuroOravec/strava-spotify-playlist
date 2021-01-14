/** Track data */
export interface UserTrackModel {
  /** User Id */
  internalUserId: string;
  /** Spotify Track Id */
  spotifyTrackId: string;
  /** Spotify Track Uri */
  spotifyTrackUri: string;
  /** Timestamp (ms) when the track started */
  startTime: number;
}

export type UserTrackMeta = Pick<
  UserTrackModel,
  'spotifyTrackUri' | 'internalUserId' | 'startTime'
>;
export type UserTrackInput = UserTrackModel;

export interface UserTrackRangesInput {
  internalUserId: string;
  after?: number;
  before?: number;
}

export interface TrackStore {
  install: () => Promise<void>;
  close: () => Promise<void>;
  upsert: (
    userTrackData: UserTrackModel[]
  ) => Promise<(UserTrackMeta | null)[]>;
  getByRanges: (
    input: UserTrackRangesInput[]
  ) => Promise<(UserTrackModel[] | null)[]>;
  deleteOlderThan: (timestamp: number) => Promise<UserTrackMeta[] | null>;
}
