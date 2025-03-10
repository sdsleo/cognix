import { ACTIONS } from "./moduleActions";

const ModuleRudecer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.SET_DASHBOARD_DATA:
      return {
        ...state,
        dashBoardData: action.payload,
      };
    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case ACTIONS.SET_ENUMERATORS:
      return {
        ...state,
        enumerators: action.payload,
      };
    case ACTIONS.SET_ACTIVE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case ACTIONS.LOADING:
      return {
        ...state,
        loading: action.payload,
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
