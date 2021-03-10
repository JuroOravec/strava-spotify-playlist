import unixTimestamp from '../../../utils/unixTimestamp';
import type {
  TrackStore,
  UserTrackModel,
  UserTrackRangesInput,
  PlaylistTrackInputByPlaylist,
  PlaylistTrackModel,
  TrackModel,
  TrackInput,
} from '../types';

const playlistTrackKey = (track: PlaylistTrackModel): string =>
  `${track.playlistProviderId}__${track.playlistId}__${track.trackId}__${track.startTime}`;
const trackKey = (track: TrackModel): string =>
  `${track.playlistProviderId}__${track.trackId}`;
const userTrackKey = (track: UserTrackModel): string =>
  `${track.internalUserId}__${track.playlistProviderId}__${track.trackId}__${track.startTime}`;

class LocalTrackStore implements TrackStore {
  private playlistTrackStore = new Map<string, PlaylistTrackModel>();
  private trackStore = new Map<string, TrackModel>();
  private userTrackStore = new Map<string, UserTrackModel>();

  async install(): Promise<void> {}

  async close(): Promise<void> {
    this.playlistTrackStore.clear();
    this.trackStore.clear();
    this.userTrackStore.clear();
  }

  async deleteUserTracksOlderThan(
    timestamp: number
  ): Promise<UserTrackModel[]> {
    return Array.from(this.userTrackStore.entries()).reduce(
      (
        deletedUserTracks,
        [key, { playlistProviderId, trackId, startTime, internalUserId }]
      ) => {
        if (startTime < timestamp) {
          this.userTrackStore.delete(key);
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

  async getPlaylistTracksByPlaylists(
    input: PlaylistTrackInputByPlaylist[]
  ): Promise<(PlaylistTrackModel[] | null)[]> {
    return input.map(({ playlistProviderId, playlistId }) => {
      const tracks = Array.from(this.playlistTrackStore.values()).filter(
        (track) =>
          track.playlistProviderId === playlistProviderId &&
          track.playlistId === playlistId
      );
      return tracks.length ? tracks : null;
    });
  }

  async getTracks(input: TrackInput[]): Promise<(TrackModel[] | null)[]> {
    return input.map(({ playlistProviderId, trackId }) => {
      const tracks = Array.from(this.trackStore.values()).filter(
        (track) =>
          track.playlistProviderId === playlistProviderId &&
          track.trackId === trackId
      );
      return tracks.length ? tracks : null;
    });
  }

  async getUserTracksByRanges(
    input: UserTrackRangesInput[]
  ): Promise<(UserTrackModel[] | null)[]> {
    return input.map(
      ({ internalUserId, after = 0, before = unixTimestamp() }) => {
        const tracks = Array.from(this.userTrackStore.values()).filter(
          (userTrack) =>
            userTrack.internalUserId === internalUserId &&
            userTrack.startTime < before &&
            userTrack.startTime > after
        );
        return tracks.length ? tracks : null;
      }
    );
  }

  async upsertPlaylistTracks(
    playlistTrackData: PlaylistTrackModel[]
  ): Promise<PlaylistTrackModel[]> {
    return playlistTrackData.map(
      (track): PlaylistTrackModel => {
        const { playlistProviderId, playlistId, trackId, startTime } = track;
        const key = playlistTrackKey(track);
        this.playlistTrackStore.set(key, { ...track });
        return { playlistProviderId, playlistId, trackId, startTime };
      }
    );
  }

  async upsertTracks(trackData: TrackModel[]): Promise<TrackModel[]> {
    return trackData.map(
      (track): TrackModel => {
        const { playlistProviderId, trackId } = track;
        const key = trackKey(track);
        this.trackStore.set(key, { ...track });
        return { playlistProviderId, trackId };
      }
    );
  }

  async upsertUserTracks(
    userTrackData: UserTrackModel[]
  ): Promise<UserTrackModel[]> {
    return userTrackData.map(
      (userTrack): UserTrackModel => {
        const {
          internalUserId,
          playlistProviderId,
          trackId,
          startTime,
        } = userTrack;
        const key = userTrackKey(userTrack);
        this.userTrackStore.set(key, { ...userTrack });
        return { internalUserId, startTime, playlistProviderId, trackId };
      }
    );
  }
}

export default LocalTrackStore;
