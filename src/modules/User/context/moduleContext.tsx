import React, { ReactNode } from "react";
import { IUserContext } from "./types";
import ModuleRudecer from "./moduleRudecer";

interface PropsUserContext {
  children: ReactNode;
}

const initValue = {
  tableDataUser: [],
  dataPaginationUser: [],
  enumerators: {},
  appliedFilters: [],
  loadingTableUser: false,
  savingUser: false,
  addModalUser: false,
  editModalUser: false,
  addModalUserSkills: false,
  editModalUserSkills: false,
  page: 'user',
  rowData: [],
  dispacth: () => {},
};

export const UseContext = React.createContext<IUserContext>(initValue);

export const ContextProvider = ({ children }: PropsUserContext) => {
  const [state, dispacth] = React.useReducer(ModuleRudecer, initValue);

  return (
    <UseContext.Provider
      value={{
        tableDataUser: state.tableDataUser,
        dataPaginationUser: state.dataPagination,
        enumerators: state.enumerators,
        appliedFilters: state.appliedFilters,
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
