import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../components/CnxDialog";
import { CnxTable } from "../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { axiosInstance } from "../../../../http/axiosInstance";
import { _DELETE, _GET } from "../../routes";
import { IPagination } from "../../routes/types";

function Table() {
  const { dispacth, loadingTable, tableData }: any = useContext(UseContext);
  const CNX_ID_LIST = useId();
  const CNX_ID_DELETE = useId();
  const CNX_ID_CONFIRM = useId();
  const rowDataRef: any = useRef([]);

  async function getList({ PageSize, PageNumber }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET({ PageSize, PageNumber }));
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: data,
      });
    } catch (err: any) {
      console.error('ERRO', err)
      const modal: any = document.getElementById(CNX_ID_LIST);
      modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  useEffect(() => {
    getList({ PageSize: 100 });
  }, []);

  const head = {
    id: 'id',
    plate: 'Placa',
    vehicle: 'Veículo',
    model: 'Modelo',
    nominalCapacity: 'Capacidade Nominal m³',
    realCapacity: 'Capacidade Real m³',
    efLogistic: 'EfLogística',
    strIsActived: 'Situação'
  };

  const data = [
    {
      id: 1,
      plate: 'IJN-2375',
      model: 'Modelo 1',
      status: 1
    },     
    {
      id: 2,
      plate: 'HDJ-7835',
      model: 'Modelo 2',
      status: 1
    },     
    {
      id: 3,
      plate: 'KDZ-9D02',
      model: 'Modelo 3',
      status: 1
    },     
    {
      id: 4,
      plate: 'PIP-3187',
      model: 'Modelo 4',
      status: 1
    },     
  ];

  const refreshList = () => {
    getList({ PageSize: 100 });
  };

  async function deleteRecords() {
    const ids = rowDataRef.current.map((item: any) => item?.id)
    try {
      await axiosInstance(_DELETE(ids));
      getList({ PageSize: 100 });
    } catch (err: any) {
      console.error(err)
      const modal: any = document.getElementById(CNX_ID_DELETE);
      modal?.showModal();
    } finally {
      const modal: any = document.getElementById(CNX_ID_CONFIRM);
      modal?.close();
    }
  };

  const deleteButton = async () => {
    if (rowDataRef.current.length < 1 || !rowDataRef.current) return
    const modal: any = document.getElementById(CNX_ID_CONFIRM);
    modal?.showModal();
  };

  const customTdFunction = [
    {
      key: "id",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <button
            type="button"
            className="cnx-add-area-record-th-number-link"
            onClick={() => openEditModal(rowData)}
          >
            <span className="searchable">{tdValue || ""}</span>
          </button>
        );
      },
    },
    {
      key: "nominalCapacity",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
            <span className="searchable">{`${tdValue || ""} m³`}</span>
        );
      },
    },
    {
      key: "realCapacity",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
            <span className="searchable">{`${tdValue || ""} m³`}</span>
        );
      },
    },
    {
      key: "efLogistic",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
            <span className="searchable">{`${tdValue || ""}%`}</span>
        );
      },
    },
  ];

  const actionButton = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: true,
    });
  };

  const openEditModal = (rowData: any) => {
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: true,
    });
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: rowData,
    });
  };

  const handleRowsChecked = (data: any) => {
    rowDataRef.current = data;
  };

  const handlePagination = (dataPage: any) => {
    if (dataPage === "first") {
      if (tableData?.pageNumber === 1) return;
      getList({ PageSize: 100, PageNumber: 1 });
    }
    if (dataPage === "previous") {
      if (tableData?.pageNumber === 1) return;
      getList({ PageSize: 100, PageNumber: tableData?.pageNumber - 1 });
    }
    if (dataPage === "next") {
      if (tableData?.pageNumber === tableData?.totalPages) return;
      getList({ PageSize: 100, PageNumber: tableData?.pageNumber + 1 });
    }
    if (dataPage === "last") {
      if (tableData?.pageNumber === tableData?.totalPages) return;
      getList({ PageSize: 100, PageNumber: tableData?.totalPages });
    }
  };

  const summaryPagination = {
    currentPage: tableData?.pageNumber,
    pageCount: tableData?.totalPages,
    itemCount: tableData?.totalItems,
  };


  return (
    <div className="cnx-modules-main-container-cmmc">
      <CnxDialog
        useId={CNX_ID_LIST}
        type="error"
        content={{ title: "Error", message: "Não foi possível listar a tabela" }}
      />
      <CnxDialog
        useId={CNX_ID_DELETE}
        type="error"
        content={{ title: "Error", message: "Não foi possível deletar o registro(s)." }}
      />
      <CnxDialog
        useId={CNX_ID_CONFIRM}
        type="warning"
        content={{ title: "Atenção!", message: "Deseja realmente deletar o(s) registro(s)." }}
        confirmButton={() => deleteRecords()}
        cancelButton={() => null}
      />
      <CnxTable
        title="Carretas"
        data={tableData?.items || []}
        head={head}
        isLoading={loadingTable}
        reOrderColumn
        refreshTable={refreshList}
        checkable
        customTdFunction={customTdFunction}
        hoverEffect
        enableSummary
        rowsChecked={handleRowsChecked}
        actionButton={actionButton}
        deleteButton={() => deleteButton()}
        enablePagination={handlePagination}
        summaryPagination={summaryPagination}
      />
    </div>
  );
}

export default Table;
