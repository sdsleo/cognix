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
    url: `${window.apis.core}/api/v1/custom-calendar-pcs/paged`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _POST({
  name,
  description,
  date,
  dueDate,
  value,
  isActived,
  documentId,
  baseId,
}: IResourceObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/custom-calendar-pcs`,
    data: {
      name,
      description,
      date,
      dueDate,
      value,
      isActived,
      documentId,
      baseId,
    },
  };
}

export function _PUT({
  id,
  name,
  description,
  date,
  dueDate,
  value,
  isActived,
  documentId,
  baseId,
}: IResourceObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/custom-calendar-pcs`,
    data: {
      id,
      name,
      description,
      date,
      dueDate,
      value,
      isActived,
      documentId,
      baseId,
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
