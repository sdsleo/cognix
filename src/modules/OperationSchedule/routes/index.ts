import { IPagination, IResourceObject } from "./types";

export function _GET_BY_FILTERS({
  PageSize,
  PageNumber,
  Filters,
}: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-calendar-operation/paged${Filters}`,
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
    url: `${window.apis.core}/api/v1/custom-calendar-operation/paged`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _POST({
  name,
  description,
  startDateTime,
  finishDateTime,
  valueFactorCapacity,
  baseId,
  clientId,
  isActived,
  rowStatus
}: IResourceObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/custom-calendar-operation`,
    data: {
      name,
      description,
      startDateTime,
      finishDateTime,
      valueFactorCapacity,
      baseId,
      clientId,
      isActived,
      rowStatus
    },
  };
}

export function _PUT({
  id,
  name,
  description,
  startDateTime,
  finishDateTime,
  valueFactorCapacity,
  baseId,
  clientId,
  isActived,
  rowStatus
}: IResourceObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/custom-calendar-operation`,
    data: {
      id,
      name,
      description,
      startDateTime,
      finishDateTime,
      valueFactorCapacity,
      baseId,
      clientId,
      isActived,
      rowStatus
    },
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}/api/v1/custom-calendar-operation/range`,
    data: ids,
  };
}
