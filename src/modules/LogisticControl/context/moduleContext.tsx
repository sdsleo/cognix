import React, { ReactNode } from "react";
import { IModuleContext } from "./types";
import ModuleRudecer from "./moduleRudecer";

interface PropsUserContext {
  children: ReactNode;
}

const initValue = {
  tableData: [],
  tableDataHorse: [],
  cardData: [],
  cardId: 0,
  idCard: null,
  carretaData: [],
  enumerators: {},
  enumeratorsHorse: {},
  enumeratorsOrder: {},
  enumeratorsElipse: {},
  enumeratorsTramos: {},
  loadingTable: false,
  showAll: false,
  saving: false,
  addModal: false,
  editModal: false,
  editHorseModal: false,
  editOperationModal: false,
  addAngeLiraResultModal: false,
  addElipseResultModal: false,
  cardView: 'bases',
  page: 'main',
  rowData: [],
  rowDataHorse: [],
  rowDataEvents: [],
  carretaRowData: [],
  appliedFilters: [],
  appliedHorseFilters: [],
  autoRefresh: false,
  timeToRefresh: 30000,
  dispacth: () => {},
};

export const UseContext = React.createContext<IModuleContext>(initValue);

export const ContextProvider = ({ children }: PropsUserContext) => {
  const [state, dispacth] = React.useReducer(ModuleRudecer, initValue);

  return (
    <UseContext.Provider
      value={{
        tableData: state.tableData,
        tableDataHorse: state.tableDataHorse,
        cardData: state.cardData,
        cardId: state.cardId,
        idCard: state.idCard,
        carretaData: state.carretaData,
        enumerators: state.enumerators,
        enumeratorsHorse: state.enumeratorsHorse,
        enumeratorsOrder: state.enumeratorsOrder,
        enumeratorsElipse: state.enumeratorsElipse,
        enumeratorsTramos: state.enumeratorsTramos,
        loadingTable: state.loadingTable,
        saving: state.saving,
        showAll: state.showAll,
        addModal: state.addModal,
        editModal: state.editModal,
        editHorseModal: state.editHorseModal,
        editOperationModal: state.editOperationModal,
        addAngeLiraResultModal: state.addAngeLiraResultModal,
        addElipseResultModal: state.addElipseResultModal,
        cardView: state.cardView,
        page: state.page,
        rowData: state.rowData,
        rowDataHorse: state.rowDataHorse,
        rowDataEvents: state.rowDataEvents,
        carretaRowData: state.carretaRowData,
        appliedFilters: state.appliedFilters,
        appliedHorseFilters: state.appliedHorseFilters,
        autoRefresh: state.autoRefresh,
        timeToRefresh: state.timeToRefresh,
        dispacth,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};
