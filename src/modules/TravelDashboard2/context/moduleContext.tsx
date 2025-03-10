import React, { ReactNode } from "react";
import { ILogisticMonitoring } from "./types";
import ModuleRudecer from "./moduleRudecer";

interface PropsUserContext {
  children: ReactNode;
}

const initValue = {
  dashBoardData: [],
  page: 'main',
  loading: false,
  saving: false,
  rowData: [],
  filters: [],
  autoRefresh: false,
  timeToRefresh: 30000,
  enumerators: {},
  dispacth: () => {},
};

export const UseContext = React.createContext<ILogisticMonitoring>(initValue);

export const ContextProvider = ({ children }: PropsUserContext) => {
  const [state, dispacth] = React.useReducer(ModuleRudecer, initValue);

  return (
    <UseContext.Provider
      value={{
        dashBoardData: state.dashBoardData,
        page: state.page,
        loading: state.loading,
        saving: state.saving,
        rowData: state.rowData,
        filters: state.filters,
        autoRefresh: state.autoRefresh,
        timeToRefresh: state.timeToRefresh,
        enumerators: state.enumerators,
        dispacth,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};
