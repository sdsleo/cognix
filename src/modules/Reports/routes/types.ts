export interface IBaseObject {
    id?: string | number;
    name: HTMLInputElement | string;
    code: HTMLInputElement | string;
    latitude: HTMLInputElement | string;
    longitude: HTMLInputElement | string;
    qtyTramos: HTMLInputElement | number;
    operationType: HTMLInputElement | number;
    maxFlow: HTMLInputElement | number;
    qtyParkingSpaces: HTMLInputElement | number;
    isActived: any;
}

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
}