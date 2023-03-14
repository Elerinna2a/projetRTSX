import { Remorque, TypeVehicule } from "@prisma/client";

export type CreateTournee = {
  dateTournee: Date;
  typeVehicule: TypeVehicule;
  remorque: Remorque;
};

export type UpdateTournee = {
  idTournee: number;
  dateTournee?: Date;
  typeVehicule?: TypeVehicule;
  remorque?: Remorque;
};

export type Tournee = {
  idTournee?: number;
  dateTournee?: Date;
  typeVehicule?: TypeVehicule;
  remorque?: Remorque;
};
