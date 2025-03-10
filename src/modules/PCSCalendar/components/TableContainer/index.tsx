import { useEffect, useContext, useId, useRef, useState } from "react";
import { CnxTable } from "../../../../components/CnxTable";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import useFetch from "../../../../hooks/useFetch";
import { _DELETE, _GET } from "../../routes";
import "./styles.css";
import CnxDialog from "../../../../components/CnxDialog";
import useFormatDate from "../../../../hooks/useFormatDate";
import useFormatOnlyDate from "../../../../hooks/useFormatOnlyDate";
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
  const [eventList, setEventList]: any = useState([]);

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
    } catch (err) {
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  useEffect(() => {
    getList({PageSize: 100})
  }, []);

  const head = {
    id: "id",
    name: "Nome",
    description: "Descrição",
    date: "Data da inclusão",
    dueDate: "Data de validade",
    value: "Valor",
    strBase: "Base",
    isActived: "Situação",
  };

  // const data: any = [];
  const data = [
    {
      id: 1,
      name: "PCS 01",
      description: "Laudo PCS POJUCA",
      date: "2023-11-06T10:30:00",
      dueDate: "2023-11-07T10:30:00",
      value: 2.5,
      isActived: 1,
      baseId: 10003,
    },
    {
      id: 2,
      name: "PCS 02",
      description: "Laudo PCS POJUCA",
      date: "2023-11-07T10:30:00",
      dueDate: "2023-11-08T10:30:00",
      value: 2.5,
      isActived: 1,
      baseId: 10003,
    },
    {
      id: 3,
      name: "PCS 03",
      description: "Laudo PCS POJUCA",
      date: "2023-11-08T10:30:00",
      dueDate: "2023-11-09T10:30:00",
      value: 2.5,
      isActived: 1,
      baseId: 10003,
    },
  ];

  useEffect(() => {
    setEventList(data);
  }, []);

  const refreshList = () => {
    getList({PageSize: 100})
  };

  const closeDeleteConfirm = () => {
    const modal: any = document.getElementById(CNX_ID_CONFIRM);
    modal?.close();
  };

  async function deleteRecords() {
    const ids = rowDataRef.current.map((item: any) => item?.id);
    try {
      await axiosInstance(_DELETE(ids));
      getList({ PageSize: 100 });
    } catch (err: any) {
      console.log("ERRO", err);
    } finally {
      closeDeleteConfirm();
    }
  }

  const deleteButton = async () => {
    if (rowDataRef.current.length < 1 || !rowDataRef.current) return;
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
      key: "documentId",
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
      key: "isActived",
      func: (dataTd: any) => {
        const status = dataTd === 1 ? "Ativo" : "Inativo";
        return <span className="searchable">{status}</span>;
      },
    },
    {
      key: "date",
      func: (dataTd: any) => {
        return <span style={{fontSize: '1rem'}} className="searchable">{useFormatOnlyDate(dataTd)}</span>;
      },
    },
    {
      key: "dueDate",
      func: (dataTd: any) => {
        return <span style={{fontSize: '1rem'}} className="searchable">{useFormatOnlyDate(dataTd)}</span>;
      },
    },
    {
      key: "strBase",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return <span style={{fontSize: '1rem'}} className="searchable">{rowValue?.customBase?.name}</span>;
      },
    },
  ];

  return (
    <>
      <CnxDialog
        useId={CNX_ID_LIST}
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível listar a tabela",
        }}
      />
      <CnxDialog
        useId={CNX_ID_DELETE}
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível deletar o registro(s).",
        }}
      />
      <CnxDialog
        useId={CNX_ID_CONFIRM}
        type="warning"
        content={{
          title: "Atenção!",
          message: "Deseja realmente deletar o(s) registro(s).",
        }}
        confirmButton={() => deleteRecords()}
        cancelButton={() => null}
      />
      <CnxTable
        title="Calendário PCS"
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
      />
    </>
  );
}

export default Table;
