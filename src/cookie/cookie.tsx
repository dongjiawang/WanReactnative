export interface Cookie {
  domain: string;
  path: string;
  expiresAt: number;
  name: string;
  value: string;
  httpOnly: boolean;
  persistent: boolean;
}
