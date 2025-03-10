export interface IDashboardObject {
    dashBoardData: any;
    filters: any;
    loading: boolean;
    saving: boolean;
    rowData: any;
    page: any;
    dispacth: React.Dispatch<any>;
    autoRefresh: boolean;
    enumerators: any;
    timeToRefresh: number;
}

export interface IDashboardGET {
    Filters?: any;
}