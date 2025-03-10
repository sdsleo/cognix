export interface IOperationObject {
    id?: string | number;
    number: HTMLInputElement | number;
    code: HTMLInputElement | string;
    name: HTMLInputElement | string;
    description: HTMLInputElement | string;
    resourceIds: any;
    resourceGroupIds: any;
    isActived: any;
}

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
}