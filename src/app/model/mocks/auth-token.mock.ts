import { AuthToken } from '../auth-token.model';

export const mockAuthToken: AuthToken = {
  access_token: 'ABC123',
  token_type: 'Bearer',
  expires_in: 3600,
  refresh_token: 'DEF456',
};
