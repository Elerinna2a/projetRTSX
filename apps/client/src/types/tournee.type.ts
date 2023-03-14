import { Employe, Remorque, TypeVehicule } from "@prisma/client";

export type CreateTournee = {
  dateTournee: string;
  typeVehicule: TypeVehicule;
  chauffeurId: Employe;
  remorque: Remorque;
};

export type UpdateTournee = {
  idTournee: number;
  dateTournee?: string;
  typeVehicule?: TypeVehicule;
  remorque?: Remorque;
  chauffeurId?: Employe;
};

export type Tournee = {
  idTournee?: number;
  dateTournee?: string;
  typeVehicule?: TypeVehicule;
  remorque?: Remorque;
  chauffeurId?: Employe;
};
