import { useEffect, useContext, useId, useRef } from "react";
import { CnxTable } from "../../../../components/CnxTable";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import CnxDialog from "../../../../components/CnxDialog";
import "./styles.css";

function Table() {
  const CNX_ID_LIST = useId();
  const CNX_ID_DELETE = useId();
  const CNX_ID_CONFIRM = useId();
  
  const { localesData } = useContext<ILocales>(localesContex);
  
  const { dispacth, loadingTable, tableData }: any = useContext(UseContext);

  const rowDataRef: any = useRef([]);

  useEffect(() => {
    // getTableData();
  }, []);

  const head = {
    column1: "Column 1",
    column2: "Column 2",
    column3: "Column 3",
    column4: "Column 4",
    column5: "Column 5",
  };

  const data = [
    {
      column1: "td1 row1",
      column2: "td2 row1",
      column3: "td3 row1",
      column4: "td4 row1",
      column5: 1,
    },
    {
      column1: "td1 row2",
      column2: "td2 row2",
      column3: "td3 row2",
      column4: "td4 row2",
      column5: 2,
    },
    {
      column1: "td1 row3",
      column2: "td2 row3",
      column3: "td3 row3",
      column4: "td4 row3",
      column5: 1,
    },
    {
      column1: "td1 row4",
      column2: "td2 row4",
      column3: "td3 row4",
      column4: "td4 row4",
      column5: 2,
    },
    {
      column1: "td1 row5",
      column2: "td2 row5",
      column3: "td3 row5",
      column4: "td4 row5",
      column5: 1,
    },
  ];

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

  const refreshList = () => {
    // getTableData();
  };

  const deleteRecords = async () => {
    // deleteRecords()
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
      key: "column1",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <button
            type="button"
            className="cnx-text-decoration-link"
            onClick={() => openEditModal(rowData)}
          >
            <span className="searchable">{tdValue}</span>
          </button>
        );
      },
    },
    {
      key: "column5",
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
        title="DefaultModule"
        data={data || []}
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
