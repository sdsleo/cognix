import { IVehicleObject, IPagination } from "./types";

export function _GET({ PageSize, PageNumber }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-vehicle/paged`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _GET_ENUMERATOS() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-vehicle/enumerators`
  };
}

export function _POST({
  plate,
  model,
  vehicle,
  nominalCapacity,
  realCapacity,
  efLogistic,
  resourceId,
  isActived,
}: IVehicleObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/custom-vehicle`,
    data: {
      plate,
      model,
      vehicle,
      nominalCapacity,
      realCapacity,
      efLogistic,
      resourceId,
      isActived,
    },
  };
}

export function _PUT({
  id,
  plate,
  model,
  vehicle,
  nominalCapacity,
  realCapacity,
  efLogistic,
  resourceId,
  isActived,
}: IVehicleObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/custom-vehicle`,
    data: {
      id,
      plate,
      model,
      vehicle,
      nominalCapacity,
      realCapacity,
      efLogistic,
      resourceId,
      isActived,
    },
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}/api/v1/custom-vehicle/range`,
    data: ids,
  };
}
