import { useEffect, useContext, useId, useRef } from "react";
import { CnxTable } from "../../../../components/CnxTable";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import useFetch from "../../../../hooks/useFetch";
import { _DELETE, _GET, _PUT_ALL } from "../../routes";
import "./styles.css";
import CnxDialog from "../../../../components/CnxDialog";
import { IPagination } from "../../routes/types";
import { axiosInstance } from "../../../../http/axiosInstance";

function Table() {
  const CNX_ID_LIST = useId();
  const CNX_ID_DELETE = useId();
  const CNX_ID_CONFIRM = useId();

  const { dispacth, loadingTable, tableData }: any = useContext(UseContext);

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
      console.error(err)
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
    name: "Nome",
    code: "Código",
    latitude: "Latitude",
    longitude: "Longitude",
    qtyTramos: "Qtd Tramos",
    strOperationType: "Tipo Operação",
    maxFlow: "Vazão Máxima m³/h",
    qtyParkingSpaces: "Qtd Vagas Estacionamento",
    transportCost: "Custo Transporte",
    operationCost: "Custo Operacional",
    strIsActived: "Situação",
  };


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

  const rowDeleteAction = async (data: any) => {
    rowDataRef.current = [data];
    const modal: any = document.getElementById(CNX_ID_CONFIRM);
    modal?.showModal();
  };
  const rowEditAction = async (data: any) => {
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
      payload: data,
    });
    
  };

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

  async function editAll(isActived: number) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    const ids = rowDataRef.current.map((item: any) => item?.id)
    try {
      const { data } = await axiosInstance(
        _PUT_ALL({
          ids: ids,
          isActived: isActived,
        })
      );
      getList({ PageSize: 100 });
    } catch (err) {
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  const handleRowsChecked = (data: any) => {
    rowDataRef.current = data;
  };

  const customTdFunction = [
    {
      key: "name",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <button
            type="button"
            className="cnx-add-area-record-th-number-link"
            onClick={() => openEditModal(rowValue)}
          >
            <span className="searchable">{tdValue || "" }</span>
          </button>
        );
      },
    },
    {
      key: "operationType",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        const status = tdValue === 1 ? "Simples" : "Duplo";
        return <span style={{fontSize: '14px'}} className="searchable">{status}</span>;
      },
    },
    {
      key: "maxFlow",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return <span style={{fontSize: '14px'}} className="searchable">{`${tdValue || ""} m³/h"`}</span>;
      },
    },
    {
      key: "transportCost",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return <span style={{fontSize: '14px'}} className="searchable">{`R$ ${tdValue || ""}`}</span>;
      },
    },
    {
      key: "operationCost",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return <span style={{fontSize: '14px'}} className="searchable">{`R$ ${tdValue || ""}`}</span>;
      },
    },
  ];

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
    <>
      <CnxDialog
        useId={CNX_ID_LIST}
        type="error"
        content={{ title: "Error", message: "Não foi possível listar a tabela" }}
      />
      <CnxDialog
        useId={CNX_ID_DELETE}
        type="error"
        content={{ title: "Error", message: "Não foi possível deletar o(s) registro(s)." }}
      />
      <CnxDialog
        useId={CNX_ID_CONFIRM}
        type="warning"
        content={{ title: "Atenção!", message: "Deseja realmente deletar o(s) registro(s)." }}
        confirmButton={() => deleteRecords()}
        cancelButton={() => null}
      />
      <CnxTable
        title="Bases"
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
        // deleteAllButton={deleteButton}
        // activeAllButton={() => editAll(1)}
        // inactiveAllButton={() => editAll(0)}
        // rowActions
        // rowEditAction={rowEditAction}
        // rowDeleteAction={rowDeleteAction}
      />
    </>
  );
}

export default Table;
