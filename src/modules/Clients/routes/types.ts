export interface IClientCustom {
    latitude: HTMLInputElement | string;
    longitude: HTMLInputElement | string;
    qtyTramos: HTMLInputElement | number;
    operationType: HTMLInputElement | number;
    maxFlow: HTMLInputElement | number;
    qtyParkingSpaces: HTMLInputElement | number;
    gasPrice: HTMLInputElement | number;
    contractNumber: HTMLInputElement | string;
}

export interface IClientObject {
    id?: string | number;
    idCustom?: any;
    name: HTMLInputElement | string;
    code: HTMLInputElement | string;
    isActived: HTMLInputElement | number;
    latitude: HTMLInputElement | string;
    longitude: HTMLInputElement | string;
    qtyTramos: HTMLInputElement | number;
    operationType: HTMLInputElement | number;
    maxFlow: HTMLInputElement | number;
    qtyParkingSpaces: HTMLInputElement | number;
    gasPrice: HTMLInputElement | number;
    contractNumber: HTMLInputElement | string;
    transportCost?: HTMLInputElement | number;
    operationCost?: HTMLInputElement | number;
}

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
}