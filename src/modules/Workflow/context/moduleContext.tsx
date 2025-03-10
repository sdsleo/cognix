import React, { ReactNode } from "react";
import { IModuleContext } from "./types";
import ModuleRudecer from "./moduleRudecer";

interface PropsUserContext {
  children: ReactNode;
}

const initValue = {
  tableDataUser: [],
  dataPaginationUser: [],
  loadingTableUser: false,
  savingUser: false,
  addModalUser: false,
  editModalUser: false,
  addModalUserSkills: false,
  editModalUserSkills: false,
  page: 'flowList',
  rowData: [],
  dispacth: () => {},
};

export const UseContext = React.createContext<IModuleContext>(initValue);

export const ContextProvider = ({ children }: PropsUserContext) => {
  const [state, dispacth] = React.useReducer(ModuleRudecer, initValue);

  return (
    <UseContext.Provider
      value={{
        tableDataUser: state.tableDataUser,
        dataPaginationUser: state.dataPagination,
        loadingTableUser: state.loadingTableUser,
        savingUser: state.savingUser,
        addModalUser: state.addModalUser,
        editModalUser: state.editModalUser,
        addModalUserSkills: state.addModalUserSkills,
        editModalUserSkills: state.editModalUserSkills,
        page: state.page,
        rowData: state.rowData,
        dispacth,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};
