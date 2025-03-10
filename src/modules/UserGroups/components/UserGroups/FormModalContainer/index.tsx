import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../../context/moduleContext";
import { ACTIONS } from "../../../context/moduleActions";

import CnxFormModal from "../../../../../components/CnxFormModal";
import Input from "../../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../../components/CnxInput/InputTypes/Select";
import { axiosInstance } from "../../../../../http/axiosInstance";
import { IPagination } from "../../../routes/types";
import { _GET, _POST, _PUT } from "../../../routes";

function FormModalContainer() {
  const { dispacth, addModal, editModal, rowData, saving } =
    useContext(UseContext);

  const addCodeRef = useRef<HTMLInputElement>(null!);
  const addDescriptionRef = useRef<HTMLInputElement>(null!);
  const addExtraInformationRef = useRef<HTMLInputElement>(null!);
  const addDiscriminatorRef = useRef<HTMLInputElement>(null!);
  const addIsActivedRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editCodeRef = useRef<HTMLInputElement>(null!);
  const editDescriptionRef = useRef<HTMLInputElement>(null!);
  const editExtraInformationRef = useRef<HTMLInputElement>(null!);
  const editDiscriminatorRef = useRef<HTMLInputElement>(null!);
  const editIsActivedRef: any = useRef({});

  // useEffect(() => {
  //   if (addModalUser || editModalUser) {
  //     getAllSelectors();
  //   }
  // }, [addModalUser, editModalUser]);

  useEffect(() => {
    editIdRef.current.value = rowData?.id;
    editCodeRef.current.value = rowData?.code;
    editDescriptionRef.current.value = rowData?.description;
    editExtraInformationRef.current.value = rowData?.extraInformation;
    // editDiscriminatorRef.current.value = rowData?.discriminator;
    editIsActivedRef.current.checked = rowData?.isActived;
  }, [rowData]);

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
      console.error(err)
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  async function addUserGroup() {
    if (addformCheck()) return;
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });
    try {
      await axiosInstance(
        _POST({
          code: addCodeRef?.current?.value,
          description: addDescriptionRef?.current?.value,
          extraInformation: addExtraInformationRef?.current?.value,
          discriminator: addDiscriminatorRef?.current?.value || '',
          isActived: 1,
        })
      );
      getList({ PageSize: 100 });
      clearAddModal();
    } catch (err) {
      console.error(err)
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });
    }
  }

  async function editUserGroup() {
    if (editformCheck()) return;
    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });

    try {
      const { data } = await axiosInstance(
        _PUT({
          id: editIdRef?.current?.value,
          code: editCodeRef?.current?.value,
          description: editDescriptionRef?.current?.value,
          extraInformation: editExtraInformationRef?.current?.value,
          discriminator: editDiscriminatorRef?.current?.value || '',
          isActived: editIsActivedRef.current.checked ? 1 : 0,
        })
      );
      getList({ PageSize: 100 });
      dispacth({
        type: ACTIONS.SET_ROW_DATA,
        payload: data,
      });
    } catch (err) {
      console.error(err)
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });
    }



  }

  const [clearSelect, setClearSelect] = useState(false);

  const clearAddModal = () => {
    addCodeRef.current.value = "";
    addDescriptionRef.current.value = "";
    addExtraInformationRef.current.value = "";
    addDiscriminatorRef.current.value = "";
    addIsActivedRef.current.value = "";
    setClearSelect(!clearSelect);
  };

  const clearEditModal = () => {
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {
        id: rowData?.id,
        code: null,
        description: null,
        extraInformation: null,
        discriminator: null,
        isActived: null,
      },
    });
  };

  function addformCheck() {

    let addCode = false;
    let addDescription = false;
    // let addExtraInformation = false;
    // let addDiscriminator = false;
    let addIsActived = false;

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
    // if (addExtraInformationRef.current.value === "") {
    //   addExtraInformationRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   addExtraInformation = true;
    // }
    // if (addDiscriminatorRef.current.value === "") {
    //   addDiscriminatorRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   addDiscriminator = true;
    // }
    if (!addIsActivedRef.current) {
      document
        ?.querySelector(".cnx-user-groups-is-actived-add-cugiaa")!
        .classList?.add("cnx-input-border-error-highlight");
      addIsActived = true;
    }
    if (
      addCode ||
      addDescription ||
      addIsActived
    ) {
      return true;
    }
  }

  function editformCheck() {
    let editCode = false;
    let editDescription = false;
    // let editExtraInformation = false;
    // let editDiscriminator = false;
    let editIsActived = false;

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
    // if (editExtraInformationRef.current.value === "") {
    //   editExtraInformationRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   editExtraInformation = true;
    // }
    // if (editDiscriminatorRef.current.value === "") {
    //   editDiscriminatorRef.current!.classList?.add(
    //     "cnx-input-border-error-highlight"
    //   );
    //   editDiscriminator = true;
    // }
    if (!editIsActivedRef.current) {
      document
        ?.querySelector(".cnx-user-groups-is-actived-edit-cugiea")!
        .classList?.add("cnx-input-border-error-highlight");
      editIsActived = true;
    }
    if (
      editCode ||
      editDescription ||
      // editExtraInformation ||
      // editDiscriminator ||
      editIsActived
    ) {
      return true;
    }
  }

  return (
    <>
      <CnxFormModal
        title="Adicionar Grupo de Usuários"
        open={addModal}
        close={closeAddModal}
        saveButton={() => addUserGroup()}
        saving={saving}
        clearButton={() => clearAddModal()}
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
              inputRef={addDescriptionRef}
              type="text"
              label="Descrição"
              mandatory
              doubleWidth
              onChange={() => {
                addDescriptionRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addExtraInformationRef}
              type="text"
              label="Informação Adicional"
              onChange={() => {
                addExtraInformationRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={addDiscriminatorRef}
              type="text"
              label="Descriminador"
              mandatory
              onChange={() => {
                addDiscriminatorRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            {/* <Select
              inputRef={addIsActivedRef}
              keyLabel="code"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={1}
              options={[
                { id: 1, code: "Ativo" },
                { id: 2, code: "Inativo" },
              ]}
              placeholder="Selecionar"
              className="cnx-user-groups-is-actived-add-cugiaa"
              onChange={() => {
                document?.querySelector('.cnx-user-groups-is-actived-add-cugiaa')!.classList?.remove('cnx-input-border-error-highlight');
              }}
            /> */}
          </>
        }
      />
      <CnxFormModal
        title="Editar Grupo de Usuários"
        open={editModal}
        close={closeEditModal}
        saveButton={() => editUserGroup()}
        clearButton={() => clearEditModal()}
        saving={saving}
        formInputs={
          <>
            <Input inputRef={editIdRef} type="text" label="id" disabled />
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
            <Input
              inputRef={editExtraInformationRef}
              type="text"
              label="Informação Adicional"
              onChange={() => {
                editExtraInformationRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {/* <Input
              inputRef={editDiscriminatorRef}
              type="text"
              label="Descriminador"
              mandatory
              onChange={() => {
                editDiscriminatorRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            /> */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                marginTop: "12px",
              }}
            >
              <Input
                inputRef={editIsActivedRef}
                type="checkbox"
              />
              <span className="cnx-active-label-checkbox">Ativo</span>
            </div>
            {/* <Select
              inputRef={editIsActivedRef}
              keyLabel="code"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={rowData?.isActived}
              options={[
                { id: 1, code: "Ativo" },
                { id: 2, code: "Inativo" },
              ]}
              placeholder="Selecionar"
              className="cnx-user-groups-is-actived-edit-cugiea"
              onChange={() => {
                document?.querySelector('.cnx-user-groups-is-actived-edit-cugiea')!.classList?.remove('cnx-input-border-error-highlight');
              }}
            /> */}
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
