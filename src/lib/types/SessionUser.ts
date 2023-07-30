export interface SessionUser {
  id: string;
  displayName: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
}

export interface NewUser {
  username: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}
