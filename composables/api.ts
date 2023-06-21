import axios from "axios";

export const useApi = (token?: string) => axios.create({
  baseURL: "/api/v1",
  headers: { Authorization: process.client ? `Bearer ${token ? token : useUserStore().$state.token ?? ""}` : "" }
});