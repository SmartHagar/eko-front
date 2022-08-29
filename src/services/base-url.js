/** @format */

import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";
const url_auth = `${BASE_URL}/auth`;
const url_api = `${BASE_URL}/api`;
const url_crud = `${BASE_URL}/crud`;

// export { BASE_URL, url_api, url_auth, url_crud };

export function AuthUser() {
  const auth = axios.create({
    baseURL: url_auth,
  });
  return { auth };
}

export function GetApi() {
  const api = axios.create({
    baseURL: url_api,
  });
  return { api };
}

export function GetCrud() {
  const crud = axios.create({
    baseURL: url_crud,
  });
  return { crud };
}
