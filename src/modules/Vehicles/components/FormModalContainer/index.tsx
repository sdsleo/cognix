import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";

import "./styles.css";

import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import CnxDialog from "../../../../components/CnxDialog";
import { axiosInstance } from "../../../../http/axiosInstance";
import { _GET, _GET_ENUMERATOS, _POST, _PUT } from "../../routes";
import { IPagination } from "../../routes/types";
function FormModalContainer() {
  const { dispacth, addModal, editModal, rowData, saving, enumerators } =
    useContext(UseContext);
  const CNX_ID_ADD = useId();
  const CNX_ID_EDIT = useId();

  const addPlateRef = useRef<HTMLInputElement>(null!);
  const addVehicleRef = useRef<HTMLInputElement>(null!);
  const addModelRef = useRef<HTMLInputElement>(null!);
  const addNominalCapacityRef = useRef<HTMLInputElement>(null!);
  const addRealCapacityRef = useRef<HTMLInputElement>(null!);
  const addEfLogisticRef = useRef<HTMLInputElement>(null!);
  const addResourcesIdRef: any = useRef({});
  const addIsActivedRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editVehicleRef = useRef<HTMLInputElement>(null!);
  const editPlateRef = useRef<HTMLInputElement>(null!);
  const editModelRef = useRef<HTMLInputElement>(null!);
  const editNominalCapacityRef = useRef<HTMLInputElement>(null!);
  const editRealCapacityRef = useRef<HTMLInputElement>(null!);
  const editEfLogisticRef = useRef<HTMLInputElement>(null!);
  const editResourcesIdRef: any = useRef({});
  const editIsActivedRef: any = useRef({});

  useEffect(() => {
    if (addModal || editModal) {
      getEnumerators();
    }
  }, [addModal, editModal]);

  useEffect(() => {
    if (rowData) {
      editIdRef.current.value = rowData?.id;
      editPlateRef.current.value = rowData?.plate;
      editModelRef.current.value = rowData?.model;
      editVehicleRef.current.value = rowData?.vehicle;
      editNominalCapacityRef.current.value = rowData?.nominalCapacity;
      editRealCapacityRef.current.value = rowData?.realCapacity;
      editEfLogisticRef.current.value = rowData?.efLogistic;
      editIsActivedRef.current.checked = rowData?.isActived;
    }
  }, [rowData]);

  function addformCheck() {
    let addPlate = false;
    let addModel = false;
    let addVehicle = false;
    let addNominalCapacity = false;
    let addRealCapacity = false;
    let addEfLogistic = false;
    let addIsActived = false;

    if (addModelRef.current.value === "") {
      addModelRef.current!.classList?.add("cnx-input-border-error-highlight");
      addModel = true;
    }
    if (addPlateRef.current.value === "") {
      addPlateRef.current!.classList?.add("cnx-input-border-error-highlight");
      addPlate = true;
    }
    if (addVehicleRef.current.value === "") {
      addVehicleRef.current!.classList?.add("cnx-input-border-error-highlight");
      addVehicle = true;
    }
    if (addNominalCapacityRef.current.value === "") {
      addNominalCapacityRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addNominalCapacity = true;
    }
    if (addRealCapacityRef.current.value === "") {
      addRealCapacityRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addRealCapacity = true;
    }
    if (addEfLogisticRef.current.value === "") {
      addEfLogisticRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addEfLogistic = true;
    }
    if (!addIsActivedRef.current) {
      document
        ?.querySelector(".cnx-vehicles-is-actived-add-cviaa")!
        .classList?.add("cnx-input-border-error-highlight");
      addIsActived = true;
    }
    if (
      addPlate ||
      addModel ||
      addVehicle ||
      addNominalCapacity ||
      addRealCapacity ||
      addEfLogistic ||
      addIsActived
    ) {
      return true;
    }
  }

  function editformCheck() {
    let editPlate = false;
    let editModel = false;
    let editVehicle = false;
    let editNominalCapacity = false;
    let editRealCapacity = false;
    let editEfLogistic = false;
    let editIsActived = false;

    if (editModelRef.current.value === "") {
      editModelRef.current!.classList?.add("cnx-input-border-error-highlight");
      editModel = true;
    }
    if (editPlateRef.current.value === "") {
      editPlateRef.current!.classList?.add("cnx-input-border-error-highlight");
      editPlate = true;
    }
    if (editVehicleRef.current.value === "") {
      editVehicleRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editVehicle = true;
    }
    if (editNominalCapacityRef.current.value === "") {
      editNominalCapacityRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editNominalCapacity = true;
    }
    if (editRealCapacityRef.current.value === "") {
      editRealCapacityRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editRealCapacity = true;
    }
    if (editEfLogisticRef.current.value === "") {
      editEfLogisticRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editEfLogistic = true;
    }
    if (!editIsActivedRef.current) {
      document
        ?.querySelector(".cnx-vehicles-is-actived-edit-cviae")!
        .classList?.add("cnx-input-border-error-highlight");
      editIsActived = true;
    }
    if (
      editPlate ||
      editModel ||
      editVehicle ||
      editNominalCapacity ||
      editRealCapacity ||
      editEfLogistic ||
      editIsActived
    ) {
      return true;
    }
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
          plate: addPlateRef.current.value,
          model: addModelRef.current.value,
          vehicle: addVehicleRef.current.value,
          nominalCapacity: Number(addNominalCapacityRef.current.value),
          realCapacity: Number(addRealCapacityRef.current.value),
          efLogistic: Number(addEfLogisticRef.current.value),
          resourceId: Number(addResourcesIdRef?.current?.id),
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
          plate: editPlateRef.current.value,
          model: editModelRef.current.value,
          vehicle: editVehicleRef.current.value,
          nominalCapacity: Number(editNominalCapacityRef.current.value),
          realCapacity: Number(editRealCapacityRef.current.value),
          efLogistic: Number(editEfLogisticRef.current.value),
          resourceId: Number(editResourcesIdRef?.current?.id),
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
    addModelRef.current.value = "";
    addPlateRef.current.value = "";
    addVehicleRef.current.value = "";
    addNominalCapacityRef.current.value = "";
    addRealCapacityRef.current.value = "";
    addEfLogisticRef.current.value = "";
    setClearSelect(!clearSelect);
  };

  const clearEditModal = () => {
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {
        id: rowData?.id,
        plate: null,
        model: null,
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
          message: "Não foi possível adicionar o registro.",
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
        title="Adicionar Carretas"
        open={addModal}
        close={closeAddModal}
        saveButton={() => add()}
        clearButton={clearAddModal}
        saving={saving}
        formInputs={
          <>
            <Input
              inputRef={addPlateRef}
              type="text"
              label="Placa"
              mandatory
              onChange={() => {
                addPlateRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addVehicleRef}
              type="text"
              label="Veículo"
              mandatory
              onChange={() => {
                addVehicleRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addModelRef}
              type="text"
              label="Modelo"
              mandatory
              onChange={() => {
                addModelRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addNominalCapacityRef}
              type="number"
              label="Capacidade Nominal m³"
              mandatory
              onChange={() => {
                addNominalCapacityRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addRealCapacityRef}
              type="number"
              label="Capacidade Real m³"
              mandatory
              onChange={() => {
                addRealCapacityRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addEfLogisticRef}
              type="number"
              label="EfLogística %"
              mandatory
              onChange={() => {
                addEfLogisticRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <div className="hide">
              <Select
                inputRef={addResourcesIdRef}
                keyLabel="code"
                keyValue="id"
                label="Recursos _some"
                cnxStyles={{ display: "none" }}
                className="cnx-vehicles-is-actived-add-chiaa"
                clear={clearSelect}
                options={enumerators?.resources || []}
                placeholder="Selecionar"
                onChange={() => {
                  document
                    ?.querySelector(".cnx-vehicles-is-actived-add-chiaa")!
                    .classList?.remove("cnx-input-border-error-highlight");
                }}
              />
            </div>
            {/* <Select
              inputRef={addIsActivedRef}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              className="cnx-vehicles-is-actived-add-chiaa"
              defaultOption={1}
              options={[
                { id: 1, name: "Ativo" },
                { id: 0, name: "Inativo" },
              ]}
              placeholder="Selecionar"
              onChange={() => {
                document
                  ?.querySelector(".cnx-vehicles-is-actived-add-chiaa")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            /> */}
          </>
        }
      />
      <CnxFormModal
        title="Editar Carretas"
        open={editModal}
        close={closeEditModal}
        saveButton={() => edit()}
        clearButton={clearEditModal}
        saving={saving}
        formInputs={
          <>
            <Input
              inputRef={editIdRef}
              type="text"
              label="id"
              disabled
              mandatory
            />
            <Input
              inputRef={editPlateRef}
              type="text"
              label="Placa"
              mandatory
              onChange={() => {
                editPlateRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editVehicleRef}
              type="text"
              label="Veículo"
              mandatory
              onChange={() => {
                editVehicleRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editModelRef}
              type="text"
              label="Modelo"
              mandatory
              onChange={() => {
                editModelRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editNominalCapacityRef}
              type="number"
              label="Capacidade Nominal m³"
              mandatory
              onChange={() => {
                editNominalCapacityRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editRealCapacityRef}
              type="number"
              label="Capacidade Real m³"
              mandatory
              onChange={() => {
                editRealCapacityRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editEfLogisticRef}
              type="number"
              label="EfLogística %"
              mandatory
              onChange={() => {
                editEfLogisticRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />

            <div className="hide">
              <Select
                inputRef={editResourcesIdRef}
                keyLabel="code"
                keyValue="id"
                label="Recursos"
                className="cnx-vehicles-is-actived-add-chiaa"
                // cnxStyles={{display:'none'}}
                defaultOption={rowData?.resourceId}
                clear={clearSelect}
                options={enumerators?.resources || []}
                placeholder="Selecionar"
                onChange={() => {
                  document
                    ?.querySelector(".cnx-vehicles-is-actived-add-chiaa")!
                    .classList?.remove("cnx-input-border-error-highlight");
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                marginTop: "12px",
              }}
            >
              <Input inputRef={editIsActivedRef} type="checkbox" />
              <span className="cnx-active-label-checkbox">Ativo</span>
            </div>
            {/* <Select
              inputRef={editIsActivedRef}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              className="cnx-horses-is-actived-edit-chiae"
              defaultOption={rowData?.isActived}
              options={[
                { id: 1, name: "Ativo" },
                { id: 0, name: "Inativo" },
              ]}
              placeholder="Selecionar"
              onChange={() => {
                document
                  ?.querySelector(".cnx-vehicles-is-actived-edit-chiae")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            /> */}
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
