import { IMES_LOGIN_SESSION } from "../../../views/Login/routes/types";
import { IPagination, IRoutesObject } from "./types";

const baseURL = window.apis.core;
// const CNX_MES_LOGIN_SESSION: string | null = window.localStorage.getItem(
//   "@CNX_MES_LOGIN_SESSION"
// );
// const { token, userModel }: IMES_LOGIN_SESSION =
//   CNX_MES_LOGIN_SESSION && JSON.parse(CNX_MES_LOGIN_SESSION);

export function _GET({ PageSize, PageNumber }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-base-client/paged`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _GET_ENUMERATOS() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-base-client/enumerators`,
  };
}

export function _POST({ distanceToClient, scheduleTime, estimatedFuelConsumption, baseId, clientId, isActived }: IRoutesObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/custom-base-client`,
    data: {
      distanceToClient, 
      scheduleTime, 
      estimatedFuelConsumption, 
      baseId, 
      clientId, 
      isActived
    },
  };
}

export function _PUT({ id, distanceToClient, scheduleTime, estimatedFuelConsumption, baseId, clientId, isActived }: IRoutesObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/custom-base-client`,
    data: {
      id,
      distanceToClient, 
      scheduleTime, 
      estimatedFuelConsumption, 
      baseId, 
      clientId, 
      isActived
    },
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}/api/v1/custom-base-client/range`,
    data: ids,
  };
}
