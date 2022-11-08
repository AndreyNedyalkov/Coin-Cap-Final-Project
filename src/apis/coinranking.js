import axios from "axios";
import { API_KEY } from "../secrets";
const BASE_URL = "https://api.coinranking.com/v2/";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-access-token": API_KEY,
  },
});
