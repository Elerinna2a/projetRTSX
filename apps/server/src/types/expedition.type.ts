export type CreateExpedition = {
  dateExpedition: string;
  destinataire: string;
  nbPalette: number;
  poidNetTotal: number;
  tiersCompacteId: number;
};

export type UpdateExpedition = {
  dateExpedition?: string;
  destinataire?: string;
  nbPalette?: number;
  poidNetTotal?: number;
  tiersCompacteId?: number;
};
