import { Remorque, TypeVehicule } from "@prisma/client";

export type CreateTournee = {
  dateTournee: string;
  typeVehicule: TypeVehicule;
  chauffeurId: number;
  remorque: Remorque;
};

export type UpdateTournee = {
  idTournee: number;
  dateTournee?: string;
  typeVehicule?: TypeVehicule;
  remorque?: Remorque;
  chauffeurId?: number;
};

export type Tournee = {
  idTournee?: number;
  dateTournee?: string;
  typeVehicule?: TypeVehicule;
  remorque?: Remorque;
  chauffeurId?: number;
};
