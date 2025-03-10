import { ACTIONS } from "./moduleActions";

const ModuleRudecer = (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.SET_DASHBOARD_DATA:
      return {
        ...state,
        dashBoardData: action.payload,
      };
    case ACTIONS.SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload,
      };
    case ACTIONS.SET_VIEW_MODE_BASE:
      return {
        ...state,
        viewModeBase: action.payload,
      };
    case ACTIONS.SET_VIEW_MODE_CLIENT:
      return {
        ...state,
        viewModeClient: action.payload,
      };
    case ACTIONS.SET_BASE_ID:
      return {
        ...state,
        baseId: action.payload,
      };
    case ACTIONS.SET_CLIENT_ID:
      return {
        ...state,
        clientId: action.payload,
      };
    case ACTIONS.SET_ACTIVE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case ACTIONS.SET_BASE_NAME:
      return {
        ...state,
        baseName: action.payload,
      };
    case ACTIONS.SET_CLIENT_NAME:
      return {
        ...state,
        clientName: action.payload,
      };
    case ACTIONS.SET_BASE_DATA:
      return {
        ...state,
        baseData: action.payload,
      };
    case ACTIONS.SET_GANTT_DATA:
      return {
        ...state,
        ganttData: action.payload,
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
    case ACTIONS.SAVING:
      return {
        ...state,
        saving: action.payload,
      };
    case ACTIONS.SET_ROW_DATA:
      return {
        ...state,
        rowData: action.payload,
      };
    default:
      return state;
  }
};

export default ModuleRudecer;
