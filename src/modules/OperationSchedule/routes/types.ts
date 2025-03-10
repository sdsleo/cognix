export interface IResourceObject {
    id?: string | number;
    name: HTMLInputElement | string;
    description: HTMLInputElement | string;
    startDateTime: HTMLInputElement | string | null;
    finishDateTime: HTMLInputElement | string | null;
    valueFactorCapacity?: HTMLInputElement | number;
    baseId?: HTMLInputElement | number | null;
    clientId?: HTMLInputElement | number | null;
    isActived?: HTMLInputElement | number | null;
    rowStatus?: HTMLInputElement | number | null;
}

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
    Filters?: any;
}