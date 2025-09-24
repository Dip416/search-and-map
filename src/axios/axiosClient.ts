import axios from "axios";

const AXIOS = axios.create({
  baseURL: "https://api.savitarrealty.com/api/v1",
  headers: { "Content-Type": "application/json" },
});

export default AXIOS;
