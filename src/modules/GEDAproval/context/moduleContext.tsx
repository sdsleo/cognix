import React, { ReactNode } from "react";
import { IUserContext } from "./types";
import ModuleRudecer from "./moduleRudecer";

interface PropsUserContext {
  children: ReactNode;
}

const initValue = {
  dataTable: [],
  dataPagination: [],
  modalUserAdd: false,
  modalUserEdit: false,
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
        dataTable: state.dataTable,
        dataPagination: state.dataPagination,
        modalUserAdd: state.modalUserAdd,
        modalUserEdit: state.modalUserEdit,
        page: state.page,
        rowData: state.rowData,
        dispacth,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};
