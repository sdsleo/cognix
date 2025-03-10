import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";

import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import { axiosInstance } from "../../../../http/axiosInstance";
import { IPagination, IFiltersTramos } from "../../routes/types";
import {
  _GET,
  _GET_BASES,
  _GET_CLIENTS,
  _GET_TRAMOS_FILTERED,
  _POST,
  _POST_ANGELIRA_RESULTS,
  _POST_ELIPSE_RESULTS,
  _PUT,
  _PUT_OPERATION,
} from "../../routes";
import StatusLogs from "../../../../components/CnxInput/InputTypes/StatusLogs";
import CnxDialog from "../../../../components/CnxDialog";

function FormModalContainer() {
  const {
    dispacth,
    addModal,
    editModal,
    editOperationModal,
    addAngeLiraResultModal,
    addElipseResultModal,
    rowData,
    rowDataEvents,
    saving,
    enumerators,
    enumeratorsOrder,
    page,
    cardView,
    enumeratorsElipse,
    enumeratorsTramos
  } = useContext(UseContext);

  const [productionStatus, setProductionStatus] = useState([]);
  
  useEffect(() => {
  const filtered = enumeratorsOrder?.orderProductionStatus?.filter((item: any) => item.id >= rowData?.orderProductions?.[0]?.status);
  setProductionStatus(filtered)
  }, [rowData])
  const addIdRef = useRef<HTMLInputElement>(null!);
  const addTypeIdRef: any = useRef({});
  const addReasonIdRef: any = useRef({});
  const addCommentRef = useRef<HTMLInputElement>(null!);
  const addStartDateTimeRef = useRef<HTMLInputElement>(null!);
  const addFinishDateTimeRef = useRef<HTMLInputElement>(null!);
  const addStatusRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editTypeIdRef: any = useRef({});
  const editReasonIdRef: any = useRef({});
  const editCommentRef = useRef<HTMLInputElement>(null!);
  const editStartDateTimeRef = useRef<HTMLInputElement>(null!);
  const editFinishDateTimeRef = useRef<HTMLInputElement>(null!);
  const editStatusRef: any = useRef({});

  const editOperationIdRef = useRef<HTMLInputElement>(null!);
  const editProductionIdRef = useRef<HTMLInputElement>(null!);
  const editProductionOperationIdRef = useRef<HTMLInputElement>(null!);
  const editOperationOrderNumberRef = useRef<HTMLInputElement>(null!);
  const editOperationPlateRef = useRef<HTMLInputElement>(null!);
  const editOperationBaseRef = useRef<HTMLInputElement>(null!);
  const editOperationClientRef = useRef<HTMLInputElement>(null!);
  const editOperationVolumeRef = useRef<HTMLInputElement>(null!);
  const editOperationNumberRef = useRef<HTMLInputElement>(null!);
  const editOperationRef = useRef<HTMLInputElement>(null!);
  const editOperationTramoRef: any = useRef({});
  const editOperationHorseRef: any = useRef({});
  const editOperationDriverRef: any = useRef({});
  const editOperationStatusRef: any = useRef({});

  // ADD ANGELIRA RESULT
  const addAngeLiraIdRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraTransportCodeRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraTransporNumberRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraDriverNameRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraOrigemRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraDestinationRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraTimeToLeaveOrigemRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraOrigemLeaveDateTimeRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraDestinationArrivedDateTimeRef = useRef<HTMLInputElement>(
    null!
  );
  const addAngeLiraTransportTimeRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraHandlingTimeRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraEstimatedStartDateTimeRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraEstimatedFinishDateTimeRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraOrigemArrivedDateTimeRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraTravelDistanceRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraEstimatedDestinationArrivedDateTimeRef =
    useRef<HTMLInputElement>(null!);
  const addAngeLiraStartedDateTimeRef = useRef<HTMLInputElement>(null!);
  const addAngeLiraFinishedDateTimeRef = useRef<HTMLInputElement>(null!);
  // const addAngeLiraResourceIdRef: any = useRef({});
  const addAngeLiraStatusRef: any = useRef({});

  // ADD ELIPSE RESULTS
  const addElipseOrderProductionOperationIdRef = useRef<HTMLInputElement>(
    null!
  );
  const addElipseStartedDateTimeRef = useRef<HTMLInputElement>(null!);
  const addElipseFinishedDateTimeRef = useRef<HTMLInputElement>(null!);
  const addElipseEstagioRef: any = useRef({});
  const addElipseArrivedDateTimeRef = useRef<HTMLInputElement>(null!);
  const addElipseVehicleHandlingTimeRef = useRef<HTMLInputElement>(null!);
  const addElipseOperatingWaitingTimeRef = useRef<HTMLInputElement>(null!);
  const addElipseOperationTypeRef: any = useRef({});
  const addElipseInitialPressureRef = useRef<HTMLInputElement>(null!);
  const addElipseInitialTemperatureRef = useRef<HTMLInputElement>(null!);
  const addElipseInitialAmbientTemperatureRef = useRef<HTMLInputElement>(null!);
  const addElipseWeatherConditionRef: any = useRef({});
  const addElipseFinalPressureRef = useRef<HTMLInputElement>(null!);
  const addElipseFinalTemperatureRef = useRef<HTMLInputElement>(null!);
  const addElipseFinalAmbientTemperatureRef = useRef<HTMLInputElement>(null!);
  const addElipseFinalWeatherConditionRef = useRef<HTMLInputElement>(null!);
  const addElipseVolumeRef = useRef<HTMLInputElement>(null!);
  const addElipseVolumeMassicoRef = useRef<HTMLInputElement>(null!);
  const addElipseVolumeCorrigidoRef = useRef<HTMLInputElement>(null!);
  const addElipseAverageFlowRef = useRef<HTMLInputElement>(null!);

  const [messageError, setMessageError]: any = useState('')
  const dialogModalError = useId();
  const openError = () => {
    const modal: any = document.getElementById(dialogModalError);
    modal?.showModal();
  };

  async function getListTramos({ BaseId, ClientId }: IFiltersTramos) {
    try {
      const { data } = await axiosInstance(
        _GET_TRAMOS_FILTERED({
          BaseId,
          ClientId
        })
      );
      dispacth({
        type: ACTIONS.SET_ENUMERATORS_TRAMOS,
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
    if (cardView === "bases") {
      getListTramos({BaseId: rowData?.orderCustom?.baseId })
    }
    if (cardView === "clients") {
      getListTramos({ClientId: rowData?.clientId})
    }
    // getListTramos({BaseId: rowData?.orderCustom?.baseId, ClientId: rowData?.clientId})
    // getListTramos({})
  }, [rowData]);

  useEffect(() => {
    if (rowDataEvents?.id) {
      const selected = enumerators?.productionLoss?.filter(
        (item: any) =>
          item?.productionLossTypeId ==
          rowDataEvents?.productionLoss?.productionLossType?.id
      );
      setTimeout(() => {
        setMotivos(selected);
      }, 0);
      if (rowDataEvents?.id && page === "events") {
        editIdRef.current.value = rowDataEvents?.id;
        editCommentRef.current.value = rowDataEvents?.coments;
        editCommentRef.current.value = rowDataEvents?.coments;
        // editStartDateTimeRef.current.value = rowDataEvents?.orderProductions?.[0]?.startedDateTime;
        // editFinishDateTimeRef.current.value = rowDataEvents?.orderProductions?.[0]?.finishedDateTime;
      }
    }
  }, [rowDataEvents]);

  useEffect(() => {
    if (!rowData?.orderProductions?.[0]?.orderProductionOperation?.cavaloId) {
      setClearSelectHorse(!clearSelectHorse);
    }
    if (!rowData?.orderCustom?.customDriver?.id) {
      setClearSelectDriver(!clearSelectDriver);
    }

    if (rowData?.id && page === "main") {
      editOperationIdRef.current.value = rowData?.orderCustom?.id;
      editProductionIdRef.current = rowData?.orderProductions?.[0]?.id;
      editProductionOperationIdRef.current =
        rowData?.orderProductions?.[0]?.orderProductionOperation?.id;
      editOperationOrderNumberRef.current.value = rowData?.orderNumber;
      editOperationPlateRef.current.value =
        rowData?.orderCustom?.customVehicle?.plate;
      editOperationBaseRef.current.value =
        rowData?.orderCustom?.customBase?.name;
      editOperationClientRef.current.value = rowData?.client?.name;
      editOperationVolumeRef.current.value =
        rowData?.orderCustom?.volume?.toFixed(2);
      editOperationNumberRef.current.value =
        rowData?.orderProductions[0]?.orderProductionOperation?.operation?.number;
      editOperationRef.current.value =
        rowData?.orderProductions[0]?.orderProductionOperation?.operation?.code;
    }
  }, [rowData]);

  const closeAddModal = () => {
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
  };

  const closeAddAngeLiraResultModal = () => {
    dispacth({
      type: ACTIONS.ADD_ANGELIRA_RESULT_MODAL,
      payload: false,
    });
    setMessageError('');
  };

  const closeAddElipseResultModal = () => {
    dispacth({
      type: ACTIONS.ADD_ELIPSE_RESULT_MODAL,
      payload: false,
    });
    setMessageError('');
  };

  const closeEditModal = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
    setMessageError('');
  };

  const closeEditOperationModal = () => {
    dispacth({
      type: ACTIONS.EDIT_OPERATION_MODAL,
      payload: false,
    });
    setMessageError('');
  };

  async function getList({ PageSize, PageNumber }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(
        _GET({
          PageSize,
          PageNumber,
          OrderProductionOperationId:
            rowData?.orderProductions?.[0]?.orderProductionOperation?.id,
        })
      );
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: data,
      });
    } catch (err: any) {
      console.error("ERRO", err);
      // const modal: any = document.getElementById(CNX_ID_LIST);
      // modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  async function getBases({ PageSize, PageNumber }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET_BASES({}));
      dispacth({
        type: ACTIONS.SET_CARD_DATA,
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

  async function getClients({ PageSize, PageNumber }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET_CLIENTS({}));
      dispacth({
        type: ACTIONS.SET_CARD_DATA,
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
    if (addformCheck()) return;
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });
    try {
      await axiosInstance(
        _POST({
          ResourceId:
            rowData?.orderProductions?.[0]?.orderProductionOperation?.resource
              ?.id,
          ProductionLossId: addReasonIdRef?.current?.id,
          OrderProductionOperationId:
            rowData?.orderProductions?.[0]?.orderProductionOperation?.id,
          Coments: addCommentRef?.current?.value,
          startedDateTime: addStartDateTimeRef.current.value,
          finishedDateTime: addFinishDateTimeRef.current.value,
        })
      );
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

  async function addAngeLiraResults() {
    // if (addformCheck()) return;
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });
    try {
      await axiosInstance(
        _POST_ANGELIRA_RESULTS({
          startedDateTime: addAngeLiraStartedDateTimeRef?.current?.value ? addAngeLiraStartedDateTimeRef?.current?.value : null,
          finishedDateTime: addAngeLiraFinishedDateTimeRef?.current?.value ? addAngeLiraFinishedDateTimeRef?.current?.value : null,
          status: addAngeLiraStatusRef?.current?.id,
          transportCode: addAngeLiraTransportCodeRef?.current?.value,
          transporNumber: addAngeLiraTransporNumberRef?.current?.value,
          driverName: addAngeLiraDriverNameRef?.current?.value,
          // origem: addAngeLiraOrigemRef?.current?.value,
          // destination: addAngeLiraDestinationRef?.current?.value,
          timeToLeaveOrigem: Number(
            addAngeLiraTimeToLeaveOrigemRef?.current?.value
          ),
          estimatedStartDateTime:
            addAngeLiraEstimatedStartDateTimeRef?.current?.value ? addAngeLiraEstimatedStartDateTimeRef?.current?.value : null,
          // estimatedFinishDateTime: addAngeLiraEstimatedFinishDateTimeRef?.current?.value,
          // origemArrivedDateTime: addAngeLiraOrigemArrivedDateTimeRef?.current?.value,
          travelDistance: Number(addAngeLiraTravelDistanceRef?.current?.value),
          estimatedDestinationArrivedDateTime:
            addAngeLiraEstimatedDestinationArrivedDateTimeRef?.current?.value ? addAngeLiraEstimatedDestinationArrivedDateTimeRef?.current?.value : null,
          // origemLeaveDateTime: addAngeLiraOrigemLeaveDateTimeRef?.current.value,
          // destinationArrivedDateTime: addAngeLiraDestinationArrivedDateTimeRef?.current?.value,
          transportTime: Number(addAngeLiraTransportTimeRef?.current?.value),
          handlingTime: Number(addAngeLiraHandlingTimeRef?.current?.value),
          // resourceId: Number(addAngeLiraResourceIdRef?.current?.id),
          orderProductionOperationId:
            rowData?.orderProductions[0]?.orderProductionOperation?.id,
        })
      );
      getList({ PageSize: 100 });
      if (cardView === "bases") {
        getBases({ PageSize: 100 });
      }
      if (cardView === "clients") {
        getClients({ PageSize: 100 });
      }
      clearAddAngeLiraModal();
      closeAddAngeLiraResultModal()
    } catch (err) {
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });
    }
  }

  async function addElipseResults() {
    // if (addformCheck()) return;
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });
    try {
      await axiosInstance(
        _POST_ELIPSE_RESULTS({
          orderProductionOperationId:
            rowData?.orderProductions[0]?.orderProductionOperation?.id,
          startedDateTime: addElipseStartedDateTimeRef?.current?.value,
          finishedDateTime: addElipseFinishedDateTimeRef?.current?.value,
          status: addElipseEstagioRef?.current?.id,
          arrivedDateTime: addElipseArrivedDateTimeRef?.current?.value,
          vehicleHandlingTime: Number(
            addElipseVehicleHandlingTimeRef?.current?.value
          ),
          operatingWaitingTime: Number(
            addElipseOperatingWaitingTimeRef?.current?.value
          ),
          operationType: addElipseOperationTypeRef?.current?.id,
          initialPressure: Number(addElipseInitialPressureRef?.current?.value),
          initialTemperature: Number(
            addElipseInitialTemperatureRef?.current?.value
          ),
          initialAmbientTemperature: Number(
            addElipseInitialAmbientTemperatureRef?.current?.value
          ),
          weatherCondition: addElipseWeatherConditionRef?.current?.id,
          finalPressure: Number(addElipseFinalPressureRef?.current?.value),
          finalTemperature: Number(
            addElipseFinalTemperatureRef?.current?.value
          ),
          finalAmbientTemperature: Number(
            addElipseFinalAmbientTemperatureRef?.current?.value
          ),
          finalWeatherCondition:
            addElipseFinalWeatherConditionRef?.current?.value,
          volume: Number(addElipseVolumeRef?.current?.value),
          massVolume: Number(addElipseVolumeMassicoRef?.current?.value),
          correctedVolume: Number(addElipseVolumeCorrigidoRef?.current?.value),
          averageFlow: Number(addElipseAverageFlowRef?.current?.value),
        })
      );

      getList({ PageSize: 100 });
      if (cardView === "bases") {
        getBases({ PageSize: 100 });
      }
      if (cardView === "clients") {
        getClients({ PageSize: 100 });
      }
      clearAddElipseModal();
      closeAddElipseResultModal()
    } catch (err: any) {
      console.error(err);
      setMessageError(err?.response?.data?.message || 'Error ao adicionar Ordem')
      openError();
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });
    }
  }

  async function edit() {
    // if (rowDataEvents?.status === 1) return;
    if (editformCheck()) return;
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });

    try {
      await axiosInstance(
        _PUT({
          id: rowDataEvents?.id,
          ResourceId: rowDataEvents?.resourceId,
          ProductionLossId: editReasonIdRef?.current?.id,
          OrderProductionOperationId: rowDataEvents?.orderProductionOperationId,
          Coments: editCommentRef?.current?.value,
          Status: editStatusRef?.current?.id,
          startedDateTime: editStartDateTimeRef.current.value,
          finishedDateTime: editFinishDateTimeRef.current.value,
        })
      );
      getList({
        PageSize: 100,
        OrderProductionOperationId: rowDataEvents?.orderProductionOperationId,
      });
      // dispacth({
      //   type: ACTIONS.SET_ROW_DATA_EVENTS,
      //   payload: data,
      // });
    } catch (err: any) {
      console.error(err);
      setMessageError(err?.response?.data?.message || 'Error ao adicionar Ordem')
      openError();
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });
    }
  }

  async function editOperation() {
    // if (editOperationformCheck()) return;
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });

    try {
      const { data } = await axiosInstance(
        _PUT_OPERATION({
          orderCustomId: Number(editOperationIdRef?.current?.value),
          orderProductionId: Number(editProductionIdRef?.current),
          orderProductionOperationId: Number(
            editProductionOperationIdRef?.current
          ),
          // driverId: Number(editOperationDriverRef?.current?.id),
          resourceId: rowData?.orderProductions?.[0]?.orderProductionOperation
          ?.resourceId ? Number(editOperationTramoRef?.current?.id) : null,
          cavaloId: Number(editOperationHorseRef?.current?.id),
          orderProductionStatus: Number(editOperationStatusRef?.current?.id),
        })
      );
      if (cardView === "bases") {
        getBases({ PageSize: 100 });
      }
      if (cardView === "clients") {
        getClients({ PageSize: 100 });
      }
      dispacth({
        type: ACTIONS.SET_ROW_DATA,
        payload: data,
      });
      dispacth({
        type: ACTIONS.EDIT_OPERATION_MODAL,
        payload: false,
      });
    } catch (err: any) {
      console.error(err);
      setMessageError(
        err?.response?.data?.message || "Error ao editar Operação"
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
  const [clearSelectDriver, setClearSelectDriver] = useState(false);
  const [clearSelectHorse, setClearSelectHorse] = useState(false);

  const clearAddModal = () => {
    addCommentRef.current.value = "";
    addStartDateTimeRef.current.value = "";
    addFinishDateTimeRef.current.value = "";
    setClearSelect(!clearSelect);
  };

  const clearAddAngeLiraModal = () => {
    addAngeLiraStartedDateTimeRef.current.value = "",
    addAngeLiraFinishedDateTimeRef.current.value = "",
    addAngeLiraTransportCodeRef.current.value = "",
    addAngeLiraTransporNumberRef.current.value = "",
    addAngeLiraDriverNameRef.current.value = "",
    // addAngeLiraOrigemRef.current.value = "",
    // addAngeLiraDestinationRef.current.value = "",
    addAngeLiraTimeToLeaveOrigemRef.current.value = "",
    addAngeLiraEstimatedStartDateTimeRef.current.value = "",
    // addAngeLiraEstimatedFinishDateTimeRef.current.value = "",
    // addAngeLiraOrigemArrivedDateTimeRef.current.value = "",
    addAngeLiraTravelDistanceRef.current.value = "",
    addAngeLiraEstimatedDestinationArrivedDateTimeRef.current.value = "",
    // addAngeLiraOrigemLeaveDateTimeRef.current.value = "",
    // addAngeLiraDestinationArrivedDateTimeRef.current.value = "",
    addAngeLiraTransportTimeRef.current.value = "",
    addAngeLiraHandlingTimeRef.current.value = "",
    // addAngeLiraStatusRef.current.value = "",
    setClearSelect(!clearSelect);
  };

  const clearAddElipseModal = () => {
    setClearSelect(!clearSelect),
      addElipseStartedDateTimeRef.current.value = "",
      addElipseInitialPressureRef.current.value = "",
      addElipseInitialTemperatureRef.current.value = "",
      addElipseInitialAmbientTemperatureRef.current.value = "",
      addElipseVolumeRef.current.value = "";
      addElipseVolumeMassicoRef.current.value = "";
      addElipseVolumeCorrigidoRef.current.value = "";
  };

  const clearEditModal = () => {
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {
        id: rowData?.id,
        code: null,
        description: null,
        extraInformation: null,
        discriminator: null,
        isActived: null,
      },
    });
  };

  function addformCheck() {
    let addTypeId = false;
    let addReasonId = false;
    // let addComment = false;
    let addStartDateTime = false;
    let addFinishDateTime = false;
    // let addStatus = false;

    if (!addTypeIdRef.current) {
      document
        ?.querySelector(".cnx-logistical-control-type-add-clcta")!
        .classList?.add("cnx-input-border-error-highlight");
      addTypeId = true;
    }
    if (!addReasonIdRef.current) {
      document
        ?.querySelector(".cnx-logistical-control-reason-add-clcra")!
        .classList?.add("cnx-input-border-error-highlight");
      addReasonId = true;
    }
    // if (addCommentRef.current.value === "") {
    //   addCommentRef.current!.classList?.add("cnx-input-border-error-highlight");
    //   addComment = true;
    // }
    if (addStartDateTimeRef.current.value === "") {
      addStartDateTimeRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addStartDateTime = true;
    }
    if (addFinishDateTimeRef.current.value === "") {
      addFinishDateTimeRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addFinishDateTime = true;
    }
    // if (!addStatusRef.current) {
    //   document
    //     ?.querySelector(".cnx-logistical-control-status-add-clcsa")!
    //     .classList?.add("cnx-input-border-error-highlight");
    //   addStatus = true;
    // }
    if (addTypeId || addReasonId || addStartDateTime || addFinishDateTime) {
      return true;
    }
  }

  function editformCheck() {
    let editTypeId = false;
    let editReasonId = false;
    // let editComment = false;
    let editStatus = false;
    let editStartDateTime = false;
    let editFinishDateTime = false;

    if (!editTypeIdRef.current) {
      document
        ?.querySelector(".cnx-logistical-control-type-edit-clcte")!
        .classList?.add("cnx-input-border-error-highlight");
      editTypeId = true;
    }
    if (!editReasonIdRef.current) {
      document
        ?.querySelector(".cnx-logistical-control-reason-edit-clcre")!
        .classList?.add("cnx-input-border-error-highlight");
      editReasonId = true;
    }
    // if (editCommentRef.current.value === "") {
    //   editCommentRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   editComment = true;
    // }
    if (editStartDateTimeRef.current.value === "") {
      editStartDateTimeRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editStartDateTime = true;
    }
    if (editFinishDateTimeRef.current.value === "") {
      editFinishDateTimeRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editFinishDateTime = true;
    }
    if (!editStatusRef.current) {
      document
        ?.querySelector(".cnx-logistical-control-status-edit-clcse")!
        .classList?.add("cnx-input-border-error-highlight");
      editStatus = true;
    }
    if (
      editTypeId ||
      editReasonId ||
      editStatus ||
      editStartDateTime ||
      editFinishDateTime
    ) {
      return true;
    }
  }

  // function editOperationformCheck() {
  //   let editTramo = false;
  //   let editStatus = false;

  //   if (!editOperationTramoRef.current) {
  //     document
  //       ?.querySelector(".cnx-logistical-control-tramo-edit-clcte")!
  //       .classList?.add("cnx-input-border-error-highlight");
  //     editStatus = true;
  //   }
  //   if (!editOperationStatusRef.current) {
  //     document
  //       ?.querySelector(".cnx-orders-status-edit-cose")!
  //       .classList?.add("cnx-input-border-error-highlight");
  //     editStatus = true;
  //   }
  //   if (editTramo || editStatus) {
  //     return true;
  //   }
  // }

  const [motivos, setMotivos] = useState([]);
  const [change, setChange] = useState(false);

  useEffect(() => {
    setChange(!change);
  }, [motivos]);

  const tipos: any = [
    {
      id: 1,
      name: "parada",
    },
    {
      id: 1,
      name: "espera",
    },
  ];

  const motivosEnumeratos: any = {
    parada: [
      {
        id: 1,
        name: "Parada Almoço",
      },
      {
        id: 2,
        name: "Parada Programada",
      },
      {
        id: 3,
        name: "Parada Manutenção",
      },
    ],
    espera: [
      {
        id: 1,
        name: "Espera Manutenção",
      },
      {
        id: 1,
        name: "Espera Compressão",
      },
      {
        id: 1,
        name: "Espera Descompressão",
      },
      {
        id: 1,
        name: "Espera Engate",
      },
    ],
  };

  function handleTypeMotivo(motivoId: string) {
    const selected = enumerators?.productionLoss?.filter(
      (item: any) => item.productionLossTypeId == motivoId
    );
    setTimeout(() => {
      setMotivos(selected);
    }, 0);
  }

  function phoneMask(mask: any) {
    mask = mask.replace(/\D/g, "");
    mask = mask.replace(/^(\d{2})(\d)/g, "($1) $2");
    mask = mask.replace(/(\d)(\d{4})$/, "$1-$2");
    return mask;
  }

  function cpfMask(v: any) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
  }

  const inputCpfRef = useRef<HTMLInputElement>(null!);

  const handleStatusTravelToSend = (id: any) => {
    switch (id) {
      case 1:
        return "Agendamento";
      case 2:
        return "Iniciada";
      case 3:
        return "Finalizada";
      case 4:
        return "Cancelada";
    }
  };

  const handleWeatherConditionToSend = (id: any) => {
    switch (id) {
      case 1:
        return "Ensolarado";
      case 2:
        return "Nublado";
      case 3:
        return "Parcialmente Nublado";
      case 4:
        return "Chuvoso";
      case 5:
        return "Nevoeiro";
      case 6:
        return "Granizo";
      case 7:
        return "Tempestade";
    }
  };

  const statusTravel = [
    {
      id: "Agendamento",
      label: "Agendamento",
    },
    {
      id: "Iniciada",
      label: "Iniciada",
    },
    {
      id: "Finalizada",
      label: "Finalizada",
    },
    {
      id: "Cancelada",
      label: "Cancelada",
    },
  ];

  const weatherCondition = [
    {
      id: "Ensolarado",
      label: "Ensolarado",
    },
    {
      id: "Nublado",
      label: "Nublado",
    },
    {
      id: "Parcialmente Nublado",
      label: "Parcialmente Nublado",
    },
    {
      id: "Chuvoso",
      label: "Chuvoso",
    },
    {
      id: "Nevoeiro",
      label: "Nevoeiro",
    },
    {
      id: "Granizo",
      label: "Granizo",
    },
    {
      id: "Tempestade",
      label: "Tempestade",
    },
  ];

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
      <CnxFormModal
        title={`Adicionar Resultados AngeLira #Ordem: ${rowData?.orderNumber}`}
        open={addAngeLiraResultModal}
        // open={true}
        close={closeAddAngeLiraResultModal}
        saveButton={() => addAngeLiraResults()}
        saving={saving}
        clearButton={() => null}
        formInputs={
          <>
            {/* <Input
              inputRef={addAngeLiraIdRef}
              type="text"
              label="id"
              disabled
              onChange={() => {
                addIdRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />         */}
            <Input
              inputRef={addAngeLiraTransportCodeRef}
              type="text"
              label="Código transporte"
              onChange={() => {
                addAngeLiraTransportCodeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addAngeLiraTransporNumberRef}
              type="number"
              label="Número transporte"
              onChange={() => {
                addAngeLiraTransporNumberRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={addAngeLiraDriverNameRef}
              type="cpf"
              label="CPF do motorista"
              onChange={() => {
                addAngeLiraDriverNameRef.current!.classList?.remove(
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
                ref={addAngeLiraDriverNameRef}
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
              inputRef={addAngeLiraOrigemRef}
              type="text"
              label="Origem"
              onChange={() => {
                addAngeLiraOrigemRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addAngeLiraDestinationRef}
              type="text"
              label="Destino"
              onChange={() => {
                addAngeLiraDestinationRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Input
              inputRef={addAngeLiraTimeToLeaveOrigemRef}
              type="number"
              label="Tempo para saída origem (min)"
              onChange={() => {
                addAngeLiraTimeToLeaveOrigemRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addAngeLiraStartedDateTimeRef}
              type="datetime-local"
              label="Data Hora Início Real"
              onChange={() => {
                addAngeLiraStartedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addAngeLiraFinishedDateTimeRef}
              type="datetime-local"
              label="Data Hora Fim Real"
              onChange={() => {
                addAngeLiraFinishedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={addAngeLiraOrigemLeaveDateTimeRef}
              type="datetime-local"
              label="Data hora saída origem"
              onChange={() => {
                addAngeLiraOrigemLeaveDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={addAngeLiraDestinationArrivedDateTimeRef}
              type="datetime-local"
              label="Data hora chegada destino"
              onChange={() => {
                addAngeLiraDestinationArrivedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Input
              inputRef={addAngeLiraTransportTimeRef}
              type="number"
              label="Tempo de transporte (min)"
              onChange={() => {
                addAngeLiraTransportTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addAngeLiraHandlingTimeRef}
              type="number"
              label="Tempo de manobra (min)"
              onChange={() => {
                addAngeLiraHandlingTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addAngeLiraEstimatedStartDateTimeRef}
              type="datetime-local"
              label="Data Hora Início Prev"
              onChange={() => {
                addAngeLiraEstimatedStartDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={addAngeLiraEstimatedFinishDateTimeRef}
              type="datetime-local"
              label="Data hora chegada prevista"
              onChange={() => {
                addAngeLiraEstimatedFinishDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={addAngeLiraOrigemArrivedDateTimeRef}
              type="datetime-local"
              label="Data hora chegada origem"
              onChange={() => {
                addAngeLiraOrigemArrivedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Input
              inputRef={addAngeLiraTravelDistanceRef}
              type="number"
              label="Distância percorrida (km)"
              onChange={() => {
                addAngeLiraTravelDistanceRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addAngeLiraEstimatedDestinationArrivedDateTimeRef}
              type="datetime-local"
              label="Data Hora Fim Prev."
              onChange={() => {
                addAngeLiraEstimatedDestinationArrivedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Select
              inputRef={addAngeLiraResourceIdRef}
              label="Tramos"
              options={enumeratorsOrder?.resources || []}
              autoComplete
              clear={clearSelect}
              placeholder="Selecionar"
              keyLabel="code"
              keyValue="id"
            /> */}
            <Select
              inputRef={addAngeLiraStatusRef}
              keyLabel="label"
              keyValue="id"
              clear={clearSelect}
              placeholder="Selecionar"
              options={statusTravel || []}
              label="Status"
              onChange={() => {
                addAngeLiraStatusRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
          </>
        }
      />
      <CnxFormModal
        title={`Adicionar Resultados Elipse #Ordem: ${rowData?.orderNumber}`}
        open={addElipseResultModal}
        close={closeAddElipseResultModal}
        saveButton={() => addElipseResults()}
        saving={saving}
        clearButton={() => null}
        formInputs={
          <>
            <Input
              inputRef={addElipseStartedDateTimeRef}
              type="datetime-local"
              label="Data hora início"
              onChange={() => {
                addElipseStartedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={addElipseFinishedDateTimeRef}
              type="datetime-local"
              label="Data hora fim"
              onChange={() => {
                addElipseFinishedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={addElipseArrivedDateTimeRef}
              type="datetime-local"
              label="Data hora chegada"
              onChange={() => {
                addElipseArrivedDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={addElipseVehicleHandlingTimeRef}
              type="number"
              label="Tempo manobra (min)"
              onChange={() => {
                addElipseVehicleHandlingTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={addElipseOperatingWaitingTimeRef}
              type="number"
              label="Tempo espera (min)"
              onChange={() => {
                addElipseOperatingWaitingTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Select
              inputRef={addElipseOperationTypeRef}
              label="Tipo operação"
              options={enumeratorsOrder?.operationTypes || []}
              autoComplete
              clear={clearSelect}
              placeholder="Selecionar"
              keyLabel="name"
              keyValue="id"
            />
            <Input
              inputRef={addElipseInitialPressureRef}
              type="number"
              label="Pressão inicial (bar)"
              onChange={() => {
                addElipseInitialPressureRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addElipseInitialTemperatureRef}
              type="number"
              label="Temp. inicial (Cº)"
              onChange={() => {
                addElipseInitialTemperatureRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addElipseInitialAmbientTemperatureRef}
              type="number"
              label="Temp. Amb. inicial (Cº)"
              onChange={() => {
                addElipseInitialAmbientTemperatureRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={addElipseWeatherConditionRef}
              type="text"
              label="Condição clima inicial"
              onChange={() => {
                addElipseWeatherConditionRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Select
              inputRef={addElipseWeatherConditionRef}
              keyLabel="label"
              keyValue="id"
              clear={clearSelect}
              placeholder="Selecionar"
              options={weatherCondition || []}
              label="Condição clima inicial"
              onChange={() => {
                addElipseWeatherConditionRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addElipseVolumeMassicoRef}
              type="number"
              label="Mássico (kg)"
              onChange={() => {
                addElipseVolumeMassicoRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addElipseVolumeCorrigidoRef}
              type="number"
              label="Volume Corrigido (m³)"
              onChange={() => {
                addElipseVolumeCorrigidoRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={addElipseFinalPressureRef}
              type="number"
              label="Pressão Final (bar)"
              onChange={() => {
                addElipseFinalPressureRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={addElipseFinalTemperatureRef}
              type="number"
              label="Temp. Final (Cº)"
              onChange={() => {
                addElipseFinalTemperatureRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={addElipseFinalAmbientTemperatureRef}
              type="number"
              label="Temp. Amb. final (Cº)"
              onChange={() => {
                addElipseFinalAmbientTemperatureRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Input
              inputRef={addElipseFinalWeatherConditionRef}
              type="text"
              label="Condição Clima Final"
              onChange={() => {
                addElipseFinalWeatherConditionRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Input
              inputRef={addElipseVolumeRef}
              type="number"
              label="Volume Normalizado (m³)"
              onChange={() => {
                addElipseVolumeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={addElipseAverageFlowRef}
              type="number"
              label="Vazão média (m3/h)"
              onChange={() => {
                addElipseAverageFlowRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Select
              inputRef={addElipseEstagioRef}
              label="Estágio"
              options={enumeratorsElipse?.status || []}
              autoComplete
              clear={clearSelect}
              placeholder="Selecionar"
              keyLabel="name"
              keyValue="id"
            />
          </>
        }
      />
      <CnxFormModal
        title="Adicionar Evento"
        open={addModal}
        close={closeAddModal}
        saveButton={() => add()}
        saving={saving}
        clearButton={() => clearAddModal()}
        formInputs={
          <>
            <Select
              inputRef={addTypeIdRef}
              keyLabel="description"
              keyValue="id"
              label="Tipo"
              mandatory
              options={enumerators?.productionLossTypes || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-logistical-control-type-add-clcta"
              clear={clearSelect}
              onSelectNoOption={() => {
                setMotivos([]);
              }}
              onChange={(e: any) => {
                handleTypeMotivo(e.id);
                document
                  ?.querySelector(".cnx-logistical-control-type-add-clcta")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />

            <Select
              inputRef={addReasonIdRef}
              keyLabel="description"
              keyValue="id"
              label="Motivo"
              mandatory
              disabled={motivos.length < 1}
              options={motivos || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-logistical-control-reason-add-clcra"
              clear={clearSelect}
              onChange={() => {
                document
                  ?.querySelector(".cnx-logistical-control-reason-add-clcra")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Input
              inputRef={addStartDateTimeRef}
              type="datetime-local"
              label="Data Hora Início"
              mandatory
              onChange={() => {
                addStartDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addFinishDateTimeRef}
              type="datetime-local"
              label="Data Hora Fim"
              mandatory
              onChange={() => {
                addFinishDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addCommentRef}
              type="textarea"
              label="Comentários"
              // placeholder="Escreva um comentário"
              textAreaWidth="618px"
              // mandatory
              onChange={() => {
                addCommentRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Select
              inputRef={addClientIdRef}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              disabled
              mandatory
              defaultOption={1}
              options={[{id: 1, name: 'Em progresso'}, {id: 1, name: 'Encerrado'},]}
              placeholder="Selecionar"
              className="cnx-orders-client-add-coce"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-client-add-coce")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            /> */}
          </>
        }
      />
      <CnxFormModal
        title="Editar Evento"
        open={editModal}
        close={closeEditModal}
        saveButton={() => edit()}
        clearButton={() => clearEditModal()}
        saving={saving}
        formInputs={
          <>
            <Input inputRef={editIdRef} type="text" label="id" disabled />
            <Select
              inputRef={editTypeIdRef}
              keyLabel="description"
              keyValue="id"
              label="Tipo"
              mandatory
              disabled
              defaultOption={
                rowDataEvents?.productionLoss?.productionLossType?.id || []
              }
              options={enumerators?.productionLossTypes || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-logistical-control-type-edit-clcte"
              onChange={() => {
                document
                  ?.querySelector(".cnx-logistical-control-type-edit-clcte")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={editReasonIdRef}
              keyLabel="description"
              keyValue="id"
              label="Motivo"
              disabled={rowDataEvents?.status === 1}
              mandatory
              defaultOption={rowDataEvents?.productionLoss?.id || []}
              options={motivos || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-logistical-control-reason-edit-clcre"
              onChange={() => {
                document
                  ?.querySelector(".cnx-logistical-control-reason-edit-clcre")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Input
              inputRef={editStartDateTimeRef}
              type="datetime-local"
              label="Data Hora Início"
              mandatory
              defaultValue={rowDataEvents?.startedDateTime?.slice(0, 16)}
              onChange={() => {
                editStartDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editFinishDateTimeRef}
              type="datetime-local"
              label="Data Hora Fim"
              mandatory
              defaultValue={rowDataEvents?.finishedDateTime?.slice(0, 16)}
              onChange={() => {
                editFinishDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editCommentRef}
              type="textarea"
              label="Comentários"
              // textAreaDisabled={rowDataEvents?.status === 1}
              // placeholder="Escreva um comentário"
              textAreaWidth="618px"
              // mandatory
              onChange={() => {
                editCommentRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Select
              inputRef={editStatusRef}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              // disabled={rowDataEvents?.status === 1}
              defaultOption={rowDataEvents?.status}
              options={enumerators?.status || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-logistical-control-status-edit-clcse"
              onChange={() => {
                document
                  ?.querySelector(".cnx-logistical-control-status-edit-clcse")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
          </>
        }
      />
      <CnxFormModal
        title="Editar Operação"
        open={editOperationModal}
        close={closeEditOperationModal}
        saveButton={() => editOperation()}
        clearButton={() => clearEditModal()}
        saving={saving}
        formInputs={
          <>
            <Input
              inputRef={editOperationIdRef}
              type="text"
              label="id"
              disabled
            />
            <Input
              inputRef={editOperationOrderNumberRef}
              type="text"
              label="Número Ordem"
              disabled
            />
            <Input
              inputRef={editOperationPlateRef}
              type="text"
              label="Placa"
              disabled
            />
            <Input
              inputRef={editOperationBaseRef}
              type="text"
              label="Base"
              disabled
            />
            <Input
              inputRef={editOperationClientRef}
              type="text"
              label="Cliente"
              disabled
            />
            <Input
              inputRef={editOperationVolumeRef}
              type="number"
              label="Volume"
              step="0.01"
              disabled
            />
            <Input
              inputRef={editOperationNumberRef}
              type="text"
              label="Número Operação"
              disabled
            />
            <Input
              inputRef={editOperationRef}
              type="text"
              label="Operação"
              disabled
            />
            {rowData?.orderProductions?.[0]?.orderProductionOperation
              ?.resourceId ? (
              <Select
                inputRef={editOperationTramoRef}
                keyLabel="code"
                keyValue="id"
                label="Tramo"
                // mandatory
                defaultOption={
                  rowData?.orderProductions?.[0]?.orderProductionOperation
                    ?.resourceId || []
                }
                options={enumeratorsTramos || []}
                autoComplete
                placeholder="Selecionar"
                className="cnx-logistical-control-tramo-edit-clcte"
                onChange={() => {
                  document
                    ?.querySelector(".cnx-logistical-control-tramo-edit-clcte")!
                    .classList?.remove("cnx-input-border-error-highlight");
                }}
              />
            ) : null}
            <Select
              inputRef={editOperationHorseRef}
              keyLabel="plate"
              keyValue="id"
              label="Cavalo"
              clear={clearSelectHorse}
              defaultOption={
                rowData?.orderProductions?.[0]?.orderProductionOperation
                  ?.cavaloId || []
              }
              options={enumeratorsOrder?.cavalos || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-base-edit-cobe"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-base-edit-cobe")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            {/* <Select
              inputRef={editOperationDriverRef}
              keyLabel="name"
              keyValue="id"
              label="Motorista"
              clear={clearSelectDriver}
              defaultOption={rowData?.orderCustom?.customDriver?.id || []}
              options={enumeratorsOrder?.customDrivers || []}
              placeholder="Selecionar"
              autoComplete
            /> */}
            {/* <Input
              inputRef={addStartDateTimeRef}
              type="datetime-local"
              label="Data Hora Início"
              mandatory
              onChange={() => {
                addStartDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addStartDateTimeRef}
              type="datetime-local"
              label="Data Hora Fim"
              mandatory
              onChange={() => {
                addStartDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <StatusLogs
              inputRef={editOperationStatusRef}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={rowData?.orderProductions?.[0]?.status || []}
              options={productionStatus || []}
              placeholder="Selecionar"
              customClassName="cnx-logistical-control-status-edit-clcse"
              onChange={() => {
                document
                  ?.querySelector(".cnx-logistical-control-status-edit-clcse")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
