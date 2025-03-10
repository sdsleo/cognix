export interface IBaseObject {
    id?: string | number;
    areaCodigo: HTMLInputElement | string;
    areaNome: HTMLInputElement | string;
    impressoraNome: HTMLInputElement | string;
    impressoraIP: HTMLInputElement | string;
    situacao: any;
}

export interface IPagination {
    PageNumber?: number;
    PageSize?: number;
}