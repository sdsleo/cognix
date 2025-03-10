import { useState, useRef, useEffect, useContext, useId } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";

import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import { _GET, _POST, _PUT } from "../../routes";
import useFetch from "../../../../hooks/useFetch";
import CnxDialog from "../../../../components/CnxDialog";
import { AuthLevel } from "../AuthLevel";
import "./styles.css"

function FormModalContainer() {
  const CNX_ID_ADD = useId();
  const CNX_ID_EDIT = useId();
  const { request } = useFetch();
  const { localesData } = useContext<ILocales>(localesContex);
  const { dispacth, addModal, editModal, rowData, saving } =
    useContext(UseContext);

  const addCodeRef = useRef<HTMLInputElement>(null!);
  const addDescriptionRef = useRef<HTMLInputElement>(null!);
  const addStatusRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editCodeRef = useRef<HTMLInputElement>(null!);
  const editDescriptionRef = useRef<HTMLInputElement>(null!);
  const editStatusRef: any = useRef({});
  const [openLevel, setOpenLevel] = useState(false);

  useEffect(() => {
    editIdRef.current.value = rowData?.id;
    editCodeRef.current.value = rowData?.code;
    editDescriptionRef.current.value = rowData?.description;
  }, [rowData]);

  const getTableData = async () => {
    const { url, options } = _GET();

    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });

    const { response, json } = await request(url, options);

    if (response?.ok) {
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: json,
      });
    } else {
      console.log("ERROR", response);
    }

    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: false,
    });
  };

  function addformCheck() {
    let addAreaCodigo = false;
    let addAreaNome = false;
    let addImpressoraIP = false;
    let addImpressoraNome = false;
    let addSituacao = false;

    if (addCodeRef.current.value === '') {
      addCodeRef.current!.classList?.add('cnx-input-border-error-highlight');
      addAreaCodigo = true;
    }
    if (addDescriptionRef.current.value === '') {
      addDescriptionRef.current!.classList?.add('cnx-input-border-error-highlight');
      addAreaNome = true;
    }
    if (!addStatusRef.current) {
      document?.querySelector('.cnx-areas-select-add-situacao-casas')!.classList?.add('cnx-input-border-error-highlight');
      addSituacao = true;
    }
    if (addAreaCodigo && addAreaNome && addImpressoraIP && addImpressoraNome && addSituacao) {
      return true;
    }
  }

  function editformCheck() {
    let editAreaCodigo = false;
    let editAreaNome = false;
    let editImpressoraIP = false;
    let editImpressoraNome = false;
    let editSituacao = false;

    if (editCodeRef.current.value === '') {
      editCodeRef.current!.classList?.add('cnx-input-border-error-highlight');
      editAreaCodigo = true;
    }
    if (editDescriptionRef.current.value === '') {
      editDescriptionRef.current!.classList?.add('cnx-input-border-error-highlight');
      editAreaNome = true;
    }
    if (!editStatusRef.current) {
      document?.querySelector('.cnx-areas-select-edit-situacao-cases')!.classList?.add('cnx-input-border-error-highlight');
      editSituacao = true;
    }
    if (editAreaCodigo && editAreaNome && editImpressoraIP && editImpressoraNome && editSituacao) {
      return true;
    }
  }

  const add = async () => {
    if (addformCheck()) return;
    const { url, options } = _POST({
      code: addCodeRef.current.value,
      description: addDescriptionRef.current.value,
      status: addStatusRef.current.id,
    });

    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });

    const { response, json } = await request(url, options);
    if (response?.ok) {
      getTableData();
      clearAddModal();
    } else {
      console.log("ERROR", response);
      const modal: any = document.getElementById(CNX_ID_ADD);
      modal?.showModal();
    }

    dispacth({
      type: ACTIONS.SAVING,
      payload: false,
    });
  };

  const edit = async () => {
    if (editformCheck()) return;
    const { url, options } = _PUT({
      id: Number(editIdRef.current.value),
      code: editCodeRef.current.value,
      description: editDescriptionRef.current.value,
      status: editStatusRef.current.id,
    });

    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });

    const { response, json } = await request(url, options);
    if (response?.ok) {
      getTableData();
    } else {
      console.log("ERROR", response);
      const modal: any = document.getElementById(CNX_ID_EDIT);
      modal?.showModal();
    }

    dispacth({
      type: ACTIONS.SAVING,
      payload: false,
    });
  };

  const openLevelModal = () => {
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
    setOpenLevel(true)
  };

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

  const [clearSelect, setClearSelect] = useState(false)

  const clearAddModal = () => {
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
        id: rowData?.id,
        areaCodigo: null,
        areaNome: null,
        impressoraIP: null,
        impressoraNome: null,
        situacao: null
      },
    });
  };

  return (
    <>
      <CnxDialog
        useId={CNX_ID_ADD}
        type="error"
        content={{ title: "Error", message: "Não foi possível adicionar o registro" }}
      />
      <CnxDialog
        useId={CNX_ID_EDIT}
        type="error"
        content={{ title: "Error", message: "Não foi possível editar o registro" }}
      />
      <CnxFormModal
        saving={saving}
        title="Adicionar Níveis"
        open={openLevel}
        close={() => setOpenLevel(false)}
        saveButton={() => null}
        clearButton={clearAddModal}
        noDefaultForm
        startOpened
        noTabs
        contractDisable
        customTab={
          {title: "Níveis", content: <AuthLevel />}
        }
      />
      <CnxFormModal
        saving={saving}
        title={`${localesData.cnxCommonWords.add} Fluxo Autorização`}
        open={addModal}
        close={closeAddModal}
        saveButton={() => add()}
        clearButton={clearAddModal}
        formInputs={
          <>
            <Input
              inputRef={addCodeRef}
              type="text"
              onChange={() => {
                addCodeRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
              label='Código'
              mandatory
            />
            <Input
              doubleWidth
              inputRef={addDescriptionRef}
              type="text"
              onChange={() => {
                addDescriptionRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
              label='Descrição'
              mandatory
            />
            <Select
              inputRef={addStatusRef}
              keyLabel="code"
              keyValue="id"
              label='Situação'
              mandatory
              className="cnx-areas-select-add-situacao-casas"
              onChange={() => {
                document?.querySelector('.cnx-areas-select-add-situacao-casas')!.classList?.remove('cnx-input-border-error-highlight');
              }}
              defaultOption={1}
              options={[
                { id: 1, code: "Ativo" },
                { id: 2, code: "Inativo" },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
          </>
        }
        formParameters={   
          <button className="cnx-auth-level-action-button-calab" type="button" onClick={() => openLevelModal()}>Abrir Níveis</button>
        }
      />
      <CnxFormModal
        saving={saving}
        title={`${localesData.cnxCommonWords.edit} Fluxo Autorização`}
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
            />
            <Input
              doubleWidth
              inputRef={editDescriptionRef}
              type="text"
              label='Descrição'
              mandatory
              onChange={() => {
                editDescriptionRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
            />
            <Input
              inputRef={editCodeRef}
              type="text"
              label='Código'
              mandatory
              onChange={() => {
                editCodeRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
            />
            <Select
              keyLabel="code"
              keyValue="id"
              label='Situação'
              mandatory
              defaultOption={rowData?.status}
              options={[
                { id: 1, code: "Ativo" },
                { id: 2, code: "Inativo" },
              ]}
              className="cnx-areas-select-edit-situacao-cases"
              onChange={() => {
                document?.querySelector('.cnx-areas-select-edit-situacao-cases')!.classList?.remove('cnx-input-border-error-highlight');
              }}
              inputRef={editStatusRef}
              clear={clearSelect}
              placeholder="Selecionar"
            />
          </>
        }
        formParameters={
          <>
          <button className="cnx-auth-level-action-button-calab" type="button" onClick={() => openLevelModal()}>Abrir Níveis</button>
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
