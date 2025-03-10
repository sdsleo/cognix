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
  const addDataInicioRef = useRef<HTMLInputElement>(null!);
  const addDataFimRef = useRef<HTMLInputElement>(null!);
  const addClienIdRef: any = useRef({});
  const addBaseIdRef: any = useRef({});
  const addValueFactorCapacityRef = useRef<HTMLInputElement>(null!);
  const addIsActivedRef: any = useRef({});
  const addRowStatusRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editNomeRef = useRef<HTMLInputElement>(null!);
  const editDescricaoRef = useRef<HTMLInputElement>(null!);

  const editDataInicioRef = useRef<HTMLInputElement>(null!);
  const editDataFimRef = useRef<HTMLInputElement>(null!);

  const editClienIdRef: any = useRef({});
  const editBaseIdRef: any = useRef({});
  const editValueFactorCapacityRef = useRef<HTMLInputElement>(null!);
  const editIsActivedRef: any = useRef({});
  const editRowStatusRef: any = useRef({});

  useEffect(() => {
    getEnumerators();

    editIdRef.current.value = rowData?.id;
    editNomeRef.current.value = rowData?.name;
    editDescricaoRef.current.value = rowData?.description;
    // editStartDateTimeRef.current.value = useFormatDate(rowData?.startDateTime);
    // editFinishDateTimeRef.current.value = useFormatDate(rowData?.finishDateTime);
    editValueFactorCapacityRef.current.value = rowData?.valueFactorCapacity;
    setClearSelect(!clearSelect);
  }, [rowData]);

  useEffect(() => {
    getEnumerators();
  }, []);

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

  const [baseClientMessage, setBaseClientMessage] = useState(false);
  const [noBaseClientMessage, setNoBaseClientMessage] = useState(false);

  function addformCheck() {
    let addName = false;
    let addDescricao = false;
    let addDataInicio = false;
    let addDataFim = false;
    let addValueFactorCapacity = false;
    let addBaseClient = false;
    let addNoBaseClient = false;
    let addRowStatus = false;

    if (addNomeRef.current.value === "") {
      addNomeRef.current!.classList?.add("cnx-input-border-error-highlight");
      addName = true;
    }
    if (addDescricaoRef.current.value === "") {
      addDescricaoRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addDescricao = true;
    }
    if (addDataInicioRef.current.value === "") {
      addDataInicioRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addDataInicio = true;
    }
    if (addDataFimRef.current.value === "") {
      addDataFimRef.current!.classList?.add("cnx-input-border-error-highlight");
      addDataFim = true;
    }
    if (addValueFactorCapacityRef.current.value === "") {
      addValueFactorCapacityRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addValueFactorCapacity = true;
    }
    if (!addBaseIdRef.current && !addClienIdRef.current) {
      setNoBaseClientMessage(true);
      addNoBaseClient = true;
    }
    if (addBaseIdRef.current && addClienIdRef.current) {
      setBaseClientMessage(true);
      addBaseClient = true;
    }
    if (!addRowStatusRef.current) {
      document
        ?.querySelector(".cnx-add-calendar-operation")!
        .classList?.add("cnx-input-border-error-highlight");
      addRowStatus = true;
    }

    if (
      addName ||
      addDescricao ||
      addDataInicio ||
      addDataFim ||
      addValueFactorCapacity ||
      addNoBaseClient ||
      addBaseClient ||
      addRowStatus
    ) {
      return true;
    }
  }

  function editformCheck() {
    let editName = false;
    let editDescricao = false;
    let editDataInicio = false;
    let editDataFim = false;
    let editValueFactorCapacity = false;
    let editBaseClient = false;
    let editNoBaseClient = false;
    let editRowStatus = false;

    if (editNomeRef.current.value === "") {
      editNomeRef.current!.classList?.add("cnx-input-border-error-highlight");
      editName = true;
    }
    if (editDescricaoRef.current.value === "") {
      editDescricaoRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editDescricao = true;
    }
    if (editDataInicioRef.current.value === "") {
      editDataInicioRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editDataInicio = true;
    }
    if (editDataFimRef.current.value === "") {
      editDataFimRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editDataFim = true;
    }
    if (editValueFactorCapacityRef.current.value === "") {
      editValueFactorCapacityRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editValueFactorCapacity = true;
    }
    if (!editBaseIdRef.current && !editClienIdRef.current) {
      setNoBaseClientMessage(true);
      editNoBaseClient = true;
    }
    if (editBaseIdRef.current && editClienIdRef.current) {
      setBaseClientMessage(true);
      editBaseClient = true;
    }
    if (!editRowStatusRef.current) {
      document
        ?.querySelector(".cnx-edit-calendar-operation")!
        .classList?.add("cnx-input-border-error-highlight");
      editRowStatus = true;
    }

    if (
      editName ||
      editDescricao ||
      editDataInicio ||
      editDataFim ||
      editValueFactorCapacity ||
      editNoBaseClient ||
      editBaseClient ||
      editRowStatus
    ) {
      return true;
    }
  }
  const [errorSpan, setErrorSpan] = useState(false);
  const add = async () => {

    if (addformCheck()) return;
    if (
      Date.parse(addDataInicioRef.current?.value) <
      Date.parse(addDataFimRef.current?.value)
    ) {
      //start is less than End
    } else {
      //end is less than start
      setErrorSpan(true);
      return;
    }

    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });

    try {
      await axiosInstance(
        _POST({
          name: addNomeRef.current?.value,
          description: addDescricaoRef.current?.value,
          startDateTime: addDataInicioRef.current?.value || null,
          finishDateTime: addDataFimRef.current?.value || null,
          valueFactorCapacity: Number(
            addValueFactorCapacityRef?.current?.value
          ),
          baseId: Number(addBaseIdRef?.current?.id) || null,
          clientId: Number(addClienIdRef?.current?.id) || null,
          isActived: Number(addIsActivedRef?.current?.id) || null,
          rowStatus: Number(addRowStatusRef?.current?.id) || null,
        })
      );
      getList({ PageSize: 100 });
      clearAddModal();
      setBaseClientMessage(false);
      setNoBaseClientMessage(false);
      setErrorSpan(false);
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
    if (editformCheck()) return;
    if (
      Date.parse(addDataInicioRef.current?.value) <
      Date.parse(addDataFimRef.current?.value)
    ) {
      //start is less than End
    } else {
      //end is less than start
      setErrorSpan(true);
      return;
    }

    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });


    try {
      await axiosInstance(
        _PUT({
          id: editIdRef.current?.value,
          name: editNomeRef.current?.value,
          description: editDescricaoRef.current?.value,
          startDateTime: editDataInicioRef.current?.value || null,
          finishDateTime: editDataFimRef.current?.value || null,
          valueFactorCapacity: Number(
            editValueFactorCapacityRef.current?.value
          ),
          baseId: Number(editBaseIdRef.current?.id) || null,
          clientId: Number(editClienIdRef.current?.id) || null,
          isActived: Number(editIsActivedRef.current?.id) || null,
          rowStatus: Number(editRowStatusRef?.current?.id) || null,
        })
      );
      getList({ PageSize: 100 });
      // clearAddModal();
      setBaseClientMessage(false);
      setNoBaseClientMessage(false);
      setErrorSpan(false);
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
    setClearSelect(!clearSelect);
    setBaseClientMessage(false);
    setNoBaseClientMessage(false);
    setErrorSpan(false);
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
  };

  const closeEditModal = () => {
    setClearSelect(!clearSelect);
    setBaseClientMessage(false);
    setNoBaseClientMessage(false);
    setErrorSpan(false);
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
  };

  const [clearSelect, setClearSelect] = useState(false);

  const clearAddModal = () => {
    addDescricaoRef.current.value = "";
    addNomeRef.current.value = "";
    addDataInicioRef.current.value = "";
    addDataFimRef.current.value = "";
    addValueFactorCapacityRef.current.value = "";
    addBaseIdRef.current = [];
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
                addNomeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Nome"
              mandatory
            />
            <Input
              inputRef={addDescricaoRef}
              type="text"
              doubleWidth
              onChange={() => {
                addDescricaoRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Descrição"
              mandatory
            />
            <Input
              inputRef={addDataInicioRef}
              type="datetime-local"
              onChange={() => {
                addDataInicioRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Data Início"
              mandatory
            />
            <Input
              inputRef={addDataFimRef}
              type="datetime-local"
              onChange={() => {
                addDataFimRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Data Fim"
              mandatory
            />
            <Input
              inputRef={addValueFactorCapacityRef}
              type="number"
              onChange={() => {
                addValueFactorCapacityRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Valor Capacidade"
              mandatory
            />
            <Select
              inputRef={addClienIdRef}
              keyLabel="name"
              keyValue="id"
              label="Cliente"
              mandatory
              className="cnx-areas-select-add-situacao-casas"
              onChange={() => {
                document
                  ?.querySelector(".cnx-areas-select-add-situacao-casas")!
                  .classList?.remove("cnx-input-border-error-highlight");
                setBaseClientMessage(false);
                setNoBaseClientMessage(false);
              }}
              options={enumerators?.clients || []}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              inputRef={addBaseIdRef}
              keyLabel="name"
              keyValue="id"
              label="Base"
              mandatory
              className="cnx-areas-select-add-situacao-casas"
              onChange={() => {
                document
                  ?.querySelector(".cnx-areas-select-add-situacao-casas")!
                  .classList?.remove("cnx-input-border-error-highlight");
                setBaseClientMessage(false);
                setNoBaseClientMessage(false);
              }}
              options={enumerators?.bases || []}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              inputRef={addRowStatusRef}
              keyLabel="code"
              keyValue="id"
              label="Sitiação"
              mandatory
              className="cnx-add-calendar-operation"
              onChange={() => {
                document
                  ?.querySelector(".cnx-add-calendar-operation")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              disabled
              defaultOption={1}
              options={[
                {
                  id: 1,
                  code: "Ativo",
                },
                {
                  id: 2,
                  code: "Inativo",
                },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            {noBaseClientMessage ? (
              <span style={{ color: "#fe5e76", marginTop: "20px" }}>
                É necessário informar uma base, ou um cliente!
              </span>
            ) : null}
            {baseClientMessage ? (
              <span style={{ color: "#fe5e76", marginTop: "20px" }}>
                É necessário informar uma base, ou um cliente!
              </span>
            ) : null}
            {errorSpan ? (
        <span className="cnx-auth-level-span-alert-error-calsar">
          O campo Data Hora Início deve ser menor que o Data Hora fim!
        </span>
      ) : null}
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
                editDescricaoRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editNomeRef}
              type="text"
              label="Nome"
              mandatory
              onChange={() => {
                editNomeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />

            <Input
              inputRef={editDataInicioRef}
              type="datetime-local"
              label="Data Início"
              defaultValue={rowData?.startDateTime?.slice(0, 16)}
              mandatory
              onChange={() => {
                editDataInicioRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editDataFimRef}
              type="datetime-local"
              label="Data Fim"
              defaultValue={rowData?.finishDateTime?.slice(0, 16)}
              mandatory
              onChange={() => {
                editDataFimRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editValueFactorCapacityRef}
              type="number"
              onChange={() => {
                editValueFactorCapacityRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
              label="Valor Capacidade"
              mandatory
            />

            <Select
              keyLabel="name"
              keyValue="id"
              label="Base"
              mandatory
              defaultOption={rowData?.baseId || []}
              options={enumerators?.bases || []}
              className="cnx-areas-select-edit-situacao-cases"
              onChange={() => {
                setBaseClientMessage(false);
                setNoBaseClientMessage(false);
                document
                  ?.querySelector(".cnx-areas-select-edit-situacao-cases")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              inputRef={editBaseIdRef}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              keyLabel="name"
              keyValue="id"
              label="Cliente"
              mandatory
              defaultOption={rowData?.clientId || []}
              options={enumerators?.clients || []}
              className="cnx-areas-select-edit-situacao-cases"
              onChange={() => {
                setBaseClientMessage(false);
                setNoBaseClientMessage(false);
                document
                  ?.querySelector(".cnx-areas-select-edit-situacao-cases")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              inputRef={editClienIdRef}
              clear={clearSelect}
              placeholder="Selecionar"
            />

            <Select
              inputRef={editRowStatusRef}
              keyLabel="code"
              keyValue="id"
              label="Sitiação"
              mandatory
              className="cnx-edit-calendar-operation"
              onChange={() => {
                document
                  ?.querySelector(".cnx-edit-calendar-operation")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              defaultOption={rowData?.rowStatus}
              options={[
                {
                  id: 1,
                  code: "Ativo",
                },
                {
                  id: 2,
                  code: "Inativo",
                },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            {noBaseClientMessage ? (
              <span style={{ color: "#fe5e76", marginTop: "20px" }}>
                É necessário informar uma base, ou um cliente!
              </span>
            ) : null}
            {baseClientMessage ? (
              <span style={{ color: "#fe5e76", marginTop: "20px" }}>
                É necessário informar uma base, ou um cliente!
              </span>
            ) : null}
            {errorSpan ? (
        <span className="cnx-auth-level-span-alert-error-calsar">
          O campo Data Hora Início deve ser menor que o Data Hora fim!
        </span>
      ) : null}
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
