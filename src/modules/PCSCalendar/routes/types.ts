export interface IResourceObject {
    id?: string | number;
    name: HTMLInputElement | string;
    date: HTMLInputElement | string;
    dueDate: HTMLInputElement | string;
    description: HTMLInputElement | string;
    value?: HTMLInputElement | number;
    baseId?: HTMLInputElement | number;
    documentId?: HTMLInputElement | number;
    isActived?: HTMLInputElement | number;
}

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
    Filters?: any;
}