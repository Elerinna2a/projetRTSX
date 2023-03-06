import { Score } from "@prisma/client";

export type CreateClient = {
  nom: string;
  adresse: string;
  type_tiers: string;
  score_facilite_acces: Score;
  contact_nom: string;
  contact_email: string;
  contact_num: string;
};

export type UpdateClient = {
  nom: string;
  adresse: string;
  type_tiers: string;
  score_facilite_acces: Score;
  contact_nom: string;
  contact_email: string;
  contact_num: string;
};
