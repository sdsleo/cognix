import { useEffect, useContext, useId, useRef, useState } from "react";
import { CnxTable } from "../../../../../components/CnxTable";
import { UseContext } from "../../../context/moduleContext";
import { ACTIONS } from "../../../context/moduleActions";
import localesContex from "../../../../../context/localesContex";
import { ILocales } from "../../../../../locales/types";
import useFetch from "../../../../../hooks/useFetch";
import { _DELETE, _GET } from "../../routes";
import "./styles.css";
import CnxDialog from "../../../../../components/CnxDialog";

function Table() {
  const CNX_ID_LIST = useId();
  const CNX_ID_DELETE = useId();
  const CNX_ID_CONFIRM = useId();
  const { request } = useFetch();
  const { localesData } = useContext<ILocales>(localesContex);
  const { dispacth, loadingTable, tableData }: any = useContext(UseContext);
  const rowDataRef: any = useRef([]);

  const [dataMaster, setDataMaster] = useState([])

  const getTableData = async () => {
    const { url, options } = _GET();
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });

    const { response, json } = await request(url, options);



    setDataMaster(json.items)

    if (response?.ok) {
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: json,
      });
    } else {
      console.log("ERROR", response);
      const modal: any = document.getElementById(CNX_ID_LIST);
      modal?.showModal();
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: [],
      });
    }

    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: false,
    });
  };

  useEffect(() => {
    getTableData();
  }, []);

  const head = {
    id: 'id',
    code: 'Código',
    name: 'Nome',
    description: 'Descrição',
    hourStart: 'Hora Início',
    hourEnd: 'Hora Fim',
    loop: 'Repetição',
    rowStatus: 'Situação'
  };

  const data = [
    {
      id: 1,
      code: 'T1',
      name: 'Turno 1',
      desc: 'Primeiro turno',
      hourStart: '06:00',
      hourEnd: '17:00',
      loop: 'Segunda a Sexta',
      status: 1
    }
  ]

  const refreshList = () => {
    getTableData();
  };

  const deleteRecords = async () => {
    const ids: any[] = rowDataRef.current.map((item: any) => {
      return item.id;
    });
    const { url, options } = _DELETE(ids);

    const { response, json } = await request(url, options);

    if (response?.ok) {
      getTableData();
    } else {
      console.log("ERROR", response);
      const modal: any = document.getElementById(CNX_ID_DELETE);
      modal?.showModal();
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



    if(tableData.items ){

      const dados = dataMaster.find((item:any) => item.id === rowData.id)

      console.log(dados)
      ///@ts-ignore
      window.turnData = dados
    }
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
      key: "rowStatus",
      func: (dataTd: any,  keyValue: string, rowData: any) => {
        // console.log(rowData)
        const status = dataTd === 1 ? "Ativo" : "Inativo";
        return <span className="searchable">{status}</span>;
      },
    },
  ];
 
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
        title="Turnos"
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
