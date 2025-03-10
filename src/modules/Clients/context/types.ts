export interface IClientContext {
    tableData: object[] | object;
    loadingTable: boolean;
    enumerators: any;
    saving: boolean;
    addModal: boolean;
    editModal: boolean;
    rowData: any;
    dispacth: React.Dispatch<any>;
}