export interface IDriverObject {
    id?: string | number;
    name: HTMLInputElement | string;
    documentCode: HTMLInputElement | string;
    companyName: HTMLInputElement | string;
    isActived: any;
}

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
}