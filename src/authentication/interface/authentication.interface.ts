export interface EntryptedAccessTokens {
  encryptedAccessToken: string;
  encryptedRefreshToken?: string;
}

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  provider?: string;
  providerId?: string;
}
