
export function _GET() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/dashboard/logistic-monitoring`,
  };
}

export function _GET_BASE(baseId: any) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/dashboard/logistic-monitoring/base/${baseId}`,
  };
}

export function _GET_GANTT(baseId: any) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/dashboard/logistic-monitoring/base/gantt/${baseId}`,
  };
}
export function _GET_GANTT_TRANSPORT(baseId: any) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/dashboard/logistic-monitoring/base/transport/gantt/${baseId}`,
  };
}

export function _GET_GANTT_CLIENT(clientId: any) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/dashboard/logistic-monitoring/client/gantt/${clientId}`,
  };
}

export function _GET_GANTT_CLIENT_TRANSPORT(clientId: any) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/dashboard/logistic-monitoring/client/transport/gantt/${clientId}`,
  };
}

export function _GET_TRAVEL() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/dashboard/travel`,
  };
}