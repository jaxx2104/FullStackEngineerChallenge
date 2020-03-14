import axios from "axios"

import { app } from "../constants"

export const request = axios.create({
  baseURL: app.API_BASE_URL,
  timeout: app.API_TIMEOUT,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  }
})

request.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.common["x-access-token"] = token
  }
  return config
})
