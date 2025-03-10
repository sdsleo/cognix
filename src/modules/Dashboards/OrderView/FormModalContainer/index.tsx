import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../context/moduleContext";
import { ACTIONS } from "../context/moduleActions";

import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import { axiosInstance } from "../../../../http/axiosInstance";

import {
  _GET,
  _GET_ENUMERATOS,
} from "../routes";
import StatusLogs from "../../../../components/CnxInput/InputTypes/StatusLogs";
import { ContainerRelations } from "./styles";
import { _GET_BY_ID } from "../../../User/routes";
import useFormatDate from "../../../../hooks/useFormatDate";
import CnxDialog from "../../../../components/CnxDialog";
import "./styles.css";
import { _GET_TRAMOS_FILTERED, _POST_OPERATION } from "../../../Orders/routes";
import { IFiltersTramos } from "../../../Orders/routes/types";
import { IDashboardGET } from "../routes/types";
import { set } from "date-fns";

function FormModalContainer() {
  const {
    dispacth,
    saving,
    enumerators,
    operationData,
    modalOpen,
    operationsEnumerators
  } = useContext(UseContext);

  const editOpOperationIdRef = useRef<HTMLInputElement>(null!);
  const editOpOperationNumberRef: any = useRef({});
  const editOpResourceIdRef: any = useRef({});
  const editOpCavaloIdRef: any = useRef({});
  const editOpScheduleStartDateTimeRef = useRef<HTMLInputElement>(null!);
  const editOpScheduleFinishDateTimeRef = useRef<HTMLInputElement>(null!);
  const editScheduleDateRef = useRef<HTMLInputElement>(null!);
  const editOpStatusRef: any = useRef({});

  const [messageError, setMessageError]: any = useState("");
  const dialogModalError = useId();
  const openError = () => {
    const modal: any = document.getElementById(dialogModalError);
    modal?.showModal();
  };

 // const [localModalOpen, setLocalModalOpen] = useState(false);
  // const [localOperationData, setLocalOperationData]: any = useState(null);

  const handleData = () => {
    // const dataStorage: any = sessionStorage.getItem(`@cnx-gantt-operation-data`);
    // setLocalOperationData(JSON.parse(dataStorage));
    // setLocalModalOpen(true);
  }

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
          ClientId
        })
      );
      dispacth({
        type: ACTIONS.SET_OPERATIONS_ENUMERATORS,
        payload: data,
      });
    } catch (err: any) {
      console.error("ERRO", err);
      // const modal: any = document.getElementById(CNX_ID_LIST);
      // modal?.showModal();
    } finally {

    }
  }

  useEffect(() => {
    if (operationData?.orderProductions[0].orderProductionOperation?.operation?.number === 10) {
      getListTramos({BaseId: operationData?.orderCustom?.baseId })
    }
    if (operationData?.orderProductions[0].orderProductionOperation?.operation?.number === 30) {
      getListTramos({ClientId: operationData?.clientId})
    }
    // getListTramos({BaseId: rowData?.orderCustom?.baseId, ClientId: rowData?.clientId})
    // getListTramos({})
  }, [operationData]);

  // useEffect(() => {
  //   if (addModalUser || editModalUser) {
  //     getAllSelectors();
  //   }
  // }, [addModalUser, editModalUser]);

  useEffect(() => {
    getEnumerators()
    if (operationData?.id) {
      editOpOperationIdRef.current.value =
        operationData?.orderProductions[0].orderProductionOperation?.id;
      editOpScheduleStartDateTimeRef.current.value =
        operationData?.orderProductions[0].orderProductionOperation?.scheduleStartDateTime?.slice(
          0,
          16
        );
      editOpScheduleFinishDateTimeRef.current.value =
        operationData?.orderProductions[0].orderProductionOperation?.scheduleFinishDateTime?.slice(
          0,
          16
        );
    }
    setClearSelect(!clearSelect);
  }, [operationData]);


  const closeEditOperationModal = () => {
    editOpScheduleStartDateTimeRef.current.value =
      operationData?.orderProductionOperation?.scheduleStartDateTime?.slice(
        0,
        16
      );
    editOpScheduleFinishDateTimeRef.current.value =
      operationData?.orderProductionOperation?.scheduleFinishDateTime?.slice(
        0,
        16
      );
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_MODAL_OPEN,
      payload: false,
    });
    setErrorSpan(false);
    // setLocalModalOpen(false);
  };

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
    // if (editformCheck()) return;
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });

    try {
      const { data } = await axiosInstance(
        _POST_OPERATION({
          id: operationData?.orderProductions[0]?.id,
          status: editOpStatusRef?.current?.id,
          orderProductionOperation: {
            id: operationData?.orderProductions[0].orderProductionOperation?.id,
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
      const btn = document.getElementById('cnx-order-view-refresh-btn');
      btn?.click();
      // getOrderByIdRefresh();
      // getList({ PageSize: 100 });
      dispacth({
        type: ACTIONS.SET_MODAL_OPEN,
        payload: false,
      });
    } catch (err: any) {
      console.error(err);
      setMessageError(
        err?.response?.data?.message || "Error ao adicionar Ordem"
      );
      openError();
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });
    }
  }


  const [clearSelect, setClearSelect] = useState(false);


  const today = new Date().toISOString();

  return (
    <>
      <CnxDialog
        useId={dialogModalError}
        type="error"
        content={{
          title: "Erro!",
          message: messageError,
        }}
      />
      {/* <button id={`@cnx-gantt-order-view-operation-modal`} type="button" style={{ display: 'none'}} onClick={() => handleData()}></button> */}

      <CnxFormModal
        title={`Editar Operação #Ordem: ${operationData?.orderNumber || ''}`}
        open={modalOpen}
        close={closeEditOperationModal}
        saveButton={() => editOperation()}
        // clearButton={() => clearEditModal()}
        saving={saving}
        historic={<></>}
        formInputs={
          <>
            <Input
              inputRef={editOpOperationIdRef}
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
                operationData?.orderProductions[0].orderProductionOperation?.operation?.id || []
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
                operationData?.orderProductions[0]?.orderProductionOperation?.cavaloId || []
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
                operationData?.orderProductions[0].orderProductionOperation?.resourceId || []
              }
              options={operationsEnumerators || []}
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
              // defaultValue={operationData?.orderProductionOperation?.scheduleStartDateTime?.slice(
              //   0,
              //   16
              // )}
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
              // defaultValue={operationData?.orderProductionOperation?.scheduleFinishDateTime?.slice(
              //   0,
              //   16
              // )}
              mandatory
              onChange={() => {
                editScheduleDateRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
                setErrorSpan(false);
              }}
            />
            <StatusLogs
              inputRef={editOpStatusRef}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={operationData?.orderProductions[0].status}
              options={enumerators?.orderProductionStatus || []}
              placeholder="Selecionar"
              customClassName="cnx-orders-status-edit-cose"
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

export default FormModalContainer;
