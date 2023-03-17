import { Remorque, TypeVehicule } from "@prisma/client";

export type CreateTournee = {
  dateTournee: string;
  typeVehicule: TypeVehicule;
  remorque: Remorque;
  chauffeurId?: number;
  tierCollecteId?: number;
};

export type UpdateTournee = {
  dateTournee?: string;
  typeVehicule?: TypeVehicule;
  remorque?: Remorque;
  chauffeurId?: number | null;
  tierCollecteId?: number | null;
};

export type Tournee = {
  idTournee: number;
  dateTournee: string;
  typeVehicule: TypeVehicule;
  remorque: Remorque;
  chauffeurId?: number;
  tierCollecteId?: number;
};
