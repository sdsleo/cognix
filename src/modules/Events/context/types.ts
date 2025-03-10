export interface IModuleContext {
    tableData: object[] | object;
    loadingTable: boolean;
    saving: boolean;
    addModal: boolean;
    editModal: boolean;
    rowData: any;
    dispacth: React.Dispatch<any>;
    page?: string;
}