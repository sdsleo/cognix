import React, { ReactNode } from "react";
import { IUserGroupsContext } from "./types";
import ModuleRudecer from "./moduleRudecer";

interface PropsUserContext {
  children: ReactNode;
}

const initValue = {
  tableData: [],
  dataPagination: [],
  loadingTable: false,
  groupId: null,
  groupGrantData: [],
  saving: false,
  addModal: false,
  editModal: false,
  page: 'groups',
  rowData: [],
  dispacth: () => {},
};

export const UseContext = React.createContext<IUserGroupsContext>(initValue);

export const ContextProvider = ({ children }: PropsUserContext) => {
  const [state, dispacth] = React.useReducer(ModuleRudecer, initValue);

  return (
    <UseContext.Provider
      value={{
        tableData: state.tableData,
        dataPagination: state.dataPagination,
        loadingTable: state.loadingTable,
        groupId: state.groupId,
        groupGrantData: state.groupGrantData,
        saving: state.saving,
        addModal: state.addModal,
        editModal: state.editModal,
        page: state.page,
        rowData: state.rowData,
        dispacth,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};
