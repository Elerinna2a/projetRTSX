import { Expedition, Facture } from "@prisma/client";

export type CreateTiersCompacte = {
  nom: string;
  adresse: string;
  typeTiers: string;
  contactNom: string;
  tel: string;
  mail: string;
  expeditions?: {
    create: Expedition[];
  };
  factures?: {
    create: Facture[];
  };
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
  expeditions?: Expedition[];
  factures?: Facture[];
};
