import { useState, useRef, useEffect, useContext, useId } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";

import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import { _GET, _GET_ENUMERATOS, _POST, _PUT } from "../../routes";
import useFetch from "../../../../hooks/useFetch";
import CnxDialog from "../../../../components/CnxDialog";
import { axiosInstance } from "../../../../http/axiosInstance";
import { IPagination } from "../../routes/types";

function FormModalContainer() {
  const CNX_ID_ADD = useId();
  const CNX_ID_EDIT = useId();
  const { request } = useFetch();
  const { localesData } = useContext<ILocales>(localesContex);
  const { dispacth, addModal, editModal, rowData, saving, enumeratos } =
    useContext(UseContext);

  const addClienteIdRef: any = useRef({});
  const addBaseIdRef: any = useRef({});
  const addDistanceToClientRef = useRef<HTMLInputElement>(null!);
  const addScheduleTimeRef = useRef<HTMLInputElement>(null!);
  const addEstimatedFuelConsumptionRef = useRef<HTMLInputElement>(null!);
  const addIsActivedRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editClienteIdRef: any = useRef({});
  const editBaseIdRef: any = useRef({});
  const editDistanceToClientRef = useRef<HTMLInputElement>(null!);
  const editScheduleTimeRef = useRef<HTMLInputElement>(null!);
  const editEstimatedFuelConsumptionRef = useRef<HTMLInputElement>(null!);
  const editIsActivedRef: any = useRef({});

  useEffect(() => {
    if (addModal || editModal) {
      getEnumerators();
    }
  }, [addModal, editModal]);

  useEffect(() => {
    editIdRef.current.value = rowData?.id;
    editDistanceToClientRef.current.value = rowData?.distanceToClient;
    editScheduleTimeRef.current.value = rowData?.scheduleTime;
    editEstimatedFuelConsumptionRef.current.value =
      rowData?.estimatedFuelConsumption;
    editIsActivedRef.current.checked = rowData?.isActived;
  }, [rowData]);

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

  // const getTableData = async () => {
  //   const { url, options } = _GET();

  //   dispacth({
  //     type: ACTIONS.LOADING_TABLE,
  //     payload: true,
  //   });

  //   const { response, json } = await request(url, options);

  //   if (response?.ok) {
  //     dispacth({
  //       type: ACTIONS.SET_TABLE_DATA,
  //       payload: json,
  //     });
  //   } else {
  //     console.log("ERROR", response);
  //   }

  //   dispacth({
  //     type: ACTIONS.LOADING_TABLE,
  //     payload: false,
  //   });
  // };

  function addformCheck() {
    let addBaseId = false;
    let addClientId = false;
    let addDistanceToClient = false;
    let addScheduleTime = false;
    let addEstimatedFuelConsumption = false;
    let addIsActived = false;

    if (!addBaseIdRef.current) {
      document
        ?.querySelector(".cnx-routes-base-id-add-crbia")!
        .classList?.add("cnx-input-border-error-highlight");
      addBaseId = true;
    }
    if (!addClienteIdRef.current) {
      document
        ?.querySelector(".cnx-routes-client-id-add-crcia")!
        .classList?.add("cnx-input-border-error-highlight");
      addClientId = true;
    }
    if (addDistanceToClientRef.current.value === "") {
      addDistanceToClientRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addDistanceToClient = true;
    }
    if (addScheduleTimeRef.current.value === "") {
      addScheduleTimeRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addScheduleTime = true;
    }
    if (addEstimatedFuelConsumptionRef.current.value === "") {
      addEstimatedFuelConsumptionRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addEstimatedFuelConsumption = true;
    }
    if (!addIsActivedRef.current) {
      document
        ?.querySelector(".cnx-routes-is-actived-add-criaa")!
        .classList?.add("cnx-input-border-error-highlight");
      addIsActived = true;
    }
    if (
      addBaseId ||
      addClientId ||
      addDistanceToClient ||
      addScheduleTime ||
      addEstimatedFuelConsumption ||
      addIsActived
    ) {
      return true;
    }
  }

  function editformCheck() {
    let editBaseId = false;
    let editClientId = false;
    let editDistanceToClient = false;
    let editScheduleTime = false;
    let editEstimatedFuelConsumption = false;
    let editIsActived = false;

    if (!editBaseIdRef.current) {
      document
        ?.querySelector(".cnx-routes-base-id-edit-crbie")!
        .classList?.add("cnx-input-border-error-highlight");
      editBaseId = true;
    }
    if (!editClienteIdRef.current) {
      document
        ?.querySelector(".cnx-routes-client-id-edit-crcie")!
        .classList?.add("cnx-input-border-error-highlight");
      editClientId = true;
    }
    if (editDistanceToClientRef.current.value === "") {
      editDistanceToClientRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editDistanceToClient = true;
    }
    if (editScheduleTimeRef.current.value === "") {
      editScheduleTimeRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editScheduleTime = true;
    }
    if (editEstimatedFuelConsumptionRef.current.value === "") {
      editEstimatedFuelConsumptionRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editEstimatedFuelConsumption = true;
    }
    if (!editIsActivedRef.current) {
      document
        ?.querySelector(".cnx-routes-is-actived-edit-criaa")!
        .classList?.add("cnx-input-border-error-highlight");
      editIsActived = true;
    }
    if (
      editBaseId ||
      editClientId ||
      editDistanceToClient ||
      editScheduleTime ||
      editEstimatedFuelConsumption ||
      editIsActived
    ) {
      return true;
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
      console.log("ERRO", err);
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
          baseId: addBaseIdRef.current.id,
          clientId: addClienteIdRef.current.id,
          distanceToClient: Number(addDistanceToClientRef.current.value),
          scheduleTime: Number(addScheduleTimeRef.current.value),
          estimatedFuelConsumption: Number(
            addEstimatedFuelConsumptionRef.current.value
          ),
          isActived: 1,
        })
      );

      getList({ PageSize: 100 });
      clearAddModal();
    } catch (err: any) {
      console.error(err);
      const modal: any = document.getElementById(CNX_ID_ADD);
      modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });
    }
  }

  async function edit() {
    if (editformCheck()) return;

    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });

    try {
      await axiosInstance(
        _PUT({
          id: editIdRef.current.value,
          baseId: editBaseIdRef.current.id,
          clientId: editClienteIdRef.current.id,
          distanceToClient: Number(editDistanceToClientRef.current.value),
          scheduleTime: Number(editScheduleTimeRef.current.value),
          estimatedFuelConsumption: Number(
            editEstimatedFuelConsumptionRef.current.value
          ),
          isActived: editIsActivedRef.current.checked ? 1 : 0,
        })
      );

      getList({ PageSize: 100 });
    } catch (err: any) {
      console.error(err);
      const modal: any = document.getElementById(CNX_ID_EDIT);
      modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });
    }
  }

  const closeAddModal = () => {
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
  };

  const closeEditModal = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
  };

  const [clearSelect, setClearSelect] = useState(false);

  const clearAddModal = () => {
    addBaseIdRef.current.value = "";
    addClienteIdRef.current.value = "";
    addDistanceToClientRef.current.value = "";
    addScheduleTimeRef.current.value = "";
    addEstimatedFuelConsumptionRef.current.value = "";
    addIsActivedRef.current = [];
    setClearSelect(!clearSelect);
  };

  const clearEditModal = () => {
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {
        id: rowData?.id,
        areaCodigo: null,
        areaNome: null,
        impressoraIP: null,
        impressoraNome: null,
        situacao: null,
      },
    });
  };

  return (
    <>
      <CnxDialog
        useId={CNX_ID_ADD}
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível adicionar o registro",
        }}
      />
      <CnxDialog
        useId={CNX_ID_EDIT}
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível editar o registro",
        }}
      />
      <CnxFormModal
        saving={saving}
        title="Adicionar Rota"
        open={addModal}
        close={closeAddModal}
        saveButton={() => add()}
        clearButton={clearAddModal}
        formInputs={
          <>
            {/* <Input
              inputRef={addBaseIdRef}
              type="text"
              onChange={() => {
                addBaseIdRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
              label="Cliente"
              mandatory
            /> */}
            {/* <Input
              inputRef={addClienteIdRef}
              type="text"
              onChange={() => {
                addClienteIdRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
              label="Base"
              mandatory
            /> */}
            <Select
              inputRef={addBaseIdRef}
              keyLabel="name"
              keyValue="id"
              label="Base"
              mandatory
              className="cnx-routes-base-id-add-crbia"
              onChange={() => {
                document
                  ?.querySelector(".cnx-routes-base-id-add-crbia")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              options={enumeratos?.customBases || []}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              inputRef={addClienteIdRef}
              keyLabel="name"
              keyValue="id"
              label="Cliente"
              mandatory
              className="cnx-routes-client-id-add-crcia"
              onChange={() => {
                document
                  ?.querySelector(".cnx-routes-client-id-add-crcia")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              options={enumeratos?.clients || []}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Input
              inputRef={addDistanceToClientRef}
              type="number"
              onChange={() => {
                addDistanceToClientRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Distância Translado (Km)"
              mandatory
            />
            <Input
              inputRef={addScheduleTimeRef}
              type="number"
              onChange={() => {
                addScheduleTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Duração Programada (min)"
              mandatory
            />
            <Input
              inputRef={addEstimatedFuelConsumptionRef}
              type="number"
              onChange={() => {
                addEstimatedFuelConsumptionRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Consumo Combustível (litros)"
              mandatory
            />
            {/* <Select
              inputRef={addIsActivedRef}
              keyLabel="code"
              keyValue="id"
              label="Situação"
              mandatory
              className="cnx-routes-is-actived-add-criaa"
              onChange={() => {
                document
                  ?.querySelector(".cnx-routes-is-actived-add-criaa")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              defaultOption={1}
              options={[
                { id: 1, code: "Ativo" },
                { id: 0, code: "Inativo" },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            /> */}
          </>
        }
      />
      <CnxFormModal
        saving={saving}
        title="Editar Rota"
        open={editModal}
        close={closeEditModal}
        clearButton={clearEditModal}
        saveButton={() => edit()}
        formInputs={
          <>
            <Input
              inputRef={editIdRef}
              type="text"
              label="id"
              disabled
              mandatory
            />
            {/* <Input
              inputRef={editBaseIdRef}
              type="text"
              label="Cliente"
              mandatory
              onChange={() => {
                editBaseIdRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
            /> */}
            {/* <Input
              inputRef={editClienteIdRef}
              type="text"
              label="Base"
              mandatory
              onChange={() => {
                editClienteIdRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
            /> */}
            <Select
              inputRef={editBaseIdRef}
              keyLabel="name"
              keyValue="id"
              label="Base"
              mandatory
              className="cnx-routes-base-id-edit-crbie"
              onChange={() => {
                document
                  ?.querySelector(".cnx-routes-base-id-edit-crbie")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              defaultOption={rowData?.baseId}
              options={enumeratos?.customBases || []}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              inputRef={editClienteIdRef}
              keyLabel="name"
              keyValue="id"
              label="Cliente"
              mandatory
              className="cnx-routes-client-id-edit-crcie"
              onChange={() => {
                document
                  ?.querySelector(".cnx-routes-client-id-edit-crcie")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              defaultOption={rowData?.clientId}
              options={enumeratos?.clients || []}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Input
              inputRef={editDistanceToClientRef}
              type="number"
              label="Distância Translado (Km)"
              mandatory
              onChange={() => {
                editDistanceToClientRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editScheduleTimeRef}
              type="number"
              label="Duração Programada (min)"
              mandatory
              onChange={() => {
                editScheduleTimeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editEstimatedFuelConsumptionRef}
              type="number"
              label="Consumo Combustível (litros)"
              mandatory
              onChange={() => {
                editEstimatedFuelConsumptionRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                marginTop: "12px",
              }}
            >
              <Input
                inputRef={editIsActivedRef}
                type="checkbox"
              />
              <span className="cnx-active-label-checkbox">Ativo</span>
            </div>
            {/* <Select
              keyLabel="code"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={rowData?.isActived}
              options={[
                { id: 1, code: "Ativo" },
                { id: 0, code: "Inativo" },
              ]}
              className="cnx-areas-select-edit-situacao-cases"
              onChange={() => {
                document
                  ?.querySelector(".cnx-areas-select-edit-situacao-cases")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              inputRef={editIsActivedRef}
              clear={clearSelect}
              placeholder="Selecionar"
            /> */}
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
