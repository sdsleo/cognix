import { IOperationObject, IPagination } from "./types";

export function _GET({ PageSize, PageNumber }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/operation/paged`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _GET_ENUMERATOS() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/operation/enumerators`
  };
}

export function _GET_BY_ID(id: number) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/operation/${id}`,
  };
}

export function _POST({
  number,
  code,
  name,
  description,
  resourceIds,
  resourceGroupIds,
  isActived,
}: IOperationObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/operation`,
    data: {
      number,
      code,
      name,
      description,
      resourceIds,
      resourceGroupIds,
      isActived,
    },
  };
}

export function _PUT({
  id,
  number,
  code,
  name,
  description,
  resourceIds,
  resourceGroupIds,
  isActived,
}: IOperationObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/operation`,
    data: {
      id,
      number,
      code,
      name,
      description,
      resourceIds,
      resourceGroupIds,
      isActived,
    },
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}/api/v1/operation/range`,
    data: ids,
  };
}
