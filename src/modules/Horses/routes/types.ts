export interface IHorsesObject {
    id?: string | number;
    plate: HTMLInputElement | string;
    model: HTMLInputElement | string;
    isActived?: any;
}

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
    Filters?: any;
}