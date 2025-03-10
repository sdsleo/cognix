export interface IOrderObject {
    id?: string | number;
    ids?: any[];
    productId: HTMLInputElement | number;
    scheduleDate: HTMLInputElement | string | null;
    // orderDateTime: HTMLInputElement | string;
    // deliveryDate: HTMLInputElement | string;
    baseId: HTMLInputElement | number;
    clientId: HTMLInputElement | number;
    vehicleId: HTMLInputElement | number;
    volume: HTMLInputElement | number | null;
    status?: HTMLInputElement | number;
    orderProductions?: any;
    orderProductionOperation?: any;
}

export interface IOperationObject {
    id?: string | number;
    status?: HTMLInputElement | number;
    orderProductionOperation?: any;
}

export interface IAngeLiraObject {
    startedDateTime: HTMLInputElement | string | null;
    finishedDateTime: HTMLInputElement | string | null;
    status: HTMLInputElement | string;
    transportCode: HTMLInputElement | string;
    transporNumber: HTMLInputElement | string;
    driverName: HTMLInputElement | string;
    origem: HTMLInputElement | string;
    destination: HTMLInputElement | string;
    timeToLeaveOrigem: HTMLInputElement | number;
    estimatedStartDateTime: HTMLInputElement | string | null;
    estimatedFinishDateTime: HTMLInputElement | string | null;
    origemArrivedDateTime: HTMLInputElement | string | null;
    travelDistance: HTMLInputElement | number;
    estimatedDestinationArrivedDateTime: HTMLInputElement | string | null;
    origemLeaveDateTime: HTMLInputElement | string | null;
    destinationArrivedDateTime: HTMLInputElement | string | null;
    transportTime: HTMLInputElement | number;
    handlingTime: HTMLInputElement | number;
    resourceId: HTMLInputElement | number;
    orderProductionOperationId: HTMLInputElement | number;
    id?: string | number;
  }

  export interface IElipseObject {
    id?: string | number;
    orderProductionOperationId: HTMLInputElement | number;
    startedDateTime: HTMLInputElement | string | null;
    finishedDateTime: HTMLInputElement | string | null;
    status: HTMLInputElement | number;
    arrivedDateTime: HTMLInputElement | string | null;
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
    averageFlow: HTMLInputElement | number;
    massVolume?: HTMLInputElement | number;
    correctedVolume?: HTMLInputElement | number;
  }

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
    OrderId?: number | null;
    OrderOperationId?: number | null;
    AngeLiraResultId?: number | null;
    Status?: number | null;
    Filters?: any;
}
export interface IExport {
    Filters?: any;
}

export interface IFiltersTramos {
  ClientId?: number;
  BaseId?: number;
}
