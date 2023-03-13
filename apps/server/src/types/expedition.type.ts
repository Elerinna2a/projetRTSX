export type CreateExpedition = {
  nbPalette: number;
  destinataire: string;
  poidNetTotal: GLfloat;
  tiersCompacteId: number;
  traitementId: number;
  factureId?: number;
};

export type UpdateExpedition = {
  idNumBl: number;
  dateExpedition?: Date;
  destinataire?: string;
  nbPalette?: number;
  poidNetTotal?: number;
  tiersCompacteId?: number;
  traitementId?: number;
  factureId?: number;
};

export type Expedition = {
  idNumBl: number;
  dateExpedition?: Date;
  destinataire?: string;
  nbPalette?: number;
  poidNetTotal?: number;
  tiersCompacteId?: number;
  traitementId?: number;
  factureId?: number;
};
