import axios from 'axios';
import { axiosInstance } from '../../../http/axiosInstance';
import { IMES_LOGIN } from "./types";

const baseURL = window.apis.core;

export function MES_LOGIN(body: IMES_LOGIN) {
  return {
    url: baseURL + "/api/Production/User/Login",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}


export function login(payload: IMES_LOGIN) {
  return axios.post(`${window.apis.user}/api/v1/authentication`, payload)
}