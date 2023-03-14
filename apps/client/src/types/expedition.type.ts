export type CreateExpedition = {
  nbPalette: number;
  dateExpedition: string;
  destinataire: string;
  poidNetTotal: GLfloat;
  tiersCompacteId: number;
  traitementId: number;
  factureId?: number;
};

export type UpdateExpedition = {
  idNumBl: number;
  dateExpedition?: string;
  destinataire?: string;
  nbPalette?: number;
  poidNetTotal?: number;
  tiersCompacteId?: number;
  traitementId?: number;
  factureId?: number;
};

export type Expedition = {
  idNumBl: number;
  dateExpedition?: string;
  destinataire?: string;
  nbPalette?: number;
  poidNetTotal?: number;
  tiersCompacteId?: number;
  traitementId?: number;
  factureId?: number;
};
