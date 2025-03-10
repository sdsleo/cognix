import { ACTIONS } from "./moduleActions";

const ModuleRudecer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.GET_LIST_TABLE:
      return {
        ...state,
        dataTable: action.payload?.result,
        dataPagination: action.payload?.pagination,
      };
    case ACTIONS.MODAL_USER_ADD:
      return {
        ...state,
        modalUserAdd: action.payload,
      };
    case ACTIONS.MODAL_USER_EDIT:
      return {
        ...state,
        modalUserEdit: action.payload,
      };
    case ACTIONS.ROW_DATA_SET:
      return {
        ...state,
        rowData: action.payload,
      };
    case ACTIONS.SET_ACTIVE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

export default ModuleRudecer;
