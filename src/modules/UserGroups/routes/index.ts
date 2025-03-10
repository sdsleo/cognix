import { IPagination, IUserGroup } from "./types";

export function _GET({ PageSize, PageNumber }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.user}/api/v1/group/paged`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _GET_GROUP_GRANT(GroupId: number | null) {
  return {
    method: "get",
    url: `${window.apis.user}/api/v1/user-group-grant`,
    params: {
      GroupId,
    },
  };
}

export function _PUT_GROUP_GRANT(id: number, isActived: number) {
  return {
    method: "put",
    url: `${window.apis.user}/api/v1/user-group-grant`,
    data: {
      id,
      isActived
    },
  };
}

export function _GET_ENUMERATOS() {
  return {
    method: "get",
    url: `${window.apis.user}/api/v1/user/enumerators`,
  };
}

export function _POST({
  code,
  description,
  extraInformation,
  isActived,
  discriminator
}: IUserGroup) {
  return {
    method: "post",
    url: `${window.apis.user}/api/v1/group`,
    data: {
      code,
      description,
      extraInformation,
      isActived,
      discriminator
    },
  };
}

export function _PUT({
  id,
  code,
  description,
  extraInformation,
  isActived,
  discriminator
}: IUserGroup) {
  return {
    method: "put",
    url: `${window.apis.user}/api/v1/group`,
    data: {
      id,
      code,
      description,
      extraInformation,
      isActived,
      discriminator
    },
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.user}/api/v1/group/range`,
    data: ids,
  };
}
