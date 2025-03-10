import { ACTIONS } from "./moduleActions";

const ModuleRudecer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.SET_TABLE_DATA:
      return {
        ...state,
        tableData: action.payload?.result,
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
    case ACTIONS.SET_ROW_DATA:
      return {
        ...state,
        rowData: action.payload,
      };
    case ACTIONS.LOADING_TABLE:
      return {
        ...state,
        loadingTable: action.payload,
      };
    case ACTIONS.SAVING:
      return {
        ...state,
        saving: action.payload,
      };
    default:
      return state;
  }
};

export default ModuleRudecer;
