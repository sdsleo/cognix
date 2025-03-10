import React, { ReactNode } from "react";
import { IRouteContext } from "./types";
import ModuleRudecer from "./moduleRudecer";

interface PropsUserContext {
  children: ReactNode;
}

const initValue = {
  tableData: [],
  loadingTable: false,
  saving: false,
  addModal: false,
  editModal: false,
  enumeratos: {},
  rowData: [],
  dispacth: () => {},
};

export const UseContext = React.createContext<IRouteContext>(initValue);

export const ContextProvider = ({ children }: PropsUserContext) => {
  const [state, dispacth] = React.useReducer(ModuleRudecer, initValue);

  return (
    <UseContext.Provider
      value={{
        tableData: state.tableData,
        loadingTable: state.loadingTable,
        enumeratos: state.enumeratos,
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
