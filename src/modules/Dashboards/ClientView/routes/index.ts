import { IDashboardGET } from "./types";

export function _GET({Filters} : IDashboardGET) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/dashboard/logistic-monitoring/general/gantt${Filters}`,
    params: {},
  };
}

export function _GET_ENUMERATOS() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/order/enumerators`,
  };
}
