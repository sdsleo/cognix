export interface IRoutesObject {
    id?: string | number;
    distanceToClient: HTMLInputElement | number;
    scheduleTime: HTMLInputElement | number;
    estimatedFuelConsumption: HTMLInputElement | number;
    baseId: HTMLInputElement | number;
    clientId: HTMLInputElement | number;
    isActived: any;
}

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
}