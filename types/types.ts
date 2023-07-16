export type AccessTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
};

export type AuthorizationCodeResponse = {
  code: string;
  state: string;
};

export interface PlaylistPayload {
  href: string;
  items: Playlist[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color: null;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Owner {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Tracks {
  href: string;
  total: number;
}

export interface TracksPayload {
  href: string;
  items: Item[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface Item {
  added_at: Date;
  added_by: AddedBy;
  is_local: boolean;
  primary_color: null;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

export interface AddedBy {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: AddedByType;
  uri: string;
  name?: string;
}

export interface ExternalUrls {
  spotify: string;
}

export enum AddedByType {
  Artist = "artist",
  User = "user",
}

export interface Track {
  album: Album;
  artists: AddedBy[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null | string;
  track: boolean;
  track_number: number;
  type: TrackType;
  uri: string;
}

export interface Album {
  album_type: AlbumTypeEnum;
  artists: AddedBy[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export enum AlbumTypeEnum {
  Album = "album",
  Single = "single",
}

export enum ReleaseDatePrecision {
  Day = "day",
}

export interface ExternalIDS {
  isrc: string;
}

export enum TrackType {
  Track = "track",
}

export interface VideoThumbnail {
  url: null;
}
