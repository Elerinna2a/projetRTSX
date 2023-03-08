import { CreateCollecte, UpdateCollecte } from "../types/collecte.type";
import { axiosInstance as axios } from "./api";

export async function getCollectes() {
  const res = await axios({
    method: "GET",
    url: "/collectes",
  });
  return res.data;
}

export async function getCollecteById(id: string) {
  const res = await axios({
    method: "GET",
    url: `/collectes/${id}`,
  });
  return res.data;
}

export async function createCollecte(data: CreateCollecte) {
  const res = await axios({
    method: "POST",
    url: "/collectes",
    data: data,
  });
  return res.data;
}

export async function updateCollecte(data: UpdateCollecte) {
  const { idNumLot, ...rest } = data;
  const res = await axios({
    method: "PUT",
    url: `/collectes/${idNumLot}`,
    data: rest,
  });
  return res.data;
}

export async function deleteCollecte(id: number) {
  const res = await axios({
    method: "DELETE",
    url: `/collectes/${id}`,
  });
  return res.data;
}
