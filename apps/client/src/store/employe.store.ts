import { map } from "nanostores";

export type Employe = {
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

export const employe = map<Employe>({});

export function setemploye(employeInfo: Employe) {
  employe.set(employeInfo);
}

export function removeemploye() {
  employe.set({});
}
