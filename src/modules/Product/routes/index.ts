import { IMES_LOGIN_SESSION } from "../../../views/Login/routes/types";
import { IAreaObject } from "./types";

const baseURL = window.apis.core;
// const CNX_MES_LOGIN_SESSION: string | null = window.localStorage.getItem(
//   "@CNX_MES_LOGIN_SESSION"
// );
// const { token, userModel }: IMES_LOGIN_SESSION =
//   CNX_MES_LOGIN_SESSION && JSON.parse(CNX_MES_LOGIN_SESSION);

export function _GET() {
  return {
    url: baseURL + `/api/v1/product/paged`,
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
    url: baseURL + `/api/v1/product`,
    method: "post",
    data: {...body}
  };
}

export function _PUT(body: any) {
  return {
    url: baseURL + `/api/v1/product`,
    method: "put",
    data: {...body}
  };
}



export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}/api/v1/product/range`,
    data: ids,
  };
}
