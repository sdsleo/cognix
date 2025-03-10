import { IMES_LOGIN_SESSION } from "../../../../views/Login/routes/types";
import { IBaseObject } from "./types";

const baseURL = window.apis.core;
// const CNX_MES_LOGIN_SESSION: string | null = window.localStorage.getItem(
//   "@CNX_MES_LOGIN_SESSION"
// );
// const { token, userModel }: IMES_LOGIN_SESSION =
//   CNX_MES_LOGIN_SESSION && JSON.parse(CNX_MES_LOGIN_SESSION);

export function _GET() {
  return {
    url: baseURL + `/api/v1/shift/paged`,
    params: {
      PageSize:1000,
      PageNumber:1,
    },
    options: {
      method: "GET",
      // headers: {
      //   "Access-Control-Allow-Origin": "*"
      // },
    },
  };
}

export function _POST(body: any) {
  return {
    url: baseURL + `/api/v1/shift`,
    method: "post",
    data: {...body}
  };
}

export function _PUT(body: any) {
  return {
    url: baseURL + `/api/v1/shift`,
    method: "put",
    data: {...body}
  };
}

export function _DELETE(ids: any) {
  return {
    url: baseURL + `/api/v1/shift/range`,
    options: {
      method: "DELETE",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        // "Access-Control-Allow-Origin": "*"
        // Authorization: "Bearer " + token,
      },
      body: JSON.stringify(ids),
    },
  };
}


export function _GET_ONE(id:string) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/shift-config`,
    params: {
      IdShift:id
    },
  };
}