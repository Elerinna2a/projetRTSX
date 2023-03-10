export type CreateTiersCompacte = {
  nom: string;
  adresse: string;
  typeTiers: string;
  contactNom: string;
  tel: string;
  mail: string;
};

export type UpdateTiersCompacte = {
  idTiersCompacte: number;
  nom?: string;
  adresse?: string;
  typeTiers?: string;
  contactNom?: string;
  tel?: string;
  mail?: string;
};

export type TiersCompacte = {
  idTiersCompacte: number;
  nom?: string;
  adresse?: string;
  typeTiers?: string;
  contactNom?: string;
  tel?: string;
  mail?: string;
};
