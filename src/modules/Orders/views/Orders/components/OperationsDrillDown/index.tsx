import { useState, useId, useRef, useEffect, useContext } from "react";
import localesContex from "../../../../../../context/localesContex";
import { UseContext } from "../../../../context/moduleContext";
import { ACTIONS } from "../../../../context/moduleActions";
import { axiosInstance } from "../../../../../../http/axiosInstance";
import {
  _DELETE,
  _GET,
  _GET_OPERATION_BY_ORDER_ID,
  _GET_ORDER_BY_ID,
} from "../../../../routes";
import {
  BlockedIcon,
  ClockIcon,
  TrackersIcon,
} from "@fluentui/react-icons-mdl2";
import { ILocales } from "../../../../../../locales/types";
import useFormatDate from "../../../../../../hooks/useFormatDate";

interface IOperationsDrillDown {
  id: any;
  rowDataOrden: any;
  cnxId?: any;
}
export function OperationsDrillDown({
  id,
  rowDataOrden,
  cnxId
}: IOperationsDrillDown) {

  const { localesData } = useContext<ILocales>(localesContex);

  const { dispacth, tableData, loadingTable, rowData, orderId, operationData } =
  useContext(UseContext);

  const [operations, setOperations]: any = useState();

  async function getOrderById(orderId: any) {
    // dispacth({
    //   type: ACTIONS.LOADING_TABLE,
    //   payload: true,
    // });
    try {
      const { data } = await axiosInstance(_GET_ORDER_BY_ID(orderId));
      setOperations(data?.orderProductions);
      //   dispacth({
      //     type: ACTIONS.SET_OPERATION_DATA,
      //     payload: data,
      //   });
    } catch (err) {
      console.error(err);
    } finally {
      //   dispacth({
      //     type: ACTIONS.LOADING_TABLE,
      //     payload: false,
      //   });
    }
  }

  useEffect(() => {
    getOrderById(id);
  }, [id]);

  const handleDialogEdit = (rowValue: any) => {
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: rowValue,
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
              localesData?.orders?.customSummary?.noSchedule || "No Schedule"
            }`}</span>
          </div>
        );
      default:
        return null;
    }
  }

  const toResults = (id: number, operationType: number, operationData: any) => {
    const operationTypeNumber = operationData?.orderProductionOperation?.operation?.number

    sessionStorage.setItem(`${cnxId}@cnx-order-number`, rowDataOrden?.orderNumber?.toString())
    sessionStorage.setItem(`${cnxId}@cnx-order-type`, operationTypeNumber.toString())

    sessionStorage.setItem(`${cnxId}@cnx-operation-id`, id.toString())
    sessionStorage.setItem(`${cnxId}@cnx-order-id`, operationData.orderId.toString())
    sessionStorage.setItem(`${cnxId}@cnx-order-production-operation-id`, operationData.orderProductionOperation.id.toString())
    // dispacth({
    //   type: ACTIONS.SET_ROW_DATA,
    //   payload: operationData.id,
    // });
    // dispacth({
    //   type: ACTIONS.SET_OPERATION_DATA,
    //   payload: operationData,
    // });
    if (operationType == 10 || operationType == 30) {
      document.getElementById(cnxId + 'cnx-order-page-view')?.classList.add('cnx-display-none');
      document.getElementById(cnxId + 'cnx-operations-page-view')?.classList.add('cnx-display-none');
      document.getElementById(cnxId + 'cnx-elipse-results-page-view')?.classList.remove('cnx-display-none');
      document.getElementById(cnxId + 'cnx-angeLira-results-page-view')?.classList.add('cnx-display-none');
      document.getElementById(cnxId + 'cnx-logs-results-page-view')?.classList.add('cnx-display-none');
      setTimeout(() => {
        const btn: any = document.getElementById(`${cnxId}cnx-dispatch-elipse-refresh`)
        btn?.click()
      }, 50)

      // dispacth({
      //   type: ACTIONS.SET_ORDER_OPERATION_ID,
      //   payload: id,
      // });

      // dispacth({
      //   type: ACTIONS.SET_ACTIVE_PAGE,
      //   payload: "elipseResults",
      // });
    }
    if (operationType == 20 || operationType == 40) {
      document.getElementById(cnxId + 'cnx-order-page-view')?.classList.add('cnx-display-none');
      document.getElementById(cnxId + 'cnx-operations-page-view')?.classList.add('cnx-display-none');
      document.getElementById(cnxId + 'cnx-elipse-results-page-view')?.classList.add('cnx-display-none');
      document.getElementById(cnxId + 'cnx-angeLira-results-page-view')?.classList.remove('cnx-display-none');
      document.getElementById(cnxId + 'cnx-logs-results-page-view')?.classList.add('cnx-display-none');
      setTimeout(() => {
        const btn: any = document.getElementById(`${cnxId}cnx-dispatch-angelira-refresh`)
        btn?.click()
      }, 50)
      // dispacth({
      //   type: ACTIONS.SET_ACTIVE_PAGE,
      //   payload: "angeLiraResults",
      // });
      // dispacth({
      //   type: ACTIONS.SET_ORDER_OPERATION_ID,
      //   payload: id,
      // });
    }
  };

  const openOperationEditModal = async (operationRowData: any) => {

    sessionStorage.removeItem(`${cnxId}cnx-order-operation-row-data`);
    setTimeout(() => {
      sessionStorage.setItem(`${cnxId}cnx-order-operation-row-data`, JSON.stringify(operationRowData))
    }, 10)
    setTimeout(() => {      
      const btn = document.getElementById(`${cnxId}cnx-set-order-operation-rowdata`);
      btn?.click();
    }, 20)
    setTimeout(() => {      
      const btn = document.getElementById(`${cnxId}cnx-edit-order-operation-modal`);
      btn?.click();
    }, 50)
    // localStorage.removeItem('operationData');
    // setTimeout(() => {
    //   function updateLocalStorage(key: any, newValue: any) {
    //   const oldValue = localStorage.getItem(key);
    //   localStorage.setItem(key, newValue);
    
    //   const storageEvent = new StorageEvent('storage', {
    //     key: key,
    //     oldValue: oldValue,
    //     newValue: newValue,
    //     url: window.location.href,
    //     storageArea: localStorage
    //   });
    
    //   window.dispatchEvent(storageEvent);
    // }
    
    // // Now when you update the localStorage, you can use the following function:
    // updateLocalStorage('operationData', JSON.stringify(operationRowData));
    // }, 10);

    // dispacth({
    //   type: ACTIONS.SET_ROW_DATA_OPERATION,
    //   payload: operationRowData,
    // });
    // dispacth({
    //   type: ACTIONS.EDIT_OPERATION_MODAL,
    //   payload: true,
    // });
  };

  return (
    <div className="cnx-custom-drop-down-sub-container">
      <div className="cnx-custom-drop-down-th-container">
        <div className="cnx-custom-drop-down-row-td-container cnx-th-sub-background">
          <div className="cnx-custom-drop-down-th-item cnx-order-link-th-column">
            Id
          </div>
          <div className="cnx-custom-drop-down-th-item cnx-order-link-th-column">
            Número
          </div>
          <div className="cnx-custom-drop-down-th-item cnx-order-seq-order-th-column">
            Cód. Operação
          </div>
          <div className="cnx-custom-drop-down-th-item">Cód. Recurso</div>
          <div className="cnx-custom-drop-down-th-item">Veículo</div>
          <div className="cnx-custom-drop-down-th-item">Cavalo</div>
          <div className="cnx-custom-drop-down-th-item">Motorista</div>
          <div className="cnx-custom-drop-down-th-item">
            Data Hora Início Plan.
          </div>
          <div className="cnx-custom-drop-down-th-item">
            Data Hora Fim Plan.
          </div>
          <div className="cnx-custom-drop-down-th-item">Data Hora Início.</div>
          <div className="cnx-custom-drop-down-th-item">Data Hora Fim.</div>
          <div className="cnx-custom-drop-down-th-item">Volume Real. (m³)</div>
          <div className="cnx-custom-drop-down-th-item">Situação</div>
          <div className="cnx-custom-drop-down-th-item cnx-order-link-th-column">
            Info
          </div>
        </div>
      </div>
      <button id={id} style={{display: 'none'}}onClick={() => getOrderById(id)}></button>
      {operations?.map((rowItem: any) => (
        <div className="cnx-custom-drop-down-row-td-container cnx-tr">
          <div className="cnx-custom-drop-down-td-item cnx-order-link-td-column">
            <div className="">
              <button
                type="button"
                className="cnx-add-area-record-th-number-link"
                onClick={() => openOperationEditModal(rowItem)}
              >
                <span className="searchable">
                  {rowItem?.orderProductionOperation?.id || ""}
                </span>
              </button>
            </div>
          </div>
          <div className="cnx-custom-drop-down-td-item cnx-order-link-td-column">
            {rowItem?.orderProductionOperation?.operation?.number || ""}
          </div>
          <div className="cnx-custom-drop-down-td-item cnx-order-seq-order-td-column">
            {rowItem?.orderProductionOperation?.operation?.code || ""}
          </div>
          <div className="cnx-custom-drop-down-td-item">
            {rowItem?.orderProductionOperation?.resource?.name || ""}
          </div>
          <div className="cnx-custom-drop-down-td-item">
            {rowDataOrden?.orderCustom?.customVehicle?.plate || ""}
          </div>
          <div className="cnx-custom-drop-down-td-item">
            {rowItem?.orderProductionOperation?.customCavalo?.plate || ""}
          </div>
          <div className="cnx-custom-drop-down-td-item">
            {rowDataOrden?.orderCustom?.customDriver?.name || ""}
          </div>
          <div className="cnx-custom-drop-down-td-item">
            {useFormatDate(
              rowItem?.orderProductionOperation?.scheduleStartDateTime
            ) || ""}
          </div>
          <div className="cnx-custom-drop-down-td-item">
            {useFormatDate(
              rowItem?.orderProductionOperation?.scheduleFinishDateTime
            ) || ""}
          </div>
          <div className="cnx-custom-drop-down-td-item">
            {useFormatDate(rowItem?.startedDateTime)}
          </div>
          <div className="cnx-custom-drop-down-td-item">
            {useFormatDate(rowItem?.finishedDateTime)}
          </div>
          <div className="cnx-custom-drop-down-td-item">
            {`${
              rowItem?.orderProductionOperation?.realVolume?.toFixed(2) || ""
            }`}
          </div>
          <div className="cnx-custom-drop-down-td-item">
            {handleStatusType(rowItem?.status)}
          </div>
          <div className="cnx-custom-drop-down-td-item cnx-order-link-td-column">
            <button
              className="cnx-orders-operation-column-info-coci"
              type="button"
              onClick={() =>
                toResults(
                  rowItem?.orderProductionOperation?.id,
                  rowItem?.orderProductionOperation?.operation?.number,
                  rowItem
                )
              }
            >
              <TrackersIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
