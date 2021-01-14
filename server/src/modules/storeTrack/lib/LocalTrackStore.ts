import unixTimestamp from '../../../utils/unixTimestamp';
import type {
  TrackStore,
  UserTrackModel,
  UserTrackInput,
  UserTrackMeta,
  UserTrackRangesInput,
} from '../types';

class LocalTrackStore implements TrackStore {
  private store = new Map<string, UserTrackModel>();

  async install(): Promise<void> {}

  async upsert(userTrackData: UserTrackInput[]): Promise<UserTrackMeta[]> {
    return userTrackData.map(
      (userTrack): UserTrackMeta => {
        const { internalUserId, startTime, spotifyTrackUri } = userTrack;
        const key = this.trackKey(userTrack);
        this.store.set(key, { ...userTrack });
        return { internalUserId, startTime, spotifyTrackUri };
      }
    );
  }

  async getByRanges(
    input: UserTrackRangesInput[]
  ): Promise<(UserTrackModel[] | null)[]> {
    return input.map(
      ({ internalUserId, after = 0, before = unixTimestamp() }) => {
        const tracks = Array.from(this.store.values()).filter(
          (userTrack) =>
            userTrack.internalUserId === internalUserId &&
            userTrack.startTime < before &&
            userTrack.startTime > after
        );
        return tracks.length ? tracks : null;
      }
    );
  }

  async deleteOlderThan(timestamp: number): Promise<UserTrackMeta[]> {
    return Array.from(this.store.entries()).reduce(
      (
        deletedUserTracks,
        [key, { spotifyTrackUri, startTime, internalUserId }]
      ) => {
        if (startTime < timestamp) {
          this.store.delete(key);
          deletedUserTracks.push({
            internalUserId,
            spotifyTrackUri,
            startTime,
          });
        }
        return deletedUserTracks;
      },
      [] as UserTrackMeta[]
    );
  }

  async close(): Promise<void> {
    this.store.clear();
  }

  trackKey(userTrack: UserTrackMeta): string {
    return `${userTrack.internalUserId}__${userTrack.spotifyTrackUri}__${userTrack.startTime}`;
  }
}

export default LocalTrackStore;
