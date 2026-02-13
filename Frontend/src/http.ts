import axios from "axios";
import { Config } from "./Config";

export const http = axios.create({
  baseURL: Config.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    
  },
});
