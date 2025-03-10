import React, { ReactNode } from "react";
import { IClientContext } from "./types";
import ModuleRudecer from "./moduleRudecer";

interface PropsUserContext {
  children: ReactNode;
}

const initValue = {
  tableData: [],
  loadingTable: false,
  enumerators: {},
  saving: false,
  addModal: false,
  editModal: false,
  rowData: [],
  dispacth: () => {},
};

export const UseContext = React.createContext<IClientContext>(initValue);

export const ContextProvider = ({ children }: PropsUserContext) => {
  const [state, dispacth] = React.useReducer(ModuleRudecer, initValue);

  return (
    <UseContext.Provider
      value={{
        tableData: state.tableData,
        loadingTable: state.loadingTable,
        enumerators: state.enumerators,
        saving: state.saving,
        addModal: state.addModal,
        editModal: state.editModal,
        rowData: state.rowData,
        dispacth,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};
