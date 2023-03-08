import { CreateTournee, UpdateTournee } from "../types/tournee.type";
import { axiosInstance as axios } from "./api";

export async function getTournee() {
  const res = await axios({
    method: "GET",
    url: "/tournee",
  });
  return res.data;
}

export async function getTourneeById(id: string) {
  const res = await axios({
    method: "GET",
    url: `/tournee/${id}`,
  });
  return res.data;
}

export async function CreateTournee(data: CreateTournee) {
  const res = await axios({
    method: "POST",
    url: "/tournee",
    data: data,
  });
  return res.data;
}

export async function updateTournee(data: UpdateTournee) {
  const { idTournee, ...rest } = data;
  const res = await axios({
    method: "PUT",
    url: `/tournee/${idTournee}`,
    data: rest,
  });
  return res.data;
}

export async function deleteTournee(id: number) {
  const res = await axios({
    method: "DELETE",
    url: `/tournee/${id}`,
  });
  return res.data;
}
