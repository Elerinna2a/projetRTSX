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
