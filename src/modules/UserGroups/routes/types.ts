export interface IUserGroup {
    id?: string | number;
    code: HTMLInputElement | string;
    description: HTMLInputElement | string;
    extraInformation: HTMLInputElement | string;
    isActived: HTMLInputElement | number;
    discriminator: HTMLInputElement | string;
}

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
}