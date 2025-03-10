import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../components/CnxDialog";
import { CnxTable } from "../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { axiosInstance } from "../../../../http/axiosInstance";
import { _DELETE, _GET, _GET_OPERATION_BY_ORDER_ID, _GET_ORDER_BY_ID } from "../../routes";
import { IPagination } from "../../routes/types";
import { OrderSummary } from "../../views/Orders/components/OrderSummary";
import { ILocales } from "../../../../locales/types";
import localesContex from "../../../../context/localesContex";
import useFormatDate from "../../../../hooks/useFormatDate";
import {
  BlockedIcon,
  ClockIcon,
  PlaySolidIcon,
  TrackersIcon,
} from "@fluentui/react-icons-mdl2";

function Table() {
  const { dispacth, tableData, loadingTable, rowData, orderId, operationData } =
  useContext(UseContext);

  useEffect(() => {
    dispacth({
      type: ACTIONS.SET_ELIPSE_RESULT_DATA,
      payload: null,
    });
    dispacth({
      type: ACTIONS.SET_ANGELIRA_RESULT_DATA,
      payload: null,
    });
    dispacth({
      type: ACTIONS.SET_ANGELIRA_LOGS_RESULT_DATA,
      payload: null,
    });
    getOrderById(rowData?.id || operationData.orderId)
    
  }, [rowData])
  
  const { localesData } = useContext<ILocales>(localesContex);
  const dialogModalDelete = useId();
  const dialogModalError = useId();
  const rowsCheckedRef: any = useRef(null);

  const head = {
    id: "id",
    number: "Número",
    operationCode: "Cód. Operação",
    resourceCode: "Cód. Recurso",
    vehicle: "Veículo",
    horse: "Cavalo",
    driver: "Motorista",
    scheduleStartDateTime: "Data Hora Início Plan.",
    scheduleFinishDateTime: "Data Hora Fim Plan.",
    startedDateTime: "Data Hora Início",
    finishedDateTime: "Data Hora Fim",
    // volume: "Volume Plan. (m³)",
    realVolume: "Volume Real (m³)",
    status: "Situação",
    info: "Info",
  };

  const toResults = (id: number, operationType: number) => {
    
    if (operationType == 10 || operationType == 30) {
      dispacth({
        type: ACTIONS.SET_ORDER_OPERATION_ID,
        payload: id,
      });

        dispacth({
          type: ACTIONS.SET_ACTIVE_PAGE,
          payload: "elipseResults",
        });


    }
    if (operationType == 20 || operationType == 40) {
      dispacth({
        type: ACTIONS.SET_ACTIVE_PAGE,
        payload: "angeLiraResults",
      });
      dispacth({
        type: ACTIONS.SET_ORDER_OPERATION_ID,
        payload: id,
      });
    }
  };

  const openOperationEditModal = (operationRowData: any) => {
      dispacth({
        type: ACTIONS.SET_ROW_DATA_OPERATION,
        payload: operationRowData,
      });
      dispacth({
        type: ACTIONS.EDIT_OPERATION_MODAL,
        payload: true,
      });
  };

  const customTdFunction = [
    {
      key: "number",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.orderProductionOperation?.operation?.number || ""}
          </span>
        );
      },
    },
    {
      key: "volume",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">{`${
            tdValue?.toFixed(2) || ""
          } ${tdValue ? "m³" : ""}`}</span>
        );
      },
    },
    {
      key: "resourceCode",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.orderProductionOperation?.resource?.name || ""}
          </span>
        );
      },
    },
    {
      key: "vehicle",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-no-word-break">
            <span style={{ fontSize: "14px" }} className="searchable">
              {rowData?.orderCustom?.customVehicle?.plate || ""}
            </span>
          </div>
        );
      },
    },
    {
      key: "horse",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.orderProductionOperation?.customCavalo?.plate || ""}
          </span>
        );
      },
    },
    {
      key: "driver",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowData?.orderCustom?.customDriver?.name || ""}
          </span>
        );
      },
    },
    {
      key: "id",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <button
            type="button"
            className="cnx-add-area-record-th-number-link"
            onClick={() => openOperationEditModal(rowValue)}
          >
            <span className="searchable">{rowValue?.orderProductionOperation?.id}</span>
          </button>
        );
      },
    },
    {
      key: "operationCode",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.orderProductionOperation?.operation?.code || ""}
          </span>
        );
      },
    },
    {
      key: "realVolume",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
       
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.orderProductionOperation?.realVolume?.toFixed(2) || ""}
          </span>
        );
      },
    },
    {
      key: "scheduleStartDateTime",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {useFormatDate(
              rowValue?.orderProductionOperation?.scheduleStartDateTime
            ) || ""}
          </span>
        );
      },
    },
    {
      key: "scheduleFinishDateTime",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {useFormatDate(
              rowValue?.orderProductionOperation?.scheduleFinishDateTime
            ) || ""}
          </span>
        );
      },
    },
    {
      key: "startedDateTime",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {useFormatDate(tdValue) || ""}
          </span>
        );
      },
    },
    {
      key: "finishedDateTime",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {useFormatDate(tdValue) || ""}
          </span>
        );
      },
    },
    {
      key: "status",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        function handleStatusType(type: number) {
          switch (type) {
            case 1:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <div className="cnx-orders-circular-bullet-cocb cnx-order-operations-td-yellow-clcty" />
                  <span>{`Liberado`}</span>
                </div>
              );
            case 2:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <div className="cnx-orders-circular-bullet-cocb cnx-order-operations-td-lilac-clctl" />
                  <span>{`Chegada de Veículo`}</span>
                </div>
              );
            case 3:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <div className="cnx-orders-circular-bullet-cocb cnx-order-operations-td-grey-clctg" />
                  <span>{`Aguardando a Operação`}</span>
                </div>
              );
            case 4:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <div className="cnx-orders-circular-bullet-cocb cnx-order-operations-td-blue-clctb" />
                  <span>{`Em Progresso`}</span>
                </div>
              );
            case 6:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <div className="cnx-orders-circular-bullet-cocb cnx-order-operations-td-red-clctr" />
                  <span>{`Cancelado`}</span>
                </div>
              );
            case 5:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <div className="cnx-orders-circular-bullet-cocb cnx-order-operations-td-green-clctg" />
                  <span>{`Encerrado`}</span>
                </div>
              );
            case 7:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <ClockIcon className="cnx-orders-icon-clock-coic" />
                  <span>{`Bloqueado`}</span>
                </div>
              );
            case 0:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <BlockedIcon className="cnx-orders-icon-blocked-coib" />
                  <span>{`${
                    localesData?.orders?.customSummary?.noSchedule ||
                    "No Schedule"
                  }`}</span>
                </div>
              );
            default:
              return null;
          }
        }
        return handleStatusType(rowValue?.status);
      },
    },
    {
      key: "info",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
      
        return (
          <button
            className="cnx-orders-operation-column-info-coci"
            type="button"
            onClick={() =>
              toResults(
                rowValue?.orderProductionOperation?.id,
                rowValue?.orderProductionOperation?.operation?.number
              )
            }
          >
            <TrackersIcon />
          </button>
        );
      },
    },
  ];

  const CNX_STYLES = {
    cnxColumnGap: {
      paddingRight: "20px",
    },
  };

  async function getOrderById(orderId: any) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET_ORDER_BY_ID(orderId));
      dispacth({
        type: ACTIONS.SET_OPERATION_DATA,
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
    getOrderById(rowData?.id)
    // getList({ PageSize: 100 });
    //_GET_ORDER_BY_ID
  };

  return (
    <div className="cnx-modules-main-container-cmmc">
      <CnxTable
        title={`Ordem Número: #${operationData?.orderNumber}` || ""}
        data={operationData?.orderProductions || []}
        head={head}
        refreshTable={refreshList}
        isLoading={loadingTable}
        reOrderColumn
        customTdFunction={customTdFunction}
        hoverEffect
        enableSummary
        cnxStyles={CNX_STYLES}
      />
    </div>
  );
}

export default Table;
