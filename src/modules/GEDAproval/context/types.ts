export interface IUserContext {
    dataTable: object[] | object;
    dataPagination: object[];
    dispacth: React.Dispatch<any>;
    modalUserAdd: boolean;
    modalUserEdit: boolean;
    page: string;
    rowData: object[] | object;
}