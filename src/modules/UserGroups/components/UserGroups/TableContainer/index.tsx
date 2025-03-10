import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../../components/CnxDialog";
import { CnxTable } from "../../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../../context/moduleContext";
import { ACTIONS } from "../../../context/moduleActions";
import { axiosInstance } from "../../../../../http/axiosInstance";
import { _DELETE, _GET } from "../../../routes";
import { IPagination } from "../../../routes/types";

function Table() {
  const { dispacth, tableData, loadingTable } = useContext(UseContext);
  const dialogModalDelete = useId();
  const dialogModalError = useId();
  const rowsCheckedRef: any = useRef(null);

  useEffect(() => {
    getList({PageSize: 100})
  }, []);

  const head = {
    id: "id",
    code: "Código",
    description: "Descrição",
    strSituation: "Permissões",
    isActived: "Situação",
  };

  const refreshList = () => {
    getList({PageSize: 100})
  };

  const rowClick = (rowData: any) => {
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: rowData,
    });
  };

  const handleRowsChecked = (data: any) => {
    rowsCheckedRef.current = data;
  };

  const openDeleteConfirm = () => {
    const modal: any = document.getElementById(dialogModalDelete);
    modal?.showModal();
  };

  const closeDeleteConfirm = () => {
    const modal: any = document.getElementById(dialogModalDelete);
    modal?.close();
  };

  const openError = () => {
    const modal: any = document.getElementById(dialogModalError);
    modal?.showModal();
  };

  const closeError = () => {
    const modal: any = document.getElementById(dialogModalError);
    modal?.close();
  };

  async function DeleteRecords() {
    const ids = rowsCheckedRef.current.map((item: any) => item?.id)
    try {
      await axiosInstance(_DELETE(ids));
      getList({ PageSize: 100 });
    } catch (err: any) {
      console.log('ERRO', err)
    } finally {
      closeDeleteConfirm()
    }
  };

  const toPermission = (groupId: number, rowData: any) => {
    dispacth({
      type: ACTIONS.SET_GROUP_ID,
      payload: groupId,
    });
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: "permissions",
    });
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: rowData,
    });
  };


  const customTdFunction = [
    {
      key: "id",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <button
            type="button"
            className="cnx-add-area-record-th-number-link"
            onClick={() => handleDialogEdit(rowData)}
          >
            <span className="searchable">{tdValue}</span>
          </button>
        );
      },
    },
    {
      key: "strSituation",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <button
            type="button"
            className="cnx-add-area-record-th-number-link"
            onClick={() => toPermission(rowData?.id, rowData)}
          >
            <span className="searchable">Gerenciar Permissões</span>
          </button>
        );
      },
    },
    {
      key: "isActived",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        const status = tdValue === 1 ? "Ativo" : "Inativo";
        return <span className="searchable">{status}</span>;
      },
    },
  ];

  const handleDialogAdd = () => {
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {},
    });
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: true,
    });
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
  };

  const handleDialogEdit = (rowData: any) => {
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {},
    });
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: true,
    });
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
  };


  const csvExportUsersExemple = {
    urlRequest: "http://api/csvimport",
    title: "Template Operacao",
    head: {
      code: "code",
      name: "name",
      description: "description",
      starttime: "starttime",
      endtime: "endtime",
    },
    rows: [
      {
        code: "C001",
        name: "RAYBAN",
        description: "DESCRICAO_RAYBAN",
        starttime: "01/01/2022",
        endtime: "30/03/2022",
      },
      {
        code: "C002",
        name: "OKLAY",
        description: "DESCRICAO_OKLAY",
        starttime: "01/01/2022",
        endtime: "30/03/2022",
      },
      {
        code: "C003",
        name: "CHILLI_BEANS",
        description: "DESCRICAO_CHILLI_BEANS",
        starttime: "01/01/2022",
        endtime: "30/03/2022",
      },
    ],
  };

  async function getList({ PageSize, PageNumber }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET({PageSize, PageNumber}));
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: data,
      });
    } catch (err) {
      console.error(err)
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  const handlePagination = (dataPage: any) => {
    if (dataPage === "first") {
      if (tableData?.pageNumber === 1) return;
      getList({PageSize: 100, PageNumber: 1})
    }
    if (dataPage === "previous") {
      if (tableData?.pageNumber === 1) return;
      getList({PageSize: 100, PageNumber: tableData?.pageNumber - 1})
    }
    if (dataPage === "next") {
      if (tableData?.pageNumber === tableData?.totalPages) return;
      getList({PageSize: 100, PageNumber: tableData?.pageNumber + 1})
    }
    if (dataPage === "last") {
      if (tableData?.pageNumber === tableData?.totalPages) return;
      getList({PageSize: 100, PageNumber: tableData?.totalPages})
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
        useId={dialogModalDelete}
        type="warning"
        content={{
          title: "Atenção!",
          message: "Deseja realmente excluir este(s) registro(s)?",
        }}
        cancelButton={() => null}
        confirmButton={() => DeleteRecords()}
      />
      <CnxDialog
        useId={dialogModalError}
        type="error"
        content={{
          title: "Erro!",
          message: "Não foi possível salvar o registro",
        }}
      />
      <CnxTable
        title="Grupo de Usuários"
        data={tableData?.items || []}
        head={head}
        isLoading={loadingTable}
        reOrderColumn
        refreshTable={refreshList}
        enableRowClick={rowClick}
        checkable
        enablePagination={handlePagination}
        summaryPagination={summaryPagination}
        customTdFunction={customTdFunction}
        hoverEffect
        enableSummary
        rowsChecked={handleRowsChecked}
        actionButton={handleDialogAdd}
        deleteButton={openDeleteConfirm}
      />
    </div>
  );
}

export default Table;
