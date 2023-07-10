export type SpotifyAccessTokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
};

export type SpotifyAuthorizationCodeResponse = {
  code: string;
  grant_type: string;
  redirect_uri: string;
};
