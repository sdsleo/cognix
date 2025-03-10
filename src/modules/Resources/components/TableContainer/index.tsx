import { useEffect, useContext, useId, useRef } from "react";
import { CnxTable } from "../../../../components/CnxTable";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import CnxDialog from "../../../../components/CnxDialog";
import "./styles.css";
import { axiosInstance } from "../../../../http/axiosInstance";
import { _DELETE, _GET } from "../../routes";
import { IPagination } from "../../routes/types";

function Table() {
  const CNX_ID_LIST = useId();
  const CNX_ID_DELETE = useId();
  const CNX_ID_CONFIRM = useId();
  
  const { localesData } = useContext<ILocales>(localesContex);
  
  const { dispacth, loadingTable, tableData, selectedResource}: any = useContext(UseContext);

  const rowDataRef: any = useRef([]);


  const head = {
    id: "id",
    code: "Código",
    name: "Nome",
    description: "Descrição",
    baseName: "Base",
    clientName: "Cliente",
    rowStatus: "Situação",
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

  // const filterOptions = {
  //   route: "/api/Production/User/GetAll",
  //   filters: [
  //     {
  //       title: "Column 1",
  //       query: "column1",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Column 2",
  //       query: "column2",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Column 3",
  //       query: "column3",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Column 4",
  //       query: "column4",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Column 5",
  //       query: "column5",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //   ],
  // };

  useEffect(() => {
    getList({PageSize: 100})
  }, [])

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

  const refreshList = () => {
    getList({PageSize: 100})
  };

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

  const handleRowsChecked = (rows: any) => {
    rowDataRef.current = rows;
  };

  const customTdFunction = [
    {
      key: "id",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <button
            type="button"
            className="cnx-text-decoration-link cnx-first-column"
            onClick={() => openEditModal(rowData)}
          >
            <span className="searchable">{tdValue}</span>
          </button>
        );
      },
    },
    {
      key: "baseName",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return <span className="searchable">{rowValue?.customBase?.name}</span>;
      },
    },
    {
      key: "clientName",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return <span className="searchable">{rowValue?.client?.name}</span>;
      },
    },
    {
      key: "rowStatus",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        const status = tdValue === 1 ? "Ativo" : "Inativo";
        return <span className="searchable">{status}</span>;
      },
    },
  ];

  // Exemplo objeto de importação CSV
  // const csvExportDefaultModuleExemple = {
  //   urlRequest: "http://api/csvimport",
  //   title: "Template DefaultModule",
  //   head: {
  //     column1: "Column1",
  //     column2: "Column2",
  //     column3: "Column3",
  //     column4: "Column4",
  //     column5: "Column5",
  //   },
  //   rows: [
  //     {
  //       column1: "Column1",
  //       column2: "Column2",
  //       column3: "Column3",
  //       column4: "Column4",
  //       column5: "Column5",
  //     },
  //     {
  //       column1: "Column1",
  //       column2: "Column2",
  //       column3: "Column3",
  //       column4: "Column4",
  //       column5: "Column5",
  //     },
  //     {
  //       column1: "Column1",
  //       column2: "Column2",
  //       column3: "Column3",
  //       column4: "Column4",
  //       column5: "Column5",
  //     },
  //   ],
  // };

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
        title={"Tramos"}
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
        // filterButton={filterOptions} // Parâmetro para ativar os filtros por coluna
        // filterResponse={() => null} // Promise retornada apos aplica'~ao do filtro
        // csvImportButton={csvExportDefaultModuleExemple} // Adiciona o botão e a funcionalidade de importação CSV
      />
    </>
  );
}

export default Table;
