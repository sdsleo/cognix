import { IDriverObject, IPagination } from "./types";

export function _GET({ PageSize, PageNumber }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-driver/paged`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _GET_ENUMERATOS() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-driver/enumerators`
  };
}

export function _POST({
  name,
  documentCode,
  companyName,
  isActived,
}: IDriverObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/custom-driver`,
    data: {
      name,
      documentCode,
      companyName,
      isActived,
    },
  };
}

export function _PUT({
  id,
  name,
  documentCode,
  companyName,
  isActived
}: IDriverObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/custom-driver`,
    data: {
      id,
      name,
      documentCode,
      companyName,
      isActived
    },
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}/api/v1/custom-driver/range`,
    data: ids,
  };
}
