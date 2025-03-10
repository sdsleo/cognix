import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";

import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import CnxDialog from "../../../../components/CnxDialog";
import { axiosInstance } from "../../../../http/axiosInstance";
import { _GET, _GET_ENUMERATOS, _POST, _PUT } from "../../routes";
import { IPagination } from "../../routes/types";

function FormModalContainer() {
  const { dispacth, addModal, editModal, rowData, saving } =
    useContext(UseContext);
  const CNX_ID_ADD = useId();
  const CNX_ID_EDIT = useId();

  const addNameRef = useRef<HTMLInputElement>(null!);
  const addDocumentCodeRef = useRef<HTMLInputElement>(null!);
  const addCompanyNameRef = useRef<HTMLInputElement>(null!);
  const addIsActivedRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editNameRef = useRef<HTMLInputElement>(null!);
  const editDocumentCodeRef = useRef<HTMLInputElement>(null!);
  const editCompanyNameRef = useRef<HTMLInputElement>(null!);
  const editIsActivedRef: any = useRef({});

  useEffect(() => {
    if (addModal || editModal) {
      // getEnumerators();
    }
  }, [addModal, editModal]);

  useEffect(() => {
    if (rowData) {
      editIdRef.current.value = rowData?.id;
      editNameRef.current.value = rowData?.name;
      editDocumentCodeRef.current.value = rowData?.documentCode;
      editCompanyNameRef.current.value = rowData?.companyName;
      editIsActivedRef.current.checked = rowData?.isActived;
    }
  }, [rowData]);

  function addformCheck() {
    let addName = false;
    let addDocument = false;
    let addCompanyName = false;
    let addIsActived = false;

    if (addDocumentCodeRef.current.value === "") {
      addDocumentCodeRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addDocument = true;
    }
    if (addNameRef.current.value === "") {
      addNameRef.current!.classList?.add("cnx-input-border-error-highlight");
      addName = true;
    }
    if (addCompanyNameRef.current.value === "") {
      addCompanyNameRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addCompanyName = true;
    }
    if (!addIsActivedRef.current) {
      document
        ?.querySelector(".cnx-driver-is-actived-add-cdiaa")!
        .classList?.add("cnx-input-border-error-highlight");
      addIsActived = true;
    }
    if (addName || addDocument || addCompanyName || addIsActived) {
      return true;
    }
  }

  function editformCheck() {
    let editDocumentCode = false;
    let editName = false;
    let editCompanyName = false;
    let editIsActived = false;

    if (editDocumentCodeRef.current.value === "") {
      editDocumentCodeRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editDocumentCode = true;
    }
    if (editNameRef.current.value === "") {
      editNameRef.current!.classList?.add("cnx-input-border-error-highlight");
      editName = true;
    }
    if (editCompanyNameRef.current.value === "") {
      editCompanyNameRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editCompanyName = true;
    }
    if (!editIsActivedRef.current) {
      document
        ?.querySelector(".cnx-driver-is-actived-edit-cdiae")!
        .classList?.add("cnx-input-border-error-highlight");
      editIsActived = true;
    }
    if (editDocumentCode || editName || editCompanyName || editIsActived) {
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

  async function add() {
    if (addformCheck()) return;

    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });

    try {
      await axiosInstance(
        _POST({
          name: addNameRef.current?.value,
          documentCode: addDocumentCodeRef.current?.value,
          companyName: addCompanyNameRef.current?.value,
          isActived: 1,
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
          id: editIdRef.current?.value,
          name: editNameRef.current?.value,
          documentCode: editDocumentCodeRef.current?.value,
          companyName: editCompanyNameRef.current?.value,
          isActived: editIsActivedRef.current.checked ? 1 : 0,
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
    addDocumentCodeRef.current.value = "";
    addNameRef.current.value = "";
    addCompanyNameRef.current.value = "";
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

  function cpfMask(v: any) {
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2"); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
  }

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
        title="Adicionar Motorista"
        open={addModal}
        close={closeAddModal}
        saving={saving}
        saveButton={() => add()}
        clearButton={clearAddModal}
        formInputs={
          <>
            <Input
              inputRef={addNameRef}
              type="text"
              label="Nome"
              doubleWidth
              mandatory
              onChange={() => {
                addNameRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={addDocumentCodeRef}
              type="text"
              label="Código Documento"
              mandatory
              onChange={() => {
                addDocumentCodeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <div className="cnx-default-input-container-cdic">
              <label className="cnx-default-input-label-cdil" htmlFor="cpf">
                Código Documento
              </label>
              <input
                id="cpfId"
                name="cpf"
                ref={addDocumentCodeRef}
                type="text"
                className="cnx-default-input-cdi"
                placeholder="000.000.000-00"
                onChange={(e: any) => {
                  e.currentTarget.maxLength = 14;
                  const { value } = e.target;
                  e.target.value = cpfMask(value);
                }}
              />
            </div>

            <Input
              inputRef={addCompanyNameRef}
              type="text"
              label="Nome Companhia"
              mandatory
              onChange={() => {
                addCompanyNameRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Select
              inputRef={addIsActivedRef}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              className="cnx-driver-is-actived-add-cdiaa"
              defaultOption={1}
              options={[
                { id: 1, name: "Ativo" },
                { id: 0, name: "Inativo" },
              ]}
              placeholder="Selecionar"
              onChange={() => {
                document
                  ?.querySelector(".cnx-driver-is-actived-add-cdiaa")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            /> */}
          </>
        }
      />
      <CnxFormModal
        title="Editar Motorista"
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
              inputRef={editNameRef}
              type="text"
              label="Nome"
              doubleWidth
              mandatory
              onChange={() => {
                editNameRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={editDocumentCodeRef}
              type="text"
              label="Código Documento"
              mandatory
              onChange={() => {
                editDocumentCodeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <div className="cnx-default-input-container-cdic">
              <label className="cnx-default-input-label-cdil" htmlFor="cpf">
                Código Documento
              </label>
              <input
                id="cpfId"
                name="cpf"
                ref={editDocumentCodeRef}
                type="text"
                className="cnx-default-input-cdi"
                placeholder="000.000.000-00"
                onChange={(e: any) => {
                  e.currentTarget.maxLength = 14;
                  const { value } = e.target;
                  e.target.value = cpfMask(value);
                }}
              />
            </div>
            <Input
              inputRef={editCompanyNameRef}
              type="text"
              label="Nome Companhia"
              mandatory
              onChange={() => {
                editCompanyNameRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
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
              inputRef={editIsActivedRef}
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              className="cnx-driver-is-actived-edit-cdiae"
              defaultOption={rowData?.isActived}
              options={[
                { id: 1, name: "Ativo" },
                { id: 0, name: "Inativo" },
              ]}
              placeholder="Selecionar"
              onChange={() => {
                document
                  ?.querySelector(".cnx-driver-is-actived-edit-cdiae")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            /> */}
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
