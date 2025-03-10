import { IMES_LOGIN_SESSION } from "../../../views/Login/routes/types";
import { IBaseObject, IPagination } from "./types";

const baseURL = window.apis.core;
const url = '/api/v1/'
// const CNX_MES_LOGIN_SESSION: string | null = window.localStorage.getItem(
//   "@CNX_MES_LOGIN_SESSION"
// );
// const { token, userModel }: IMES_LOGIN_SESSION =
//   CNX_MES_LOGIN_SESSION && JSON.parse(CNX_MES_LOGIN_SESSION);

export function _GET({ PageSize, PageNumber }: IPagination) {
  return {
    // url: `${window.apis.core}${url}production-loss-record`,
    url: `${window.apis.core}${url}production-loss-record/paged`,
    params: {
      PageSize,
      PageNumber,
    },
    options: {
      method: "GET",
      // headers: {
      //   "Access-Control-Allow-Origin": "*"
      // },
    },
  };
}

export function _GET_ENUMS() {
  return {
    url: `${window.apis.core}${url}production-loss-record/enumerators`,    
    options: {
      method: "GET",
      // headers: {
      //   "Access-Control-Allow-Origin": "*"
      // },
    },
  };
}

export function _GET_USERS() {
  return {
    url: `${window.apis.user}/api/v1/user`,    
    options: {
      method: "GET",
      // headers: {
      //   "Access-Control-Allow-Origin": "*"
      // },
    },
  };
}

export function _GET_BY_FILTERS({ PageSize, PageNumber, Filters }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}${url}production-loss-record/paged${Filters}`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _POST(body: IBaseObject) {
  return {
    url: baseURL + `/api/v1/area`,
    options: {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        // "Access-Control-Allow-Origin": "*"
        // Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function _PUT(body: IBaseObject) {
  return {
    url: baseURL + `/api/v1/area`,
    options: {
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        // "Access-Control-Allow-Origin": "*"
        // Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    },
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}${url}production-loss-record/range`,
    data: ids,
  };
}
