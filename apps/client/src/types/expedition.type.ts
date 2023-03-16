export type CreateExpedition = {
  dateExpedition: string;
  destinataire: string;
  nbPalette: number;
  poidNetTotal: number;
};

export type UpdateExpedition = {
  idNumBl: number;
  dateExpedition?: string;
  destinataire?: string;
  nbPalette?: number;
  poidNetTotal?: number;
};

export type Expedition = {
  idNumBl: number;
  dateExpedition: string;
  destinataire: string;
  nbPalette: number;
  poidNetTotal: number;
};
