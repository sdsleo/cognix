import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";

import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import CnxDialog from "../../../../components/CnxDialog";
import { axiosInstance } from "../../../../http/axiosInstance";
import { _GET, _GET_BY_ID, _GET_ENUMERATOS, _POST, _PUT } from "../../routes";
import { IPagination } from "../../routes/types";
import { MultSelectCheckbox } from "../../../../components/CnxInput";

function FormModalContainer() {
  const { dispacth, addModal, editModal, rowData, saving, enumerators } =
  useContext(UseContext);
  const CNX_ID_ADD = useId();
  const CNX_ID_EDIT = useId();

  const addNumberRef = useRef<HTMLInputElement>(null!);
  const addCodeRef = useRef<HTMLInputElement>(null!);
  const addNameRef = useRef<HTMLInputElement>(null!);
  const addDescriptionRef = useRef<HTMLInputElement>(null!);
  const addResourcesIdRef: any = useRef({});
  const addResourceGroupsIdRef: any = useRef({});
  const addIsActivedRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editNumberRef = useRef<HTMLInputElement>(null!);
  const editCodeRef = useRef<HTMLInputElement>(null!);
  const editNameRef = useRef<HTMLInputElement>(null!);
  const editDescriptionRef = useRef<HTMLInputElement>(null!);
  const editResourcesIdRef: any = useRef({});
  const editResourceGroupsIdRef: any = useRef({});
  const editIsActivedRef: any = useRef({});

  useEffect(() => {
    if (addModal || editModal) {
      getEnumerators();
    }
  }, [addModal, editModal]);

  useEffect(() => {
    if (rowData) {
      editIdRef.current.value = rowData?.id;
      editNumberRef.current.value = rowData?.number;
      editCodeRef.current.value = rowData?.code;
      editNameRef.current.value = rowData?.name;
      editDescriptionRef.current.value = rowData?.description;
    }
    if (rowData?.id) {
      getResourcesById(rowData?.id)
    }
  }, [rowData]);

  function addformCheck() {
    let addCode = false;
    let addNumber = false;
    let addName = false;
    let addDescription = false;
    let addResourcesId = false;
    let addResourceGroupsId = false;
    let addIsActived = false;

    if (addCodeRef.current.value === "") {
      addCodeRef.current!.classList?.add("cnx-input-border-error-highlight");
      addCode = true;
    }
    if (addNumberRef.current.value === "") {
      addNumberRef.current!.classList?.add("cnx-input-border-error-highlight");
      addNumber = true;
    }
    if (addNameRef.current.value === "") {
      addNameRef.current!.classList?.add("cnx-input-border-error-highlight");
      addName = true;
    }
    if (addDescriptionRef.current.value === "") {
      addDescriptionRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addDescription = true;
    }
    if (!addResourcesIdRef.current) {
      document
        ?.querySelector(".cnx-operation-resources-add-cora")!
        .classList?.add("cnx-input-border-error-highlight");
      addResourcesId = true;
    }
    if (!addResourceGroupsIdRef.current) {
      document
        ?.querySelector(".cnx-operation-resources-group-add-corga")!
        .classList?.add("cnx-input-border-error-highlight");
      addResourceGroupsId = true;
    }
    if (!addIsActivedRef.current) {
      document
        ?.querySelector(".cnx-operation-is-actived-add-coiaa")!
        .classList?.add("cnx-input-border-error-highlight");
      addIsActived = true;
    }
    if (
      addCode ||
      addNumber ||
      addName ||
      addDescription ||
      addResourcesId ||
      addResourceGroupsId ||
      addIsActived
    ) {
      return true;
    }
  }

  function editformCheck() {
    let editCode = false;
    let editNumber = false;
    let editName = false;
    let editDescription = false;
    let editResourcesId = false;
    let editResourceGroupsId = false;
    let editIsActived = false;

    if (editCodeRef.current.value === "") {
      editCodeRef.current!.classList?.add("cnx-input-border-error-highlight");
      editCode = true;
    }
    if (editNumberRef.current.value === "") {
      editNumberRef.current!.classList?.add("cnx-input-border-error-highlight");
      editNumber = true;
    }
    if (editNameRef.current.value === "") {
      editNameRef.current!.classList?.add("cnx-input-border-error-highlight");
      editName = true;
    }
    if (editDescriptionRef.current.value === "") {
      editDescriptionRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editDescription = true;
    }
    if (!editResourcesIdRef.current) {
      document
        ?.querySelector(".cnx-operation-resources-edit-core")!
        .classList?.add("cnx-input-border-error-highlight");
      editResourcesId = true;
    }
    if (!editResourceGroupsIdRef.current) {
      document
        ?.querySelector(".cnx-operation-resources-group-edit-corge")!
        .classList?.add("cnx-input-border-error-highlight");
      editResourceGroupsId = true;
    }
    if (!editIsActivedRef.current) {
      document
        ?.querySelector(".cnx-operation-is-actived-edit-coiae")!
        .classList?.add("cnx-input-border-error-highlight");
      editIsActived = true;
    }
    if (
      editCode ||
      editNumber ||
      editName ||
      editDescription ||
      editResourcesId ||
      editResourceGroupsId ||
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

  function handleIdReducer(data: any) {
    const ids = data?.map((item: any) => item.id);
    return ids
  }

  const [userResourcesIds, setResourcesIds]: any = useState([]);

  async function getResourcesById(id: number) {
    try {
      const { data } = await axiosInstance(_GET_BY_ID(id));
      const ids = data?.operationWorkstations.map((item: any) => {
        return item?.resource?.id
      })
      setResourcesIds(ids)
    } catch (err) {
      console.error(err)
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
          number: Number(addNumberRef.current?.value),
          name: addNameRef.current?.value,
          code: addCodeRef.current?.value,
          description: addDescriptionRef.current?.value,
          resourceIds: handleIdReducer(addResourcesIdRef?.current),
          resourceGroupIds: [],
          isActived: Number(addIsActivedRef.current?.id),
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
          id: Number(editIdRef.current?.value),
          number: Number(editNumberRef.current?.value),
          name: editNameRef.current?.value,
          code: editCodeRef.current?.value,
          description: editDescriptionRef.current?.value,
          resourceIds: handleIdReducer(editResourcesIdRef?.current),
          resourceGroupIds: [],
          isActived: Number(editIsActivedRef.current?.id),
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
    addNumberRef.current.value = "";
    addCodeRef.current.value = "";
    addNameRef.current.value = "";
    addDescriptionRef.current.value = "";
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
        title="Adicionar Operação"
        open={addModal}
        close={closeAddModal}
        saving={saving}
        saveButton={() => add()}
        clearButton={clearAddModal}
        formInputs={
          <>
            <Input
              inputRef={addNumberRef}
              type="number"
              label="Número"
              mandatory
              onChange={() => {
                addNumberRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addCodeRef}
              type="text"
              label="Código"
              mandatory
              onChange={() => {
                addCodeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addNameRef}
              type="text"
              label="Nome"
              mandatory
              onChange={() => {
                addNameRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addDescriptionRef}
              type="text"
              label="Descrição"
              doubleWidth
              mandatory
              onChange={() => {
                addDescriptionRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <MultSelectCheckbox
              keyLabel="code"
              keyValue="id"
              label="Recursos"
              // defaultOptions={userGroupIds}
              clear={clearSelect}
              options={enumerators?.resources || []}
              inputRef={addResourcesIdRef}
              placeholder="Selecionar"
            />
            {/* <Select
              inputRef={addResourcesIdRef}
              keyLabel="name"
              keyValue="id"
              label="Recursos"
              mandatory
              className="cnx-operation-resources-add-cora"
              // options={enumerators?.operationTypes || []}
              options={[
                { id: 1, name: "Ativo" },
                { id: 0, name: "Inativo" },
              ]}
              placeholder="Selecionar"
              onChange={() => {
                document
                  ?.querySelector(".cnx-operation-resources-add-cora")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={addResourceGroupsIdRef}
              keyLabel="name"
              keyValue="id"
              label="Grupo de Recursos"
              mandatory
              className="cnx-operation-resources-group-add-corga"
              // options={enumerators?.operationTypes || []}
              options={[
                { id: 1, name: "Ativo" },
                { id: 0, name: "Inativo" },
              ]}
              placeholder="Selecionar"
              onChange={() => {
                document
                  ?.querySelector(".cnx-operation-resources-group-add-corga")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            /> */}
            <Select
              inputRef={addIsActivedRef}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              className="cnx-operation-is-actived-add-coiaa"
              defaultOption={1}
              options={[
                { id: 1, name: "Ativo" },
                { id: 0, name: "Inativo" },
              ]}
              placeholder="Selecionar"
              onChange={() => {
                document
                  ?.querySelector(".cnx-operation-is-actived-add-coiaa")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
          </>
        }
      />
      <CnxFormModal
        title="Editar Operação"
        open={editModal}
        close={closeEditModal}
        saveButton={() => edit()}
        saving={saving}
        clearButton={clearEditModal}
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
              inputRef={editNumberRef}
              type="number"
              label="Número"
              mandatory
              onChange={() => {
                editNumberRef.current!.classList?.remove(
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
              inputRef={editDescriptionRef}
              type="text"
              label="Descrição"
              mandatory
              doubleWidth
              onChange={() => {
                editDescriptionRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <MultSelectCheckbox
              keyLabel="code"
              keyValue="id"
              label="Recursos"
              defaultOptions={userResourcesIds}
              options={enumerators?.resources || []}
              inputRef={editResourcesIdRef}
              placeholder="Selecionar"
            />
            {/* <Select
              inputRef={editResourcesIdRef}
              keyLabel="name"
              keyValue="id"
              label="Recursos"
              mandatory
              className="cnx-operation-resources-edit-core"
              // defaultOption={rowData?.isActived}
              // options={enumerators?.operationTypes || []}
              options={[
                { id: 1, name: "Ativo" },
                { id: 0, name: "Inativo" },
              ]}
              placeholder="Selecionar"
              onChange={() => {
                document
                  ?.querySelector(".cnx-operation-resources-edit-core")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={editResourceGroupsIdRef}
              keyLabel="name"
              keyValue="id"
              label="Grupo de Recursos"
              mandatory
              className="cnx-operation-resources-group-edit-corge"
              // defaultOption={rowData?.isActived}
              // options={enumerators?.operationTypes || []}
              options={[
                { id: 1, name: "Ativo" },
                { id: 0, name: "Inativo" },
              ]}
              placeholder="Selecionar"
              onChange={() => {
                document
                  ?.querySelector(".cnx-operation-resources-group-edit-corge")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            /> */}
            <Select
              inputRef={editIsActivedRef}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              className="cnx-operation-is-actived-edit-coiae"
              defaultOption={rowData?.isActived}
              options={[
                { id: 1, name: "Ativo" },
                { id: 0, name: "Inativo" },
              ]}
              placeholder="Selecionar"
              onChange={() => {
                document
                  ?.querySelector(".cnx-operation-is-actived-edit-coiae")!
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
