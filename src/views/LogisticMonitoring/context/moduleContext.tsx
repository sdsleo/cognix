import React, { ReactNode } from "react";
import { ILogisticMonitoring } from "./types";
import ModuleRudecer from "./moduleRudecer";

interface PropsUserContext {
  children: ReactNode;
}

const initValue = {
  dashBoardData: [],
  baseData: [],
  ganttData: [],
  viewMode: null,
  viewModeBase: 'comp',
  viewModeClient: 'decomp',
  baseId: null,
  clientId: null,
  baseName: '',
  clientName: '',
  page: 'main',
  loading: false,
  autoRefresh: false,
  timeToRefresh: 30000,
  saving: false,
  rowData: [],
  dispacth: () => {},
};

export const UseContext = React.createContext<ILogisticMonitoring>(initValue);

export const ContextProvider = ({ children }: PropsUserContext) => {
  const [state, dispacth] = React.useReducer(ModuleRudecer, initValue);

  return (
    <UseContext.Provider
      value={{
        dashBoardData: state.dashBoardData,
        viewMode: state.viewMode,
        viewModeBase: state.viewModeBase,
        viewModeClient: state.viewModeClient,
        baseId: state.baseId,
        clientId: state.clientId,
        baseName: state.baseName,
        clientName: state.clientName,
        baseData: state.baseData,
        ganttData: state.ganttData,
        page: state.page,
        loading: state.loading,
        saving: state.saving,
        autoRefresh: state.autoRefresh,
        timeToRefresh: state.timeToRefresh,
        rowData: state.rowData,
        dispacth,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};
