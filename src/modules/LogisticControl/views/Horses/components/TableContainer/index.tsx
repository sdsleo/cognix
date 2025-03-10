import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../../../components/CnxDialog";
import { CnxTable } from "../../../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../../../context/moduleContext";
import { ACTIONS } from "../../../../context/moduleActions";
import { axiosInstance } from "../../../../../../http/axiosInstance";
import { _DELETE, _GET, _GET_BY_FILTERS, _GET_HORSE_LOCATION_PAGED } from "../../../../routes";
import { IPagination } from "../../../../routes/types";

function Table() {
  const { dispacth, loadingTable, tableDataHorse, cardView, cardId, idCard, showAll }: any = useContext(UseContext);

  const cardIdS = sessionStorage.getItem('@cnx-card-id')
  const cardViewS = sessionStorage.getItem('@cnx-card-view')

  const CNX_ID_LIST = useId();
  const CNX_ID_DELETE = useId();
  const CNX_ID_CONFIRM = useId();
  const rowDataRef: any = useRef([]);
  // const [showAll, setShowAll] = useState(false)

  async function getList({ PageSize, PageNumber }: IPagination) {

    if (showAll) {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: true,
      });
      try {
        const { data } = await axiosInstance(_GET_HORSE_LOCATION_PAGED({ PageSize, PageNumber }));
        dispacth({
          type: ACTIONS.SET_TABLE_DATA_HORSE,
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
      return;
    }
    if (cardViewS === 'bases') {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: true,
      });
      
      try {
        const { data } = await axiosInstance(_GET_HORSE_LOCATION_PAGED({ PageSize, PageNumber, BaseId: Number(cardIdS) }));
        dispacth({
          type: ACTIONS.SET_TABLE_DATA_HORSE,
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
    if (cardViewS === 'clients') {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: true,
      });
      try {
        const { data } = await axiosInstance(_GET_HORSE_LOCATION_PAGED({ PageSize, PageNumber, ClientId: Number(cardIdS) }));
        dispacth({
          type: ACTIONS.SET_TABLE_DATA_HORSE,
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

  }

  useEffect(() => {
    getList({ PageSize: 100 });
  }, [showAll]);

  const head = {
    plate: 'Cavalo',
    base: 'Base',
    client: 'Cliente'
  };

  const dataRequest = {
    "pageSize": 100,
    "pageNumber": 1,
    "totalPages": 1,
    "totalItems": 6,
    "sort": {
        "by": null,
        "desc": false
    },
    "items": [
      {
        "id": 1,
        "cavaloId": 0,
        "baseId": 0,
        "clientId": 0,
        "client": {
          "id": 9,
          "name": "Brasken1",
          "code": "string",
          "isActived": 0,
          "rowStatus": 0,
          "clientCustom": {
            "id": 0,
            "latitude": "string",
            "longitude": "string",
            "qtyTramos": 0,
            "operationType": 0,
            "maxFlow": 0,
            "qtyParkingSpaces": 0,
            "gasPrice": 0,
            "contractNumber": "string",
            "transportCost": 0,
            "operationCost": 0,
            "clientId": 0,
            "rowStatus": 0
          }
        },
        "customBase": {
          "id": 1,
          "name": "Pojuca",
          "code": "string",
          "latitude": "string",
          "longitude": "string",
          "qtyTramos": 0,
          "operationType": 0,
          "maxFlow": 0,
          "qtyParkingSpaces": 0,
          "isActived": true,
          "transportCost": 0,
          "operationCost": 0,
          "rowStatus": 0,
          "customCalendarPCS": {
            "id": 0,
            "name": "string",
            "description": "string",
            "date": "2024-06-13T09:33:39.144Z",
            "dueDate": "2024-06-13T09:33:39.144Z",
            "value": 0,
            "isActived": 0,
            "documentId": 0,
            "baseId": 0,
            "rowStatus": 0
          }
        },
        "customCavalo": {
          "id": 0,
          "plate": "H5GF-HDYT",
          "model": "string",
          "isActived": 0,
          "rowStatus": 0
        }
      },
    ]
}

  const filterOptions = {
    route: "",
    filters: [
      {
        title: "Situação",
        query: "RowStatus",
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        typeSelection: "singleSelect",
        options: [
          {
            id: 0,
            name: "Excluido"
          },
          {
            id: 1,
            name: "Ativo"
          },
          {
            id: 2,
            name: "Inativo"
          }
        ],
      },
    ],
  };

  async function clearAppliedFilters() {
    dispacth({
      type: ACTIONS.SET_FILTERS,
      payload: [],
    });
    getList({ PageSize: 100, Filters: "?RowStatus=1" });
  }

  async function getListFiltered({
    PageSize,
    PageNumber,
    Filters,
  }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(
        _GET_BY_FILTERS({ PageSize, PageNumber, Filters })
      );
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: data,
      });
    } catch (err: any) {
      console.log("ERRO", err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  const handleQueryString = (data: any) => {
    const initialValue = "";
    const finalQueryString = data?.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + `${currentValue?.query}=${currentValue?.keyValue}&`,
      initialValue
    );

    return `?${finalQueryString.substring(0, finalQueryString.length - 1)}`;
  };

  const filterResponse = (data: any) => {
    dispacth({
      type: ACTIONS.SET_FILTERS,
      payload: data?.filtersSelected,
    });
    
    getListFiltered({
      PageSize: 100,
      Filters: handleQueryString(data?.filtersSelected),
    });
  };

  const refreshList = () => {
    getList({ PageSize: 100, Filters: "?RowStatus=1" });
  };

  async function deleteRecords() {
    const ids = rowDataRef.current.map((item: any) => item?.id)
    try {
      await axiosInstance(_DELETE(ids));
      getList({ PageSize: 100, Filters: "?RowStatus=1" });
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
      key: "plate",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <button
            type="button"
            className="cnx-add-area-record-th-number-link"
            onClick={() => openEditModal(rowValue)}
          >
            <span className="searchable">{rowValue?.customCavalo?.plate}</span>
          </button>
        );
      },
    },
    {
      key: "base",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
            <span className="searchable">{rowValue?.customBase?.name}</span>
        );
      },
    },
    {
      key: "client",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
            <span className="searchable">{rowValue?.client?.name}</span>
        );
      },
    },
  ];

  // const customThFunction = [
  //   {
  //     key: "plate",
  //     func: (tdValue: any, keyValue: string, rowData: any) => {
  //       return (

  //           <div className="searchable">Placa</div>

  //       );
  //     },
  //   },
  // ];

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
      type: ACTIONS.EDIT_HORSE_MODAL,
      payload: true,
    });
    dispacth({
      type: ACTIONS.SET_ROW_DATA_HORSE,
      payload: rowData,
    });
  };

  const handleRowsChecked = (data: any) => {
    rowDataRef.current = data;
  };

  const handlePagination = (dataPage: any) => {
    if (dataPage === "first") {
      if (tableDataHorse?.pageNumber === 1) return;
      
        getList({ PageSize: 100, PageNumber: 1 });
      
    }
    if (dataPage === "previous") {
      if (tableDataHorse?.pageNumber === 1) return;
      if (tableDataHorse.length > 0) {
        getListFiltered({
          PageSize: 100,
          PageNumber: tableDataHorse?.result?.pageNumber - 1,       
        });
      } else {
        getList({
          PageSize: 100,
          PageNumber: tableDataHorse?.result?.pageNumber - 1,
        });
      }
    }
    if (dataPage === "next") {
      if (tableDataHorse?.pageNumber === tableDataHorse?.totalPages) return;

        getList({
          PageSize: 100,
          PageNumber: tableDataHorse?.result?.pageNumber + 1,
        });

    }
    if (dataPage === "last") {
      if (tableDataHorse?.pageNumber === tableDataHorse?.totalPages) return;
      
        getList({ PageSize: 100, PageNumber: tableDataHorse?.result?.totalPages });
      
    }
  };

  const summaryPagination = {
    currentPage: tableDataHorse?.pageNumber,
    pageCount: tableDataHorse?.totalPages,
    itemCount: tableDataHorse?.totalItems,
  };

  const buttons = [
    {
      renderButton: (rowsChecked: any) => {
        const handleUserSkill = () => {};
        return (
          <div className="cnx-horse-location-check-container-chlcc" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <input type="checkbox" value={showAll} onChange={(e) => {
              // setShowAll(e.target.checked)
              dispacth({
                type: ACTIONS.SET_SHOW_ALL,
                payload: e.target.checked,
              });
              }} />
            <span>Todas as Bases e Clientes</span>
          </div>
        );
      },
    },
  ];


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
        title="Cavalos"
        data={tableDataHorse?.items || []}
        head={head}
        isLoading={loadingTable}
        reOrderColumn
        searchActionButtons={buttons}
        
        refreshTable={refreshList}
        // checkable
        customTdFunction={customTdFunction}
        // customThFunction={customThFunction}
        hoverEffect
        enableSummary
        // rowsChecked={handleRowsChecked}
        // actionButton={actionButton}
        // deleteButton={() => deleteButton()}
        enablePagination={handlePagination}
        summaryPagination={summaryPagination}
        // filterButton={filterOptions}
        // filterResponse={filterResponse}
        // setFilter={appliedFilters}
        // clearAppliedFilters={clearAppliedFilters}
      />
    </div>
  );
}

export default Table;
