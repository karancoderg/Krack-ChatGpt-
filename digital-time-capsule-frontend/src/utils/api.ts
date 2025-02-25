import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const registerUser = (userData: object) => API.post("/users/register", userData);
export const loginUser = (userData: object) => API.post("/users/login", userData);
export const getCapsules = (token: string) =>
  API.get("/capsules", { headers: { Authorization: `Bearer ${token}` } });
