import { map } from "nanostores";

export type User = {
  id?: number;
  nom?: string;
  prenom?: string;
  tel?: string;
  adress?: string;
  role?: string;
  email?: string;
  password?: string;
  createdAt?: string;
};

export const user = map<User>({});

export function setUser(userInfo: User) {
  user.set(userInfo);
}

export function removeUser() {
  user.set({});
}
