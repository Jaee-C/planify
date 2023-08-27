/** The object that's stored in the user's JWT / Session */
export interface SessionUser {
  id: string;
  email?: string | null;
}

export interface NewUser {
  username: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}
