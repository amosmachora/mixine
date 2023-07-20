import { Method } from "axios";

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

export type RefreshTokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
};

export interface User {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
  followers: Followers;
  country: string;
  product: string;
  explicit_content: ExplicitContent;
  email: string;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface FetchOptions {
  url: string;
  method: Method;
  headers: object | null;
  fetchOnMount: boolean | undefined;
  body: object | null;
  saveAble: boolean;
}
