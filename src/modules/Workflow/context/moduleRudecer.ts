import { ACTIONS } from "./moduleActions";

const ModuleRudecer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.SET_TABLE_DATA_USER:
      return {
        ...state,
        tableDataUser: action.payload?.result,
        dataPaginationUser: action.payload?.pagination,
      };
    case ACTIONS.LOADING_TABLE_USER:
      return {
        ...state,
        loadingTableUser: action.payload,
      };
    case ACTIONS.SAVING_USER:
      return {
        ...state,
        savingUser: action.payload,
      };
    case ACTIONS.ADD_MODAL_USER:
      return {
        ...state,
        addModalUser: action.payload,
      };
    case ACTIONS.EDIT_MODAL_USER:
      return {
        ...state,
        editModalUser: action.payload,
      };
    case ACTIONS.ADD_MODAL_USER_SKILLS:
      return {
        ...state,
        addModalUserSkills: action.payload,
      };
    case ACTIONS.EDIT_MODAL_USER_SKILLS:
      return {
        ...state,
        editModalUserSkills: action.payload,
      };
    case ACTIONS.SET_ROW_DATA:
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
