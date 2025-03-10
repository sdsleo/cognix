export interface IModuleContext {
    tableData: object[] | object;
    selectedResource: object[] | object;
    loadingTable: boolean;
    enumerators: any;
    saving: boolean;
    addModal: boolean;
    editModal: boolean;
    rowData: any;
    dispacth: React.Dispatch<any>;
    page?: string;
}