import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../../../context/moduleContext";
import { ACTIONS } from "../../../../context/moduleActions";

import CnxFormModal from "../../../../../../components/CnxFormModal";
import Input from "../../../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../../../components/CnxInput/InputTypes/Select";
import { axiosInstance } from "../../../../../../http/axiosInstance";
import { IPagination } from "../../../../routes/types";
import { _GET, _GET_ANGELIRA_RESULTS_BY_ID, _GET_ELIPSE_RESULTS_BY_ID, _POST, _POST_ANGELIRA, _PUT, _PUT_ALL, _PUT_ANGELIRA, _PUT_ELIPSE_RESULTS } from "../../../../routes";

interface IFormModalContainer {
  cnxId?: any;
}
function FormModalContainer({cnxId}: IFormModalContainer) {
  const { dispacth, rowData, saving, enumerators, editElipseResultsModal, rowDataElipse, orderOperationId, enumeratorsElipse } =
  useContext(UseContext);  
  const [localModalOpen, setLocalModalOpen] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [localRowDataElipse, setRowDataElipse]: any = useState(null);
  const orderIdStorage = sessionStorage.getItem(`${cnxId}@cnx-order-id`);
  const orderProductionOperationIdStorage = sessionStorage.getItem(`${cnxId}@cnx-order-production-operation-id`);

  // ADD
//   const addIdRef = useRef<HTMLInputElement>(null!);
//   const addTransportCodeRef = useRef<HTMLInputElement>(null!);
//   const addtransporNumberRef = useRef<HTMLInputElement>(null!);
//   const addDriverNameRef = useRef<HTMLInputElement>(null!);
//   const addOrigemRef = useRef<HTMLInputElement>(null!);
//   const addDestinationRef = useRef<HTMLInputElement>(null!);
//   const addTimeToLeaveOrigemRef = useRef<HTMLInputElement>(null!);
//   const addOrigemLeaveDateTimeRef = useRef<HTMLInputElement>(null!);
//   const addDestinationArrivedDateTimeRef = useRef<HTMLInputElement>(null!);
//   const addTransportTimeRef = useRef<HTMLInputElement>(null!);
//   const addhandlingTimeRef = useRef<HTMLInputElement>(null!);
//   const addestimatedStartDateTimeRef = useRef<HTMLInputElement>(null!);
//   const addEstimatedFinishDateTimeRef = useRef<HTMLInputElement>(null!);
//   const addOrigemArrivedDateTImeRef = useRef<HTMLInputElement>(null!);
//   const addTravelDistanceRef = useRef<HTMLInputElement>(null!);
//   const addEstimatedDestinationArrivedDateTimeRef = useRef<HTMLInputElement>(null!);
//   const addStatusRef: any = useRef({});

  // ADD ELIPSE RESULTS
  const editElipseIdRef = useRef<HTMLInputElement>(null!);
  const editElipseStartedDateTimeRef = useRef<HTMLInputElement>(null!);
  const editElipseFinishedDateTimeRef = useRef<HTMLInputElement>(null!);
  const editElipseStatusRef: any = useRef({});
  const editElipseArrivedDateTimeRef = useRef<HTMLInputElement>(null!);
  const editElipseVehicleHandlingTimeRef = useRef<HTMLInputElement>(null!);
  const editElipseOperatingWaitingTimeRef = useRef<HTMLInputElement>(null!);
  const editElipseOperationTypeRef: any = useRef({});
  const editElipseInitialPressureRef = useRef<HTMLInputElement>(null!);
  const editElipseInitialTemperatureRef = useRef<HTMLInputElement>(null!);
  const editElipseInitialAmbientTemperatureRef = useRef<HTMLInputElement>(null!);
  const editElipseWeatherConditionRef: any = useRef({});
  const editElipseFinalPressureRef = useRef<HTMLInputElement>(null!);
  const editElipseFinalTemperatureRef = useRef<HTMLInputElement>(null!);
  const editElipseFinalAmbientTemperatureRef = useRef<HTMLInputElement>(null!);
  const editElipseFinalWeatherConditionRef = useRef<HTMLInputElement>(null!);
  const editElipseVolumeRef = useRef<HTMLInputElement>(null!);
  const editElipseAverageFlowRef = useRef<HTMLInputElement>(null!);
  const editElipseVolumeMassicoRef = useRef<HTMLInputElement>(null!);
  const editElipseVolumeCorrigidoRef = useRef<HTMLInputElement>(null!);

  // useEffect(() => {
  //   if (rowDataElipse.id) {
  //       editElipseIdRef.current.value = rowDataElipse?.id
  //       editElipseStartedDateTimeRef.current.value = rowDataElipse?.startedDateTime,
  //       // editElipseFinishedDateTimeRef.current.value = rowDataElipse?.finishedDateTime,
  //       // editElipseArrivedDateTimeRef.current.value = rowDataElipse?.arrivedDateTime,
  //       // editElipseVehicleHandlingTimeRef.current.value = rowDataElipse?.vehicleHandlingTime,
  //       // editElipseOperatingWaitingTimeRef.current.value = rowDataElipse?.operatingWaitingTime,
  //       editElipseInitialPressureRef.current.value = rowDataElipse?.initialPressure,
  //       editElipseInitialTemperatureRef.current.value = rowDataElipse?.initialTemperature,
  //       editElipseInitialAmbientTemperatureRef.current.value = rowDataElipse?.initialAmbientTemperature,
  //       // editElipseWeatherConditionRef.current.value = rowDataElipse?.weatherCondition,
  //       // editElipseFinalPressureRef.current.value = rowDataElipse?.finalPressure,
  //       // editElipseFinalTemperatureRef.current.value = rowDataElipse?.finalTemperature,
  //       // editElipseFinalAmbientTemperatureRef.current.value = rowDataElipse?.finalAmbientTemperature,
  //       // editElipseFinalWeatherConditionRef.current.value = rowDataElipse?.finalWeatherCondition,
  //       editElipseVolumeRef.current.value = rowDataElipse?.volume
  //       // editElipseAverageFlowRef.current.value = rowDataElipse?.averageFlow
  //   }
  // }, [rowDataElipse]);

  const closeAddAngeLiraResultsModal = () => {
    dispacth({
      type: ACTIONS.ADD_ANGELIRA_RESULTS_MODAL,
      payload: false,
    });
  };

  const closeEditAngeLiraResultsModal = () => {
    dispacth({
      type: ACTIONS.EDIT_ANGELIRA_RESULTS_MODAL,
      payload: false,
    });
  };

  async function getList({ PageSize, PageNumber, OrderOperationId }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET_ELIPSE_RESULTS_BY_ID({ PageSize, PageNumber, OrderOperationId }));
      dispacth({
        type: ACTIONS.SET_ELIPSE_RESULT_DATA,
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

  const clearAddElipseModal = () => {
    (editElipseStartedDateTimeRef.current.value = ""),
      (editElipseFinishedDateTimeRef.current.value = ""),
      (editElipseArrivedDateTimeRef.current.value = ""),
      (editElipseVehicleHandlingTimeRef.current.value = ""),
      (editElipseOperatingWaitingTimeRef.current.value = ""),
      (editElipseInitialPressureRef.current.value = ""),
      (editElipseInitialTemperatureRef.current.value = ""),
      (editElipseInitialAmbientTemperatureRef.current.value = ""),
      (editElipseWeatherConditionRef.current.value = ""),
      (editElipseFinalPressureRef.current.value = ""),
      (editElipseFinalTemperatureRef.current.value = ""),
      (editElipseFinalAmbientTemperatureRef.current.value = ""),
      (editElipseFinalWeatherConditionRef.current.value = ""),
      (editElipseVolumeRef.current.value = ""),
      (editElipseAverageFlowRef.current.value = ""),
      setClearSelect(!clearSelect);
  };


  async function editElipseResults() {

    // if (addformCheck()) return;
    setLocalLoading(true);
    try {
      await axiosInstance(
        _PUT_ELIPSE_RESULTS({
          id: localRowDataElipse?.id,
          orderProductionOperationId: Number(orderProductionOperationIdStorage),
          startedDateTime: editElipseStartedDateTimeRef?.current?.value === "" ? null : editElipseStartedDateTimeRef?.current?.value,
          finishedDateTime: editElipseFinishedDateTimeRef?.current?.value === "" ? null : editElipseFinishedDateTimeRef?.current?.value,
          status: editElipseStatusRef?.current?.id,
          arrivedDateTime: editElipseArrivedDateTimeRef?.current?.value === "" ? null : editElipseArrivedDateTimeRef?.current?.value,
          vehicleHandlingTime: Number(
            editElipseVehicleHandlingTimeRef?.current?.value
          ),
          operatingWaitingTime: Number(
            editElipseOperatingWaitingTimeRef?.current?.value
          ),
          operationType: editElipseOperationTypeRef?.current?.id,
          initialPressure: Number(editElipseInitialPressureRef?.current?.value),
          initialTemperature: Number(
            editElipseInitialTemperatureRef?.current?.value
          ),
          initialAmbientTemperature: Number(
            editElipseInitialAmbientTemperatureRef?.current?.value
          ),
          weatherCondition: editElipseWeatherConditionRef?.current?.id,
          finalPressure: Number(editElipseFinalPressureRef?.current?.value),
          finalTemperature: Number(
            editElipseFinalTemperatureRef?.current?.value
          ),
          finalAmbientTemperature: Number(
            editElipseFinalAmbientTemperatureRef?.current?.value
          ),
          finalWeatherCondition:
            editElipseFinalWeatherConditionRef?.current?.value,
          volume: Number(editElipseVolumeRef?.current?.value),
          averageFlow: Number(editElipseAverageFlowRef?.current?.value),
          correctedVolume: Number(editElipseVolumeCorrigidoRef?.current?.value),
          massVolume: Number(editElipseVolumeMassicoRef?.current?.value),
        })
      );
      // getList({ PageSize: 100, OrderOperationId: orderOperationId });
      const btn = document.getElementById(`${cnxId}cnx-dispatch-elipse-refresh`);
      btn?.click();
      // clearAddElipseModal();
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false)
    }
  }


  const [clearSelect, setClearSelect] = useState(false);

  const clearAddModal = () => {
    setClearSelect(!clearSelect);
  };

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

  const closeEditElipseResultsModal = () => {
    setLocalModalOpen(false);
    setDefaultOperationType(null);
    // dispacth({
    //   type: ACTIONS.EDIT_ELIPSE_RESULTS_MODAL,
    //   payload: false,
    // });
  };

  const weatherCondition = [
    {
      id: 'Ensolarado',
      label: 'Ensolarado'
    },
    {
      id: 'Nublado',
      label: 'Nublado'
    },
    {
      id: 'Parcialmente Nublado',
      label: 'Parcialmente Nublado'
    },
    {
      id: 'Chuvoso',
      label: 'Chuvoso'
    },
    {
      id: 'Nevoeiro',
      label: 'Nevoeiro'
    },
    {
      id: 'Granizo',
      label: 'Granizo'
    },
    {
      id: 'Tempestade',
      label: 'Tempestade'
    },
  ];

  const [defaultOperationType, setDefaultOperationType] = useState(null);
  const [defaultWeatherCondition, setDefaultWeatherCondition] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState(null);

  const openEditModal = () => {
    const sessionData: any = sessionStorage.getItem(`${cnxId}@cnx-row-data-elipse`);
    setRowDataElipse(JSON.parse(sessionData));
    const data = JSON.parse(sessionData);
    setDefaultOperationType(data?.operationType);
    setDefaultWeatherCondition(data?.weatherCondition);
    setDefaultStatus(data?.status);
    editElipseIdRef.current.value = data?.id
    editElipseStartedDateTimeRef.current.value = data?.startedDateTime,
    editElipseInitialPressureRef.current.value = data?.initialPressure,
    editElipseInitialTemperatureRef.current.value = data?.initialTemperature,
    editElipseInitialAmbientTemperatureRef.current.value = data?.initialAmbientTemperature,
    editElipseVolumeRef.current.value = data?.volume
    editElipseVolumeMassicoRef.current.value = data?.massVolume
    editElipseVolumeCorrigidoRef.current.value = data?.correctedVolume
    setLocalModalOpen(true);
  }


  return (
    <>
      {/* <CnxFormModal
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
              label="Nome motorista"
              onChange={() => {
                addDriverNameRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />        
            <Input
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
            />        
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
      /> */}
      <button id={`${cnxId}cnx-open-elipse-edit-modal`} style={{display: 'none'}} type='button' onClick={() => openEditModal()}></button>
      <button id={`${cnxId}cnx-close-elipse-edit-modal`} style={{display: 'none'}} type='button' onClick={() => setLocalModalOpen(false)}></button>
      <CnxFormModal
        title={`Editar Resultados Elipse #Ordem: ${orderIdStorage}`}
        open={localModalOpen}
        close={closeEditElipseResultsModal}
        saveButton={() => editElipseResults()}
        saving={saving}
        // clearButton={() => null}
        formInputs={
          <>
            <Input
              inputRef={editElipseIdRef}
              type="text"
              label="id"
              disabled
            />
            <Input
              inputRef={editElipseStartedDateTimeRef}
              type="datetime-local"
              label="Data hora início"
              onChange={() => {
                editElipseStartedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={editElipseFinishedDateTimeRef}
              type="datetime-local"
              label="Data hora fim"
              onChange={() => {
                editElipseFinishedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={editElipseArrivedDateTimeRef}
              type="datetime-local"
              label="Data hora chegada"
              onChange={() => {
                editElipseArrivedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={editElipseVehicleHandlingTimeRef}
              type="number"
              label="Tempo manobra (min)"
              onChange={() => {
                editElipseVehicleHandlingTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={editElipseOperatingWaitingTimeRef}
              type="number"
              label="Tempo espera (min)"
              onChange={() => {
                editElipseOperatingWaitingTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Select
              inputRef={editElipseOperationTypeRef}
              label="Tipo operação"
              options={enumerators?.operationTypes || []}
              defaultOption={defaultOperationType}
              clear={clearSelect}
              autoComplete
              placeholder="Selecionar"
              keyLabel="name"
              keyValue="id"
            />
            <Input
              inputRef={editElipseInitialPressureRef}
              type="number"
              label="Pressão inicial (bar)"
              onChange={() => {
                editElipseInitialPressureRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editElipseInitialTemperatureRef}
              type="number"
              label="Temp. inicial (Cº)"
              onChange={() => {
                editElipseInitialTemperatureRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editElipseInitialAmbientTemperatureRef}
              type="number"
              label="Temp. Amb. inicial (Cº)"
              onChange={() => {
                editElipseInitialAmbientTemperatureRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={editElipseWeatherConditionRef}
              type="text"
              label="Condição clima inicial"
              onChange={() => {
                editElipseWeatherConditionRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Select
              inputRef={editElipseWeatherConditionRef}
              keyLabel="label"
              keyValue="id"
              clear={clearSelect}
              placeholder="Selecionar"
              options={weatherCondition || []}
              defaultOption={defaultWeatherCondition}
              label="Condição clima inicial"
              // onChange={() => {
              //   addElipseWeatherConditionRef.current!.classList?.remove(
              //     "cnx-input-border-error-highlight"
              //   );
              // }}
            />
            <Input
              inputRef={editElipseVolumeMassicoRef}
              type="number"
              label="Mássico (kg)"
              onChange={() => {
                editElipseVolumeMassicoRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editElipseVolumeCorrigidoRef}
              type="number"
              label="Volume Corrigido (m³)"
              onChange={() => {
                editElipseVolumeCorrigidoRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={editElipseFinalPressureRef}
              type="number"
              label="Pressão Final (bar)"
              onChange={() => {
                editElipseFinalPressureRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={editElipseFinalTemperatureRef}
              type="number"
              label="Temp. Final (Cº)"
              onChange={() => {
                editElipseFinalTemperatureRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={editElipseFinalAmbientTemperatureRef}
              type="number"
              label="Temp. Amb. final (Cº)"
              onChange={() => {
                editElipseFinalAmbientTemperatureRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={editElipseFinalWeatherConditionRef}
              type="text"
              label="Condição Clima Final"
              onChange={() => {
                editElipseFinalWeatherConditionRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Input
              inputRef={editElipseVolumeRef}
              type="number"
              label="Volume Normalizado (m³)"
              onChange={() => {
                editElipseVolumeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={editElipseAverageFlowRef}
              type="number"
              label="Vazão média (m3/h)"
              onChange={() => {
                editElipseAverageFlowRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Select
              inputRef={editElipseStatusRef}
              label="Estágio"
              options={enumeratorsElipse?.status || []}
              defaultOption={defaultStatus}
              autoComplete
              placeholder="Selecionar"
              keyLabel="name"
              keyValue="id"
            />
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
