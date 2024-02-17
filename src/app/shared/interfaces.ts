export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FirebaseAuthResponse {
  kind: string;
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  expiresIn: string;
}

export interface Post {
  id?: string | undefined;
  title?: string | undefined;
  text?: string | undefined;
  author?: string | undefined;
  date?: Date | string;
  name?: string | undefined;
}

export interface FbCreateResponse {
  name: string;
}
