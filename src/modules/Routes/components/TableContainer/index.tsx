import { useEffect, useContext, useId, useRef } from "react";
import { CnxTable } from "../../../../components/CnxTable";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import useFetch from "../../../../hooks/useFetch";
import { _DELETE, _GET } from "../../routes";
import "./styles.css";
import CnxDialog from "../../../../components/CnxDialog";
import { IPagination } from "../../routes/types";
import { axiosInstance } from "../../../../http/axiosInstance";

function Table() {
  const CNX_ID_LIST = useId();
  const CNX_ID_DELETE = useId();
  const CNX_ID_CONFIRM = useId();
  const { request } = useFetch();
  const { localesData } = useContext<ILocales>(localesContex);
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
    id: "id",
    base: "Base",
    client: "Cliente",
    distanceToClient: "Distância Translado Km",
    scheduleTime: "Duração Programada",
    estimatedFuelConsumption: "Consumo Combustível",
    strIsActived: "Situação",
  };

  const data = [
    {
      id: 1,
      base: "Pojuca",
      baseId: 1,
      cliente: "Bracell",
      distanciaTranslado: "45 km",
      duracaoProgramada: "54 min",
      consumoCombustivel: "76 litros",
      situacao: 1,
    },
    {
      id: 2,
      base: "Ouriçangas",
      baseId: 2,
      cliente: "Braskem",
      distanciaTranslado: "50 km",
      duracaoProgramada: "60 min",
      consumoCombustivel: "85 litros",
      situacao: 1,
    },
    {
      id: 3,
      base: "Nova Soure",
      baseId: 3,
      cliente: "Humildes",
      distanciaTranslado: "108 km",
      duracaoProgramada: "130 min",
      consumoCombustivel: "220 litros",
      situacao: 1,
    },
  ]

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
            <span className="searchable">{tdValue}</span>
          </button>
        );
      },
    },
    {
      key: "distanceToClient",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return <span style={{fontSize: '14px'}} className="searchable">{`${tdValue} Km`}</span>;
      },
    },
    {
      key: "scheduleTime",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return <span style={{fontSize: '14px'}} className="searchable">{`${tdValue} min`}</span>;
      },
    },
    {
      key: "estimatedFuelConsumption",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return <span style={{fontSize: '14px'}} className="searchable">{`${tdValue} litros`}</span>;
      },
    },
    {
      key: "base",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return <span className="searchable">{rowData?.base?.name}</span>;
      },
    },
    {
      key: "client",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return <span className="searchable">{rowData?.client?.name}</span>;
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
        title="Rotas"
        data={tableData.items || []}
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
    </>
  );
}

export default Table;
