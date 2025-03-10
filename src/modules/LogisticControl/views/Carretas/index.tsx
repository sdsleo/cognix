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
        // buttons={buttons}
        isLoading={loadingTable}
        reOrderColumn
        refreshTable={refreshList}
        // checkable
        hoverEffect
        enableSummary
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
