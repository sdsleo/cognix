export interface IResourceObject {
    id?: string | number;
    name: HTMLInputElement | string;
    code: HTMLInputElement | string;
    description: HTMLInputElement | string;
    status?: HTMLInputElement | number;
    rowStatus?: HTMLInputElement | number;
    baseId?: HTMLInputElement | number;
    clientId?: HTMLInputElement | number;
}

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
    Filters?: any;
}