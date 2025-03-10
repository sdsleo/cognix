export interface IVehicleObject {
    id?: string | number;
    plate: HTMLInputElement | string;
    model: HTMLInputElement | string;
    vehicle: HTMLInputElement | string;
    nominalCapacity: HTMLInputElement | number;
    realCapacity: HTMLInputElement | number;
    efLogistic: HTMLInputElement | number;
    resourceId?: HTMLInputElement | number;
    isActived: any;
}

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
}