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
  const addNoteRef = useRef<HTMLInputElement>(null!);
  const addDataInicioRef = useRef<HTMLInputElement>(null!);
  const addDataFimRef = useRef<HTMLInputElement>(null!);
  const addTipoRef: any = useRef({});
  const addSituacaoRef: any = useRef({});
  const addResourceIdRef: any = useRef({});
  const addVehicleIdRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editNomeRef = useRef<HTMLInputElement>(null!);
  const editNoteRef = useRef<HTMLInputElement>(null!);
  const editDescricaoRef = useRef<HTMLInputElement>(null!);

  const editDataInicioRef = useRef<HTMLInputElement>(null!);
  const editDataFimRef = useRef<HTMLInputElement>(null!);

  const editTipoRef: any = useRef({});
  const editSituacaoRef: any = useRef({});
  const editResourceIdRef: any = useRef({});
  const editVehicleIdRef: any = useRef({});

  useEffect(() => {
    getEnumerators();

    editNoteRef.current.value = ''

    editIdRef.current.value = rowData?.id;
    editNomeRef.current.value = rowData?.name;
    editDescricaoRef.current.value = rowData?.description;

    if (rowData?.additionalInfo) {
      editNoteRef.current.value = rowData?.additionalInfo;
    }
    // editStartDateTimeRef.current.value = useFormatDate(rowData?.startDateTime);
    // editFinishDateTimeRef.current.value = useFormatDate(rowData?.finishDateTime);
    // editResourceIdRef.current.value = rowData?.resourceId;
    setClearSelect(!clearSelect);
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
    let addName = false;
    let addDescription = false;
    let addStartDate = false;
    let addEndDate = false;
    let addType = false;
    let addStatus = false;
    let addTramo = false;
    let addVehicle = false;

    if (addNomeRef.current.value === '') {
      addNomeRef.current!.classList?.add('cnx-input-border-error-highlight');
      addName = true;
    }
    if (addDescricaoRef.current.value === '') {
      addDescricaoRef.current!.classList?.add('cnx-input-border-error-highlight');
      addDescription = true;
    }
    if (addDataInicioRef.current.value === '') {
      addDataInicioRef.current!.classList?.add('cnx-input-border-error-highlight');
      addStartDate = true;
    }
    if (addDataFimRef.current.value === '') {
      addDataFimRef.current!.classList?.add('cnx-input-border-error-highlight');
      addEndDate = true;
    }
    if (!addTipoRef.current) {
      document?.querySelector('.cnx-maintenance-schedule-type-add')!.classList?.add('cnx-input-border-error-highlight');
      addType = true;
    }
    if (!addSituacaoRef.current) {
      document?.querySelector('.cnx-maintenance-schedule-status-add')!.classList?.add('cnx-input-border-error-highlight');
      addStatus = true;
    }
    // if (!addResourceIdRef.current) {
    //   document?.querySelector('.cnx-maintenance-schedule-tramo-add')!.classList?.add('cnx-input-border-error-highlight');
    //   addTramo = true;
    // }
    // if (!addVehicleIdRef.current) {
    //   document?.querySelector('.cnx-maintenance-schedule-vehicle-add')!.classList?.add('cnx-input-border-error-highlight');
    //   addVehicle = true;
    // }
    if (addName || addDescription || addStartDate || addEndDate || addStatus || addType) {
      return true;
    }
  }

  function editformCheck() {
    let editName = false;
    let editDescription = false;
    let editStartDate = false;
    let editEndDate = false;
    let editType = false;
    let editStatus = false;
    let editTramo = false;
    let editVehicle = false;

    if (editNomeRef.current.value === '') {
      editNomeRef.current!.classList?.add('cnx-input-border-error-highlight');
      editName = true;
    }
    if (editDescricaoRef.current.value === '') {
      editDescricaoRef.current!.classList?.add('cnx-input-border-error-highlight');
      editDescription = true;
    }
    if (editDataInicioRef.current.value === '') {
      editDataInicioRef.current!.classList?.add('cnx-input-border-error-highlight');
      editStartDate = true;
    }
    if (editDataFimRef.current.value === '') {
      editDataFimRef.current!.classList?.add('cnx-input-border-error-highlight');
      editEndDate = true;
    }
    if (!editTipoRef.current) {
      document?.querySelector('.cnx-maintenance-schedule-type-edit')!.classList?.add('cnx-input-border-error-highlight');
      editType = true;
    }
    if (!editSituacaoRef.current) {
      document?.querySelector('.cnx-maintenance-schedule-status-edit')!.classList?.add('cnx-input-border-error-highlight');
      editStatus = true;
    }
    // if (!editResourceIdRef.current) {
    //   document?.querySelector('.cnx-maintenance-schedule-tramo-edit')!.classList?.add('cnx-input-border-error-highlight');
    //   editTramo = true;
    // }
    // if (!editVehicleIdRef.current) {
    //   document?.querySelector('.cnx-maintenance-schedule-vehicle-edit')!.classList?.add('cnx-input-border-error-highlight');
    //   editVehicle = true;
    // }
    if (editName || editDescription || editStartDate || editEndDate || editStatus || editType) {
      return true;
    }

    return false
  }

  const [errorSpan, setErrorSpan] = useState(false);
  const [errorSpanVehicle0rResource, setErrorSpanVehicle0rResource] = useState(false);

  const add = async () => {
    if (addformCheck()) return;
    if (
      Date.parse(addDataInicioRef.current?.value) <
      Date.parse(addDataFimRef.current?.value)
    ) {
      //start is less than End
    } else {
      //end is less than start
      // setErrorSpan(true); 
      document.getElementById('cnx-auth-date-range')?.classList.remove('cnx-display-none');
      return;
    }
    const vehicleCheck = addVehicleIdRef.current?.id !== undefined || null ? true : false;

    const resourceCheck = addResourceIdRef.current?.id !== undefined || null ? true : false;

    if (!vehicleCheck && !resourceCheck) {
      document.getElementById('cnx-auth-reource-vehicle')?.classList.remove('cnx-display-none');
      return;
    }
    if (vehicleCheck && resourceCheck) {
      document.getElementById('cnx-auth-reource-vehicle')?.classList.remove('cnx-display-none');
      return;
    }
    // if (addVehicleIdRef.current?.id === undefined && addResourceIdRef.current?.id === undefined) {
    //   //start is less than EndJ
    // } else {
    //   //end is less than start
    //   alert('!')
    //   setErrorSpanVehicle0rResource(true);
    //   return;
    // }
    // if (addVehicleIdRef.current?.id && addResourceIdRef.current?.id) {
    //   //start is less than EndJ
    // } else {
    //   //end is less than start
    //   alert('+')
    //   setErrorSpanVehicle0rResource(true);
    //   return;
    // }
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });
    try {
      await axiosInstance(
        _POST({
          name: addNomeRef.current.value,
          additionalInfo: addNoteRef.current.value,
          description: addDescricaoRef.current.value,
          startDateTime: addDataInicioRef.current.value || null,
          finishDateTime: addDataFimRef.current.value || null,
          resourceId: Number(addResourceIdRef.current?.id),
          status: Number(addSituacaoRef.current?.id),
          type: Number(addTipoRef.current?.id),
          vehicleId: Number(addVehicleIdRef.current?.id),
        } as any)
      );
      getList({ PageSize: 100 });
      clearAddModal();
      //setErrorSpan(false);
      document.getElementById('cnx-auth-date-range')?.classList.add('cnx-display-none');
      // setErrorSpanVehicle0rResource(false);
      document.getElementById('cnx-auth-reource-vehicle')?.classList.add('cnx-display-none');
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

    // alert('oi')

    // console.log('editformCheck()', editformCheck())
    if (editformCheck()) return;

    // console.log('Passou da validação')

    if (
      Date.parse(editDataInicioRef.current?.value) <
      Date.parse(editDataFimRef.current?.value)
    ) {
      //start is less than End
    } else {
      //end is less than start
      // setErrorSpan(true); 
      document.getElementById('cnx-auth-date-range')?.classList.remove('cnx-display-none');
      return;
    }


    let blockRrequest = true
    let selectedResource = false
    let selectedVehicle = false

    if (editResourceIdRef) {
      if (editResourceIdRef.current) {
        selectedResource = true
      }
    }

    if (editVehicleIdRef) {
      if (editVehicleIdRef.current) {
        selectedVehicle = true
      }
    }

    if (selectedResource !== selectedVehicle) {
      blockRrequest = false
    }

    if (selectedResource === selectedVehicle) {
      blockRrequest = true
    }


    if (blockRrequest) {
      document.getElementById('cnx-auth-reource-vehicle-edit')?.classList.remove('cnx-display-none');
      return
    } else {
      document.getElementById('cnx-auth-reource-vehicle-edit')?.classList.add('cnx-display-none');
    }

    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });
    try {


      const payload = {
        id: editIdRef.current.value,
        name: editNomeRef.current.value,
        description: editDescricaoRef.current.value,
        startDateTime: editDataInicioRef.current.value || null,
        finishDateTime: editDataFimRef.current.value || null,
        resourceId: 0,
        status: Number(editSituacaoRef.current.id),
        type: Number(editTipoRef.current.id),
        vehicleId: 0,
        additionalInfo: editNoteRef.current.value
      }

      if (editVehicleIdRef && editVehicleIdRef.current) {
        payload.vehicleId = Number(editVehicleIdRef.current.id)
      }

      if (editResourceIdRef && editResourceIdRef.current) {
        payload.resourceId = Number(editResourceIdRef.current.id)
      }


      await axiosInstance(
        _PUT(payload)
      );
      getList({ PageSize: 100 });
      // setErrorSpan(false);
      document.getElementById('cnx-auth-date-range')?.classList.add('cnx-display-none');
      // setErrorSpanVehicle0rResource(false);
      document.getElementById('cnx-auth-reource-vehicle')?.classList.add('cnx-display-none');
      // clearAddModal();
    } catch (err: any) {
      // console.error(err);
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
    // setErrorSpan(false);
    document.getElementById('cnx-auth-date-range')?.classList.add('cnx-display-none');
    // setErrorSpanVehicle0rResource(false);
    document.getElementById('cnx-auth-reource-vehicle')?.classList.add('cnx-display-none');
  };

  const closeEditModal = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
    // setErrorSpan(false);
    document.getElementById('cnx-auth-date-range')?.classList.add('cnx-display-none');
    // setErrorSpanVehicle0rResource(false);
    document.getElementById('cnx-auth-reource-vehicle')?.classList.add('cnx-display-none');

    document.getElementById('cnx-auth-reource-vehicle-edit')?.classList.add('cnx-display-none');
  };

  const [clearSelect, setClearSelect] = useState(false);

  const clearAddModal = () => {
    addDescricaoRef.current.value = "";
    addNomeRef.current.value = "";
    addDataInicioRef.current.value = "";
    addDataFimRef.current.value = "";
    addSituacaoRef.current = [];
    addNoteRef.current.value = ""
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

    editNoteRef.current.value = ""
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

            {/* <Input
              inputRef={addDataInicioRef}
              type="datetime-local"
              onChange={() => {
                addDataInicioRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
              label="Data Início"
              mandatory
            />
            <Input
              inputRef={addDataFimRef}
              type="datetime-local"
              onChange={() => {
                addDataFimRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
              label="Data Fim"
              mandatory
            /> */}
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
            <Select
              inputRef={addTipoRef}
              keyLabel="code"
              keyValue="id"
              label="Tipo"
              mandatory
              className="cnx-maintenance-schedule-type-add"
              onChange={() => {
                document
                  ?.querySelector(".cnx-maintenance-schedule-type-add")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              options={[
                { id: 1, code: "Preventiva" },
                { id: 2, code: "Corretiva" },
                { id: 3, code: "Melhoria" },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              inputRef={addSituacaoRef}
              keyLabel="code"
              keyValue="id"
              label="Situação"
              mandatory
              className="cnx-maintenance-schedule-status-add"
              onChange={() => {
                document
                  ?.querySelector(".cnx-maintenance-schedule-status-add")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              defaultOption={1}
              options={[
                { id: 1, code: "Programado" },
                { id: 2, code: "Em manutenção" },
                { id: 3, code: "Encerrado" },
                { id: 4, code: "Cancelado" },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            {/* <Input
              inputRef={editResourceIdRef}
              type="text"
              onChange={() => {
                editResourceIdRef.current!.classList?.remove('cnx-input-border-error-highlight');
              }}
              label="Recurso"
              mandatory
            /> */}
            <Select
              inputRef={addResourceIdRef}
              keyLabel="name"
              keyValue="id"
              label="Tramo"
              mandatory
              className="cnx-maintenance-schedule-tramo-add"
              onChange={() => {
                document
                  ?.querySelector(".cnx-maintenance-schedule-tramo-add")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              options={enumerators?.resources || []}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              inputRef={addVehicleIdRef}
              keyLabel="plate"
              keyValue="id"
              label="Carreta"
              mandatory
              className="cnx-maintenance-schedule-vehicle-add"
              onChange={() => {
                document
                  ?.querySelector(".cnx-maintenance-schedule-vehicle-add")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              // defaultOption={rowData?.vehicleId}
              options={enumerators?.vehicles || []}
              clear={clearSelect}
              placeholder="Selecionar"
            />


            <Input
              inputRef={addNoteRef}
              type="textarea"
              textAreaWidth="43vw"
              label="Notas"

            />

            <span id="cnx-auth-date-range" className="cnx-auth-level-span-alert-error-calsar cnx-display-none">
              O campo Data Hora Início deve ser menor que o Data Hora fim!
            </span>


            <span id="cnx-auth-reource-vehicle" className="cnx-auth-level-span-alert-error-calsar cnx-display-none">
              Deve ser selecionado uma Carreta ou Recurso!
            </span>

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

            <Select
              keyLabel="code"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={rowData?.status || []}
              options={[
                { id: 1, code: "Programado" },
                { id: 2, code: "Em manutenção" },
                { id: 3, code: "Encerrado" },
                { id: 4, code: "Cancelado" },
              ]}
              className="cnx-maintenance-schedule-status-edit"
              onChange={() => {
                document
                  ?.querySelector(".cnx-maintenance-schedule-status-edit")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              inputRef={editSituacaoRef}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              keyLabel="code"
              keyValue="id"
              label="Tipo"
              mandatory
              defaultOption={rowData?.type || []}
              options={[
                { id: 1, code: "Preventiva" },
                { id: 2, code: "Corretiva" },
                { id: 3, code: "Melhoria" },
              ]}
              className="cnx-maintenance-schedule-type-edit"
              onChange={() => {
                document
                  ?.querySelector(".cnx-maintenance-schedule-type-edit")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              inputRef={editTipoRef}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              inputRef={editResourceIdRef}
              keyLabel="name"
              keyValue="id"
              label="Tramo"
              mandatory
              className="cnx-maintenance-schedule-tramo-edit"
              onChange={() => {
                document
                  ?.querySelector(".cnx-maintenance-schedule-tramo-edit")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              defaultOption={rowData?.resourceId}
              options={enumerators?.resources || []}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              inputRef={editVehicleIdRef}
              keyLabel="plate"
              keyValue="id"
              label="Carreta"
              // mandatory
              className="cnx-maintenance-schedule-vehicle-edit"
              onChange={() => {
                document
                  ?.querySelector(".cnx-maintenance-schedule-vehicle-edit")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              defaultOption={rowData?.vehicleId}
              options={enumerators?.vehicles || []}
              clear={clearSelect}
              placeholder="Selecionar"
            />

            <Input
              inputRef={editNoteRef}
              type="textarea"
              textAreaWidth="43vw"
              label="Notas"

            />

            {errorSpan ? (
              <span className="cnx-auth-level-span-alert-error-calsar">
                O campo Data Hora Início deve ser menor que o Data Hora fim!
              </span>
            ) : null}

            <span id="cnx-auth-reource-vehicle-edit" className="cnx-auth-level-span-alert-error-calsar cnx-display-none">
              Deve ser selecionado uma Carreta ou Recurso!
            </span>
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
