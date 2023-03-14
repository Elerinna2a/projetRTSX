import { Role } from "@prisma/client";

export type CreateEmploye = {
  nom: string;
  prenom: string;
  adresse: string;
  tel: string;
  role: Role;
  email: string;
  password: string;
};

export type UpdateEmploye = {
  nom?: string;
  prenom?: string;
  adresse?: string;
  tel?: string;
  role?: Role;
  email?: string;
  password?: string;
};

export type Employe = {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  tel: string;
  role: Role;
  email: string;
  password: string;
  dateCreation: string;
  session?: {
    id: string;
  };
  collecte?: {
    idNumLot: number;
    quantite: number;
    formeCollecte: string;
    dateCollecte: string;
    nomTierCollecte: string;
  }[];
  tournees?: {
    idTournee: number;
    dateTournee: string;
    typeVehicule: string;
    remorque: string;
    chauffeurId?: number;
    chauffeur?: {
      nom: string;
      prenom: string;
    };
  }[];
  traitements?: {
    idTraitement: number;
    dateTraitement: string;
    qualite: string;
    quantiteCorpsEtranger: number;
    scoringBonusMalus: number;
    operateurId?: number;
    operateur?: {
      nom: string;
      prenom: string;
    };
  }[];
};
