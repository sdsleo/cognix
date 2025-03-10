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
import useFormatDate from "../../../../hooks/useFormatDate";
import CnxDialog from "../../../../components/CnxDialog";
import StatusLogs from "../../../../components/CnxInput/InputTypes/StatusLogs";
import useFormatOnlyDate from "../../../../hooks/useFormatOnlyDate";
import { axiosInstance } from "../../../../http/axiosInstance";
import { IPagination } from "../../routes/types";

function FormModalContainer() {
  const CNX_ID_ADD = useId();
  const CNX_ID_EDIT = useId();
  const { request } = useFetch();
  const { localesData } = useContext<ILocales>(localesContex);
  const { dispacth, addModal, editModal, rowData, saving, enumerators } =
  useContext(UseContext);


  const addNomeRef = useRef<HTMLInputElement>(null!);
  const addDescricaoRef = useRef<HTMLInputElement>(null!);
  const addDateRef = useRef<HTMLInputElement>(null!);
  const addDueDateRef = useRef<HTMLInputElement>(null!);
  const addValueRef = useRef<HTMLInputElement>(null!);
  const addSituacaoRef: any = useRef({});
  const addBaseRef: any = useRef({});
  const addDocumentIdRef: any = useRef({});
  const addResourceIdRef = useRef<HTMLInputElement>(null!);

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editNomeRef = useRef<HTMLInputElement>(null!);
  const editDescricaoRef = useRef<HTMLInputElement>(null!);
  const editDateRef = useRef<HTMLInputElement>(null!);
  const editDueDateRef = useRef<HTMLInputElement>(null!);
  const editValueRef = useRef<HTMLInputElement>(null!);
  const editSituacaoRef: any = useRef({});
  const editBaseRef: any = useRef({});
  const editDocumentIdRef: any = useRef({});
  const editResourceIdRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    editIdRef.current.value = rowData?.id;
    editNomeRef.current.value = rowData?.name;
    editDescricaoRef.current.value = rowData?.description;
    // editDateRef.current.value = useFormatOnlyDate(rowData?.date);
    // editDueDateRef.current.value = useFormatOnlyDate(rowData?.dueDate);
    editValueRef.current.value = rowData?.value;
    // editBaseRef.current.value = rowData?.baseId;
  }, [rowData]);

  useEffect(() => {
    getEnumerators();
  }, [])

  async function getEnumerators() {
    try {
      const { data } = await axiosInstance(_GET_ENUMERATOS());
      dispacth({
        type: ACTIONS.SET_ENUMERATORS,
        payload: data,
      });
    } catch (err: any) {
      console.error(err);
    } finally {
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

  function addformCheck() {
    let addAreaCodigo = false;
    let addAreaNome = false;
    let addImpressoraIP = false;
    let addImpressoraNome = false;
    let addSituacao = false;

    if (addDescricaoRef.current.value === '') {
      addDescricaoRef.current!.classList?.add('cnx-input-border-error-highlight');
      addAreaCodigo = true;
    }
    if (addNomeRef.current.value === '') {
      addNomeRef.current!.classList?.add('cnx-input-border-error-highlight');
      addAreaNome = true;
    }
    if (addDateRef.current.value === '') {
      addDateRef.current!.classList?.add('cnx-input-border-error-highlight');
      addImpressoraIP = true;
    }
    if (addDueDateRef.current.value === '') {
      addDueDateRef.current!.classList?.add('cnx-input-border-error-highlight');
      addImpressoraNome = true;
    }
    if (!addSituacaoRef.current) {
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

    if (editDescricaoRef.current.value === '') {
      editDescricaoRef.current!.classList?.add('cnx-input-border-error-highlight');
      editAreaCodigo = true;
    }
    if (editNomeRef.current.value === '') {
      editNomeRef.current!.classList?.add('cnx-input-border-error-highlight');
      editAreaNome = true;
    }
    if (editDateRef.current.value === '') {
      editDateRef.current!.classList?.add('cnx-input-border-error-highlight');
      editImpressoraIP = true;
    }
    if (editDueDateRef.current.value === '') {
      editDueDateRef.current!.classList?.add('cnx-input-border-error-highlight');
      editImpressoraNome = true;
    }
    if (!editSituacaoRef.current) {
      document?.querySelector('.cnx-areas-select-edit-situacao-cases')!.classList?.add('cnx-input-border-error-highlight');
      editSituacao = true;
    }
    if (editAreaCodigo && editAreaNome && editImpressoraIP && editImpressoraNome && editSituacao) {
      return true;
    }
  }

  const add = async () => {
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });
    try {
      await axiosInstance(
        _POST({
          name: addNomeRef.current.value,
          description: addDescricaoRef.current.value,
          date: addDateRef.current.value,
          dueDate: addDueDateRef.current.value,
          value: Number(addValueRef.current.value),
          baseId: addBaseRef.current.id,
          isActived: addSituacaoRef.current.id
        })
      );
      getList({ PageSize: 100 });
      clearAddModal();
    } catch (err: any) {
      console.error(err);
      // setMessageError(
      //   err?.response?.data?.message || "Error ao adicionar Ordem"
      // );
      // openError();
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });
    }
  };

  const edit = async () => {
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });
    try {
      await axiosInstance(
        _PUT({
          id: editIdRef.current.value,
          name: editNomeRef.current.value,
          description: editDescricaoRef.current.value,
          date: editDateRef.current.value,
          dueDate: editDueDateRef.current.value,
          value: Number(editValueRef.current.value),
          baseId: editBaseRef.current.id,
          isActived: editSituacaoRef.current.id
        })
      );
      getList({ PageSize: 100 });
      // clearAddModal();
    } catch (err: any) {
      console.error(err);
      // setMessageError(
      //   err?.response?.data?.message || "Error ao adicionar Ordem"
      // );
      // openError();
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
  };

  const closeEditModal = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
  };

  const [clearSelect, setClearSelect] = useState(false)

  const clearAddModal = () => {
    addDescricaoRef.current.value = "";
    addNomeRef.current.value = "";
    addDateRef.current.value = "";
    addDueDateRef.current.value = "";
    addSituacaoRef.current = [];
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
        title="Adicionar Evento"
        open={addModal}
        close={closeAddModal}
        saveButton={() => add()}
        clearButton={clearAddModal}
        formInputs={
          <>
            <Input
              inputRef={addNomeRef}
              type="text"
              onChange={() => {
                addNomeRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
              label="Nome"
              mandatory
            />
            <Input
              inputRef={addDescricaoRef}
              type="text"
              doubleWidth
              onChange={() => {
                addDescricaoRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
              label="Descrição"
              mandatory
            />
            <Input
              inputRef={addDateRef}
              type="datetime-local"
              onChange={() => {
                addDateRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
              label="Data da inclusão"
              mandatory
            />
            <Input
              inputRef={addDueDateRef}
              type="datetime-local"
              onChange={() => {
                addDueDateRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
              label="Data de validade"
              mandatory
            />
            <Input
              inputRef={addValueRef}
              type="number"
              onChange={() => {
                addValueRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
              label="Valor"
              mandatory
            />
            <Select
              inputRef={addBaseRef}
              keyLabel="name"
              keyValue="id"
              label="Base"
              mandatory
              className="cnx-areas-select-add-situacao-casas"
              onChange={() => {
                document?.querySelector('.cnx-areas-select-add-situacao-casas')!.classList?.remove('cnx-input-border-error-highlight');
              }}
              defaultOption={1}
              options={enumerators?.bases || []}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              inputRef={addSituacaoRef}
              keyLabel="code"
              keyValue="id"
              label="Situação"
              mandatory
              className="cnx-areas-select-add-situacao-casas"
              onChange={() => {
                document?.querySelector('.cnx-areas-select-add-situacao-casas')!.classList?.remove('cnx-input-border-error-highlight');
              }}
              defaultOption={1}
              options={[
                { id: 1, code: "Ativo" },
                { id: 2, code: "Inativo" }
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
          </>
        }
      />
      <CnxFormModal
        saving={saving}
        title="Editar Evento"
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
            <Input
              inputRef={editDescricaoRef}
              type="text"
              label="Descrição"
              doubleWidth
              mandatory
              onChange={() => {
                editDescricaoRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
            />
            <Input
              inputRef={editNomeRef}
              type="text"
              label="Nome"
              mandatory
              onChange={() => {
                editNomeRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
            />
            <Input
              inputRef={editDateRef}
              type="datetime-local"
              label="Data da inclusão"
              defaultValue={rowData?.date?.slice(0, 16)}
              mandatory
              onChange={() => {
                editDateRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
            />
            <Input
              inputRef={editDueDateRef}
              type="datetime-local"
              label="Data de validade"
              defaultValue={rowData?.dueDate?.slice(0, 16)}
              mandatory
              onChange={() => {
                editDueDateRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
            />
            <Input
              inputRef={editValueRef}
              type="number"
              label="Valor"
              mandatory
              onChange={() => {
                editValueRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
            />
            <Select
              keyLabel="name"
              keyValue="id"
              label="Base"
              mandatory
              defaultOption={rowData?.baseId || []}
              options={enumerators.bases || []}
              className="cnx-areas-select-edit-situacao-cases"
              onChange={() => {
                document?.querySelector('.cnx-areas-select-edit-situacao-cases')!.classList?.remove('cnx-input-border-error-highlight');
              }}
              inputRef={editBaseRef}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              keyLabel="code"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={rowData?.isActived}
              options={[
                { id: 1, code: "Ativo" },
                { id: 2, code: "Inativo" }
              ]}
              className="cnx-areas-select-edit-situacao-cases"
              onChange={() => {
                document?.querySelector('.cnx-areas-select-edit-situacao-cases')!.classList?.remove('cnx-input-border-error-highlight');
              }}
              inputRef={editSituacaoRef}
              clear={clearSelect}
              placeholder="Selecionar"
            />
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
