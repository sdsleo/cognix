export interface ILogisticMonitoring {
    dashBoardData: any;
    filters: any;
    loading: boolean;
    saving: boolean;
    rowData: any;
    page: any;
    dispacth: React.Dispatch<any>;
    autoRefresh: boolean;
    timeToRefresh: number;
    enumerators: any;
}