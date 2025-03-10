import { IHorsesObject, IPagination } from "./types";

export function _GET({ PageSize, PageNumber, Filters }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-cavalo/paged${Filters}`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _GET_BY_FILTERS({ PageSize, PageNumber, Filters }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-cavalo/paged${Filters}`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _GET_ENUMERATOS() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-cavalo/enumerators`
  };
}

export function _POST({
  plate,
  model,
  isActived,
}: IHorsesObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/custom-cavalo`,
    data: {
      plate,
      model,
      isActived,
    },
  };
}

export function _PUT({
  id,
  plate,
  model,
  isActived,
}: IHorsesObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/custom-cavalo`,
    data: {
      id,
      plate,
      model,
      isActived,
    },
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}/api/v1/custom-cavalo/range`,
    data: ids,
  };
}
