
export type CreateTournee = {
  dateTournee: string;
  typeVehicule: string;
  remorque: string;
  chauffeurId: number;
};

export type UpdateTournee = {
  idTournee: number;
  dateTournee?: string;
  typeVehicule?: string;
  remorque?: string;
  chauffeurId?: number;
};

export type Tournee = {
  idTournee: number;
  dateTournee?: string;
  typeVehicule?: string;
  remorque?: string;
  chauffeurId?: number;
};
