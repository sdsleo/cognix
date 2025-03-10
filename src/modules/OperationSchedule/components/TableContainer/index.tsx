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
import { axiosInstance } from "../../../../http/axiosInstance";
import { IPagination } from "../../routes/types";

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
    startDateTime: "Data Início",
    finishDateTime: "Data Fim",
    valueFactorCapacity: "Valor Capacidade",
    baseName: "Base",
    clientName: "Cliente",
    rowStatus: "Situação",
  };

  // const data = [
  //   {
  //     id: 1,
  //     name: "Manutenção corretiva Pojuca-Tramo1",
  //     description: "Manutenção corretiva Pojuca-Tramo1",
  //     startDateTime: "2023-04-08T10:30:00Z",
  //     finishDateTime: "2023-04-08T14:30:00Z",
  //     backgroundColor: "#c42e47",
  //     borderColor: "#c42e47",
  //     type: 2,
  //     status: 3,
  //     resourceId: "Pojuca-Tramo1",
  //   },
  //   {
  //     id: 2,
  //     name: "Manutenção preventiva veiculo HCJ-7635",
  //     description: "Manutenção preventiva veiculo 	HCJ-7635",
  //     startDateTime: "2023-04-14T10:30:00Z",
  //     finishDateTime: "2023-04-15T14:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 1,
  //     status: 3,
  //     resourceId: "HCJ-7635",
  //   },
  //   {
  //     id: 3,
  //     name: "Manutenção corretiva cavalo KDZ-9D02",
  //     description: "Manutenção corretiva cavalo KDZ-9D02",
  //     startDateTime: "2023-04-11T10:30:00Z",
  //     finishDateTime: "2023-04-11T14:30:00Z",
  //     backgroundColor: "#c42e47",
  //     borderColor: "#c42e47",
  //     type: 2,
  //     status: 3,
  //     resourceId: "KDZ-9D02",
  //   },
  //   {
  //     id: 4,
  //     name: "Coleta tanque para reparo",
  //     description: "Coleta do tanque biometano para reparo",
  //     startDateTime: "2023-04-11T12:30:00Z",
  //     finishDateTime: "2023-04-11T15:30:00Z",
  //     backgroundColor: "#8c8c8c",
  //     borderColor: "#8c8c8c",
  //     type: 2,
  //     status: 3,
  //     resourceId: "KXA-9X02",
  //   },
  //   {
  //     id: 5,
  //     name: "Coleta tanque para reparo",
  //     description: "Coleta do tanque biometano para reparo",
  //     startDateTime: "2023-04-25T08:30:00Z",
  //     finishDateTime: "2023-04-25T14:30:00Z",
  //     backgroundColor: "#8c8c8c",
  //     borderColor: "#8c8c8c",
  //     type: 2,
  //     status: 3,
  //     resourceId: "KDA-5X02",
  //   },
  //   {
  //     id: 6,
  //     name: "Manutenção tanque para reparo",
  //     description: "Coleta do tanque biometano para reparo",
  //     startDateTime: "2023-04-26T10:30:00Z",
  //     finishDateTime: "2023-04-26T14:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 2,
  //     status: 1,
  //     resourceId: "KJA-7X02",
  //   },
  //   {
  //     id: 7,
  //     name: "Troca de veículo",
  //     description: "Troca de veículo operação",
  //     startDateTime: "2023-04-26T11:30:00Z",
  //     finishDateTime: "2023-04-26T15:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 3,
  //     status: 1,
  //     resourceId: "KWA-1W02",
  //   },
  //   {
  //     id: 8,
  //     name: "Coleta tanque para armazenamento",
  //     description: "Coleta do tanque biometano para armazenamento",
  //     startDateTime: "2023-04-26T12:40:00Z",
  //     finishDateTime: "2023-04-26T14:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 2,
  //     status: 1,
  //     resourceId: "KDA-7X02",
  //   },
  //   {
  //     id: 9,
  //     name: "Manutenutenção de veículo",
  //     description: "Manutenutenção de veículo operação",
  //     startDateTime: "2023-04-26T13:30:00Z",
  //     finishDateTime: "2023-04-26T15:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 3,
  //     status: 1,
  //     resourceId: "IQA-6X02",
  //   },
  //   {
  //     id: 10,
  //     name: "Coleta tanque para reparo",
  //     description: "Coleta do tanque biometano para reparo",
  //     startDateTime: "2023-04-25T10:30:00Z",
  //     finishDateTime: "2023-04-25T14:30:00Z",
  //     backgroundColor: "#c42e47",
  //     borderColor: "#c42e47",
  //     type: 2,
  //     status: 4,
  //     resourceId: "KDA-7X02",
  //   },
  //   {
  //     id: 11,
  //     name: "Troca de veículo",
  //     description: "Troca de veículo operação",
  //     startDateTime: "2023-04-25T09:20:00Z",
  //     finishDateTime: "2023-04-26T15:30:00Z",
  //     backgroundColor: "#23af6e",
  //     borderColor: "#23af6e",
  //     type: 3,
  //     status: 2,
  //     resourceId: "KBA-2X02",
  //   },
  //   {
  //     id: 12,
  //     name: "Manutenção tanque Gás",
  //     description: "Manutenção tanque Gás",
  //     startDateTime: "2023-04-27T14:30:00Z",
  //     finishDateTime: "2023-04-28T14:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 1,
  //     status: 1,
  //     resourceId: "KIA-8X02",
  //   },
  //   {
  //     id: 13,
  //     name: "Coleta tanque biometano para reparo",
  //     description: "Coleta tanque biometano para reparo",
  //     startDateTime: "2023-04-28T13:20:00Z",
  //     finishDateTime: "2023-04-29T15:50:00Z",
  //     backgroundColor: "#c42e47",
  //     borderColor: "#c42e47",
  //     type: 2,
  //     status: 4,
  //     resourceId: "KDA-7X02",
  //   },
  //   {
  //     id: 14,
  //     name: "Manutenção Veículo",
  //     description: "Manutenção Veículo Carreta",
  //     startDateTime: "2023-05-04T11:00:00Z",
  //     finishDateTime: "2023-05-07T15:00:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 1,
  //     status: 1,
  //     resourceId: "KNA-1X02",
  //   },
  //   {
  //     id: 15,
  //     name: "Troca de tanque",
  //     description: "Troca de tanque operação",
  //     startDateTime: "2023-05-05T14:00:00Z",
  //     finishDateTime: "2023-05-09T15:00:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 3,
  //     status: 1,
  //     resourceId: "KDA-7X02",
  //   },
  //   {
  //     id: 16,
  //     name: "Troca de tanque",
  //     description: "Troca de tanque operação",
  //     startDateTime: "2023-05-18T14:00:00Z",
  //     finishDateTime: "2023-05-18T15:00:00Z",
  //     backgroundColor: "#c42e47",
  //     borderColor: "#c42e47",
  //     type: 3,
  //     status: 4,
  //     resourceId: "KDA-7X02",
  //   },
  //   {
  //     id: 17,
  //     name: "Troca de tanque",
  //     description: "Troca de tanque operação",
  //     startDateTime: "2023-05-20T14:00:00Z",
  //     finishDateTime: "2023-05-20T15:00:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 3,
  //     status: 1,
  //     resourceId: "KUA-6X02",
  //   },
  // ];

  const data: any = [];

  useEffect(() => {
    setEventList(data);
  }, []);

  const preventivaRef: any = useRef()
  const corretivaRef: any = useRef()
  const melhoriaRef: any = useRef()

  const filterBy = () => {
    if (preventivaRef.current.checked && corretivaRef.current.checked && melhoriaRef.current.checked) { 
      setEventList(data);
      return;
    }

    if (preventivaRef.current.checked && corretivaRef.current.checked && !melhoriaRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 1 || item.type === 2);  
      setEventList(filteredList);
      return;
    }

    if (preventivaRef.current.checked && !corretivaRef.current.checked && melhoriaRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 1 || item.type === 3);
      setEventList(filteredList);
      return;
    }

    if (preventivaRef.current.checked && !corretivaRef.current.checked && !melhoriaRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 1);
      setEventList(filteredList);
      return;
    }

    if (corretivaRef.current.checked && preventivaRef.current.checked && !melhoriaRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 2 || item.type === 1);
      setEventList(filteredList);
      return;
    }

    if (corretivaRef.current.checked && !preventivaRef.current.checked && melhoriaRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 2 || item.type === 3);
      setEventList(filteredList);
      return;
    }

    if (corretivaRef.current.checked && !preventivaRef.current.checked && !melhoriaRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 2);
      setEventList(filteredList);
      return;
    }

    if (melhoriaRef.current.checked && !corretivaRef.current.checked && preventivaRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 3 || item.type === 1);
      setEventList(filteredList);
      return;
    }

    if (melhoriaRef.current.checked && corretivaRef.current.checked && !preventivaRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 3 || item.type === 2);
      setEventList(filteredList);
      return;
    }

    if (melhoriaRef.current.checked && !corretivaRef.current.checked && !preventivaRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 3);
      setEventList(filteredList);
      return;
    }
  };

  const filterByPreventiva = () => {
    const filteredList = data.filter((item: any) => item.type === 1);
    setEventList(filteredList);
  };

  const filterByCorretiva = () => {
    const filteredList = data.filter((item: any) => item.type === 2);
    setEventList(filteredList);
  };

  const filterByMelhoria = () => {
    const filteredList = data.filter((item: any) => item.type === 3);
    setEventList(filteredList);
  };

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
      key: "startDateTime",
      func: (data: any, key: any, value: any) => {
        return <span  style={{fontSize: '0.9rem'}} className="searchable">{useFormatDate(data)}</span>;
      },
    },
    {
      key: "finishDateTime",
      func: (data: any, key: any, value: any) => {
        return <span style={{fontSize: '0.9rem'}} className="searchable">{useFormatDate(data)}</span>;
      },
    },
    {
      key: "valueFactorCapacity",
      func: (data: any, key: any, rowValue: any) => {
        return <span style={{fontSize: '0.9rem'}} className="searchable">{rowValue?.valueFactorCapacity?.toFixed(2)}</span>;
      },
    },
    {
      key: "baseName",
      func: (data: any, key: any, rowValue: any) => {
        return <span style={{fontSize: '0.9rem'}} className="searchable">{rowValue?.customBase?.name}</span>;
      },
    },
    {
      key: "clientName",
      func: (data: any, key: any, rowValue: any) => {
        return <span style={{fontSize: '0.9rem'}} className="searchable">{rowValue?.client?.name}</span>;
      },
    },
    {
      key: "rowStatus",
      func: (dataTd: any) => {
        const status = dataTd === 1 ? "Ativo" : "Inativo";
        return <span className="searchable">{status}</span>;
      },
    },

  ];

  const CustomSummary = () => {
    return (
      <div className="cnx-maintenance-schedule-summary-container-cmssc">
        {/* <div className="cnx-maintenance-schedule-summary-item-container-cmssic">
          <div className="cnx-maintenance-schedule-summary-dot-cmssd" />
          <input type="checkbox" defaultChecked />
          <span>{`Todos (${data.length})`}</span>
        </div>
        <div className="cnx-maintenance-schedule-separator-cmss" /> */}
        <div
          className="cnx-maintenance-schedule-summary-item-container-cmssic">
          <input onChange={() => filterBy()} ref={preventivaRef} defaultChecked id="cnx-input-checkbox-blue-cicb" type="checkbox" className="cnx-input-checkbox-blue-color-cicbc" />
          <label htmlFor="cnx-input-checkbox-blue-cicb" className="cnx-label-dot-calendar-cldc">Preventiva</label>
          <span>{`(${data.filter((item: any) => item.type === 1).length})`}</span>
          <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-blue-tag" />
        </div>
        <div className="cnx-maintenance-schedule-separator-cmss" />
        <div
          className="cnx-maintenance-schedule-summary-item-container-cmssic">
          <input onChange={() => filterBy()} ref={corretivaRef} defaultChecked id="cnx-input-checkbox-red-cicr" type="checkbox" className="cnx-input-checkbox-red-color-cicrc" />
          <label htmlFor="cnx-input-checkbox-red-cicr" className="cnx-label-dot-calendar-cldc">Corretiva</label>
          <span>{`(${data.filter((item: any) => item.type === 2).length})`}</span>
          <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-red-tag" />
        </div>
        <div className="cnx-maintenance-schedule-separator-cmss" />
        <div
          className="cnx-maintenance-schedule-summary-item-container-cmssic">
          <input onChange={() => filterBy()} ref={melhoriaRef} defaultChecked id="cnx-input-checkbox-green-cicg" type="checkbox" className="cnx-input-checkbox-green-color-cicgc" />
          <label htmlFor="cnx-input-checkbox-green-cicg" className="cnx-label-dot-calendar-cldc">Melhoria</label>
          <span>{`(${data.filter((item: any) => item.type === 3).length})`}</span>
          <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-green-tag" />
        </div>
      </div>
    );
  };

  const handleDotStatus = (type: any) => {
    switch (type) {
      case 1:
        return (
          <button className="cnx-maintenance-schedule-summary-item-container-cmssic">
            <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-blue-tag" />
            <span>Preventiva</span>
          </button>
        );
      case 2:
        return (
          <button className="cnx-maintenance-schedule-summary-item-container-cmssic">
            <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-red-tag" />
            <span>Corretiva</span>
          </button>
        );
      case 3:
        return (
          <button className="cnx-maintenance-schedule-summary-item-container-cmssic">
            <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-green-tag" />
            <span>Melhoria</span>
          </button>
        );
      default:
        return '-'
    }
  };

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
        title="Calendário Operação"
        data={tableData?.items || []}
        head={head}
        isLoading={loadingTable}
        reOrderColumn
        refreshTable={refreshList}
        checkable
        customTdFunction={customTdFunction}
        hoverEffect
        enableSummary
        customSummary={CustomSummary}
        rowsChecked={handleRowsChecked}
        actionButton={actionButton}
        deleteButton={() => deleteButton()}
      />
    </>
  );
}

export default Table;
