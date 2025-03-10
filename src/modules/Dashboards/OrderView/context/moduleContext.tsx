import React, { ReactNode } from "react";
import { ILogisticMonitoring } from "./types";
import ModuleRudecer from "./moduleRudecer";

interface PropsUserContext {
  children: ReactNode;
}

const initValue = {
  dashBoardData: [],
  filters: [],
  enumerators: {},
  operationsEnumerators: [],
  page: 'main',
  loading: false,
  autoRefresh: false,
  timeToRefresh: 30000,
  modalOpen: false,
  operationData: null,
  saving: false,
  dispacth: () => {},
};

export const UseContext = React.createContext<ILogisticMonitoring>(initValue);

export const ContextProvider = ({ children }: PropsUserContext) => {
  const [state, dispacth] = React.useReducer(ModuleRudecer, initValue);

  return (
    <UseContext.Provider
      value={{
        dashBoardData: state.dashBoardData,
        filters: state.filters,
        page: state.page,
        enumerators: state.enumerators,
        operationsEnumerators: state.operationsEnumerators,
        loading: state.loading,
        autoRefresh: state.autoRefresh,
        timeToRefresh: state.timeToRefresh,
        modalOpen: state.modalOpen,
        operationData: state.operationData,
        saving: state.saving,
        dispacth,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};
