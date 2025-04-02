export type Credentials = {
  username: string;
  passphrase: string;
};

export type User = {
  name: string;
  surname: string;
  credentials: Credentials;
  active: boolean;
  created: string;
  _comment?: string;
};

export type LoginRequestBody = {
  username: string;
  password: string;
};
