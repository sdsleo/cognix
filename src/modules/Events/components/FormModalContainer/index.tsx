import { useState, useRef, useEffect, useContext, useId } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import CnxDialog from "../../../../components/CnxDialog";
import { axiosInstance } from "../../../../http/axiosInstance";
import { _GET, _GET_EVENT_TYPES, _POST, _PUT } from "../../routes";
import { IPagination } from "../../routes/types";

function FormModalContainer() {
  const CNX_ID_ADD = useId();
  const CNX_ID_EDIT = useId();

  const [ALL_EVENTS_TYPES, SET_ALL_EVENTS_TYPES] = useState<
    { id: number; label: string }[]
  >([]);

  const { localesData } = useContext<ILocales>(localesContex);

  const { dispacth, addModal, editModal, rowData, saving } =
    useContext(UseContext);

  const addIdRef = useRef<HTMLInputElement>(null!);
  const addCodeRef = useRef<HTMLInputElement>(null!);
  const addDescriptionRef = useRef<HTMLInputElement>(null!);
  const addActionRef = useRef<HTMLInputElement>(null!);
  const addIsPlannedDowntimeRef: any = useRef({});
  const addProductionLossTypeIdRef: any = useRef({});
  const addIsActiveRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editCodeRef = useRef<HTMLInputElement>(null!);
  const editDescriptionRef = useRef<HTMLInputElement>(null!);
  const editActionRef = useRef<HTMLInputElement>(null!);
  const editIsPlannedDowntimeRef: any = useRef({});
  const editProductionLossTypeIdRef = useRef<HTMLInputElement>(null!);
  const editIsActivedRef: any = useRef({});

  useEffect(() => {
    editIdRef.current.value = rowData?.id;
    editCodeRef.current.value = rowData?.code;
    editDescriptionRef.current.value = rowData?.description;
    editActionRef.current.value = rowData?.action;
    editIsActivedRef.current.checked = rowData?.isActived;
    // editIsPlannedDowntimeRef.current.value = rowData?.isPlannedDowntime;
    // editProductionLossTypeIdRef.current.value = rowData?.productionLossTypeId;
  }, [rowData]);

  useEffect(() => {
    (async () => {
      const response = await axiosInstance(_GET_EVENT_TYPES());
      const DTO = response.data.map((eventType: any) => {
        return {
          id: eventType.id,
          label: eventType.code,
        };
      });

      SET_ALL_EVENTS_TYPES([...DTO]);
    })();
  }, []);

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
      // console.error('ERRO', err)
      // const modal: any = document.getElementById(CNX_ID_LIST);
      // modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  const add = async () => {
    // if (addformCheck()) return;
    try {
      const payload = {
        // :addIdRef ,
        code: addCodeRef.current.value,
        description: addDescriptionRef.current.value,
        action: addActionRef.current.value,
        isPlannedDowntime: addIsPlannedDowntimeRef.current.id,
        productionLossTypeId: addProductionLossTypeIdRef.current.id,
        isActived: 1,
      };

      await axiosInstance(_POST(payload));

      getList({ PageSize: 100 });

      clearAddModal();
    } catch (err: any) {
      // console.error(err);
      // const modal: any = document.getElementById(CNX_ID_ADD);
      // modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });

      dispacth({
        type: ACTIONS.ADD_MODAL,
        payload: false,
      });
    }
  };

  const edit = async () => {
    // if (editformCheck()) return;
    try {
      dispacth({
        type: ACTIONS.SAVING,
        payload: true,
      });

      const payload = {
        id: rowData?.id,
        code: editCodeRef.current.value,
        description: editDescriptionRef.current.value,
        action: editActionRef.current.value,
        isPlannedDowntime: editIsPlannedDowntimeRef.current.id,
        productionLossTypeId: editProductionLossTypeIdRef.current.id,
        isActived: editIsActivedRef.current.checked ? 1 : 0,
      };

      await axiosInstance(_PUT(payload));

      getList({ PageSize: 100 });
    } catch (err: any) {
      console.log({ err });
      // console.error(err);
      // const modal: any = document.getElementById(CNX_ID_ADD);
      // modal?.showModal();
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

  const [clearSelect, setClearSelect] = useState(false);

  const clearAddModal = () => {
    addCodeRef.current.value = "";
    addDescriptionRef.current.value = "";
    addActionRef.current.value = "";
    addIsPlannedDowntimeRef.current = [];
    addProductionLossTypeIdRef.current = [];
    addIsActiveRef.current = [];

    setClearSelect(!clearSelect);
  };

  const clearEditModal = () => {
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {
        code: null,
        description: null,
        action: null,
        isPlannedDowntime: null,
        productionLossTypeId: null,
        isActive: null,
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
            <Input inputRef={addCodeRef} type="text" label="Código" mandatory />
            <Input
              inputRef={addDescriptionRef}
              type="text"
              label="Descrição"
              doubleWidth
              mandatory
            />
            <Input inputRef={addActionRef} type="text" label="Ação" mandatory />

            <Select
              inputRef={addIsPlannedDowntimeRef}
              keyLabel="label"
              keyValue="id"
              label="Parada Programada"
              mandatory
              defaultOption={1}
              options={[
                { id: 1, label: "Ativo" },
                { id: 2, label: "Inativo" },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            {/* <Input
              inputRef={addProductionLossTypeIdRef}
              type="text"
              label="Produção Evento"
              mandatory
            /> */}

            <Select
              inputRef={addProductionLossTypeIdRef}
              keyLabel="label"
              keyValue="id"
              label="Tipo Evento"
              mandatory
              // defaultOption={1}
              options={ALL_EVENTS_TYPES}
              clear={clearSelect}
              placeholder="Selecionar"
            />

            {/* <Select
              inputRef={addIsActiveRef}
              keyLabel="label"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={1}
              options={[
                { id: 1, label: "Ativo" },
                { id: 2, label: "Inativo" },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            /> */}
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
              inputRef={editDescriptionRef}
              type="text"
              label="Descrição"
              doubleWidth
              mandatory
            />
            <Input
              inputRef={editCodeRef}
              type="text"
              label="Código"
              mandatory
            />
            <Input
              inputRef={editActionRef}
              type="text"
              label="Ação"
              mandatory
            />
            {/* <Input
              inputRef={editIsPlannedDowntimeRef}
              type="text"
              label="Parada Programada"
              mandatory
            /> */}
            <Select
              inputRef={editIsPlannedDowntimeRef}
              keyLabel="label"
              keyValue="id"
              label="Parada Programada"
              mandatory
              defaultOption={rowData?.isPlannedDowntime}
              options={[
                { id: 1, label: "Sim" },
                { id: 2, label: "Não" },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            {/* <Input
              inputRef={editProductionLossTypeIdRef}
              type="text"
              label="Tipo Evento"
              mandatory
            /> */}

            <Select
              inputRef={editProductionLossTypeIdRef}
              keyLabel="label"
              keyValue="id"
              label="Tipo Evento"
              mandatory
              defaultOption={rowData?.productionLossTypeId}
              options={ALL_EVENTS_TYPES}
              clear={clearSelect}
              placeholder="Selecionar"
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
              <Input inputRef={editIsActivedRef} type="checkbox" />
              <span className="cnx-active-label-checkbox">Ativo</span>
            </div>
            {/* <Select
              inputRef={editIsActiveRef}
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
            /> */}
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
