import axios from "axios";

const AXIOS = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export default AXIOS;
