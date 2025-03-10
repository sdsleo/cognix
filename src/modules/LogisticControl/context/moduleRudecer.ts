import { ACTIONS } from "./moduleActions";

const ModuleRudecer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.SET_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload,
      };
    case ACTIONS.SET_TABLE_DATA_HORSE:
      return {
        ...state,
        tableDataHorse: action.payload,
      };
    case ACTIONS.SET_CARD_DATA:
      return {
        ...state,
        cardData: action.payload,
      };
    case ACTIONS.SET_ID_CARD:
      return {
        ...state,
        idCard: action.payload,
      };
    case ACTIONS.SET_CARD_ID:
      return {
        ...state,
        cardId: action.payload,
      };
    case ACTIONS.SET_CARRETA_DATA:
      return {
        ...state,
        carretaData: action.payload,
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
    case ACTIONS.EDIT_HORSE_MODAL:
      return {
        ...state,
        editHorseModal: action.payload,
      };
    case ACTIONS.EDIT_OPERATION_MODAL:
      return {
        ...state,
        editOperationModal: action.payload,
      };
    case ACTIONS.ADD_ANGELIRA_RESULT_MODAL:
      return {
        ...state,
        addAngeLiraResultModal: action.payload,
      };
    case ACTIONS.ADD_ELIPSE_RESULT_MODAL:
      return {
        ...state,
        addElipseResultModal: action.payload,
      };
    case ACTIONS.SAVING:
      return {
        ...state,
        saving: action.payload,
      };
    case ACTIONS.SET_SHOW_ALL:
      return {
        ...state,
        showAll: action.payload,
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
    case ACTIONS.SET_ROW_DATA_HORSE:
      return {
        ...state,
        rowDataHorse: action.payload,
      };
    case ACTIONS.SET_ROW_DATA_EVENTS:
      return {
        ...state,
        rowDataEvents: action.payload,
      };
    case ACTIONS.SET_ROW_DATA_CARRETA:
      return {
        ...state,
        carretaRowData: action.payload,
      };
    case ACTIONS.SET_ENUMERATORS:
      return {
        ...state,
        enumerators: action.payload,
      };
    case ACTIONS.SET_ENUMERATORS_HORSE:
      return {
        ...state,
        enumeratorsHorse: action.payload,
      };
    case ACTIONS.SET_ENUMERATORS_ORDER:
      return {
        ...state,
        enumeratorsOrder: action.payload,
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
    case ACTIONS.SET_FILTERS_HORSE:
      return {
        ...state,
        appliedHorseFilters: action.payload,
      };
    case ACTIONS.SET_ACTIVE_CARD_VIEW:
      return {
        ...state,
        cardView: action.payload,
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
    case ACTIONS.AUTO_REFRESH:
      return {
        ...state,
        autoRefresh: action.payload,
      };
    default:
      return state;
  }
};

export default ModuleRudecer;
