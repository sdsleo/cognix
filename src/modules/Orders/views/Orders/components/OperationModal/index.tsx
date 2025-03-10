import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../../../context/moduleContext";
import { ACTIONS } from "../../../../context/moduleActions";

import CnxFormModal from "../../../../../../components/CnxFormModal";
import Input from "../../../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../../../components/CnxInput/InputTypes/Select";
import { axiosInstance } from "../../../../../../http/axiosInstance";
import { IFiltersTramos, IPagination } from "../../../../routes/types";
import {
  _GET,
  _GET_ENUMERATOS,
  _GET_ORDER_BY_ID,
  _GET_ORDER_PARENT_BY_ID,
  _GET_TRAMOS_FILTERED,
  _POST,
  _POST_OPERATION,
  _PUT,
  _PUT_ALL,
} from "../../../../routes";
import StatusLogs from "../../../../../../components/CnxInput/InputTypes/StatusLogs";
import { ContainerRelations } from "./styles";
import { _GET_BY_ID } from "../../../../../User/routes";
import useFormatDate from "../../../../../../hooks/useFormatDate";
import { OperationParams } from "../OperationParams";
import CnxDialog from "../../../../../../components/CnxDialog";
import "./styles.css";

interface IOperationModalContainer {
  cnxId?: any;
}

function OperationModalContainer({ cnxId }: IOperationModalContainer) {
  const {
    dispacth,
    rowData,
    saving,
    enumerators,
    editOperationModal,
    rowDataOperation,
    enumeratorsTramos,
  } = useContext(UseContext);

  const [operation, setOperation] = useState(false);
  const [localSaving, setLocalSaving] = useState(false);
  const [operationData, setOperationData]: any = useState(null);
  const [tramoData, setTramoData]: any = useState([]);

  const handleSetLocalRowData = () => {
    const data = sessionStorage.getItem(`${cnxId}cnx-order-operation-row-data`);
    const dataJSON = data ? JSON.parse(data) : null;
    editOpScheduleStartDateTimeRef.current.value = dataJSON.orderProductionOperation.scheduleStartDateTime
    editOpScheduleFinishDateTimeRef.current.value = dataJSON.orderProductionOperation.scheduleFinishDateTime
    setClearSelect(!clearSelect)
    setOperationData(dataJSON);
  };
  // function handleStorageEvent(event: any) {
  //   setClearSelect(!clearSelect);

  //   // Check the changed key and react accordingly
  //   if (event.key === "operationData") {
  //     setTimeout(() => {
  //       setOperationData(JSON.parse(event.newValue));

  //       setOperation(true);
  //     }, 0);
  //   }
  // }

  // window.addEventListener("storage", handleStorageEvent);

  const [baseId, setBaseId]: any = useState();
  const [clientId, setClientId]: any = useState();
  useEffect(() => {
    dispacth({
      type: ACTIONS.SET_OPERATION_PARAMS_DATA,
      payload: null,
    });
  }, [baseId, clientId]);

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editScheduleDateRef = useRef<HTMLInputElement>(null!);
  const editPlannedVolumeRef = useRef<HTMLInputElement>(null!);

  const editOpOperationIdRef = useRef<HTMLInputElement>(null!);
  const editOpOperationNumberRef: any = useRef({});
  const editOpResourceIdRef: any = useRef({});
  const editOpCavaloIdRef: any = useRef({});
  const editOpScheduleStartDateTimeRef = useRef<HTMLInputElement>(null!);
  const editOpScheduleFinishDateTimeRef = useRef<HTMLInputElement>(null!);
  const editOpStatusRef: any = useRef({});

  const [messageError, setMessageError]: any = useState("");
  const dialogModalError = useId();
  const openError = () => {
    const modal: any = document.getElementById(dialogModalError);
    modal?.showModal();
  };

  async function getEnumerators() {
    try {
      const { data } = await axiosInstance(_GET_ENUMERATOS());
      dispacth({
        type: ACTIONS.SET_ENUMERATORS,
        payload: data,
      });
    } catch (err: any) {
      console.error(err);
    }
  }

  async function getListTramos({ BaseId, ClientId }: IFiltersTramos) {
    try {
      const { data } = await axiosInstance(
        _GET_TRAMOS_FILTERED({
          BaseId,
          ClientId,
        })
      );
      //   dispacth({
      //     type: ACTIONS.SET_ENUMERATORS_TRAMOS,
      //     payload: data,
      //   });
      setTramoData(data);
    } catch (err: any) {
      // const modal: any = document.getElementById(CNX_ID_LIST);
      // modal?.showModal();
    } finally {
    }
  }

  useEffect(() => {
    if (operationData?.orderProductionOperation?.operation?.number === 10) {
      getListTramos({ BaseId: rowData?.orderCustom?.baseId });
    }
    if (operationData?.orderProductionOperation?.operation?.number === 30) {
      getListTramos({ ClientId: rowData?.clientId });
    }
    // getListTramos({BaseId: rowData?.orderCustom?.baseId, ClientId: rowData?.clientId})
    // getListTramos({})
  }, [operationData]);

  // useEffect(() => {
  //   if (addModalUser || editModalUser) {
  //     getAllSelectors();
  //   }
  // }, [addModalUser, editModalUser]);

  //   useEffect(() => {

  //     editIdRef.current.value = rowData?.id;
  //     editPlannedVolumeRef.current.value =
  //       rowData?.orderCustom?.volume.toFixed(2);
  //     getOrderById(rowData?.id);
  //     if (rowData?.qtdOrderLinkParent !== 0) {
  //       getOrderParentById(rowData?.id);
  //     }
  //     if (rowData?.qtdOrderLinkParent == 0) {
  //       dispacth({
  //         type: ACTIONS.SET_PARENTS,
  //         payload: null,
  //       });
  //     }
  //   }, [rowData]);
  useEffect(() => {
    // getEnumerators();
    if (operationData?.id) {
      editOpOperationIdRef.current.value =
        operationData?.orderProductionOperation?.id;
      //   editOpScheduleStartDateTimeRef.current.value =
      //     rowDataOperation?.orderProductionOperation?.scheduleStartDateTime?.slice(
      //       0,
      //       16
      //     );
      //   editOpScheduleFinishDateTimeRef.current.value =
      //     rowDataOperation?.orderProductionOperation?.scheduleFinishDateTime?.slice(
      //       0,
      //       16
      //     );
    }
    
  }, [operationData]);


  const closeEditOperationModal = () => {
    setClearSelect(!clearSelect);
    setOperation(false);
    setErrorSpan(false);
  };

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
    } catch (err: any) {
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  const [errorSpan, setErrorSpan] = useState(false);

  async function editOperation() {
    if (
      Date.parse(editOpScheduleStartDateTimeRef.current.value) <
      Date.parse(editOpScheduleFinishDateTimeRef.current.value)
    ) {
      //start is less than End
    } else {
      //end is less than start
      setErrorSpan(true);
      return;
    }
    setLocalSaving(true);
    // if (editformCheck()) return;
    // dispacth({
    //   type: ACTIONS.SAVING,
    //   payload: true,
    // });

    try {
      const { data } = await axiosInstance(
        _POST_OPERATION({
          id: operationData?.id,
          status: editOpStatusRef?.current?.id,
          orderProductionOperation: {
            id: operationData?.orderProductionOperation?.id,
            operationId: editOpOperationNumberRef?.current?.id,
            resourceId: editOpResourceIdRef?.current?.id,
            cavaloId: editOpCavaloIdRef?.current?.id,
            scheduleStartDateTime:
              editOpScheduleStartDateTimeRef?.current?.value,
            scheduleFinishDateTime:
              editOpScheduleFinishDateTimeRef?.current?.value,
          },
        })
      );
      const btn: any = document.getElementById(operationData?.orderId);
      btn.click();
      setOperationData(null);
      setTimeout(() => {
        setOperationData(data);
      }, 10);
      // setClearSelect(!clearSelect)
      // getList({ PageSize: 100 });
      // dispacth({
      //   type: ACTIONS.SET_ROW_DATA,
      //   payload: data,
      // });
    } catch (err: any) {
      // console.error(err);
      // setMessageError(
      //   err?.response?.data?.message || "Error ao adicionar Ordem"
      // );
      // openError();
    } finally {
      setLocalSaving(false);
      // dispacth({
      //   type: ACTIONS.SAVING,
      //   payload: false,
      // });
    }
  }

  const [clearSelect, setClearSelect] = useState(false);

  const today = new Date().toISOString();

  return (
    <>
      <button
        id={`${cnxId}cnx-set-order-operation-rowdata`}
        style={{ display: "none" }}
        type="button"
        onClick={() => handleSetLocalRowData()}
      ></button>
      <button
        id={`${cnxId}cnx-edit-order-operation-modal`}
        style={{ display: "none" }}
        type="button"
        onClick={() => {
          setOperation(true);
        }}
      ></button>
      <CnxDialog
        useId={dialogModalError}
        type="error"
        content={{
          title: "Erro!",
          message: messageError,
        }}
      />

      <CnxFormModal
        title="Editar Operação"
        open={operation}
        close={closeEditOperationModal}
        saveButton={() => editOperation()}
        // clearButton={() => clearEditModal()}
        saving={localSaving}
        historic={<></>}
        formInputs={
          <>
            <Input
              inputRef={editOpOperationIdRef}
              defaultValue={operationData?.orderProductionOperation?.id || ""}
              type="text"
              label="id"
              disabled
            />
            <Select
              inputRef={editOpOperationNumberRef}
              keyLabel="code"
              keyValue="id"
              disabled
              label="Operação"
              mandatory
              defaultOption={
                operationData?.orderProductionOperation?.operation?.id || []
              }
              options={enumerators?.operations || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-vehicle-edit-cove"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-vehicle-edit-cove")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={editOpCavaloIdRef}
              keyLabel="plate"
              keyValue="id"
              label="Cavalo"
              mandatory
              defaultOption={
                operationData?.orderProductionOperation?.cavaloId || []
              }
              options={enumerators?.cavalos || []}
              clear={clearSelect}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-vehicle-edit-cove"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-vehicle-edit-cove")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={editOpResourceIdRef}
              keyLabel="code"
              keyValue="id"
              label="Tramo"
              mandatory
              defaultOption={
                operationData?.orderProductionOperation?.resourceId || []
              }
              options={tramoData || []}
              clear={clearSelect}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-vehicle-edit-cove"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-vehicle-edit-cove")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Input
              inputRef={editOpScheduleStartDateTimeRef}
              type="datetime-local"
              label="Data Hora Início Plan."
              defaultValue={operationData?.orderProductionOperation?.scheduleStartDateTime?.slice(
                0,
                16
              )}
              min={today.slice(0, 16)}
              mandatory
              onChange={() => {
                editScheduleDateRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
                setErrorSpan(false);
              }}
            />
            <Input
              inputRef={editOpScheduleFinishDateTimeRef}
              type="datetime-local"
              label="Data Hora Fim Plan."
              min={today.slice(0, 16)}
              defaultValue={operationData?.orderProductionOperation?.scheduleFinishDateTime?.slice(
                0,
                16
              )}
              mandatory
              onChange={() => {
                editScheduleDateRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
                setErrorSpan(false);
              }}
            />
            <Select
              inputRef={editOpStatusRef}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              // clear={clearSelect}
              defaultOption={operationData?.status || []}
              options={enumerators?.orderProductionStatus || []}
              placeholder="Selecionar"
              // customClassName="cnx-orders-status-edit-cose"
            />
            {errorSpan ? (
              <span className="cnx-auth-level-span-alert-error-calsar">
                O campo Data Hora Início deve ser menor que o Data Hora fim!
              </span>
            ) : null}
          </>
        }
      />
    </>
  );
}

export default OperationModalContainer;
