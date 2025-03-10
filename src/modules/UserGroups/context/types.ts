export interface IUserGroupsContext {
    tableData: any;
    dataPagination: object[];
    loadingTable?: boolean;
    groupId: number | null;
    groupGrantData: any;
    saving?: boolean;
    dispacth: React.Dispatch<any>;
    addModal: boolean;
    editModal: boolean;
    page: string;
    rowData: any;
}