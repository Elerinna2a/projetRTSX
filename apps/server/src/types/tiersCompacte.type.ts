import { Expedition, Facture } from "@prisma/client";

export type CreateTiersCompacte = {
  nom: string;
  adresse: string;
  typeTiers: string;
  contactNom: string;
  tel: string;
  mail: string;
  facture?: Facture;
};

export type UpdateTiersCompacte = {
  idTiersCompacte: number;
  nom?: string;
  adresse?: string;
  typeTiers?: string;
  contactNom?: string;
  tel?: string;
  mail?: string;
  facture?: Facture;
};

export type TiersCompacte = {
  idTiersCompacte: number;
  nom?: string;
  adresse?: string;
  typeTiers?: string;
  contactNom?: string;
  tel?: string;
  mail?: string;
  facture?: Facture;
  expedition?: Expedition;
};
