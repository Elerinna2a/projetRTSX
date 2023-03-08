import { Remorque, TypeVehicule } from "@prisma/client";

export type CreateTournee = {
  chauffeurId: number;
  dateTournee: string;
  typeVehicule: TypeVehicule;
  remorque: Remorque;
};

export type UpdateTournee = {
  idTournee?: number;
  chauffeurId?: number;
  dateTournee?: string;
  typeVehicule?: TypeVehicule;
  remorque?: Remorque;
};
