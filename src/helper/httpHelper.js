import axios from "axios";

export const httpAxios = axios.create({
  withCredentials: true,
});