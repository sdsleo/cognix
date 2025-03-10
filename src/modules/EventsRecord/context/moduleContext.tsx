import React, { ReactNode } from "react";
import { IModuleContext } from "./types";
import ModuleRudecer from "./moduleRudecer";

interface PropsUserContext {
  children: ReactNode;
}

const initValue = {
  tableData: [],
  appliedFilters: [],
  loadingTable: false,
  saving: false,
  addModal: false,
  editModal: false,
  rowData: [],
  dispacth: () => {},
};

export const UseContext = React.createContext<IModuleContext>(initValue);

export const ContextProvider = ({ children }: PropsUserContext) => {
  const [state, dispacth] = React.useReducer(ModuleRudecer, initValue);

  return (
    <UseContext.Provider
      value={{
        tableData: state.tableData,
        loadingTable: state.loadingTable,
        saving: state.saving,
        addModal: state.addModal,
        editModal: state.editModal,
        rowData: state.rowData,
        appliedFilters: state.appliedFilters,
        dispacth,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};
