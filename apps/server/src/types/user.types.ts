export type CreateUser = {
  nom: string;
  prenom: string;
  tel: string;
  adress: string;
  role: "ADMIN" | "CLIENT" | "DRIVER" | "OPERATOR";
  email: string;
  password: string;
};

export type UpdateUser = {
  nom: string;
  prenom: string;
  tel: string;
  adress: string;
  role: "ADMIN" | "CLIENT" | "DRIVER" | "OPERATOR";
  email: string;
  password: string;
};


