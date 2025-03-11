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

interface IFormModalContainer {
  cnxId?: any;
}

function FormModalContainer({ cnxId }: IFormModalContainer) {
  const {
    dispacth,
    addModal,
    editModal,
    editAllModal,
    addAngeLiraResultsModal,
    rowData,
    saving,
    enumerators,
    rowIds,
    orderById,
    parentsData,
    operationParamsData,
    editOperationModal,
    rowDataOperation,
    enumeratorsTramos,
  } = useContext(UseContext);


  const [openEditModalLocal, setOpenEditModalLocal] = useState(false);
  const [openAddModalLocal, setOpenAddModalLocal] = useState(false);
  const [rowDataLocal, setRowDataLocal]: any = useState(null);

  const handleSetLocalRowData = () => {
    setRowDataLocal(null)
    const data = sessionStorage.getItem(`${cnxId}cnx-order-row-data`);
    const dataJSON = data ? JSON.parse(data) : null;
    setTimeout(() => {
      setRowDataLocal(dataJSON)
    }, 50);
  }

  const addProductIdRef: any = useRef({});
  const addScheduleDateRef = useRef<HTMLInputElement>(null!);
  const addOrderDateTimeRef = useRef<HTMLInputElement>(null!);
  const addDeliveryDateRef = useRef<HTMLInputElement>(null!);
  const [baseId, setBaseId]: any = useState();
  const [clientId, setClientId]: any = useState();
  useEffect(() => {
    dispacth({
      type: ACTIONS.SET_OPERATION_PARAMS_DATA,
      payload: null,
    });
  }, [baseId, clientId]);

  const addBaseIdRef: any = useRef({});
  const addClientIdRef: any = useRef({});
  const addVehicleIdRef: any = useRef({});
  const addHorseIdRef: any = useRef({});
  const addPlannedVolumeRef = useRef<HTMLInputElement>(null!);
  const addVolumeRef = useRef<HTMLInputElement>(null!);
  const addStatusRef: any = useRef({});

  const editAllProductIdRef: any = useRef({});
  const editAllScheduleDateRef = useRef<HTMLInputElement>(null!);
  const editAllOrderDateTimeRef = useRef<HTMLInputElement>(null!);
  const editAllDeliveryDateRef = useRef<HTMLInputElement>(null!);
  const editAllBaseIdRef: any = useRef({});
  const editAllClientIdRef: any = useRef({});
  const editAllVehicleIdRef: any = useRef({});
  const editAllHorseIdRef: any = useRef({});
  const editAllPlannedVolumeRef = useRef<HTMLInputElement>(null!);
  const editAllVolumeRef = useRef<HTMLInputElement>(null!);
  const editAllStatus2Ref: any = useRef({});

  const editResultsRef = useRef<HTMLInputElement>(null!);
  const editResultsIdRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editProductIdRef: any = useRef({});
  const editScheduleDateRef = useRef<HTMLInputElement>(null!);
  const editOrderDateTimeRef = useRef<HTMLInputElement>(null!);
  const editDeliveryDateRef = useRef<HTMLInputElement>(null!);
  const editBaseIdRef: any = useRef({});
  const editClientIdRef: any = useRef({});
  const editVehicleIdRef: any = useRef({});
  const editHorseIdRef: any = useRef({});
  const editPlannedVolumeRef = useRef<HTMLInputElement>(null!);
  const editVolumeRef = useRef<HTMLInputElement>(null!);
  const editStatusRef: any = useRef({});

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

  const closeError = () => {
    const modal: any = document.getElementById(dialogModalError);
    modal?.close();
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
    if (rowDataOperation?.orderProductionOperation?.operation?.number === 10) {
      getListTramos({ BaseId: rowDataLocal?.orderCustom?.baseId });
    }
    if (rowDataOperation?.orderProductionOperation?.operation?.number === 30) {
      getListTramos({ ClientId: rowDataLocal?.clientId });
    }
    // getListTramos({BaseId: rowData?.orderCustom?.baseId, ClientId: rowData?.clientId})
    // getListTramos({})
  }, [rowDataOperation]);

  // useEffect(() => {
  //   if (addModalUser || editModalUser) {
  //     getAllSelectors();
  //   }
  // }, [addModalUser, editModalUser]);

  useEffect(() => {
    editIdRef.current.value = rowDataLocal?.id;
    editPlannedVolumeRef.current.value =
    rowDataLocal?.orderCustom?.volume.toFixed(2);
    getOrderById(rowDataLocal?.id);
    if (rowDataLocal?.qtdOrderLinkParent !== 0) {
      getOrderParentById(rowDataLocal?.id);
    }
    if (rowDataLocal?.qtdOrderLinkParent == 0) {
      dispacth({
        type: ACTIONS.SET_PARENTS,
        payload: null,
      });
    }
  }, [rowDataLocal]);
  useEffect(() => {
    getEnumerators();
    if (rowDataOperation?.id) {
      editOpOperationIdRef.current.value =
        rowDataOperation?.orderProductionOperation?.id;
      editOpScheduleStartDateTimeRef.current.value =
        rowDataOperation?.orderProductionOperation?.scheduleStartDateTime?.slice(
          0,
          16
        );
      editOpScheduleFinishDateTimeRef.current.value =
        rowDataOperation?.orderProductionOperation?.scheduleFinishDateTime?.slice(
          0,
          16
        );
    }
    setClearSelect(!clearSelect);
  }, [rowDataOperation]);

  const closeAddModal = () => {
    sessionStorage.removeItem(`${cnxId}cnx-order-row-data`);
    // dispacth({
    //   type: ACTIONS.ADD_MODAL,
    //   payload: false,
    // });
    setOpenAddModalLocal(false);
    dispacth({
      type: ACTIONS.SET_OPERATION_PARAMS_DATA,
      payload: null,
    });
    setClearSelect(!clearSelect);
    setMessageError("");
    addScheduleDateRef.current.value = "";
    addPlannedVolumeRef.current.value = "";
  };

  const closeAddAngeLiraResultsModal = () => {
    dispacth({
      type: ACTIONS.ADD_ANGELIRA_RESULTS_MODAL,
      payload: false,
    });
  };

  const closeEditModal = () => {
    sessionStorage.removeItem(`${cnxId}cnx-order-row-data`);
    // dispacth({
    //   type: ACTIONS.EDIT_MODAL,
    //   payload: false,
    // });
    setOpenEditModalLocal(false);
    clearAddModal();
  };

  const closeEditOperationModal = () => {
    editOpScheduleStartDateTimeRef.current.value =
      rowDataOperation?.orderProductionOperation?.scheduleStartDateTime?.slice(
        0,
        16
      );
    editOpScheduleFinishDateTimeRef.current.value =
      rowDataOperation?.orderProductionOperation?.scheduleFinishDateTime?.slice(
        0,
        16
      );
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.EDIT_OPERATION_MODAL,
      payload: false,
    });
    setErrorSpan(false);

    dispacth({
      type: ACTIONS.EDIT_OPERATION_MODAL,
      payload: false,
    });
  };

  const closeEditAllModal = () => {
    dispacth({
      type: ACTIONS.EDIT_ALL_MODAL,
      payload: false,
    });
    setClearSelect(!clearSelect);
  };

  async function getOrderById(id: number) {
    try {
      const { data } = await axiosInstance(_GET_ORDER_BY_ID(id));
      dispacth({
        type: ACTIONS.SET_ORDER_BY_ROW_DATA,
        payload: data,
      });
    } catch (err: any) {
      console.error(err);
    } finally {
      // dispacth({
      //   type: ACTIONS.LOADING_TABLE,
      //   payload: false,
      // });
    }
  }

  async function getOrderParentById(id: number) {
    try {
      const { data } = await axiosInstance(_GET_ORDER_PARENT_BY_ID(id));
      dispacth({
        type: ACTIONS.SET_PARENTS,
        payload: data,
      });
    } catch (err: any) {
      console.error(err);
    } finally {
      // dispacth({
      //   type: ACTIONS.LOADING_TABLE,
      //   payload: false,
      // });
    }
  }

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

  async function add() {
    if (addformCheck()) return;

    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });
    function handleOperationPrams(data: any) {
      const operationParams = data?.map((item: any) => {
        return {
          status: item?.status,
          orderProductionOperation: {
            operationId: item.operationCode,
            resourceId: item?.tramo,
            cavaloId: item?.horse,
            scheduleStartDateTime: item?.startedDateTime,
            scheduleFinishDateTime: item?.finishedDateTime,
          },
        };
      });

      return operationParams;
    }
    try {
      await axiosInstance(
        _POST({
          productId: Number(addProductIdRef?.current?.id),
          scheduleDate: addScheduleDateRef?.current?.value,
          // orderDateTime: addOrderDateTimeRef?.current?.value,
          // deliveryDate: addDeliveryDateRef?.current?.value,
          baseId: Number(addBaseIdRef?.current?.id),
          clientId: Number(addClientIdRef?.current?.id),
          vehicleId: Number(addVehicleIdRef?.current?.id),
          volume: Number(addPlannedVolumeRef?.current?.value),
          status: 1,
          orderProductions: handleOperationPrams(operationParamsData),
        })
      );
      getList({ PageSize: 100 });
      clearAddModal();
      dispacth({
        type: ACTIONS.SET_OPERATION_PARAMS_DATA,
        payload: null,
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

  async function edit() {
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(
        _PUT({
          id: Number(editIdRef?.current?.value),
          productId: Number(editProductIdRef?.current?.id),
          scheduleDate: editScheduleDateRef?.current?.value,
          // orderDateTime: editOrderDateTimeRef?.current?.value,
          // deliveryDate: editDeliveryDateRef?.current?.value,
          baseId: Number(editBaseIdRef?.current?.id),
          clientId: Number(editClientIdRef?.current?.id),
          vehicleId: Number(editVehicleIdRef?.current?.id),
          volume: Number(editPlannedVolumeRef?.current?.value),
          status: editStatusRef?.current?.id,
        })
      );
      getList({ PageSize: 100 });
      dispacth({
        type: ACTIONS.SET_ROW_DATA,
        payload: {
          id: Number(editIdRef?.current?.value),
          product: {
            id: Number(editProductIdRef?.current?.id),
          },
          deliveryDate: editScheduleDateRef?.current?.value,
          orderCustom: {
            customBase: {
              id: Number(editBaseIdRef?.current?.id),
            },
            customVehicle: {
              id: Number(editVehicleIdRef?.current?.id),
            },
            volume: Number(editPlannedVolumeRef?.current?.value),
          },
          client: {
            id: Number(editClientIdRef?.current?.id),
          },
          status: editStatusRef?.current?.id,
        },
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

  async function getOrderByIdRefresh() {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET_ORDER_BY_ID(rowDataLocal?.id));
      dispacth({
        type: ACTIONS.SET_ROW_DATA,
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
          id: rowDataOperation?.id,
          status: editOpStatusRef?.current?.id,
          orderProductionOperation: {
            id: rowDataOperation?.orderProductionOperation?.id,
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
      getOrderByIdRefresh();
      // getList({ PageSize: 100 });
      // dispacth({
      //   type: ACTIONS.SET_ROW_DATA,
      //   payload: data,
      // });
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

  async function editAll() {
    // if (editAllformCheck()) return;
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });

    try {
      const { data } = await axiosInstance(
        _PUT_ALL({
          ids: rowIds,
          productId: Number(editAllProductIdRef?.current?.id),
          scheduleDate:
            editAllScheduleDateRef?.current?.value === ""
              ? null
              : editAllScheduleDateRef?.current?.value,
          baseId: Number(editAllBaseIdRef?.current?.id),
          clientId: Number(editAllClientIdRef?.current?.id),
          vehicleId: Number(editAllVehicleIdRef?.current?.id),
          volume: editAllPlannedVolumeRef?.current?.value
            ? Number(editAllPlannedVolumeRef?.current?.value)
            : null,
          status: editAllStatus2Ref?.current?.id,
        })
      );
      setClearSelect(!clearSelect);
      getList({ PageSize: 100 });
      clearEditModal();
      // dispacth({
      //   type: ACTIONS.SET_ROW_DATA,
      //   payload: data,
      // });
    } catch (err) {
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });
    }
  }

  const [clearSelect, setClearSelect] = useState(false);

  const clearAddModal = () => {
    addScheduleDateRef.current.value = "";
    addPlannedVolumeRef.current.value = "";
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_OPERATION_PARAMS_DATA,
      payload: null,
    });
  };

  const clearEditModal = () => {
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {
        id: rowDataLocal?.id,
        code: null,
        description: null,
        extraInformation: null,
        discriminator: null,
        isActived: null,
      },
    });
  };

  function addformCheck() {
    let addProductId = false;
    let addScheduleDate = false;
    // let addOrderDateTime = false;
    // let addDeliveryDate = false;
    let addBaseId = false;
    let addClientId = false;
    let addVehicleId = false;
    // let addHorseId = false;
    let addPlannedVolume = false;
    // let addVolume = false;
    // let addStatus = false;

    if (!addProductIdRef.current) {
      document
        ?.querySelector(".cnx-orders-product-add-copa")!
        .classList?.add("cnx-input-border-error-highlight");
      addProductId = true;
    }
    if (addScheduleDateRef.current.value === "") {
      addScheduleDateRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addScheduleDate = true;
    }
    // if (addOrderDateTimeRef.current.value === "") {
    //   addOrderDateTimeRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   addOrderDateTime = true;
    // }
    // if (addDeliveryDateRef.current.value === "") {
    //   addDeliveryDateRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   addDeliveryDate = true;
    // }
    if (!addBaseIdRef.current) {
      document
        ?.querySelector(".cnx-orders-base-add-coba")!
        .classList?.add("cnx-input-border-error-highlight");
      addBaseId = true;
    }
    if (!addClientIdRef.current) {
      document
        ?.querySelector(".cnx-orders-client-add-coca")!
        .classList?.add("cnx-input-border-error-highlight");
      addClientId = true;
    }
    if (!addVehicleIdRef.current) {
      document
        ?.querySelector(".cnx-orders-vehicle-add-cova")!
        .classList?.add("cnx-input-border-error-highlight");
      addVehicleId = true;
    }
    // if (!addHorseIdRef.current) {
    //   document
    //     ?.querySelector(".cnx-orders-horse-add-coha")!
    //     .classList?.add("cnx-input-border-error-highlight");
    //   addHorseId = true;
    // }
    if (addPlannedVolumeRef.current.value === "") {
      addPlannedVolumeRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addPlannedVolume = true;
    }
    // if (addVolumeRef.current.value === "") {
    //   addVolumeRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   addVolume = true;
    // }
    // if (!addStatusRef.current) {
    //   document
    //     ?.querySelector(".cnx-orders-status-add-cosa")!
    //     .classList?.add("cnx-input-border-error-highlight");
    //   addStatus = true;
    // }
    if (
      addProductId ||
      addScheduleDate ||
      addBaseId ||
      addClientId ||
      addVehicleId ||
      addPlannedVolume
    ) {
      return true;
    }
  }

  function editformCheck1030() {
    let editOpResourceId = false;

    if (!editOpResourceIdRef.current) {
      document
        ?.querySelector(".cnx-orders-op-resource-id")!
        .classList?.add("cnx-input-border-error-highlight");
      editOpResourceId = true;
    }

    if (editOpResourceId) {
      return true;
    }
  }
  function editformCheck2040() {
    let editOpCavaloId = false;

    if (!editOpCavaloIdRef.current) {
      document
        ?.querySelector("..cnx-orders-op-cavalo-id")!
        .classList?.add("cnx-input-border-error-highlight");
      editOpCavaloId = true;
    }

    if (editOpCavaloId) {
      return true;
    }
  }

  function editAllformCheck() {
    let editAllProductId = false;
    let editAllScheduleDate = false;
    // let editAllOrderDateTime = false;
    // let editAllDeliveryDate = false;
    let editAllBaseId = false;
    let editAllClientId = false;
    let editAllVehicleId = false;
    // let editAllHorseId = false;
    let editAllPlannedVolume = false;
    // let editAllVolume = false;
    let editAllStatus = false;

    if (!editAllProductIdRef.current) {
      document
        ?.querySelector(".cnx-orders-product-editAll-cope")!
        .classList?.add("cnx-input-border-error-highlight");
      editAllProductId = true;
    }
    if (editAllScheduleDateRef.current.value === "") {
      editAllScheduleDateRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editAllScheduleDate = true;
    }
    // if (editAllOrderDateTimeRef.current.value === "") {
    //   editAllOrderDateTimeRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   editAllOrderDateTime = true;
    // }
    // if (editAllDeliveryDateRef.current.value === "") {
    //   editAllDeliveryDateRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   editAllDeliveryDate = true;
    // }
    if (!editAllBaseIdRef.current) {
      document
        ?.querySelector(".cnx-orders-base-editAll-cobe")!
        .classList?.add("cnx-input-border-error-highlight");
      editAllBaseId = true;
    }
    if (!editAllClientIdRef.current) {
      document
        ?.querySelector(".cnx-orders-client-editAll-coce")!
        .classList?.add("cnx-input-border-error-highlight");
      editAllClientId = true;
    }
    if (!editAllVehicleIdRef.current) {
      document
        ?.querySelector(".cnx-orders-vehicle-editAll-cove")!
        .classList?.add("cnx-input-border-error-highlight");
      editAllVehicleId = true;
    }
    // if (!editAllHorseIdRef.current) {
    //   document
    //     ?.querySelector(".cnx-orders-horse-editAll-cohe")!
    //     .classList?.add("cnx-input-border-error-highlight");
    //   editAllHorseId = true;
    // }
    if (editAllPlannedVolumeRef.current.value === "") {
      editAllPlannedVolumeRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editAllPlannedVolume = true;
    }
    // if (editAllVolumeRef.current.value === "") {
    //   editAllVolumeRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   editAllVolume = true;
    // }
    if (!editAllStatus2Ref.current) {
      document
        ?.querySelector(".cnx-orders-status-editAll-cose")!
        .classList?.add("cnx-input-border-error-highlight");
      editAllStatus = true;
    }
    if (
      editAllProductId ||
      editAllScheduleDate ||
      editAllBaseId ||
      editAllClientId ||
      editAllVehicleId ||
      editAllPlannedVolume ||
      editAllStatus
    ) {
      return true;
    }
  }

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
      <CnxFormModal
        title="Adicionar Ordem"
        open={openAddModalLocal}
        close={closeAddModal}
        saveButton={() => add()}
        saving={saving}
        clearButton={() => clearAddModal()}
        formInputs={
          <>
            <Select
              inputRef={addProductIdRef}
              keyLabel="code"
              keyValue="id"
              label="Produto"
              mandatory
              options={enumerators?.products || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-product-add-copa"
              clear={clearSelect}
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-product-add-copa")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Input
              inputRef={addScheduleDateRef}
              type="datetime-local"
              label="Data de Programada"
              min={today.slice(0, 16)}
              mandatory
              onChange={() => {
                addScheduleDateRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={addOrderDateTimeRef}
              type="datetime-local"
              label="Data Hora Ordem"
              mandatory
              onChange={() => {
                addOrderDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addDeliveryDateRef}
              type="datetime-local"
              label="Data Hora Entrega"
              mandatory
              onChange={() => {
                addDeliveryDateRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Select
              inputRef={addBaseIdRef}
              keyLabel="name"
              keyValue="id"
              label="Base"
              mandatory
              options={enumerators?.bases || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-base-add-coba"
              clear={clearSelect}
              onChange={(e) => {
                // console.log("### TARGET", e);
                setBaseId(e?.id);
                document
                  ?.querySelector(".cnx-orders-base-add-coba")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={addClientIdRef}
              keyLabel="name"
              keyValue="id"
              label="Cliente"
              mandatory
              options={enumerators?.clients || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-client-add-coca"
              clear={clearSelect}
              onChange={(e) => {
                setClientId(e?.id);
                document
                  ?.querySelector(".cnx-orders-client-add-coca")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={addVehicleIdRef}
              keyLabel="plate"
              keyValue="id"
              label="Veículo"
              mandatory
              options={enumerators?.vehicles || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-vehicle-add-cova"
              clear={clearSelect}
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-vehicle-add-cova")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            {/* <Select
              inputRef={addHorseIdRef}
              keyLabel="code"
              keyValue="id"
              label="Cavalo"
              mandatory
              options={[
                { id: 1, code: "Ativo" },
                { id: 2, code: "Inativo" },
              ]}
              placeholder="Selecionar"
              className="cnx-orders-horse-add-coha"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-horse-add-coha")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            /> */}
            <Input
              inputRef={addPlannedVolumeRef}
              type="number"
              label="Volume Planejado"
              mandatory
              onChange={() => {
                addPlannedVolumeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={addVolumeRef}
              type="number"
              label="Volume"
              mandatory
              onChange={() => {
                addVolumeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <StatusLogs
              inputRef={addStatusRef}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={1}
              options={enumerators?.status || []}
              placeholder="Selecionar"
              customClassName="cnx-orders-status-add-cosa"
            /> */}
          </>
        }
        // customTab={{
        //   title: "Operações",
        //   content:
        //     <OperationParams
        //       clearParams={clearSelect}
        //     />
        // }}
        customTab={{
          title: "Operações",
          content:
            baseId && clientId ? (
              <OperationParams
                clearParams={clearSelect}
                baseId={baseId}
                clientId={clientId}
              />
            ) : (
              <></>
            ),
        }}
      />
      <button
        id={`${cnxId}cnx-edit-order-modal`}
        style={{ display: "none" }}
        type="button"
        onClick={() => {
          setOpenEditModalLocal(true);
          setOpenAddModalLocal(false);
        }}
      ></button>
      <button
        id={`${cnxId}cnx-add-order-modal`}
        style={{ display: "none" }}
        type="button"
        onClick={() => {
          setOpenAddModalLocal(true);
          setOpenEditModalLocal(false);
        }}
      ></button>
      <button
        id={`${cnxId}cnx-set-order-rowdata`}
        style={{ display: "none" }}
        type="button"
        onClick={() => handleSetLocalRowData()}
      ></button>
      <CnxFormModal
        title="Editar Ordem"
        open={openEditModalLocal}
        close={closeEditModal}
        saveButton={() => edit()}
        // clearButton={() => clearEditModal()}
        saving={saving}
        historic={<></>}
        formInputs={
          <>
            <Input inputRef={editIdRef} type="text" label="id" disabled />
            <Select
              inputRef={editProductIdRef}
              keyLabel="code"
              keyValue="id"
              label="Produto"
              mandatory
              defaultOption={rowDataLocal?.product?.id}
              options={enumerators?.products || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-product-edit-cope"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-product-edit-cope")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Input
              inputRef={editScheduleDateRef}
              type="datetime-local"
              label="Data de Programada"
              min={today.slice(0, 16)}
              defaultValue={rowDataLocal?.deliveryDate?.slice(0, 16)}
              mandatory
              onChange={() => {
                editScheduleDateRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={editOrderDateTimeRef}
              type="datetime-local"
              label="Data Hora Ordem"
              mandatory
              onChange={() => {
                editOrderDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editDeliveryDateRef}
              type="datetime-local"
              label="Data Hora Entrega"
              mandatory
              onChange={() => {
                editDeliveryDateRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Select
              inputRef={editBaseIdRef}
              keyLabel="name"
              keyValue="id"
              label="Base"
              mandatory
              defaultOption={rowDataLocal?.orderCustom?.customBase?.id || []}
              options={enumerators?.bases || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-base-edit-cobe"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-base-edit-cobe")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={editClientIdRef}
              keyLabel="name"
              keyValue="id"
              label="Cliente"
              mandatory
              defaultOption={rowDataLocal?.client?.id || []}
              options={enumerators?.clients || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-client-edit-coce"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-client-edit-coce")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={editVehicleIdRef}
              keyLabel="plate"
              keyValue="id"
              label="Veículo"
              mandatory
              defaultOption={rowDataLocal?.orderCustom?.customVehicle?.id || []}
              options={enumerators?.vehicles || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-vehicle-edit-cove"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-vehicle-edit-cove")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            {/* <Select
              inputRef={editVehicleIdRef}
              keyLabel="code"
              keyValue="id"
              label="Veículo"
              mandatory
              // defaultOption={}
              options={[
                { id: 1, code: "Ativo" },
                { id: 2, code: "Inativo" },
              ]}
              placeholder="Selecionar"
              className="cnx-orders-vehicle-edit-cove"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-vehicle-edit-cove")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            /> */}
            {/* <Select
              inputRef={editHorseIdRef}
              keyLabel="code"
              keyValue="id"
              label="Cavalo"
              mandatory
              // defaultOption={}
              options={[
                { id: 1, code: "Ativo" },
                { id: 2, code: "Inativo" },
              ]}
              placeholder="Selecionar"
              className="cnx-orders-horse-edit-cohe"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-horse-edit-cohe")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            /> */}
            <Input
              inputRef={editPlannedVolumeRef}
              type="number"
              label="Volume Planejado"
              mandatory
              onChange={() => {
                editPlannedVolumeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={editVolumeRef}
              type="number"
              label="Volume Planejado"
              mandatory
              onChange={() => {
                editVolumeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <StatusLogs
              inputRef={editStatusRef}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={rowDataLocal?.status}
              options={enumerators?.status || []}
              placeholder="Selecionar"
              customClassName="cnx-orders-status-edit-cose"
            />
          </>
        }
        customTab={{
          title: "Relacionamentos",
          content: (
            <ContainerRelations>
              <div>
                {orderById?.ordersChild?.map((item: any) => (
                  <article>
                    <div>
                      <span>{`#${item?.orderNumber}`}</span>
                      <span>Child</span>
                    </div>
                    <p>{`Criado em  ${useFormatDate(item?.orderDateTime)}`}</p>
                  </article>
                ))}
              </div>
              {rowDataLocal?.rowData?.qtdOrderLinkParent !== 0 ? (
                <div>
                  {parentsData?.map((item: any) => (
                    <article>
                      <div>
                        <span>{`#${item?.order?.orderNumber}`}</span>
                        <span>Parent</span>
                      </div>
                      <p>{`Criado em  ${useFormatDate(
                        item?.order?.orderDateTime
                      )}`}</p>
                    </article>
                  ))}
                </div>
              ) : null}

              {/* <article>
              <div>
                <span>#456789</span>
                <span>Child</span>
              </div>
              <p>Criado em 10/05/23 10:00:00</p>
            </article>

            <article>
              <div>
                <span>#456789</span>
                <span>Dual Operation</span>
              </div>
              <p>Criado em 10/05/23 10:00:00</p>
            </article>

            <article>
              <div>
                <span>#456789</span>
                <span>Child</span>
              </div>
              <p>Criado em 10/05/23 10:00:00</p>
            </article>

            <article>
              <div>
                <span>#456789</span>
                <span>Dual Operation</span>
              </div>
              <p>Criado em 10/05/23 10:00:00</p>
            </article> */}
            </ContainerRelations>
          ),
        }}
      />
      <CnxFormModal
        title="Editar Operação"
        open={editOperationModal}
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
                rowDataOperation?.orderProductionOperation?.operation?.id || []
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
                rowDataOperation?.orderProductionOperation?.cavaloId || []
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
                rowDataOperation?.orderProductionOperation?.resourceId || []
              }
              options={enumeratorsTramos || []}
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
              // defaultValue={rowDataOperation?.orderProductionOperation?.scheduleStartDateTime?.slice(
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
              // defaultValue={rowDataOperation?.orderProductionOperation?.scheduleFinishDateTime?.slice(
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
              defaultOption={rowDataOperation?.status}
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
      <CnxFormModal
        title="Editação em Massa"
        open={editAllModal}
        close={closeEditAllModal}
        saveButton={() => editAll()}
        // clearButton={() => clearEditModal()}
        saving={saving}
        formInputs={
          <>
            <Select
              inputRef={editAllProductIdRef}
              keyLabel="code"
              keyValue="id"
              label="Produto"
              mandatory
              // defaultOption={rowData?.product?.id}
              options={enumerators?.products || []}
              placeholder="Selecionar"
              clear={clearSelect}
              className="cnx-orders-product-edit-cope"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-product-edit-cope")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Input
              inputRef={editAllScheduleDateRef}
              type="datetime-local"
              label="Data de Programada"
              // defaultValue={rowData?.deliveryDate?.slice(0, 16)}
              mandatory
              onChange={() => {
                editAllScheduleDateRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Select
              inputRef={editAllBaseIdRef}
              keyLabel="name"
              keyValue="id"
              label="Base"
              mandatory
              // defaultOption={rowData?.orderCustom?.customBase?.id || []}
              options={enumerators?.bases || []}
              autoComplete
              clear={clearSelect}
              placeholder="Selecionar"
              className="cnx-orders-base-edit-cobe"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-base-edit-cobe")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={editAllClientIdRef}
              keyLabel="name"
              keyValue="id"
              label="Cliente"
              mandatory
              // defaultOption={rowData?.client?.id || []}
              options={enumerators?.clients || []}
              autoComplete
              clear={clearSelect}
              placeholder="Selecionar"
              className="cnx-orders-client-edit-coce"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-client-edit-coce")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={editAllVehicleIdRef}
              keyLabel="plate"
              keyValue="id"
              label="Veículo"
              mandatory
              // defaultOption={rowData?.orderCustom?.customVehicle?.id || []}
              options={enumerators?.vehicles || []}
              autoComplete
              clear={clearSelect}
              placeholder="Selecionar"
              className="cnx-orders-vehicle-edit-cove"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-vehicle-edit-cove")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Input
              inputRef={editAllPlannedVolumeRef}
              type="number"
              label="Volume Planejado"
              mandatory
              onChange={() => {
                editPlannedVolumeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Select
              inputRef={editAllStatus2Ref}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              clear={clearSelect}
              mandatory
              // defaultOption={rowData?.status}
              options={enumerators?.status || []}
              placeholder="Selecionar"
              // customClassName="cnx-orders-status-edit-cose"
            />
          </>
        }
      />
      <CnxFormModal
        title="Adicionar Resultados"
        open={addAngeLiraResultsModal}
        close={closeAddModal}
        saveButton={() => add()}
        saving={saving}
        clearButton={() => closeAddAngeLiraResultsModal()}
        formInputs={
          <>
            <Select
              inputRef={editResultsIdRef}
              keyLabel="code"
              keyValue="id"
              label="Produto"
              mandatory
              options={enumerators?.products || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-product-add-copa"
              clear={clearSelect}
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-product-add-copa")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Input
              inputRef={editResultsRef}
              type="datetime-local"
              label="Data de Programada"
              mandatory
              onChange={() => {
                editResultsRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={addOrderDateTimeRef}
              type="datetime-local"
              label="Data Hora Ordem"
              mandatory
              onChange={() => {
                addOrderDateTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addDeliveryDateRef}
              type="datetime-local"
              label="Data Hora Entrega"
              mandatory
              onChange={() => {
                addDeliveryDateRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <Select
              inputRef={editResultsIdRef}
              keyLabel="name"
              keyValue="id"
              label="Base"
              mandatory
              options={enumerators?.bases || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-base-add-coba"
              clear={clearSelect}
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-base-add-coba")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={editResultsIdRef}
              keyLabel="name"
              keyValue="id"
              label="Cliente"
              mandatory
              options={enumerators?.clients || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-client-add-coca"
              clear={clearSelect}
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-client-add-coca")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={editResultsIdRef}
              keyLabel="plate"
              keyValue="id"
              label="Veículo"
              mandatory
              options={enumerators?.vehicles || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-vehicle-add-cova"
              clear={clearSelect}
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-vehicle-add-cova")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            {/* <Select
              inputRef={addHorseIdRef}
              keyLabel="code"
              keyValue="id"
              label="Cavalo"
              mandatory
              options={[
                { id: 1, code: "Ativo" },
                { id: 2, code: "Inativo" },
              ]}
              placeholder="Selecionar"
              className="cnx-orders-horse-add-coha"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-horse-add-coha")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            /> */}
            <Input
              inputRef={editResultsRef}
              type="number"
              label="Volume Planejado"
              mandatory
              onChange={() => {
                editResultsRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={addVolumeRef}
              type="number"
              label="Volume"
              mandatory
              onChange={() => {
                addVolumeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <StatusLogs
              inputRef={addStatusRef}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={1}
              options={enumerators?.status || []}
              placeholder="Selecionar"
              customClassName="cnx-orders-status-add-cosa"
            /> */}
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
