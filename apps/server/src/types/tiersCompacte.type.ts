export type CreateTiersCompacte = {
  nom: string;
  adresse: string;
  typeTiers: string;
  contactNom: string;
  tel: string;
  mail: string;
  expedtion?: number;
  facture?: number;
};

export type UpdateTiersCompacte = {
  idTiersCompacte: number;
  nom?: string;
  adresse?: string;
  typeTiers?: string;
  contactNom?: string;
  tel?: string;
  mail?: string;
  expedtion?: number;
  facture?: number;
};

export type TiersCompacte = {
  idTiersCompacte: number;
  nom?: string;
  adresse?: string;
  typeTiers?: string;
  contactNom?: string;
  tel?: string;
  mail?: string;
  expedtion?: number;
  facture?: number;
};
