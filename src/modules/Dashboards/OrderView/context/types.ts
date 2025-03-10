export interface ILogisticMonitoring {
    dashBoardData: any;
    filters: any;
    page: any;
    enumerators: any;
    operationsEnumerators: any;
    loading: boolean;
    autoRefresh: boolean;
    timeToRefresh: number;
    modalOpen: boolean;
    operationData: any;
    saving: boolean;
    dispacth: React.Dispatch<any>;
}