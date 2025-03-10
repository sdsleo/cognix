import { useState, useRef, useEffect, useContext, useId } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import CnxDialog from "../../../../components/CnxDialog";
import { _GET, _GET_ENUMERATOS, _POST, _PUT } from "../../routes";
import { axiosInstance } from "../../../../http/axiosInstance";
import { IPagination } from "../../routes/types";

function FormModalContainer() {
  const CNX_ID_ADD = useId();
  const CNX_ID_EDIT = useId();

  const { localesData } = useContext<ILocales>(localesContex);

  const { dispacth, addModal, editModal, rowData, saving, enumerators } =
    useContext(UseContext);

  const addNameRef = useRef<HTMLInputElement>(null!);
  const addCodeRef = useRef<HTMLInputElement>(null!);
  const addDescriptionRef = useRef<HTMLInputElement>(null!);
  const addBasesRef: any = useRef({});
  const addClientsRef: any = useRef({});
  const addStatusRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editNameRef = useRef<HTMLInputElement>(null!);
  const editCodeRef = useRef<HTMLInputElement>(null!);
  const editDescriptionRef = useRef<HTMLInputElement>(null!);
  const editBasesRef: any = useRef({});
  const editClientsRef: any = useRef({});
  const editStatusRef: any = useRef({});

  useEffect(() => {
    getEnumerators();
    editIdRef.current.value = rowData?.id;
    editNameRef.current.value = rowData?.name;
    editCodeRef.current.value = rowData?.code;
    editDescriptionRef.current.value = rowData?.description;
    setClearSelect(!clearSelect);
  }, [rowData]);

  async function getEnumerators() {
    try {
      const { data } = await axiosInstance(_GET_ENUMERATOS());
      dispacth({
        type: ACTIONS.SET_ENUMERATORS,
        payload: data,
      });
    } catch (err) {
      console.error(err);
    } finally {
    }
  }

  const [baseClientMessage, setBaseClientMessage] = useState(false);
  const [noBaseClientMessage, setNoBaseClientMessage] = useState(false);

  function addformCheck() {
    let addName = false;
    let addCode = false;
    let addDescription = false;
    let addBaseClient = false;
    let addNoBaseClient = false;
    // let addStatus = false;

    if (addNameRef.current.value === "") {
      addNameRef.current!.classList?.add("cnx-input-border-error-highlight");
      addName = true;
    }
    if (addCodeRef.current.value === "") {
      addCodeRef.current!.classList?.add("cnx-input-border-error-highlight");
      addCode = true;
    }
    if (addDescriptionRef.current.value === "") {
      addDescriptionRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addDescription = true;
    }
    // if (!addStatusRef.current) {
    //   document
    //     ?.querySelector(".cnx-resources-status-add-cras")!
    //     .classList?.add("cnx-input-border-error-highlight");
    //     addStatus = true;
    // }
    if (!addBasesRef.current && !addClientsRef.current) {
      setNoBaseClientMessage(true);
      addNoBaseClient = true;
    }
    if (addBasesRef.current && addClientsRef.current) {
      setBaseClientMessage(true);
      addBaseClient = true;
    }

    if (
      addName ||
      addCode ||
      addDescription ||
      addBaseClient ||
      addNoBaseClient
    ) {
      return true;
    }
  }

  function editformCheck() {
    let editName = false;
    let editCode = false;
    let editDescription = false;
    let editStatus = false;
    let editBaseClient = false;
    let editNoBaseClient = false;

    if (editNameRef.current.value === "") {
      editNameRef.current!.classList?.add("cnx-input-border-error-highlight");
      editName = true;
    }
    if (editCodeRef.current.value === "") {
      editCodeRef.current!.classList?.add("cnx-input-border-error-highlight");
      editCode = true;
    }
    if (editDescriptionRef.current.value === "") {
      editDescriptionRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editDescription = true;
    }
    if (!editStatusRef.current) {
      document
        ?.querySelector(".cnx-resources-status-add-cras")!
        .classList?.add("cnx-input-border-error-highlight");
      editStatus = true;
    }
    if (!editBasesRef.current && !editClientsRef.current) {
      setNoBaseClientMessage(true);
      editNoBaseClient = true;
    }
    if (editBasesRef.current && editClientsRef.current) {
      setBaseClientMessage(true);
      editBaseClient = true;
    }

    if (
      editName ||
      editCode ||
      editDescription ||
      editStatus ||
      editBaseClient ||
      editNoBaseClient
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
    } catch (err) {
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  const [messageError, setMessageError]: any = useState("");
  const dialogModalError = useId();
  const openError = () => {
    const modal: any = document.getElementById(dialogModalError);
    modal?.showModal();
  };

  const add = async () => {
    if (addformCheck()) return;
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });
    try {
      await axiosInstance(
        _POST({
          name: addNameRef?.current?.value,
          code: addCodeRef?.current?.value,
          description: addDescriptionRef?.current?.value,
          baseId: addBasesRef?.current?.id,
          clientId: addClientsRef?.current?.id,
        })
      );
      getList({ PageSize: 100 });
      clearAddModal();
      setNoBaseClientMessage(false);
      setBaseClientMessage(false);
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
  };

  const edit = async () => {
    if (editformCheck()) return;
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });
    try {
      await axiosInstance(
        _PUT({
          id: editIdRef?.current?.value,
          name: editNameRef?.current?.value,
          code: editCodeRef?.current?.value,
          description: editDescriptionRef?.current?.value,
          rowStatus: editStatusRef?.current?.id,
          baseId: editBasesRef?.current?.id,
          clientId: editClientsRef?.current?.id,
        })
      );
      getList({ PageSize: 100 });
      setNoBaseClientMessage(false);
      setBaseClientMessage(false);
    } catch (err) {
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });
    }
  };

  const closeAddModal = () => {
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
    setNoBaseClientMessage(false);
    setBaseClientMessage(false);
  };

  const closeEditModal = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
    
    setNoBaseClientMessage(false);
    setBaseClientMessage(false);
    
  };

  const [clearSelect, setClearSelect] = useState(false);

  const clearAddModal = () => {
    addNameRef.current.value = "";
    addCodeRef.current.value = "";
    addDescriptionRef.current.value = "";
    addStatusRef.current = [];
    setClearSelect(!clearSelect);
  };

  const clearEditModal = () => {
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {
        name: null,
        code: null,
        descriprion: null,
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
        useId={dialogModalError}
        type="error"
        content={{
          title: "Erro!",
          message: messageError,
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
        title="Adicionar Registro"
        open={addModal}
        close={closeAddModal}
        saveButton={() => add()}
        clearButton={clearAddModal}
        formInputs={
          <>
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
            <Select
              inputRef={addBasesRef}
              keyLabel="name"
              keyValue="id"
              label="Bases"
              onChange={() => {
                setNoBaseClientMessage(false);
                setBaseClientMessage(false);
              }}
              // mandatory
              // defaultOption={rowData?.baseId}
              options={enumerators?.bases || []}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              inputRef={addClientsRef}
              keyLabel="name"
              keyValue="id"
              label="Clientes"
              onChange={() => {
                setNoBaseClientMessage(false);
                setBaseClientMessage(false);
              }}
              // mandatory
              // defaultOption={rowData?.clientId}
              options={enumerators?.clients || []}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            {noBaseClientMessage ? (
              <span style={{ color: "#fe5e76" }}>
                É necessário informar uma base, ou um cliente!
              </span>
            ) : null}
            {baseClientMessage ? (
              <span style={{ color: "#fe5e76" }}>
                É necessário informar uma base, ou um cliente!
              </span>
            ) : null}
          </>
        }
        // formParameters={React.ReactElement<string | React.JSXElementConstructor<any>>}
        // customTab={
        //   title: string;
        //   content: React.ReactElement<string | React.JSXElementConstructor<any>>;
        // }
      />
      <CnxFormModal
        saving={saving}
        title="Editar Registro"
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
              mandatory
              disabled
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
            <Select
              inputRef={editBasesRef}
              keyLabel="name"
              keyValue="id"
              label="Bases"
              // mandatory
              defaultOption={rowData?.baseId}
              options={enumerators?.bases || []}
              clear={clearSelect}
              placeholder="Selecionar"
              onChange={() => {
                setNoBaseClientMessage(false);
                setBaseClientMessage(false);
              }}
            />
            <Input
              inputRef={editDescriptionRef}
              type="text"
              label="Descrição"
              doubleWidth
              mandatory
              onChange={() => {
                editDescriptionRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Select
              inputRef={editClientsRef}
              keyLabel="name"
              keyValue="id"
              label="Clientes"
              // mandatory
              defaultOption={rowData?.clientId}
              options={enumerators?.clients || []}
              clear={clearSelect}
              placeholder="Selecionar"
              onChange={() => {
                setNoBaseClientMessage(false);
                setBaseClientMessage(false);
              }}
            />
            <Select
              inputRef={editStatusRef}
              keyLabel="label"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={rowData?.rowStatus}
              options={[
                { id: 1, label: "Ativo" },
                { id: 2, label: "Inativo" },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            {noBaseClientMessage ? (
              <span style={{ color: "#fe5e76" }}>
                Não se pode salvar o registro sem Base ou Cliente, por favor
                selecione apenas um deles
              </span>
            ) : null}
            {baseClientMessage ? (
              <span style={{ color: "#fe5e76" }}>
                Não se pode conter Base e Cliente no mesmo registro, por favor
                selecione apenas um deles
              </span>
            ) : null}
          </>
        }
        // formParameters={React.ReactElement<string | React.JSXElementConstructor<any>>}
        // customTab={
        //   title: string;
        //   content: React.ReactElement<string | React.JSXElementConstructor<any>>;
        // }
      />
    </>
  );
}

export default FormModalContainer;
