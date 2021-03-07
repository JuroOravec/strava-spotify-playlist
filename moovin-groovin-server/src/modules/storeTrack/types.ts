/** Track data */
export interface UserTrackModel {
  /** User Id */
  internalUserId: string;
  /** ID of service that provides playlist / tracks */
  playlistProviderId: string;
  /** Track Id */
  trackId: string;
  /** Timestamp (ms) when the track started */
  startTime: number;
}

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
  ) => Promise<(UserTrackModel | null)[]>;
  getByRanges: (
    input: UserTrackRangesInput[]
  ) => Promise<(UserTrackModel[] | null)[]>;
  deleteOlderThan: (timestamp: number) => Promise<UserTrackModel[] | null>;
}
