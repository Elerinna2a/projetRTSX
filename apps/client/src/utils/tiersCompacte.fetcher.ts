import {
  CreateTiersCompacte,
  UpdateTiersCompacte,
} from "../types/tiersCompacte.type";
import { axiosInstance as axios } from "./api";

export async function getTierCompactes() {
  const res = await axios({
    method: "GET",
    url: "/tierCompactes",
  });
  return res.data;
}

export async function getTierCompacteById(id: string) {
  const res = await axios({
    method: "GET",
    url: `/tierCompactes/${id}`,
  });
  return res.data;
}

export async function createTierCompacte(data: CreateTiersCompacte) {
  const res = await axios({
    method: "POST",
    url: "/tierCompactes",
    data: data,
  });
  return res.data;
}

export async function updateTierCompacte(data: UpdateTiersCompacte) {
  const { idTiersCompacte, ...rest } = data;
  const res = await axios({
    method: "PUT",
    url: `/tierCompactes/${idTiersCompacte}`,
    data: rest,
  });
  return res.data;
}

export async function deleteTierCompacte(id: number) {
  const res = await axios({
    method: "DELETE",
    url: `/tierCompactes/${id}`,
  });
  return res.data;
}
