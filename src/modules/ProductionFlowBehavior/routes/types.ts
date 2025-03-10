export interface IDeshboardbject {
    id?: string | number;
    areaCodigo: HTMLInputElement | string;
    areaNome: HTMLInputElement | string;
    impressoraNome: HTMLInputElement | string;
    impressoraIP: HTMLInputElement | string;
    situacao: any;
}

export interface IDashboardGET {
    Filters?: any;
}