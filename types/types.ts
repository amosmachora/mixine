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
