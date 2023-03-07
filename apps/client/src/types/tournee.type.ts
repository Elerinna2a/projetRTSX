import { Remorque, TypeVehicule } from "@prisma/client";

export type CreateTournee = {
  chauffeur: number;
  dateTournee: string;
  typeVehicule: TypeVehicule;
  remorque: Remorque;
};

export type UpdateTournee = {
  chauffeur?: number;
  dateTournee?: string;
  typeVehicule?: TypeVehicule;
  remorque?: Remorque;
};
