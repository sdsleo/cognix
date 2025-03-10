import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../../../context/moduleContext";
import { ACTIONS } from "../../../../context/moduleActions";

import CnxFormModal from "../../../../../../components/CnxFormModal";
import Input from "../../../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../../../components/CnxInput/InputTypes/Select";
import { axiosInstance } from "../../../../../../http/axiosInstance";
import { IPagination } from "../../../../routes/types";
import {
  _GET,
  _GET_ANGELIRA_RESULTS_BY_ID,
  _POST,
  _POST_ANGELIRA,
  _PUT,
  _PUT_ALL,
  _PUT_ANGELIRA,
} from "../../../../routes";
import StatusLogs from "../../../../../../components/CnxInput/InputTypes/StatusLogs";
import { ContainerRelations } from "./styles";

interface IFormModalContainer {
  cnxId?: any;
}

function FormModalContainer({cnxId}: IFormModalContainer) {
  const {
    dispacth,
    addAngeLiraResultsModal,
    editAngeLiraResultsModal,
    rowData,
    rowDataAngeLira,
    saving,
    enumerators,
    rowIds,
  } = useContext(UseContext);

  const [localModalOpen, setLocalModalOpen] = useState(false);
  const [localSaving, setLocalSaving] = useState(false);
  const [localRowDatAngelira, setRowDataAngelira]: any = useState(null);


  // ADD
  const addIdRef = useRef<HTMLInputElement>(null!);
  const addTransportCodeRef = useRef<HTMLInputElement>(null!);
  const addtransporNumberRef = useRef<HTMLInputElement>(null!);
  const addDriverNameRef = useRef<HTMLInputElement>(null!);
  const addOrigemRef = useRef<HTMLInputElement>(null!);
  const addDestinationRef = useRef<HTMLInputElement>(null!);
  const addTimeToLeaveOrigemRef = useRef<HTMLInputElement>(null!);
  const addOrigemLeaveDateTimeRef = useRef<HTMLInputElement>(null!);
  const addDestinationArrivedDateTimeRef = useRef<HTMLInputElement>(null!);
  const addTransportTimeRef = useRef<HTMLInputElement>(null!);
  const addhandlingTimeRef = useRef<HTMLInputElement>(null!);
  const addestimatedStartDateTimeRef = useRef<HTMLInputElement>(null!);
  const addEstimatedFinishDateTimeRef = useRef<HTMLInputElement>(null!);
  const addOrigemArrivedDateTImeRef = useRef<HTMLInputElement>(null!);
  const addTravelDistanceRef = useRef<HTMLInputElement>(null!);
  const addEstimatedDestinationArrivedDateTimeRef = useRef<HTMLInputElement>(
    null!
  );
  const addStatusRef: any = useRef({});

  // ADD
  const editIdRef = useRef<HTMLInputElement>(null!);
  const editTransportCodeRef = useRef<HTMLInputElement>(null!);
  const edittransporNumberRef = useRef<HTMLInputElement>(null!);
  const editDriverNameRef = useRef<HTMLInputElement>(null!);
  const editOrigemRef = useRef<HTMLInputElement>(null!);
  const editDestinationRef = useRef<HTMLInputElement>(null!);
  const editTimeToLeaveOrigemRef = useRef<HTMLInputElement>(null!);
  const editOrigemLeaveDateTimeRef = useRef<HTMLInputElement>(null!);
  const editDestinationArrivedDateTimeRef = useRef<HTMLInputElement>(null!);
  const editTransportTimeRef = useRef<HTMLInputElement>(null!);
  const editHandlingTimeRef = useRef<HTMLInputElement>(null!);
  const editStartDateTimeRef = useRef<HTMLInputElement>(null!);
  const editFinishDateTimeRef = useRef<HTMLInputElement>(null!);
  const editEstimatedStartDateTimeRef = useRef<HTMLInputElement>(null!);
  const editEstimatedFinishDateTimeRef = useRef<HTMLInputElement>(null!);
  const editOrigemArrivedDateTimeRef = useRef<HTMLInputElement>(null!);
  const editTravelDistanceRef = useRef<HTMLInputElement>(null!);
  const editEstimatedDestinationArrivedDateTimeRef = useRef<HTMLInputElement>(
    null!
  );
  const editAngeLiraResourceIdRef: any = useRef({});
  const editStatusRef: any = useRef({});

  // useEffect(() => {
  //   // editIdRef.current.value = rowData?.id;
  //   // editPlannedVolumeRef.current.value = rowData?.orderCustom?.volume.toFixed(2);
  //   editIdRef.current.value = rowDataAngeLira?.id;
  //   editTransportCodeRef.current.value = rowDataAngeLira?.transportCode;
  //   edittransporNumberRef.current.value = rowDataAngeLira?.transporNumber;
  //   editDriverNameRef.current.value = rowDataAngeLira?.driverName;
  //   // editOrigemRef.current.value = rowDataAngeLira?.origem;
  //   // editDestinationRef.current.value = rowDataAngeLira?.destination;
  //   editTimeToLeaveOrigemRef.current.value = rowDataAngeLira?.timeToLeaveOrigem;
  //   // editOrigemLeaveDateTimeRef.current.value = rowDataAngeLira?.origemLeaveDateTime;
  //   // editDestinationArrivedDateTimeRef.current.value = rowDataAngeLira?.destinationArrivedDateTime;
  //   editTransportTimeRef.current.value = rowDataAngeLira?.transportTime;
  //   editHandlingTimeRef.current.value = rowDataAngeLira?.handlingTime;
  //   editStartDateTimeRef.current.value = rowDataAngeLira?.startedDateTime;
  //   editFinishDateTimeRef.current.value = rowDataAngeLira?.finishedDateTime;
  //   editEstimatedStartDateTimeRef.current.value =
  //     rowDataAngeLira?.estimatedStartDateTime;
  //   // editEstimatedFinishDateTimeRef.current.value = rowDataAngeLira?.estimatedFinishDateTime;
  //   // editOrigemArrivedDateTimeRef.current.value = rowDataAngeLira?.origemArrivedDateTime;
  //   editTravelDistanceRef.current.value = rowDataAngeLira?.travelDistance;
  //   editEstimatedDestinationArrivedDateTimeRef.current.value =
  //     rowDataAngeLira?.estimatedDestinationArrivedDateTime;
  //   // editStatusRef.current.value = rowDataAngeLira?.status;
  // }, [rowDataAngeLira]);

  const closeAddAngeLiraResultsModal = () => {
    dispacth({
      type: ACTIONS.ADD_ANGELIRA_RESULTS_MODAL,
      payload: false,
    });
  };

  const closeEditAngeLiraResultsModal = () => {
    setLocalModalOpen(false);
    // setDefaultOperationType(null);
    // dispacth({
    //   type: ACTIONS.EDIT_ANGELIRA_RESULTS_MODAL,
    //   payload: false,
    // });
  };

  async function getList({
    PageSize,
    PageNumber,
    OrderOperationId,
  }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(
        _GET_ANGELIRA_RESULTS_BY_ID({ PageSize, PageNumber, OrderOperationId })
      );
      dispacth({
        type: ACTIONS.SET_ANGELIRA_RESULT_DATA,
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

  async function add() {
    // if (addformCheck()) return;
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });
    try {
      // await axiosInstance(
      //   _POST_ANGELIRA({
      //     destination: '',
      //     destinationArrivedDateTime: '',
      //     driverName: '',
      //     estimatedDestinationArrivedDateTime: '',
      //     estimatedFinishDateTime: '',
      //     estimatedStartDateTime: '',
      //     handlingTime: 0,
      //     origem: '',
      //     origemArrivedDateTime: '',
      //     origemLeaveDateTime: '',
      //     status: 0,
      //     timeToLeaveOrigem: 0,
      //     transporNumber: 0,
      //     transportCode: '',
      //     transportTime: 0,
      //     travelDistance: 0
      //   })
      // );
      getList({ PageSize: 100 });
      clearAddModal();
    } catch (err) {
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });
    }
  }

  async function edit() {
    // if (editformCheck()) return;
    setLocalSaving(true);
    // dispacth({
    //   type: ACTIONS.SAVING,
    //   payload: true,
    // });

    try {
      const { data } = await axiosInstance(
        _PUT_ANGELIRA({
          id: editIdRef?.current?.value,
          startedDateTime:
            editStartDateTimeRef?.current?.value === ""
              ? null
              : editStartDateTimeRef?.current?.value,
          finishedDateTime:
            editFinishDateTimeRef?.current?.value === ""
              ? null
              : editFinishDateTimeRef?.current?.value,
          status: editStatusRef?.current?.id,
          transportCode: editTransportCodeRef?.current?.value,
          transporNumber: edittransporNumberRef?.current?.value,
          driverName: editDriverNameRef?.current?.value,
          origem: editOrigemRef?.current?.value,
          destination: editDestinationRef?.current?.value,
          timeToLeaveOrigem: Number(editTimeToLeaveOrigemRef?.current?.value),
          estimatedStartDateTime:
            editEstimatedStartDateTimeRef?.current?.value === ""
              ? null
              : editEstimatedStartDateTimeRef?.current?.value,
          estimatedFinishDateTime: null,
          origemArrivedDateTime: null,
          travelDistance: Number(editTravelDistanceRef?.current?.value),
          estimatedDestinationArrivedDateTime:
            editEstimatedDestinationArrivedDateTimeRef?.current?.value === ""
              ? null
              : editEstimatedDestinationArrivedDateTimeRef?.current?.value,
          origemLeaveDateTime: null,
          destinationArrivedDateTime: null,
          transportTime: Number(editTransportTimeRef?.current?.value),
          handlingTime: Number(editHandlingTimeRef?.current?.value),
          resourceId: Number(editAngeLiraResourceIdRef?.current?.id),
          orderProductionOperationId:
            localRowDatAngelira?.orderProductionOperationId,
        })
      );
      const btn = document.getElementById(`${cnxId}cnx-dispatch-angelira-refresh`);
      btn?.click();
      // getList({
      //   PageSize: 100,
      //   OrderOperationId: rowDataAngeLira?.orderProductionOperationId,
      // });
      // dispacth({
      //   type: ACTIONS.SET_ROW_DATA,
      //   payload: data,
      // });
    } catch (err) {
      console.error(err);
    } finally {
      setLocalSaving(false);
      // dispacth({
      //   type: ACTIONS.SAVING,
      //   payload: false,
      // });
    }
  }

  const [clearSelect, setClearSelect] = useState(false);

  const clearAddModal = () => {
    setClearSelect(!clearSelect);
  };

  function addformCheck() {
    // let addProductId = false;
    // let addScheduleDate = false;
    // let addBaseId = false;
    // let addClientId = false;
    // let addVehicleId = false;
    // let addPlannedVolume = false;
    // if (!addProductIdRef.current) {
    //   document
    //     ?.querySelector(".cnx-orders-product-add-copa")!
    //     .classList?.add("cnx-input-border-error-highlight");
    //   addProductId = true;
    // }
    // if (addScheduleDateRef.current.value === "") {
    //   addScheduleDateRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   addScheduleDate = true;
    // }
    // if (!addBaseIdRef.current) {
    //   document
    //     ?.querySelector(".cnx-orders-base-add-coba")!
    //     .classList?.add("cnx-input-border-error-highlight");
    //   addBaseId = true;
    // }
    // if (!addClientIdRef.current) {
    //   document
    //     ?.querySelector(".cnx-orders-client-add-coca")!
    //     .classList?.add("cnx-input-border-error-highlight");
    //   addClientId = true;
    // }
    // if (!addVehicleIdRef.current) {
    //   document
    //     ?.querySelector(".cnx-orders-vehicle-add-cova")!
    //     .classList?.add("cnx-input-border-error-highlight");
    //   addVehicleId = true;
    // }
    // if (addPlannedVolumeRef.current.value === "") {
    //   addPlannedVolumeRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   addPlannedVolume = true;
    // }
    // if (
    //   addProductId ||
    //   addScheduleDate ||
    //   addBaseId ||
    //   addClientId ||
    //   addVehicleId ||
    //   addPlannedVolume
    // ) {
    //   return true;
    // }
  }

  function editformCheck() {
    // let editProductId = false;
    // let editScheduleDate = false;
    // let editBaseId = false;
    // let editClientId = false;
    // let editVehicleId = false;
    // let editPlannedVolume = false;
    // let editStatus = false;
    // if (!editProductIdRef.current) {
    //   document
    //     ?.querySelector(".cnx-orders-product-edit-cope")!
    //     .classList?.add("cnx-input-border-error-highlight");
    //   editProductId = true;
    // }
    // if (editScheduleDateRef.current.value === "") {
    //   editScheduleDateRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   editScheduleDate = true;
    // }
    // if (!editBaseIdRef.current) {
    //   document
    //     ?.querySelector(".cnx-orders-base-edit-cobe")!
    //     .classList?.add("cnx-input-border-error-highlight");
    //   editBaseId = true;
    // }
    // if (!editClientIdRef.current) {
    //   document
    //     ?.querySelector(".cnx-orders-client-edit-coce")!
    //     .classList?.add("cnx-input-border-error-highlight");
    //   editClientId = true;
    // }
    // if (!editVehicleIdRef.current) {
    //   document
    //     ?.querySelector(".cnx-orders-vehicle-edit-cove")!
    //     .classList?.add("cnx-input-border-error-highlight");
    //   editVehicleId = true;
    // }
    // if (editPlannedVolumeRef.current.value === "") {
    //   editPlannedVolumeRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   editPlannedVolume = true;
    // }
    // if (!editStatusRef.current) {
    //   document
    //     ?.querySelector(".cnx-orders-status-edit-cose")!
    //     .classList?.add("cnx-input-border-error-highlight");
    //   editStatus = true;
    // }
    // if (
    //   editProductId ||
    //   editScheduleDate ||
    //   editBaseId ||
    //   editClientId ||
    //   editVehicleId ||
    //   editPlannedVolume ||
    //   editStatus
    // ) {
    //   return true;
    // }
  }

  function cpfMask(v: any) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
  }

  const statusTravel = [
    {
      id: 'Agendamento',
      label: 'Agendamento'
    },
    {
      id: 'Iniciada',
      label: 'Iniciada'
    },
    {
      id: 'Finalizada',
      label: 'Finalizada'
    },
    {
      id: 'Cancelada',
      label: 'Cancelada'
    },
  ];

  const openEditModal = () => {
    const sessionData: any = sessionStorage.getItem(`${cnxId}@cnx-row-data-angelira`);
    setRowDataAngelira(JSON.parse(sessionData));
    setLocalModalOpen(true);
    const data = JSON.parse(sessionData);
    editIdRef.current.value = data?.id;
    editTransportCodeRef.current.value = data?.transportCode;
    edittransporNumberRef.current.value = data?.transporNumber;
    editDriverNameRef.current.value = data?.driverName;
    // editOrigemRef.current.value = data?.origem;
    // editDestinationRef.current.value = data?.destination;
    editTimeToLeaveOrigemRef.current.value = data?.timeToLeaveOrigem;
    // editOrigemLeaveDateTimeRef.current.value = data?.origemLeaveDateTime;
    // editDestinationArrivedDateTimeRef.current.value = data?.destinationArrivedDateTime;
    editTransportTimeRef.current.value = data?.transportTime;
    editHandlingTimeRef.current.value = data?.handlingTime;
    editStartDateTimeRef.current.value = data?.startedDateTime;
    editFinishDateTimeRef.current.value = data?.finishedDateTime;
    editEstimatedStartDateTimeRef.current.value =
      data?.estimatedStartDateTime;
    // editEstimatedFinishDateTimeRef.current.value = data?.estimatedFinishDateTime;
    // editOrigemArrivedDateTimeRef.current.value = data?.origemArrivedDateTime;
    editTravelDistanceRef.current.value = data?.travelDistance;
    editEstimatedDestinationArrivedDateTimeRef.current.value =
      data?.estimatedDestinationArrivedDateTime;
  }

  return (
    <>
      <CnxFormModal
        title="Adicionar Resultados"
        open={addAngeLiraResultsModal}
        close={closeAddAngeLiraResultsModal}
        saveButton={() => null}
        saving={saving}
        clearButton={() => null}
        formInputs={
          <>
            <Input
              inputRef={addIdRef}
              type="text"
              label="id"
              disabled
              onChange={() => {
                addIdRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addTransportCodeRef}
              type="text"
              label="Código transporte"
              onChange={() => {
                addTransportCodeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addtransporNumberRef}
              type="number"
              label="Número transporte"
              onChange={() => {
                addtransporNumberRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addDriverNameRef}
              type="text"
              label="CPF do motorista"
              onChange={() => {
                addDriverNameRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={addOrigemRef}
              type="text"
              label="Origem"
              onChange={() => {
                addOrigemRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addDestinationRef}
              type="text"
              label="Destino"
              onChange={() => {
                addDestinationRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Input
              inputRef={addTimeToLeaveOrigemRef}
              type="number"
              label="Tempo para saída origem (min)"
              onChange={() => {
                addTimeToLeaveOrigemRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addOrigemLeaveDateTimeRef}
              type="datetime-local"
              label="Data hora saída origem"
              onChange={() => {
                addOrigemLeaveDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addDestinationArrivedDateTimeRef}
              type="datetime-local"
              label="Data hora chegada destino"
              onChange={() => {
                addDestinationArrivedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addTransportTimeRef}
              type="number"
              label="Tempo de transporte (min)"
              onChange={() => {
                addTransportTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addhandlingTimeRef}
              type="number"
              label="Tempo de manobra (min)"
              onChange={() => {
                addhandlingTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addestimatedStartDateTimeRef}
              type="datetime-local"
              label="Data hora início prevista"
              onChange={() => {
                addestimatedStartDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addEstimatedFinishDateTimeRef}
              type="datetime-local"
              label="Data hora chegada prevista"
              onChange={() => {
                addEstimatedFinishDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addOrigemArrivedDateTImeRef}
              type="datetime-local"
              label="Data hora chegada origem"
              onChange={() => {
                addOrigemArrivedDateTImeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addTravelDistanceRef}
              type="number"
              label="Distância percorrida (km)"
              onChange={() => {
                addTravelDistanceRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addEstimatedDestinationArrivedDateTimeRef}
              type="datetime-local"
              label="Data hora chegada prevista destino"
              onChange={() => {
                addEstimatedDestinationArrivedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Select
              inputRef={addStatusRef}
              label="Status"
              options={[]}
              keyLabel="name"
              keyValue="id"
            />
          </>
        }
      />
      <button id={`${cnxId}cnx-open-angelira-edit-modal`} style={{display: 'none'}} type='button' onClick={() => openEditModal()}></button>
      <button id={`${cnxId}cnx-close-angelira-edit-modal`} style={{display: 'none'}} type='button' onClick={() => setLocalModalOpen(false)}></button>
      <CnxFormModal
        title="Editar Resultados"
        open={localModalOpen}
        close={closeEditAngeLiraResultsModal}
        saveButton={() => edit()}
        saving={localSaving}
        // clearButton={() => null}
        formInputs={
          <>
            <Input
              inputRef={editIdRef}
              type="text"
              label="id"
              disabled
              onChange={() => {
                editIdRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editTransportCodeRef}
              type="text"
              label="Código Transporte"
              onChange={() => {
                editTransportCodeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={edittransporNumberRef}
              type="number"
              label="Número Transporte"
              onChange={() => {
                edittransporNumberRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={editDriverNameRef}
              type="text"
              label="CPF do motorista"
              onChange={() => {
                editDriverNameRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <div className="cnx-default-input-container-cdic">
              <label className="cnx-default-input-label-cdil" htmlFor="cpf">
                CPF do motorista
              </label>
              <input
                id="cpfId"
                name="cpf"
                ref={editDriverNameRef}
                type="text"
                className="cnx-default-input-cdi"
                placeholder="000.000.000-00"
                onChange={(e: any) => {
                  e.currentTarget.maxLength = 14;
                  const { value } = e.target;
                  e.target.value = cpfMask(value);
                }}
              />
            </div>
            {/* <Input
              inputRef={editOrigemRef}
              type="text"
              label="Origem"
              onChange={() => {
                editOrigemRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editDestinationRef}
              type="text"
              label="Destino"
              onChange={() => {
                editDestinationRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Input
              inputRef={editTimeToLeaveOrigemRef}
              type="number"
              label="Tempo para saída origem (min)"
              onChange={() => {
                editTimeToLeaveOrigemRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={editOrigemLeaveDateTimeRef}
              type="datetime-local"
              label="Data hora saída origem"
              onChange={() => {
                editOrigemLeaveDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={editDestinationArrivedDateTimeRef}
              type="datetime-local"
              label="Data hora chegada destino"
              onChange={() => {
                editDestinationArrivedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Input
              inputRef={editTransportTimeRef}
              type="number"
              label="Tempo de Transporte (min)"
              onChange={() => {
                editTransportTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editHandlingTimeRef}
              type="number"
              label="Tempo de Manobra (min)"
              onChange={() => {
                editHandlingTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editStartDateTimeRef}
              type="datetime-local"
              label="Data Hora Início Real"
              onChange={() => {
                editStartDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editFinishDateTimeRef}
              type="datetime-local"
              label="Data Hora Fim Real"
              onChange={() => {
                editFinishDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editEstimatedStartDateTimeRef}
              type="datetime-local"
              label="Data Hora Início Prev."
              onChange={() => {
                editEstimatedStartDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={editEstimatedFinishDateTimeRef}
              type="datetime-local"
              label="Data hora chegada prevista"
              onChange={() => {
                editEstimatedFinishDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={editOrigemArrivedDateTimeRef}
              type="datetime-local"
              label="Data hora chegada origem"
              onChange={() => {
                editOrigemArrivedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Input
              inputRef={editTravelDistanceRef}
              type="number"
              label="Distância Percorrida (km)"
              onChange={() => {
                editTravelDistanceRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editEstimatedDestinationArrivedDateTimeRef}
              type="datetime-local"
              label="Data Hora Fim Prev"
              onChange={() => {
                editEstimatedDestinationArrivedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Select
              inputRef={editAngeLiraResourceIdRef}
              label="Tramo"
              options={enumerators?.resources || []}
              defaultOption={rowDataAngeLira?.resourceId || []}
              autoComplete
              placeholder="Selecionar"
              keyLabel="code"
              keyValue="id"
            /> */}
            {/* <Input
              inputRef={editStatusRef}
              type="text"
              label="Status"
              onChange={() => {
                editStatusRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Select
              inputRef={editStatusRef}
              keyLabel="label"
              keyValue="id"
              clear={clearSelect}
              placeholder="Selecionar"
              options={statusTravel || []}
              defaultOption={localRowDatAngelira?.status}
              label="Situação"
              // onChange={() => {
              //   addAngeLiraStatusRef.current!.classList?.remove(
              //     "cnx-input-border-error-highlight"
              //   );
              // }}
            />
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
