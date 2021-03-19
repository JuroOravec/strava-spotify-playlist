import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
// @ts-ignore
import type { ResponseRoot } from '@yujinakayama/apple-music/dist/serverTypes/responseRoot';
// @ts-ignore
import type { Album } from '@yujinakayama/apple-music/dist/serverTypes/Album';
// @ts-ignore
import type { Station } from '@yujinakayama/apple-music/dist/serverTypes/Station';
// @ts-ignore
import type { Song } from '@yujinakayama/apple-music/dist/serverTypes/Song';
// @ts-ignore
import type { Playlist } from '@yujinakayama/apple-music/dist/serverTypes/Playlist';
import type { AppleMusicApiOptions } from '../types';

interface HistoryResponse extends ResponseRoot {
  data: (Album | Station | Song)[];
}

interface PlaylistCreationRequestAttributes {
  name: string;
  description?: string;
}
interface PlaylistTrackRelationship {
  /** Track ID */
  id: string;
  /** Track type */
  type: 'songs' | 'music-videos' | 'library-songs' | 'library-music-videos';
}
interface PlaylistCreationRequestRelationships {
  tracks: {
    data: PlaylistTrackRelationship[];
  };
}
interface PlaylistCreationRequest {
  attributes: PlaylistCreationRequestAttributes;
  relationships?: PlaylistCreationRequestRelationships;
}
interface PlaylistCreationResponse extends Pick<ResponseRoot, 'data'> {
  data: [Playlist];
}

interface AddTracksToPlaylistRequest {
  data: PlaylistTrackRelationship[];
}

/** Matches ".../me/..." or "me/..." or "me" */
const personalizedEndpointRegex = /(\/|^)me(\/|$)/;
const isEndpointPersonalized = (request: RequestOptions): boolean => {
  return Boolean(request.path.match(personalizedEndpointRegex));
};

/**
 * API for AppleMusic REST API endpoints that are not covered by @yujinakayama/apple-music.
 *
 * This DataSource is used instead of @yujinakayama/apple-music, bc @yujinakayama/apple-music
 * offers only non-personalized endpoints.
 *
 * But @yujinakayama/apple-music is still super useful for the typing.
 */
class AppleMusicApi extends RESTDataSource<AppleMusicApiOptions> {
  baseURL = 'https://api.music.apple.com/v1/';

  willSendRequest(request: RequestOptions): void {
    request.headers.set(
      'Authorization',
      `Bearer ${this.context.developerToken}`
    );
    if (isEndpointPersonalized(request)) {
      request.params.set('Music-User-Token', this.context.musicUserToken ?? '');
    }
  }

  async getRecentPlayed(
    options: { limit?: number; offset?: number } = {}
  ): Promise<HistoryResponse> {
    return this.get('me/recent/played', options);
  }

  async createPlaylist(
    input: PlaylistCreationRequest
  ): Promise<PlaylistCreationResponse> {
    return this.post('me/library/playlists', input);
  }

  async addTracksToPlaylist(input: {
    playlistId: string;
    tracks: PlaylistTrackRelationship[];
  }): Promise<void> {
    const { playlistId, tracks } = input;
    const data: AddTracksToPlaylistRequest = {
      data: tracks,
    };
    return this.post(`me/library/playlists/${playlistId}/tracks`, data);
  }
}

export default AppleMusicApi;
