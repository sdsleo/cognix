import { IPagination, IResourceObject } from "./types";

export function _GET_BY_FILTERS({
  PageSize,
  PageNumber,
  Filters,
}: IPagination) {
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
    url: `${window.apis.core}/api/v1/custom-calendar-maintenance/paged`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _POST(payload: IResourceObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/custom-calendar-maintenance`,
    data: payload
  };
}

export function _PUT(payload: IResourceObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/custom-calendar-maintenance`,
    data: payload,
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}/api/v1/custom-calendar-maintenance/range`,
    data: ids,
  };
}
