import { IPagination, ILogisticControlObject, ILogisticControlOperationObject, IOrderChildObject, IAngeLiraObject, IElipseObject, IFiltersTramos, IPaginationHorseLocation, IEditHorseLocation } from "./types";

export function _GET({ PageSize, PageNumber, Status, OrderProductionOperationId }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/production-loss-record/paged`,
    params: {
      PageSize,
      PageNumber,
      Status,
      OrderProductionOperationId
    },
  };
}

export function _GET_HORSE_LOCATION_LIST({ BaseId, ClientId }: IPaginationHorseLocation) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-cavalo-location`,
    params: {
      BaseId,
      ClientId,
    },
  };
}
export function _GET_HORSE_LOCATION_PAGED({ PageSize, PageNumber, BaseId, ClientId }: IPaginationHorseLocation) {

  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-cavalo-location/paged`,
    params: {
      PageSize,
      PageNumber,
      ClientId,
      BaseId
    },
  };
}

export function _PUT_HORSE_LOCATION({
  id,
  cavaloId,
  baseId,
  clientId
}: IEditHorseLocation) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/custom-cavalo-location`,
    data: {
      id,
      cavaloId,
      baseId,
      clientId
    },
  };
}

export function _GET_TRAMOS_FILTERED({ BaseId, ClientId }: IFiltersTramos) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/resource`,
    params: {
      BaseId,
      ClientId,
      RowStatus: 1
    },
  };
}

export function _GET_CARRETAS() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/custom-vehicle/availability`,
  };
}

export function _GET_BASES({ PageSize, PageNumber, Status }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/order/group-base`,
    params: {
      PageSize,
      PageNumber,
      Status
    },
  };
}
export function _GET_CLIENTS({ PageSize, PageNumber, Status }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/order/group-client`,
    params: {
      PageSize,
      PageNumber,
      Status
    },
  };
}

export function _GET_BY_FILTERS({ PageSize, PageNumber, Filters }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/order/paged${Filters}`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _GET_OPERATION_BY_ORDER_ID({ PageSize, PageNumber, OrderId }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/operation/${OrderId}`,
    params: {
      PageSize,
      PageNumber,
    },
  };
}

export function _GET_ENUMERATOS() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/production-loss-record/enumerators`,
  };
}

export function _GET_ENUMERATOS_ORDER() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/order/enumerators`,
  };
}

export function _GET_ENUMERATOS_ELIPSE() {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/order-production-operation-elipse-result/enumerators`,
  };
}

export function _POST_ORDER_CHILD({
  baseId,
  clientId,
  driverId,
  orderId,
  orderNumber,
  vehicleId
}: IOrderChildObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/order/order-child`,
    data: {
      baseId,
      clientId,
      driverId,
      orderId,
      orderNumber,
      vehicleId
    },
  };
}

export function _POST({
  ResourceId,
  ProductionLossId,
  OrderProductionOperationId,
  startedDateTime,
  finishedDateTime,
  Coments,
}: ILogisticControlObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/production-loss-record`,
    data: {
      ResourceId,
      ProductionLossId,
      OrderProductionOperationId,
      startedDateTime,
      finishedDateTime,
      Coments,
    },
  };
}

export function _POST_ANGELIRA_RESULTS({
  destination,
  destinationArrivedDateTime,
  driverName,
  estimatedDestinationArrivedDateTime,
  estimatedFinishDateTime,
  estimatedStartDateTime,
  finishedDateTime,
  handlingTime,
  orderProductionOperationId,
  origem,
  origemArrivedDateTime,
  origemLeaveDateTime,
  resourceId,
  startedDateTime,
  status,
  timeToLeaveOrigem,
  transporNumber,
  transportCode,
  transportTime,
  travelDistance
}: IAngeLiraObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/order-production-operation-angel-lira-result`,
    data: {
      destination,
      destinationArrivedDateTime,
      driverName,
      estimatedDestinationArrivedDateTime,
      estimatedFinishDateTime,
      estimatedStartDateTime,
      finishedDateTime,
      handlingTime,
      orderProductionOperationId,
      origem,
      origemArrivedDateTime,
      origemLeaveDateTime,
      resourceId,
      startedDateTime,
      status,
      timeToLeaveOrigem,
      transporNumber,
      transportCode,
      transportTime,
      travelDistance
    },
  };
}

export function _POST_ELIPSE_RESULTS({
  arrivedDateTime,
  averageFlow,
  finalAmbientTemperature,
  finalPressure,
  finalTemperature,
  finalWeatherCondition,
  finishedDateTime,
  initialAmbientTemperature,
  initialPressure,
  initialTemperature,
  operatingWaitingTime,
  operationType,
  orderProductionOperationId,
  startedDateTime,
  status,
  vehicleHandlingTime,
  volume,
  massVolume,
  correctedVolume,
  weatherCondition
}: IElipseObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/order-production-operation-elipse-result`,
    data: {
      arrivedDateTime,
      averageFlow,
      finalAmbientTemperature,
      finalPressure,
      finalTemperature,
      finalWeatherCondition,
      finishedDateTime,
      initialAmbientTemperature,
      initialPressure,
      initialTemperature,
      operatingWaitingTime,
      operationType,
      orderProductionOperationId,
      startedDateTime,
      status,
      vehicleHandlingTime,
      volume,
      massVolume,
      correctedVolume,
      weatherCondition
    },
  };
}

export function _PUT({
  id,
  ResourceId,
  ProductionLossId,
  OrderProductionOperationId,
  startedDateTime,
  finishedDateTime,
  Coments,
  Status
}: ILogisticControlObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/production-loss-record`,
    data: {
      id,
      ResourceId,
      ProductionLossId,
      OrderProductionOperationId,
      startedDateTime,
      finishedDateTime,
      Coments,
      Status
    },
  };
}

export function _PUT_OPERATION({
  orderCustomId,
  orderProductionId,
  orderProductionOperationId,
  resourceId,
  cavaloId,
  orderProductionStatus,
}: ILogisticControlOperationObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/order/logistical-control`,
    data: {
      orderCustomId,
      orderProductionId,
      orderProductionOperationId,
      resourceId,
      cavaloId,
      orderProductionStatus,
    },
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}/api/v1/production-loss-record/range`,
    data: ids,
  };
}
