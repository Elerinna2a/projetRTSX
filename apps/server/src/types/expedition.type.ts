import { TiersCompacte } from "@prisma/client";

export type CreateExpedition = {
  dateExpedition: string;
  destinataire: string;
  nbPalette: number;
  poidNetTotal: number;
  tiersCompacteId?: number;
};

export type UpdateExpedition = {
  idNumBl: number;
  dateExpedition?: string;
  destinataire?: string;
  nbPalette?: number;
  poidNetTotal?: number;
  tiersCompacteId?: number;
};

export type Expedition = {
  idNumBl: number;
  dateExpedition: string;
  destinataire: string;
  nbPalette: number;
  poidNetTotal: number;
  traitementId: number[];
  tiersCompacte?: TiersCompacte;
};
