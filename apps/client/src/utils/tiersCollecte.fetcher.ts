import {
  CreateTierCollecte,
  UpdateTierCollecte,
} from "../types/tiersCollecte.types";
import { axiosInstance as axios } from "./api";

export async function getTierCollectes() {
  const res = await axios({
    method: "GET",
    url: "/tierCollectes",
  });
  return res.data;
}

export async function getTierCollecteById(id: string) {
  const res = await axios({
    method: "GET",
    url: `/tierCollectes/${id}`,
  });
  return res.data;
}

export async function createTierCollecte(data: CreateTierCollecte) {
  const res = await axios({
    method: "POST",
    url: "/tierCollectes",
    data: data,
  });
  return res.data;
}

export async function updateTierCollecte(data: UpdateTierCollecte) {
  const { idTierCollecte, ...rest } = data;
  const res = await axios({
    method: "PUT",
    url: `/tierCollectes/${idTierCollecte}`,
    data: rest,
  });
  return res.data;
}

export async function deleteTierCollecte(id: number) {
  const res = await axios({
    method: "DELETE",
    url: `/tierCollectes/${id}`,
  });
  return res.data;
}
