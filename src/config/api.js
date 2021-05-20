import axios from "axios";

// create base url
export const API_BASE = axios.create({
  baseURL: "https://swapi.dev/api",
});
