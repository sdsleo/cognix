export interface ILogisticMonitoring {
    dashBoardData: any;
    baseData: any;
    ganttData: any;
    loading: boolean;
    saving: boolean;
    rowData: any;
    baseId: any;
    page: any;
    clientId: any;
    baseName: any;
    clientName: any;
    viewMode: null;
    viewModeBase: any;
    viewModeClient: any;
    dispacth: React.Dispatch<any>;
    autoRefresh: boolean;
    timeToRefresh: number;
}