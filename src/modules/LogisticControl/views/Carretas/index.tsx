import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../components/CnxDialog";
import { CnxTable } from "../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { axiosInstance } from "../../../../http/axiosInstance";
import { _DELETE, _GET, _GET_CARRETAS, _POST_ORDER_CHILD } from "../../routes";
import { IPagination } from "../../routes/types";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import useFormatDate from "../../../../hooks/useFormatDate";
import { SortLinesAscendingIcon, SortLinesIcon } from "@fluentui/react-icons-mdl2";

function Carretas() {
  const { dispacth, loadingTable, carretaData, rowData, enumerators, enumeratorsOrder, page } =
  useContext(UseContext);


  const CNX_ID_LIST = useId();
  const CNX_ID_DELETE = useId();
  const CNX_ID_CONFIRM = useId();
  const rowDataRef: any = useRef([]);

  const editChildOrderNumberRef = useRef<HTMLInputElement>(null!);
  const editChildBaseRef: any = useRef({});
  const editChildClientRef: any = useRef({});
  const editChildPlateRef: any = useRef({});
  const editChildDriverRef: any = useRef({});

  const [sort, setSort] = useState('')

  // useEffect(() => {
  //   if (rowData?.id && page === "events") {
  //     editChildOrderNumberRef.current.value = rowData?.orderNumber;
  //   }
  // }, [rowData]);

  async function getList({ PageSize, PageNumber }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(
        _GET_CARRETAS()
      );

      dispacth({
        type: ACTIONS.SET_CARRETA_DATA,
        payload: data,
      });
    } catch (err: any) {
      console.error("ERRO", err);
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
    getList({
      PageSize: 100,
      OrderProductionOperationId:
        rowData?.orderProductions?.[0]?.orderProductionOperation?.id,
    });
  }, []);

  const head = {
    vehiclePlate: "Placa Carreta",
    location: "Localização",
    status: "Status",
    cavalo: "Placa Cavalo",
    maintenanceStatus: "Manutenção Status",
    maintenanceAditionalInfo: "Manutenção Nota",
    origin: "Origem",
    destination: "Destino",
    orderNumber: "Nr Ordem",
  };

  const refreshList = () => {
    getList({
      PageSize: 100,
      OrderProductionOperationId:
        rowData?.orderProductions?.[0]?.orderProductionOperation?.id,
    });
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
      type: ACTIONS.SET_ROW_DATA_EVENTS,
      payload: rowData,
    });
  };

  const handleRowsChecked = (data: any) => {
    rowDataRef.current = data;
  };

  const handlePagination = (dataPage: any) => {
    if (dataPage === "first") {
      if (carretaData?.pageNumber === 1) return;
      getList({ PageSize: 100, PageNumber: 1 });
    }
    if (dataPage === "previous") {
      if (carretaData?.pageNumber === 1) return;
      getList({ PageSize: 100, PageNumber: carretaData?.pageNumber - 1 });
    }
    if (dataPage === "next") {
      if (carretaData?.pageNumber === carretaData?.totalPages) return;
      getList({ PageSize: 100, PageNumber: carretaData?.pageNumber + 1 });
    }
    if (dataPage === "last") {
      if (carretaData?.pageNumber === carretaData?.totalPages) return;
      getList({ PageSize: 100, PageNumber: carretaData?.totalPages });
    }
  };

  const summaryPagination = {
    currentPage: carretaData?.pageNumber,
    pageCount: carretaData?.totalPages,
    itemCount: carretaData?.totalItems,
  };

  const customThFunction = [
    {
      key: "vehiclePlate",
      func: () => {
        return (
          <div
            style={{ width: '150px'}} className="searchable"
            onClick={() => {
              setSort(s => s === 'vehiclePlate_desc' ? 'vehiclePlate_asc' : s === 'vehiclePlate_asc' ? '' : 'vehiclePlate_desc')  
            }}>

            {sort === 'vehiclePlate_desc' ? (
              <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
            ) :  sort === 'vehiclePlate_asc' ? (
              <SortLinesIcon style={{ marginRight: '5px' }} />
            ) : <></>}
            Placa Carreta
          </div>
        );
      },
    },
    {
      key: "location",
      func: () => {
        return (
          <div
            style={{ width: '150px'}} className="searchable"
            onClick={() => {
              setSort(s => s === 'location_desc' ? 'location_asc' : s === 'location_asc' ? '' : 'location_desc')  
            }}>

            {sort === 'location_desc' ? (
              <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
            ) :  sort === 'location_asc' ? (
              <SortLinesIcon style={{ marginRight: '5px' }} />
            ) : <></>}
            Localização
          </div>
        );
      },
    },
    {
      key: "status",
      func: () => {
        return (
          <div
            style={{ width: '150px'}} className="searchable"
            onClick={() => {
              setSort(s => s === 'status_desc' ? 'status_asc' : s === 'status_asc' ? '' : 'status_desc')  
            }}>

            {sort === 'status_desc' ? (
              <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
            ) :  sort === 'status_asc' ? (
              <SortLinesIcon style={{ marginRight: '5px' }} />
            ) : <></>}
            Status
          </div>
        );
      },
    },
    {
      key: "cavalo",
      func: () => {
        return (
          <div
            style={{ width: '150px'}} className="searchable"
            onClick={() => {
              setSort(s => s === 'cavalo_desc' ? 'cavalo_asc' : s === 'cavalo_asc' ? '' : 'cavalo_desc')  
            }}>

            {sort === 'cavalo_desc' ? (
              <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
            ) :  sort === 'cavalo_asc' ? (
              <SortLinesIcon style={{ marginRight: '5px' }} />
            ) : <></>}
            Placa Cavalo
          </div>
        );
      },
    },
    {
      key: "maintenanceStatus",
      func: () => {
        return (
          <div
            style={{ width: '200px'}} className="searchable"
            onClick={() => {
              setSort(s => s === 'maintenanceStatus_desc' ? 'maintenanceStatus_asc' : s === 'maintenanceStatus_asc' ? '' : 'maintenanceStatus_desc')  
            }}>

            {sort === 'maintenanceStatus_desc' ? (
              <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
            ) :  sort === 'maintenanceStatus_asc' ? (
              <SortLinesIcon style={{ marginRight: '5px' }} />
            ) : <></>}
            Manutenção Status
          </div>
        );
      },
    },
    {
      key: "maintenanceAditionalInfo",
      func: () => {
        return (
          <div
            style={{ width: '150px'}} className="searchable"
            onClick={() => {
              setSort(s => s === 'maintenanceAditionalInfo_desc' ? 'maintenanceAditionalInfo_asc' : s === 'maintenanceAditionalInfo_asc' ? '' : 'maintenanceAditionalInfo_desc')  
            }}>

            {sort === 'maintenanceAditionalInfo_desc' ? (
              <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
            ) :  sort === 'maintenanceAditionalInfo_asc' ? (
              <SortLinesIcon style={{ marginRight: '5px' }} />
            ) : <></>}
            Manutenção Nota
          </div>
        );
      },
    },
    {
      key: "origin",
      func: () => {
        return (
          <div
            style={{ width: '130px'}} className="searchable"
            onClick={() => {
              setSort(s => s === 'origin_desc' ? 'origin_asc' : s === 'origin_asc' ? '' : 'origin_desc')  
            }}>

            {sort === 'origin_desc' ? (
              <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
            ) :  sort === 'origin_asc' ? (
              <SortLinesIcon style={{ marginRight: '5px' }} />
            ) : <></>}
            Origem
          </div>
        );
      },
    },
    {
      key: "destination",
      func: () => {
        return (
          <div
            style={{ width: '130px'}} className="searchable"
            onClick={() => {
              setSort(s => s === 'destination_desc' ? 'destination_asc' : s === 'destination_asc' ? '' : 'destination_desc')  
            }}>

            {sort === 'destination_desc' ? (
              <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
            ) :  sort === 'destination_asc' ? (
              <SortLinesIcon style={{ marginRight: '5px' }} />
            ) : <></>}
            Destino
          </div>
        );
      },
    },
    {
      key: "orderNumber",
      func: () => {
        return (
          <div
            style={{ width: '130px'}} className="searchable"
            onClick={() => {
              setSort(s => s === 'orderNumber_desc' ? 'orderNumber_asc' : s === 'orderNumber_asc' ? '' : 'orderNumber_desc')  
            }}>

            {sort === 'orderNumber_desc' ? (
              <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
            ) :  sort === 'orderNumber_asc' ? (
              <SortLinesIcon style={{ marginRight: '5px' }} />
            ) : <></>}
            Nr Ordem
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
        content={{
          title: "Error",
          message: "Não foi possível listar a tabela",
        }}
      />
      <CnxTable
        title={`Carretas`}
        data={carretaData || []}
        head={head}
        sort={sort}
        // buttons={buttons}
        isLoading={loadingTable}
        reOrderColumn
        refreshTable={refreshList}
        // checkable
        hoverEffect
        enableSummary
        customThFunction={customThFunction}
        // rowsChecked={handleRowsChecked}
        // actionButton={actionButton}
        // deleteButton={() => deleteButton()}
        // enablePagination={handlePagination}
        // summaryPagination={summaryPagination}
      />
    </div>
  );
}

export default Carretas;
