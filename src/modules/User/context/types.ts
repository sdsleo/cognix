export interface IUserContext {
    tableDataUser: any;
    enumerators: any;
    appliedFilters: any;
    dataPaginationUser: object[];
    loadingTableUser?: boolean;
    savingUser?: boolean;
    dispacth: React.Dispatch<any>;
    addModalUser: boolean;
    editModalUser: boolean;
    addModalUserSkills: boolean;
    editModalUserSkills: boolean;
    page: string;
    rowData: any;
}