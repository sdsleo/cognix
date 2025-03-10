export interface IUser {
    id?: string | number;
    name: HTMLInputElement | string;
    code: HTMLInputElement | string;
    username: HTMLInputElement | string;
    password: HTMLInputElement | string;
    accessLevel: HTMLInputElement | number;
    phone: HTMLInputElement | string;
    email: HTMLInputElement | string;
    departmentId: HTMLInputElement | number;
    status: HTMLInputElement | number;
    groupIds?: number[]
}

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
    Filters?: any;
}