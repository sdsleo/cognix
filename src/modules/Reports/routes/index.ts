import { IBaseObject, IPagination } from "./types";

export function _GET({ PageSize, PageNumber }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-base/paged`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _GET_ENUMERATOS() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-base/enumerators`
  };
}

export function _POST({
  name,
  code,
  latitude,
  longitude,
  qtyTramos,
  operationType,
  maxFlow,
  qtyParkingSpaces,
  isActived,
}: IBaseObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/custom-base`,
    data: {
      name,
      code,
      latitude,
      longitude,
      qtyTramos,
      operationType,
      maxFlow,
      qtyParkingSpaces,
      isActived,
    },
  };
}

export function _PUT({
  id,
  name,
  code,
  latitude,
  longitude,
  qtyTramos,
  operationType,
  maxFlow,
  qtyParkingSpaces,
  isActived,
}: IBaseObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/custom-base`,
    data: {
      id,
      name,
      code,
      latitude,
      longitude,
      qtyTramos,
      operationType,
      maxFlow,
      qtyParkingSpaces,
      isActived,
    },
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}/api/v1/custom-base/range`,
    data: ids,
  };
}
