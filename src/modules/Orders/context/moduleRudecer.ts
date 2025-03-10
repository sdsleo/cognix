import { ACTIONS } from "./moduleActions";

const ModuleRudecer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.SET_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload,
      };
    case ACTIONS.SET_ORDER_BY_ROW_DATA:
      return {
        ...state,
        orderById: action.payload,
      };
    case ACTIONS.SET_PARENTS:
      return {
        ...state,
        parentsData: action.payload,
      };
    case ACTIONS.SET_OPERATION_PARAMS_DATA:
      return {
        ...state,
        operationParamsData: action.payload,
      };
    case ACTIONS.ADD_MODAL:
      return {
        ...state,
        addModal: action.payload,
      };
    case ACTIONS.EDIT_MODAL:
      return {
        ...state,
        editModal: action.payload,
      };
    case ACTIONS.EDIT_OPERATION_MODAL:
      return {
        ...state,
        editOperationModal: action.payload,
      };
    case ACTIONS.EDIT_ALL_MODAL:
      return {
        ...state,
        editAllModal: action.payload,
      };
    case ACTIONS.ADD_ANGELIRA_RESULTS_MODAL:
      return {
        ...state,
        addAngeLiraResultsModal: action.payload,
      };
    case ACTIONS.EDIT_ANGELIRA_RESULTS_MODAL:
      return {
        ...state,
        editAngeLiraResultsModal: action.payload,
      };
    case ACTIONS.EDIT_ELIPSE_RESULTS_MODAL:
      return {
        ...state,
        editElipseResultsModal: action.payload,
      };
    case ACTIONS.SET_ORDER_ID:
      return {
        ...state,
        orderId: action.payload,
      };
    case ACTIONS.SET_ORDER_OPERATION_ID:
      return {
        ...state,
        orderOperationId: action.payload,
      };
    case ACTIONS.SET_ANGELIRA_RESULT_ID:
      return {
        ...state,
        angeLiraResultId: action.payload,
      };
    case ACTIONS.SET_OPERATION_DATA:
      return {
        ...state,
        operationData: action.payload,
      };
    case ACTIONS.SET_ELIPSE_RESULT_DATA:
      return {
        ...state,
        elipseResultData: action.payload,
      };
    case ACTIONS.SET_ANGELIRA_RESULT_DATA:
      return {
        ...state,
        angeLiraResultData: action.payload,
      };
    case ACTIONS.SET_ANGELIRA_LOGS_RESULT_DATA:
      return {
        ...state,
        angeLiraLogsResultData: action.payload,
      };
    case ACTIONS.SAVING:
      return {
        ...state,
        saving: action.payload,
      };
    case ACTIONS.LOADING_TABLE:
      return {
        ...state,
        loadingTable: action.payload,
      };
    case ACTIONS.SET_ROW_DATA:
      return {
        ...state,
        rowData: action.payload,
      };
    case ACTIONS.SET_ROW_DATA_OPERATION:
      return {
        ...state,
        rowDataOperation: action.payload,
      };
    case ACTIONS.SET_ANGELIRA_ROW_DATA:
      return {
        ...state,
        rowDataAngeLira: action.payload,
      };
    case ACTIONS.SET_ELIPSE_ROW_DATA:
      return {
        ...state,
        rowDataElipse: action.payload,
      };
    case ACTIONS.SET_ROW_IDS:
      return {
        ...state,
        rowIds: action.payload,
      };
    case ACTIONS.SET_ENUMERATORS:
      return {
        ...state,
        enumerators: action.payload,
      };
    case ACTIONS.SET_ENUMERATORS_ELIPSE:
      return {
        ...state,
        enumeratorsElipse: action.payload,
      };
    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        appliedFilters: action.payload,
      };
    case ACTIONS.SET_ACTIVE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case ACTIONS.SET_ENUMERATORS_TRAMOS:
      return {
        ...state,
        enumeratorsTramos: action.payload,
      };
    default:
      return state;
  }
};

export default ModuleRudecer;
