export interface IResourceObject {
    id?: string | number;
    name: HTMLInputElement | string;
    description: HTMLInputElement | string;
    startDateTime: HTMLInputElement | string | null;
    finishDateTime: HTMLInputElement | string | null;
    type?: HTMLInputElement | number;
    vehicleId?: HTMLInputElement | number;
    resourceId?: HTMLInputElement | number;
    status?: HTMLInputElement | number;
}

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
    Filters?: any;
}