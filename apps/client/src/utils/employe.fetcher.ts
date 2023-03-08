import { CreateEmploye, UpdateEmploye } from "../types/employe.types";
import { axiosInstance as axios } from "./api";

export async function getEmployes() {
  const res = await axios({
    method: "GET",
    url: "/employes",
  });
  return res.data;
}

export async function getEmployeById(id: string) {
  const res = await axios({
    method: "GET",
    url: `/employes/${id}`,
  });
  return res.data;
}

export async function createEmploye(data: CreateEmploye) {
  const res = await axios({
    method: "POST",
    url: "/employes",
    data: data,
  });
  return res.data;
}

export async function updateEmploye(data: UpdateEmploye) {
  const { id, ...rest } = data;
  const res = await axios({
    method: "PUT",
    url: `/employes/${id}`,
    data: rest,
  });
  return res.data;
}

export async function deleteEmploye(id: number) {
  const res = await axios({
    method: "DELETE",
    url: `/employes/${id}`,
  });
  return res.data;
}
