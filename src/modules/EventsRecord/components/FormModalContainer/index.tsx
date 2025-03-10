import { useState, useRef, useEffect, useContext, useId } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import CnxDialog from "../../../../components/CnxDialog";
import StatusLogs from "../../../../components/CnxInput/InputTypes/StatusLogs";

function FormModalContainer() {
  const CNX_ID_ADD = useId();
  const CNX_ID_EDIT = useId();

  const { localesData } = useContext<ILocales>(localesContex);

  const { dispacth, addModal, editModal, rowData, saving } =
    useContext(UseContext);

  const addIdRef = useRef<HTMLInputElement>(null!);
  const addStartDateTimeRef = useRef<HTMLInputElement>(null!);
  const addFinishedDateTimeRef = useRef<HTMLInputElement>(null!);
  const addIsPlannedDowntimeRef = useRef<HTMLInputElement>(null!);
  const addIsMicrostopRef = useRef<HTMLInputElement>(null!);
  const addUserIdRef = useRef<HTMLInputElement>(null!);
  const addResourceIdRef = useRef<HTMLInputElement>(null!);
  const addProductionLossIdRef = useRef<HTMLInputElement>(null!);
  const addOrderProductionOperationResultIdRef = useRef<HTMLInputElement>(null!);
  const addHelpChainRecordIdRef = useRef<HTMLInputElement>(null!);
  const addStatusRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editStartDateTimeRef = useRef<HTMLInputElement>(null!);
  const editFinishedDateTimeRef = useRef<HTMLInputElement>(null!);
  const editIsPlannedDowntimeRef = useRef<HTMLInputElement>(null!);
  const editIsMicrostopRef = useRef<HTMLInputElement>(null!);
  const editUserIdRef = useRef<HTMLInputElement>(null!);
  const editResourceIdRef = useRef<HTMLInputElement>(null!);
  const editProductionLossIdRef = useRef<HTMLInputElement>(null!);
  const editOrderProductionOperationResultIdRef = useRef<HTMLInputElement>(null!);
  const editHelpChainRecordIdRef = useRef<HTMLInputElement>(null!);
  const editStatusRef: any = useRef({});

  useEffect(() => {
    editIdRef.current.value = rowData?.id;
    editStartDateTimeRef.current.value = rowData?.startDateTime;
    editFinishedDateTimeRef.current.value = rowData?.finishedDateTime;
    editIsPlannedDowntimeRef.current.value = rowData?.isPlannedDowntime;
    editIsMicrostopRef.current.value = rowData?.isMicrostop;
    editUserIdRef.current.value = rowData?.userId;
    editResourceIdRef.current.value = rowData?.resourceId;
    editProductionLossIdRef.current.value = rowData?.productionLossId;
    editOrderProductionOperationResultIdRef.current.value = rowData?.orderProductionOperationResultId;
    editHelpChainRecordIdRef.current.value = rowData?.helpChainRecordId;
  }, [rowData]);

  const add = async () => {
    // if (addformCheck()) return;
    // addRecord()
  };

  const edit = async () => {
    // if (editformCheck()) return;
    // editRecord()
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

  const [clearSelect, setClearSelect] = useState(false);

  const clearAddModal = () => {
    addStartDateTimeRef.current.value = "";
    addIdRef.current.value = "";
    addFinishedDateTimeRef.current.value = "";
    addIsPlannedDowntimeRef.current.value = "";
    editIsMicrostopRef.current.value = "";
    editUserIdRef.current.value = "";
    editResourceIdRef.current.value = "";
    editProductionLossIdRef.current.value = "";
    editOrderProductionOperationResultIdRef.current.value = "";
    editHelpChainRecordIdRef.current.value = "";
    addStatusRef.current = [];
    setClearSelect(!clearSelect);
  };

  const clearEditModal = () => {
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {
        startDateTime: null,
        finishedDateTime: null,
        isPlannedDowntime: null,
        isMicrostop: null,
        userId: null,
        resourceId: null,
        productionLossId: null,
        orderProductionOperationResultId: null,
        helpChainRecordId: null,
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
        title="Adicionar Registro de Evento"
        open={addModal}
        close={closeAddModal}
        saveButton={() => add()}
        clearButton={clearAddModal}
        formInputs={
          <>
            <Input
              inputRef={addStartDateTimeRef}
              type="text"
              label="Data Início"
              mandatory
            />
            <Input
              inputRef={addFinishedDateTimeRef}
              type="text"
              label="Data Fim"
              mandatory
            />
            <Input
              inputRef={addIsPlannedDowntimeRef}
              type="text"
              label="Parada Programada"
              mandatory
            />
            <Input
              inputRef={addIsMicrostopRef}
              type="text"
              label="Parada Programada"
              mandatory
            />
            <Input
              inputRef={addUserIdRef}
              type="text"
              label="Usuário"
              mandatory
            />
            <Input
              inputRef={addResourceIdRef}
              type="text"
              label="Recurso"
              mandatory
            />
            <Input
              inputRef={addProductionLossIdRef}
              type="text"
              label="Produção Evento"
              mandatory
            />
            <Input
              inputRef={addOrderProductionOperationResultIdRef}
              type="text"
              label="Resultado Operação"
              mandatory
            />
            <Input
              inputRef={addHelpChainRecordIdRef}
              type="text"
              label="Cadeia de Ajuda"
              mandatory
            />
            <StatusLogs
              inputRef={addStatusRef}
              keyLabel="label"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={1}
              options={[
                { id: 1, label: "Aberto" },
                { id: 2, label: "Encerrado" },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
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
        title="Editar Registro de Evento"
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
            />
            <Input
              inputRef={editStartDateTimeRef}
              type="text"
              label="Data Início"
              mandatory
            />
            <Input
              inputRef={editFinishedDateTimeRef}
              type="text"
              label="Data Fim"
              mandatory
            />
            <Input
              inputRef={editIsPlannedDowntimeRef}
              type="text"
              label="Parada Programada"
              mandatory
            />
            <Input
              inputRef={editIsMicrostopRef}
              type="text"
              label="Parada Programada"
              mandatory
            />
            <Input
              inputRef={editUserIdRef}
              type="text"
              label="Usuário"
              mandatory
            />
            <Input
              inputRef={editResourceIdRef}
              type="text"
              label="Recurso"
              mandatory
            />
            <Input
              inputRef={editProductionLossIdRef}
              type="text"
              label="Produção Evento"
              mandatory
            />
            <Input
              inputRef={editOrderProductionOperationResultIdRef}
              type="text"
              label="Resultado Operação"
              mandatory
            />
            <Input
              inputRef={editHelpChainRecordIdRef}
              type="text"
              label="Cadeia de Ajuda"
              mandatory
            />
            <StatusLogs
              inputRef={editStatusRef}
              keyLabel="label"
              keyValue="id"
              label="Situação"
              mandatory
              // defaultOption={rowData?.status}
              options={[
                { id: 1, label: "Aberto" },
                { id: 2, label: "Encerrado" }
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
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
