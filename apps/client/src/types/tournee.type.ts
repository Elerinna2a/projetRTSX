import { Remorque, TypeVehicule } from "@prisma/client";

export type CreateTournee = {
  dateTournee: string;
  typeVehicule: TypeVehicule;
  remorque: Remorque;
  chauffeurId?: number;
  tierCollecteId?: number;
};

export type UpdateTournee = {
  idTournee: number;
  dateTournee?: string;
  typeVehicule?: TypeVehicule;
  remorque?: Remorque;
  chauffeurId?: number;
  tierCollecteId?: number;
};

export type Tournee = {
  idTournee: number;
  dateTournee: string;
  typeVehicule: TypeVehicule;
  remorque: Remorque;
  chauffeurId?: number;
  tierCollecteId?: number;
};
