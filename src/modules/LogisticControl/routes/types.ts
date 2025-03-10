export interface ILogisticControlObject {
  id?: string | number;
  ResourceId: HTMLInputElement | number;
  ProductionLossId: HTMLInputElement | number;
  OrderProductionOperationId: HTMLInputElement | number;
  startedDateTime?: HTMLInputElement | string;
  finishedDateTime?: HTMLInputElement | string;
  Coments: HTMLInputElement | string;
  Status?: HTMLInputElement | number;
}

export interface IOrderChildObject {
  orderId: string | number;
  orderNumber: HTMLInputElement | string;
  baseId: HTMLInputElement | number;
  clientId: HTMLInputElement | number;
  vehicleId: HTMLInputElement | number;
  driverId: HTMLInputElement | number;
}

export interface IAngeLiraObject {
  startedDateTime: HTMLInputElement | string | null;
  finishedDateTime: HTMLInputElement | string | null;
  status: HTMLInputElement | string;
  transportCode: HTMLInputElement | string;
  transporNumber: HTMLInputElement | string;
  driverName: HTMLInputElement | string;
  origem?: HTMLInputElement | string;
  destination?: HTMLInputElement | string;
  timeToLeaveOrigem: HTMLInputElement | number;
  estimatedStartDateTime: HTMLInputElement | string | null;
  estimatedFinishDateTime?: HTMLInputElement | string | null;
  origemArrivedDateTime?: HTMLInputElement | string | null;
  travelDistance: HTMLInputElement | number;
  estimatedDestinationArrivedDateTime: HTMLInputElement | string | null;
  origemLeaveDateTime?: HTMLInputElement | string | null;
  destinationArrivedDateTime?: HTMLInputElement | string | null;
  transportTime: HTMLInputElement | number;
  handlingTime: HTMLInputElement | number;
  resourceId?: HTMLInputElement | number | null;
  orderProductionOperationId: HTMLInputElement | number;
}

export interface IElipseObject {
  id?: string | number;
  orderProductionOperationId: HTMLInputElement | number;
  startedDateTime: HTMLInputElement | string;
  finishedDateTime: HTMLInputElement | string;
  status: HTMLInputElement | number;
  arrivedDateTime: HTMLInputElement | string;
  vehicleHandlingTime: HTMLInputElement | number;
  operatingWaitingTime: HTMLInputElement | number;
  operationType: HTMLInputElement | number;
  initialPressure: HTMLInputElement | number;
  initialTemperature: HTMLInputElement | number;
  initialAmbientTemperature: HTMLInputElement | number;
  weatherCondition: HTMLInputElement | string;
  finalPressure: HTMLInputElement | number;
  finalTemperature: HTMLInputElement | number;
  finalAmbientTemperature: HTMLInputElement | number;
  finalWeatherCondition: HTMLInputElement | string;
  volume: HTMLInputElement | number;
  massVolume: HTMLInputElement | number;
  correctedVolume?: HTMLInputElement | number;
  averageFlow?: HTMLInputElement | number;
}

export interface ILogisticControlOperationObject {
  orderCustomId: HTMLInputElement | number;
  orderProductionId: HTMLInputElement | number;
  orderProductionOperationId: HTMLInputElement | number;
  driverId?: HTMLInputElement | number;
  resourceId: HTMLInputElement | number | null;
  cavaloId: HTMLInputElement | number;
  orderProductionStatus: HTMLInputElement | number;
}

export interface IPagination {
  PageNumber?: number;
  PageSize?: number;
  OrderId?: number | null;
  Status?: number | null;
  Filters?: any;
  OrderProductionOperationId?: any;
}

export interface IPaginationHorseLocation {
  PageNumber?: number;
  PageSize?: number;
  BaseId?: number;
  ClientId?: number;
}

export interface IEditHorseLocation {
  id?: number;
  cavaloId?: number;
  baseId?: number;
  clientId?: number;
}

export interface IFiltersTramos {
  ClientId?: number;
  BaseId?: number;
}

