import { apiPaths } from "@src/settings/api-paths";
import axios, { AxiosResponse } from "axios";

export const api = {
  checkToken: () => axios.get(apiPaths.checkToken).then(getData),
  signIn: (params: {
    login: string;
    password: string;
  }) => axios.post(apiPaths.signIn, params).then(getData),
  signOut: () => axios.get(apiPaths.signOut).then(getData),
};

const getData = <T = any>(response: AxiosResponse<T>) => response.data;
