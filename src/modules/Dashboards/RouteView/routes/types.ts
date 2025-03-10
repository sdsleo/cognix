export interface IDeshboardObject {
    id?: string | number;
}

export interface IDashboardGET {
    Filters?: any;
    Routes?: any;
    OrderByField?: string;
    Desc?: boolean;
}