import { CreateTraitement, UpdateTraitement } from "../types/traitement.type";
import { axiosInstance as axios } from "./api";

export async function getTraitements() {
  const res = await axios({
    method: "GET",
    url: "/traitements",
  });
  return res.data;
}

export async function getTraitementById(id: string) {
  const res = await axios({
    method: "GET",
    url: `/traitements/${id}`,
  });
  return res.data;
}

export async function createTraitement(data: CreateTraitement) {
  const res = await axios({
    method: "POST",
    url: "/traitements",
    data: data,
  });
  return res.data;
}

export async function updateTraitement(data: UpdateTraitement) {
  const { idTraitement, ...rest } = data;
  const res = await axios({
    method: "PUT",
    url: `/traitements/${idTraitement}`,
    data: rest,
  });
  return res.data;
}

export async function deleteTraitement(id: number) {
  const res = await axios({
    method: "DELETE",
    url: `/traitements/${id}`,
  });
  return res.data;
}
