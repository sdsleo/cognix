import { IPagination, IResourceObject } from "./types";

export function _GET_BY_FILTERS({ PageSize, PageNumber, Filters }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/resource/paged${Filters}`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _GET_ENUMERATOS() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/order/enumerators`,
  };
}
// export function _GET_ENUMERATOS() {
//   return {
//     method: "get",
//     url: `${window.apis.core}/api/v1/resource/enumerators`,
//   };
// }

export function _GET({ PageSize, PageNumber }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/resource/paged`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _POST({
  name,
  code,
  description,
  rowStatus,
  baseId,
  clientId
}: IResourceObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/resource`,
    data: {
      name,
      code,
      description,
      rowStatus,
      baseId,
      clientId
    },
  };
}

export function _PUT({
  id,
  name,
  code,
  description,
  rowStatus,
  baseId,
  clientId
}: IResourceObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/resource`,
    data: {
      id,
      name,
      code,
      description,
      rowStatus,
      baseId,
      clientId
    },
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}/api/v1/resource/range`,
    data: ids,
  };
}
