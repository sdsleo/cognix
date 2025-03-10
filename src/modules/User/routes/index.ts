import { IPagination, IUser } from "./types";

export function _GET({ PageSize, PageNumber }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.user}/api/v1/user/paged`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _GET_BY_FILTERS({ PageSize, PageNumber, Filters }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.user}/api/v1/user/paged${Filters}`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _GET_BY_ID(id: number) {
  return {
    method: "get",
    url: `${window.apis.user}/api/v1/user/${id}`,
  };
}

export function _GET_ENUMERATOS() {
  return {
    method: "get",
    url: `${window.apis.user}/api/v1/user/enumerators`
  };
}

export function _POST({ code, name, username, password, accessLevel, phone, email, departmentId, status, groupIds }: IUser) {
  return {
    method: "post",
    url: `${window.apis.user}/api/v1/user`,
    data: {
      code,
      name,
      username,
      password,
      accessLevel,
      phone,
      email,
      departmentId,
      status,
      groupIds
    },
  };
}

export function _PUT({ id, code, name, username, password, accessLevel, phone, email, departmentId, status, groupIds }: IUser) {
  return {
    method: "put",
    url: `${window.apis.user}/api/v1/user`,
    data: {
      id,
      code,
      name,
      username,
      password,
      accessLevel,
      phone,
      email,
      departmentId,
      status,
      groupIds
    },
  };
}


export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.user}/api/v1/user/range`,
    data: ids,
  };
}
