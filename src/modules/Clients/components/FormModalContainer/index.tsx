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
  const { dispacth, addModal, editModal, rowData, saving, enumerators } =
    useContext(UseContext);

  const addNameRef = useRef<HTMLInputElement>(null!);
  const addCodeRef = useRef<HTMLInputElement>(null!);
  const addLatitudeRef = useRef<HTMLInputElement>(null!);
  const addLongitudeRef = useRef<HTMLInputElement>(null!);
  const addQtyTramosRef = useRef<HTMLInputElement>(null!);
  const addOperationTypeRef: any = useRef({});
  const addMaxFlowRef = useRef<HTMLInputElement>(null!);
  const addQtyParkingSpacesRef = useRef<HTMLInputElement>(null!);
  const addGasPriceRef = useRef<HTMLInputElement>(null!);
  const addContractNumberRef = useRef<HTMLInputElement>(null!);
  const addTransportationCostRef = useRef<HTMLInputElement>(null!);
  const addOperationalCostRef = useRef<HTMLInputElement>(null!);
  const addIsActivedRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editNameRef = useRef<HTMLInputElement>(null!);
  const editCodeRef = useRef<HTMLInputElement>(null!);
  const editLatitudeRef = useRef<HTMLInputElement>(null!);
  const editLongitudeRef = useRef<HTMLInputElement>(null!);
  const editQtyTramosRef = useRef<HTMLInputElement>(null!);
  const editOperationTypeRef: any = useRef({});
  const editMaxFlowRef = useRef<HTMLInputElement>(null!);
  const editQtyParkingSpacesRef = useRef<HTMLInputElement>(null!);
  const editGasPriceRef = useRef<HTMLInputElement>(null!);
  const editContractNumberRef = useRef<HTMLInputElement>(null!);
  const editTransportationCostRef = useRef<HTMLInputElement>(null!);
  const editOperationalCostRef = useRef<HTMLInputElement>(null!);
  const editIsActivedRef: any = useRef({});

  useEffect(() => {
    if (addModal || editModal) {
      getEnumerators();
    }
  }, [addModal, editModal]);

  useEffect(() => {
    editIdRef.current.value = rowData?.id;
    editNameRef.current.value = rowData?.name;
    editCodeRef.current.value = rowData?.code;
    editLatitudeRef.current.value = rowData?.latitude;
    editLongitudeRef.current.value = rowData?.longitude;
    editQtyTramosRef.current.value = rowData?.qtyTramos;
    editMaxFlowRef.current.value = rowData?.maxFlow;
    editQtyParkingSpacesRef.current.value = rowData?.qtyParkingSpaces;
    editGasPriceRef.current.value = rowData?.gasPrice;
    editContractNumberRef.current.value = rowData?.contractNumber;
    editTransportationCostRef.current.value = rowData?.transportCost;
    editOperationalCostRef.current.value = rowData?.operationCost;
    editIsActivedRef.current.checked = rowData?.isActived;
  }, [rowData]);

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
    let addCode = false;
    let addName = false;
    let addLatitude = false;
    let addLongitude = false;
    let addQtyTramos = false;
    let addMaxFlow = false;
    let addQtyParkingSpaces = false;
    let addGasPrice = false;
    let addContractNumber = false;
    let addOperationType = false;
    let addIsActived = false;

    if (addCodeRef.current.value === "") {
      addCodeRef.current!.classList?.add("cnx-input-border-error-highlight");
      addCode = true;
    }
    if (addNameRef.current.value === "") {
      addNameRef.current!.classList?.add("cnx-input-border-error-highlight");
      addName = true;
    }
    if (addLatitudeRef.current.value === "") {
      addLatitudeRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addLatitude = true;
    }
    if (addLongitudeRef.current.value === "") {
      addLongitudeRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addLongitude = true;
    }
    if (addQtyTramosRef.current.value === "") {
      addQtyTramosRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addQtyTramos = true;
    }
    if (addMaxFlowRef.current.value === "") {
      addMaxFlowRef.current!.classList?.add("cnx-input-border-error-highlight");
      addMaxFlow = true;
    }
    if (addQtyParkingSpacesRef.current.value === "") {
      addQtyParkingSpacesRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addQtyParkingSpaces = true;
    }
    if (addGasPriceRef.current.value === "") {
      addGasPriceRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addGasPrice = true;
    }
    if (addContractNumberRef.current.value === "") {
      addContractNumberRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addContractNumber = true;
    }
    if (!addOperationTypeRef.current) {
      document
        ?.querySelector(".cnx-clients-operation-type-add-ccota")!
        .classList?.add("cnx-input-border-error-highlight");
      addOperationType = true;
    }
    if (!addIsActivedRef.current) {
      document
        ?.querySelector(".cnx-clients-is-actived-add-cciaa")!
        .classList?.add("cnx-input-border-error-highlight");
      addIsActived = true;
    }
    if (
      addCode ||
      addName ||
      addLatitude ||
      addLongitude ||
      addQtyTramos ||
      addMaxFlow ||
      addQtyParkingSpaces ||
      addGasPrice ||
      addContractNumber ||
      addOperationType ||
      addIsActived
    ) {
      return true;
    }
  }

  function editformCheck() {
    let editCode = false;
    let editName = false;
    let editLatitude = false;
    let editLongitude = false;
    let editQtyTramos = false;
    let editMaxFlow = false;
    let editQtyParkingSpaces = false;
    let editGasPrice = false;
    let editContractNumber = false;
    let editOperationType = false;
    let editIsActived = false;

    if (editCodeRef.current.value === "") {
      editCodeRef.current!.classList?.add("cnx-input-border-error-highlight");
      editCode = true;
    }
    if (editNameRef.current.value === "") {
      editNameRef.current!.classList?.add("cnx-input-border-error-highlight");
      editName = true;
    }
    if (editLatitudeRef.current.value === "") {
      editLatitudeRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editLatitude = true;
    }
    if (editLongitudeRef.current.value === "") {
      editLongitudeRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editLongitude = true;
    }
    if (editQtyTramosRef.current.value === "") {
      editQtyTramosRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editQtyTramos = true;
    }
    if (editMaxFlowRef.current.value === "") {
      editMaxFlowRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editMaxFlow = true;
    }
    if (editQtyParkingSpacesRef.current.value === "") {
      editQtyParkingSpacesRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editQtyParkingSpaces = true;
    }
    if (editGasPriceRef.current.value === "") {
      editGasPriceRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editGasPrice = true;
    }
    if (editContractNumberRef.current.value === "") {
      editContractNumberRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editContractNumber = true;
    }
    if (!editOperationTypeRef.current) {
      document
        ?.querySelector(".cnx-clients-operation-type-edit-ccote")!
        .classList?.add("cnx-input-border-error-highlight");
      editOperationType = true;
    }
    if (!editIsActivedRef.current) {
      document
        ?.querySelector(".cnx-clients-is-actived-edit-cciae")!
        .classList?.add("cnx-input-border-error-highlight");
      editIsActived = true;
    }
    if (
      editCode ||
      editName ||
      editLatitude ||
      editLongitude ||
      editQtyTramos ||
      editMaxFlow ||
      editQtyParkingSpaces ||
      editGasPrice ||
      editContractNumber ||
      editOperationType ||
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

      const newItems = data?.items?.map((item: any) => {
        const newItem = {
          id: item.id,
          code: item.code,
          isActived: item.isActived,
          name: item.name,
          situation: item.situation,
          strIsActived: item.strIsActived,
          strSituation: item.strSituation,
          clientId: item.clientCustom.clientId,
          contractNumber: item.clientCustom.contractNumber,
          gasPrice: item.clientCustom.gasPrice,
          idCustom: item.clientCustom.id,
          latitude: item.clientCustom.latitude,
          longitude: item.clientCustom.longitude,
          maxFlow: item.clientCustom.maxFlow,
          operationType: item.clientCustom.operationType,
          qtyParkingSpaces: item.clientCustom.qtyParkingSpaces,
          qtyTramos: item.clientCustom.qtyTramos,
          situationCustom: item.clientCustom.situation,
          strSituationCustom: item.clientCustom.strSituation,
        };
        return newItem;
      });
      const newResponse = {
        ...data,
        newItems,
      };
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: newResponse,
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

  async function addClient() {
    if (addformCheck()) return;

    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });

    try {
      await axiosInstance(
        _POST({
          name: addNameRef.current.value,
          code: addCodeRef.current.value,
          isActived: 1,
          latitude: addLatitudeRef.current.value,
          longitude: addLongitudeRef.current.value,
          qtyTramos: Number(addQtyTramosRef.current.value),
          operationType: Number(addOperationTypeRef.current.id),
          maxFlow: Number(addMaxFlowRef.current.value),
          qtyParkingSpaces: Number(addQtyParkingSpacesRef.current.value),
          gasPrice: Number(addGasPriceRef.current.value),
          contractNumber: addContractNumberRef.current.value,
          transportCost: Number(addTransportationCostRef.current.value),
          operationCost: Number(addOperationalCostRef.current.value),
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

  async function editClient() {
    if (editformCheck()) return;

    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });

    try {
      await axiosInstance(
        _PUT({
          id: editIdRef.current.value,
          idCustom: rowData?.idCustom,
          name: editNameRef.current.value,
          code: editCodeRef.current.value,
          isActived: editIsActivedRef.current.checked ? 1 : 0,
          latitude: editLatitudeRef.current.value,
          longitude: editLongitudeRef.current.value,
          qtyTramos: Number(editQtyTramosRef.current.value),
          operationType: Number(editOperationTypeRef.current.id),
          maxFlow: Number(editMaxFlowRef.current.value),
          qtyParkingSpaces: Number(editQtyParkingSpacesRef.current.value),
          gasPrice: Number(editGasPriceRef.current.value),
          contractNumber: editContractNumberRef.current.value,
          transportCost: Number(editTransportationCostRef.current.value),
          operationCost: Number(editOperationalCostRef.current.value),
        })
      );

      getList({ PageSize: 100 });
      clearAddModal();
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
    clearEditModal();
  };

  const [clearSelect, setClearSelect] = useState(false);

  const clearAddModal = () => {
    addCodeRef.current.value = "";
    addNameRef.current.value = "";
    addLatitudeRef.current.value = "";
    addLongitudeRef.current.value = "";
    addQtyTramosRef.current.value = "";
    addMaxFlowRef.current.value = "";
    addQtyParkingSpacesRef.current.value = "";
    addGasPriceRef.current.value = "";
    addContractNumberRef.current.value = "";
    (addTransportationCostRef.current.value = ""),
      (addOperationalCostRef.current.value = ""),
      (addIsActivedRef.current = []);
    setClearSelect(!clearSelect);
  };

  const clearEditModal = () => {
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {
        id: rowData?.id,
        code: null,
        name: null,
        latitude: null,
        longitude: null,
        isActived: null,
        qtyTramos: null,
        maxFlow: null,
        gasPrice: null,
        qtyParkingSpaces: null,
        contractNumber: null,
        transportCost: null,
        operationCost: null,
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
        title="Adicionar Cliente"
        open={addModal}
        close={closeAddModal}
        saveButton={() => addClient()}
        clearButton={clearAddModal}
        formInputs={
          <>
            <Input
              inputRef={addNameRef}
              type="text"
              onChange={() => {
                addNameRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Nome"
              mandatory
            />
            <Input
              inputRef={addCodeRef}
              type="text"
              onChange={() => {
                addCodeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Código"
              mandatory
            />
            <Input
              inputRef={addLatitudeRef}
              type="text"
              onChange={() => {
                addLatitudeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Latitude"
              mandatory
            />
            <Input
              inputRef={addLongitudeRef}
              type="text"
              onChange={() => {
                addLongitudeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Longitude"
              mandatory
            />
            <Input
              inputRef={addQtyTramosRef}
              type="text"
              onChange={() => {
                addQtyTramosRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Qtd Tramos"
              mandatory
            />
            <Select
              inputRef={addOperationTypeRef}
              keyLabel="name"
              keyValue="id"
              label="Tipo Operação"
              mandatory
              className="cnx-clients-operation-type-add-ccota"
              onChange={() => {
                document
                  ?.querySelector(".cnx-clients-operation-type-add-ccota")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              options={enumerators?.operationTypes || []}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Input
              inputRef={addMaxFlowRef}
              type="float"
              onChange={() => {
                addMaxFlowRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Vazão Máxima m³/h"
              mandatory
            />
            <Input
              inputRef={addQtyParkingSpacesRef}
              type="text"
              onChange={() => {
                addQtyParkingSpacesRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Qtd Vagas Estacionamento"
              mandatory
            />
            <Input
              inputRef={addGasPriceRef}
              type="float"
              onChange={() => {
                addGasPriceRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Preço Unitário Gás"
              mandatory
            />
            <Input
              inputRef={addContractNumberRef}
              type="text"
              onChange={() => {
                addContractNumberRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Número Contrato"
              mandatory
            />
            <Input
              inputRef={addTransportationCostRef}
              type="number"
              onChange={() => {
                addTransportationCostRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Custo Transporte R$"
            />
            <Input
              inputRef={addOperationalCostRef}
              type="number"
              onChange={() => {
                addOperationalCostRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Custo Operacional R$"
            />
            {/* <Select
              inputRef={addIsActivedRef}
              keyLabel="code"
              keyValue="id"
              label="Situação"
              mandatory
              className="cnx-clients-is-actived-add-cciaa"
              onChange={() => {
                document?.querySelector('.cnx-clients-is-actived-add-cciaa')!.classList?.remove('cnx-input-border-error-highlight');
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
        title="Editar Cliente"
        open={editModal}
        close={closeEditModal}
        clearButton={clearEditModal}
        saveButton={() => editClient()}
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
              inputRef={editNameRef}
              type="text"
              label="Nome"
              mandatory
              onChange={() => {
                editNameRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editCodeRef}
              type="text"
              label="Código"
              mandatory
              onChange={() => {
                editCodeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editLatitudeRef}
              type="text"
              label="Latitude"
              mandatory
              onChange={() => {
                editLatitudeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editLongitudeRef}
              type="text"
              label="Longitude"
              mandatory
              onChange={() => {
                editLongitudeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editQtyTramosRef}
              type="text"
              label="Qtd Tramos"
              mandatory
              onChange={() => {
                editQtyTramosRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Select
              keyLabel="name"
              keyValue="id"
              label="Tipo Operação"
              mandatory
              defaultOption={rowData?.operationType}
              options={
                enumerators?.operationTypes || [
                  { id: 0, name: "Simples" },
                  { id: 1, name: "Duplo" },
                ]
              }
              className="cnx-clients-operation-type-edit-ccote"
              onChange={() => {
                document
                  ?.querySelector(".cnx-clients-operation-type-edit-ccote")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              inputRef={editOperationTypeRef}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Input
              inputRef={editMaxFlowRef}
              type="text"
              label="Vazão Máxima m³/h"
              mandatory
              onChange={() => {
                editMaxFlowRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editQtyParkingSpacesRef}
              type="text"
              label="Qtd Vagas Estacionamento"
              mandatory
              onChange={() => {
                editQtyParkingSpacesRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editGasPriceRef}
              type="text"
              label="Preço Unitário Gás"
              mandatory
              onChange={() => {
                editGasPriceRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editContractNumberRef}
              type="text"
              label="Número Contrato"
              mandatory
              onChange={() => {
                editContractNumberRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editTransportationCostRef}
              type="number"
              onChange={() => {
                editTransportationCostRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Custo Transporte R$"
            />
            <Input
              inputRef={editOperationalCostRef}
              type="number"
              onChange={() => {
                editOperationalCostRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Custo Operacional R$"
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
              className="cnx-clients-is-actived-edit-cciae"
              onChange={() => {
                document?.querySelector('.cnx-clients-is-actived-edit-cciae')!.classList?.remove('cnx-input-border-error-highlight');
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
