import { CreateExpedition, UpdateExpedition } from "../types/expedition.type";
import { axiosInstance as axios } from "./api";

export async function getExpeditions() {
  const res = await axios({
    method: "GET",
    url: "/expeditions",
  });
  return res.data;
}

export async function getExpeditionById(id: string) {
  const res = await axios({
    method: "GET",
    url: `/expeditions/${id}`,
  });
  return res.data;
}

export async function createExpedition(data: CreateExpedition) {
  const res = await axios({
    method: "POST",
    url: "/expeditions",
    data: data,
  });
  return res.data;
}

export async function updateExpedition(data: UpdateExpedition) {
  const { idNumBl, ...rest } = data;
  const res = await axios({
    method: "PUT",
    url: `/expeditions/${idNumBl}`,
    data: rest,
  });
  return res.data;
}

export async function deleteExpedition(id: number) {
  const res = await axios({
    method: "DELETE",
    url: `/expeditions/${id}`,
  });
  return res.data;
}
