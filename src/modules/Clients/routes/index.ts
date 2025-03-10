import { IClientObject, IPagination } from "./types";

export function _GET({ PageSize, PageNumber }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/client/paged`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _GET_BY_FILTERS(filters: any) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/client/paged${filters}`,
  };
}

export function _GET_ENUMERATOS() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/client/enumerators`,
  };
}

export function _POST({
  name,
  code,
  isActived,
  latitude,
  longitude,
  qtyTramos,
  operationType,
  maxFlow,
  qtyParkingSpaces,
  gasPrice,
  contractNumber,
  transportCost,
  operationCost,
}: IClientObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/client`,
    data: {
      name,
      code,
      isActived,
      clientCustom: {
        latitude,
        longitude,
        qtyTramos,
        operationType,
        maxFlow,
        qtyParkingSpaces,
        gasPrice,
        contractNumber,
        transportCost,
        operationCost,
      },
    },
  };
}

export function _PUT({
  id,
  idCustom,
  name,
  code,
  isActived,
  latitude,
  longitude,
  qtyTramos,
  operationType,
  maxFlow,
  qtyParkingSpaces,
  gasPrice,
  contractNumber,
  transportCost,
  operationCost,
}: IClientObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/client`,
    data: {
      id,
      name,
      code,
      isActived,
      clientCustom: {
        id: idCustom,
        latitude,
        longitude,
        qtyTramos,
        operationType,
        maxFlow,
        qtyParkingSpaces,
        gasPrice,
        contractNumber,
        transportCost,
        operationCost,
      },
    },
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}/api/v1/client/range`,
    data: ids,
  };
}
