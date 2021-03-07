import unixTimestamp from '../../../utils/unixTimestamp';
import type {
  TrackStore,
  UserTrackModel,
  UserTrackInput,
  UserTrackRangesInput,
} from '../types';

class LocalTrackStore implements TrackStore {
  private store = new Map<string, UserTrackModel>();

  async install(): Promise<void> {}

  async upsert(userTrackData: UserTrackInput[]): Promise<UserTrackModel[]> {
    return userTrackData.map(
      (userTrack): UserTrackModel => {
        const {
          internalUserId,
          playlistProviderId,
          trackId,
          startTime,
        } = userTrack;
        const key = this.trackKey(userTrack);
        this.store.set(key, { ...userTrack });
        return { internalUserId, startTime, playlistProviderId, trackId };
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

  async deleteOlderThan(timestamp: number): Promise<UserTrackModel[]> {
    return Array.from(this.store.entries()).reduce(
      (
        deletedUserTracks,
        [key, { playlistProviderId, trackId, startTime, internalUserId }]
      ) => {
        if (startTime < timestamp) {
          this.store.delete(key);
          deletedUserTracks.push({
            internalUserId,
            playlistProviderId,
            trackId,
            startTime,
          });
        }
        return deletedUserTracks;
      },
      [] as UserTrackModel[]
    );
  }

  async close(): Promise<void> {
    this.store.clear();
  }

  trackKey(userTrack: UserTrackModel): string {
    return `${userTrack.internalUserId}__${userTrack.playlistProviderId}__${userTrack.trackId}__${userTrack.startTime}`;
  }
}

export default LocalTrackStore;
