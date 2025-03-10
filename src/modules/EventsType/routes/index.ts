import { IMES_LOGIN_SESSION } from "../../../views/Login/routes/types";
import { IBaseObject, IPagination } from "./types";

const baseURL = window.apis.core;
const url = '/api/v1/'

export function _GET({ PageSize, PageNumber }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}${url}production-loss-type/paged`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}


export function _POST(body: any) {
  return {
    method: "post",
    url: `${window.apis.core}${url}production-loss-type`,
    data: {...body}
  };
}

export function _PUT(body:any) {
  return {
    method: "put",
    url: `${window.apis.core}${url}production-loss-type`,
    data: {...body}
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}${url}production-loss-type/range`,
    data: ids,
  };
}
