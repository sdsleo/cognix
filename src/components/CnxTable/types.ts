export type IButtons = {
  renderButton: (rowsChecked: object[]) => any;
};
const csvExportUsersExemple = {
  url: "http://api/csvimport",
  title: "Template Operacao",
  head: {
    code: "code",
    name: "name",
    description: "description",
    starttime: "starttime",
    endtime: "endtime"
  },
  rows: [
    {
      code: "C001",
      name: "RAYBAN",
      description: "DESCRICAO_RAYBAN",
      starttime: "01/01/2022",
      endtime: "30/03/2022"
    },
    {
      code: "C002",
      name: "OKLAY",
      description: "DESCRICAO_OKLAY",
      starttime: "01/01/2022",
      endtime: "30/03/2022"
    },
    {
      code: "C003",
      name: "CHILLI_BEANS",
      description: "DESCRICAO_CHILLI_BEANS",
      starttime: "01/01/2022",
      endtime: "30/03/2022"
    },
  ],
};

interface ICsvImportButton {
  urlRequest: string;
  title: string;
  head: object;
  rows: object[];
}

export interface ITable {
  actionButton?: (data: any) => any;
  rowActions?: boolean;
  rowDeleteAction?: (data: any) => any;
  rowEditAction?: (data: any) => any;
  rowInactivatedAction?: (data: any) => any;
  rowActivatedAction?: (data: any) => any;
  rowCloneAction?: (data: any) => any;
  saveButton?: (data: any) => any;
  editButton?: (data: any) => any;
  deleteButton?: (data: any) => any;
  deleteAllButton?: () => any;
  activeAllButton?: () => any;
  inactiveAllButton?: () => any;
  printButton?: (data: any) => any;
  filterButton?: any;
  filterResponse?: (data: any) => any;
  clearAppliedFilters?: () => any;
  csvImportButton?: ICsvImportButton;
  exportButton?: (data: any) => any;
  buttons?: IButtons[];
  searchActionButtons?: IButtons[];
  data?: any;
  head: object;
  checkable?: boolean;
  customTdFunction?: any;
  customThFunction?: any;
  rowsChecked?: (data: any) => any;
  enableRowClick?: (data: any) => any;
  enablePagination?: (data: any) => any;
  hiddenColumns?: string[];
  reOrderColumn?: boolean;
  cnxStyles?: any;
  hoverEffect?: boolean;
  enableSummary?: boolean;
  summaryPagination?: any;
  isLoading?: boolean;
  refreshTable?: () => any;
  customTheme?: object;
  title?: string;
  customSummary?: any;
  noSearchBar?: boolean;
  setFilter?: any;
  drillDownCheckbox?: boolean;
  customSearchPlaceHolder?: string;
  sort?: string
}

export interface IobjEntriesHead {
  key: string | number;
  value: string | number;
}

export interface IDataObject {
  indexId?: string;
}

export interface ITdRow {
  entries: any;
  value: any;
  index: number;
}

export interface ICustomTheme {
  textPrimary?: string;
  textSecondary?: string;
  textHint?: string;
  textDisable?: string;
  inputBackground?: string;
  inputBorder?: string;
  inputText?: string;
  inputPlaceholder?: string;
  buttonBorder?: string;
  buttonBackground?: string;
  buttonHoverBackground?: string;
  buttonIcon?: string;
  buttonHintIcon?: string;
  buttonText?: string;
  nthChildTable?: string;
  refreshButton?: string;
  backgroundColor?: string;
}
