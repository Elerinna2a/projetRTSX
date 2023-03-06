import { map } from "nanostores";

export type User = {
  id?: number;
  email?: string;
  password?: string;
  role?: string;
  firstname?: string;
  lastname?: string;
  createdAt?: string;
};

export const user = map<User>({});

export function setUser(userInfo: User) {
  user.set(userInfo);
}

export function removeUser() {
  user.set({});
}
