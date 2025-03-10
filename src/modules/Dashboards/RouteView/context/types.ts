export interface ILogisticMonitoring {
    dashBoardData: any;
    filters: any;
    page: any;
    enumerators: any;
    routesEnumerators: any;
    loading: boolean;
    autoRefresh: boolean;
    timeToRefresh: number;
    dispacth: React.Dispatch<any>;
}