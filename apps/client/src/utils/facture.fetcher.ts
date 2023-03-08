import { CreateFacture, UpdateFacture } from "../types/facture.type";
import { axiosInstance as axios } from "./api";

export async function getFactures() {
  const res = await axios({
    method: "GET",
    url: "/factures",
  });
  return res.data;
}

export async function getFactureById(id: string) {
  const res = await axios({
    method: "GET",
    url: `/factures/${id}`,
  });
  return res.data;
}

export async function createFacture(data: CreateFacture) {
  const res = await axios({
    method: "POST",
    url: "/factures",
    data: data,
  });
  return res.data;
}

export async function updateFacture(data: UpdateFacture) {
  const { idFacture, ...rest } = data;
  const res = await axios({
    method: "PUT",
    url: `/factures/${idFacture}`,
    data: rest,
  });
  return res.data;
}

export async function deleteFacture(id: number) {
  const res = await axios({
    method: "DELETE",
    url: `/factures/${id}`,
  });
  return res.data;
}
