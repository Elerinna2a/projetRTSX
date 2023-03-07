export type CreateEmploye = {
  nom: string;
  prenom: string;
  adresse: string;
  tel: string;
  role: "ADMIN" | "CLIENT" | "DRIVER" | "OPERATOR";
  email: string;
  password: string;
};

export type UpdateEmploye = {
  nom?: string;
  prenom?: string;
  tel?: string;
  adresse?: string;
  role?: "ADMIN" | "CLIENT" | "DRIVER" | "OPERATOR";
  email?: string;
  password?: string;
};
