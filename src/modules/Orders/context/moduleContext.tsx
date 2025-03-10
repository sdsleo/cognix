import React, { ReactNode } from "react";
import { IOrdersContext } from "./types";
import ModuleRudecer from "./moduleRudecer";

interface PropsUserContext {
  children: ReactNode;
}

const initValue = {
  tableData: [],
  enumerators: {},
  enumeratorsElipse: {},
  enumeratorsTramos: [],
  loadingTable: false,
  orderId: null,
  orderById: null,
  parentsData: null,
  orderOperationId: null,
  angeLiraResultId: null,
  operationData: [],
  elipseResultData: null,
  angeLiraResultData: [],
  angeLiraLogsResultData: [],
  saving: false,
  addModal: false,
  editModal: false,
  editOperationModal: false,
  editAllModal: false,
  addAngeLiraResultsModal: false,
  editAngeLiraResultsModal: false,
  editElipseResultsModal: false,
  page: 'orders',
  rowData: [],
  rowDataOperation: [],
  rowDataAngeLira: [],
  rowDataElipse: [],
  rowIds: [],
  appliedFilters: [],
  operationParamsData: null,
  dispacth: () => {},
};

export const UseContext = React.createContext<IOrdersContext>(initValue);

export const ContextProvider = ({ children }: PropsUserContext) => {
  const [state, dispacth] = React.useReducer(ModuleRudecer, initValue);

  return (
    <UseContext.Provider
      value={{
        tableData: state.tableData,
        enumerators: state.enumerators,
        enumeratorsElipse: state.enumeratorsElipse,
        enumeratorsTramos: state.enumeratorsTramos,
        loadingTable: state.loadingTable,
        orderId: state.orderId,
        orderById: state.orderById,
        parentsData: state.parentsData,
        orderOperationId: state.orderOperationId,
        angeLiraResultId: state.angeLiraResultId,
        operationData: state.operationData,
        elipseResultData: state.elipseResultData,
        angeLiraResultData: state.angeLiraResultData,
        angeLiraLogsResultData: state.angeLiraLogsResultData,
        saving: state.saving,
        addModal: state.addModal,
        editModal: state.editModal,
        editOperationModal: state.editOperationModal,
        editAllModal: state.editAllModal,
        addAngeLiraResultsModal: state.addAngeLiraResultsModal,
        editAngeLiraResultsModal: state.editAngeLiraResultsModal,
        editElipseResultsModal: state.editElipseResultsModal,
        page: state.page,
        rowData: state.rowData,
        rowDataOperation: state.rowDataOperation,
        rowDataAngeLira: state.rowDataAngeLira,
        rowDataElipse: state.rowDataElipse,
        rowIds: state.rowIds,
        appliedFilters: state.appliedFilters,
        operationParamsData: state.operationParamsData,
        dispacth,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};
