import { IPagination, IOrderObject, IAngeLiraObject, IOperationObject, IElipseObject, IFiltersTramos, IExport } from "./types";

export function _GET({ PageSize, PageNumber, Status }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/order/paged`,
    params: {
      PageSize,
      PageNumber,
      Status
    },
  };
}

export function _GET_ORDER_BY_ID(id : number) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/order${id ? '/'+id : ''}`,
  };
}

export function _GET_ORDER_PARENT_BY_ID(id : number) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/product-order-link`,
    params: {
      OrderLinkedToId: id
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

export function _GET_EXPORT_BY_FILTERS({ Filters }: IExport) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/order/export${Filters}`
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

export function _GET_ELIPSE_RESULTS_BY_ID({ PageSize, PageNumber, OrderOperationId }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/order-production-operation-elipse-result/paged`,
    params: {
      PageSize,
      PageNumber,
      OrderProductionOperationId: OrderOperationId
    },
  };
}

export function _GET_ANGELIRA_RESULTS_BY_ID({ PageSize, PageNumber, OrderOperationId }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/order-production-operation-angel-lira-result/paged`,
    params: {
      PageSize,
      PageNumber,
      OrderProductionOperationId: OrderOperationId
    },
  };
}

export function _GET_ANGELIRA_LOGS_RESULTS_BY_ID({ PageSize, PageNumber, AngeLiraResultId }: IPagination) {
  return {
    method: "get",
    url: `${window.apis.core}/api/v1/order-production-operation-angel-lira-result-log/paged`,
    params: {
      PageSize,
      PageNumber,
      OrderProductionOperationAngelLiraResultId: AngeLiraResultId
    },
  };
}

export function _GET_ENUMERATOS() {
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

export function _POST({
  productId,
  scheduleDate,
  // orderDateTime,
  // deliveryDate,
  baseId,
  clientId,
  vehicleId,
  volume,
  orderProductions
}: IOrderObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/order`,
    data: {
      productId,
      scheduleDate,
      // orderDateTime,
      // deliveryDate,
      clientId,
      orderCustom: {
        volume,
        baseId,
        vehicleId
      },
      orderProductions
    },
  };
}

export function _POST_OPERATION({
  id,
  status,
  orderProductionOperation
}: IOperationObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/order-production/operation`,
    data: {
      id,
      status,
      orderProductionOperation
    },
  };
}

export function _POST_ANGELIRA({
  destination,
  destinationArrivedDateTime,
  driverName,
  estimatedDestinationArrivedDateTime,
  estimatedFinishDateTime,
  estimatedStartDateTime,
  handlingTime,
  origem,
  origemArrivedDateTime,
  origemLeaveDateTime,
  status,
  timeToLeaveOrigem,
  transporNumber,
  transportCode,
  transportTime,
  travelDistance
}: IAngeLiraObject) {
  return {
    method: "post",
    url: `${window.apis.core}/api/v1/order`,
    data: {
      destination,
      destinationArrivedDateTime,
      driverName,
      estimatedDestinationArrivedDateTime,
      estimatedFinishDateTime,
      estimatedStartDateTime,
      handlingTime,
      origem,
      origemArrivedDateTime,
      origemLeaveDateTime,
      status,
      timeToLeaveOrigem,
      transporNumber,
      transportCode,
      transportTime,
      travelDistance
    },
  };
}

export function _PUT_ANGELIRA({
  id,
  destination,
  destinationArrivedDateTime,
  driverName,
  estimatedDestinationArrivedDateTime,
  estimatedFinishDateTime,
  estimatedStartDateTime,
  handlingTime,
  origem,
  origemArrivedDateTime,
  origemLeaveDateTime,
  status,
  timeToLeaveOrigem,
  transporNumber,
  transportCode,
  transportTime,
  travelDistance,
  finishedDateTime,
  startedDateTime,
  orderProductionOperationId,
  resourceId
}: IAngeLiraObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/order-production-operation-angel-lira-result`,
    data: {
      id,
      destination,
      destinationArrivedDateTime,
      driverName,
      estimatedDestinationArrivedDateTime,
      estimatedFinishDateTime,
      estimatedStartDateTime,
      handlingTime,
      origem,
      origemArrivedDateTime,
      origemLeaveDateTime,
      status,
      timeToLeaveOrigem,
      transporNumber,
      transportCode,
      transportTime,
      travelDistance,
      finishedDateTime,
      startedDateTime,
      orderProductionOperationId,
      resourceId 
    },
  };
}

export function _PUT_ELIPSE_RESULTS({
  id,
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
  weatherCondition,
  massVolume,
  correctedVolume
}: IElipseObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/order-production-operation-elipse-result`,
    data: {
      id,
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
      weatherCondition,
      massVolume,
      correctedVolume
    },
  };
}

export function _PUT({
  id,
  productId,
  scheduleDate,
  // orderDateTime,
  // deliveryDate,
  baseId,
  clientId,
  vehicleId,
  volume,
  status
}: IOrderObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/order`,
    data: {
      id,
      productId,
      scheduleDate,
      // orderDateTime,
      // deliveryDate,
      clientId,
      status,
      orderCustom: {
        volume,
        baseId,
        vehicleId
      }
    },
  };
}

export function _PUT_ALL({
  ids,
  productId,
  scheduleDate,
  // orderDateTime,
  // deliveryDate,
  baseId,
  clientId,
  vehicleId,
  volume,
  status
}: IOrderObject) {
  return {
    method: "put",
    url: `${window.apis.core}/api/v1/order/range`,
    data: {
      ids,
      productId,
      scheduleDate,
      // orderDateTime,
      // deliveryDate,
      clientId,
      status,
      orderCustom: {
        volume,
        baseId,
        vehicleId
      }
    },
  };
}

export function _DELETE(ids: any) {
  return {
    method: "delete",
    url: `${window.apis.core}/api/v1/order/range`,
    data: ids,
  };
}
