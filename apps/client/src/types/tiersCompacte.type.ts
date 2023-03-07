export type CreateTiersCompacte = {
  nom: string;
  adresse: string;
  typeTiers: string;
  contactNom: string;
  tel: string;
  mail: string;
};

export type UpdateTiersCompacte = {
  nom?: string;
  adresse?: string;
  typeTiers?: string;
  contactNom?: string;
  tel?: string;
  mail?: string;
};
