import { API_BASE_URL } from "@src/settings/constants";
import axios, { AxiosInstance } from "axios";

export const createApi = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
  });

  return instance;
};
