import { useState, useRef, useEffect, useContext, useId } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import CnxDialog from "../../../../components/CnxDialog";

function FormModalContainer() {
  const CNX_ID_ADD = useId();
  const CNX_ID_EDIT = useId();

  const { localesData } = useContext<ILocales>(localesContex);

  const { dispacth, addModal, editModal, rowData, saving } =
    useContext(UseContext);

  const addIdRef = useRef<HTMLInputElement>(null!);
  const addCodeRef = useRef<HTMLInputElement>(null!);
  const addNameRef = useRef<HTMLInputElement>(null!);
  const addResourcesRef: any = useRef({});
  const addStatusRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editCodeRef = useRef<HTMLInputElement>(null!);
  const editNameRef = useRef<HTMLInputElement>(null!);
  const editResourcesRef: any = useRef({});
  const editStatusRef: any = useRef({});

  useEffect(() => {
    editIdRef.current.value = rowData?.id;
    editCodeRef.current.value = rowData?.code;
    editNameRef.current.value = rowData?.name;
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
    addCodeRef.current.value = "";
    addIdRef.current.value = "";
    addNameRef.current.value = "";
    addStatusRef.current = [];
    setClearSelect(!clearSelect);
  };

  const clearEditModal = () => {
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {
        id: null,
        code: null,
        name: null,
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
        title="Adicionar Grupo de Recurso"
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
            />
            <Input
              inputRef={addNameRef}
              type="text"
              label="Nome"
              mandatory
            />
            <Select
              inputRef={addResourcesRef}
              keyLabel="label"
              keyValue="id"
              label="Recurso"
              mandatory
              options={[
                { id: 1, label: "Recurso 1" },
                { id: 2, label: "Recurso 2" },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              inputRef={addStatusRef}
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
        title="Editar Grupo de Recurso"
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
              inputRef={editCodeRef}
              type="text"
              label="Código"
              mandatory
            />
            <Input
              inputRef={editNameRef}
              type="text"
              label="Nome"
              mandatory
            />
            <Select
              inputRef={editResourcesRef}
              keyLabel="label"
              keyValue="id"
              label="Recurso"
              mandatory
              defaultOption={1}
              options={[
                { id: 1, label: "Recurso 1" },
                { id: 2, label: "Recurso 2" },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
            <Select
              inputRef={editStatusRef}
              keyLabel="label"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={rowData?.status}
              options={[
                { id: 1, label: "Ativo" },
                { id: 2, label: "Inativo" },
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
