import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../../context/moduleContext";
import { ACTIONS } from "../../../context/moduleActions";

import CnxFormModal from "../../../../../components/CnxFormModal";
import Input from "../../../../../components/CnxInput/InputTypes/Input";
// // import Select from "../../../../../components/CnxInput/InputTypes/Select";
import StatusLogs from "../../../../../components/CnxInput/InputTypes/StatusLogs";
import { Select, MultSelectCheckbox } from "../../../../../components/CnxInput";
import { CnxTable } from "../../../../../components/CnxTable";
import { axiosInstance } from "../../../../../http/axiosInstance";
import { _GET, _GET_BY_ID, _GET_ENUMERATOS, _POST, _PUT } from "../../../routes";
import axios from "axios";
import { IPagination } from "../../../routes/types";
import CnxDialog from "../../../../../components/CnxDialog";
function FormModalContainer() {
  const {
    dispacth,
    addModalUser,
    editModalUser,
    savingUser,
    rowData,
    enumerators,
  } = useContext(UseContext);

  const CNX_ID_ADD = useId();
  const CNX_ID_EDIT = useId();

  const addNameRef = useRef<HTMLInputElement>(null!);
  const addCodeRef = useRef<HTMLInputElement>(null!);
  const addEmailRef = useRef<HTMLInputElement>(null!);
  const addPhoneRef = useRef<HTMLInputElement>(null!);
  const addUserNameRef = useRef<HTMLInputElement>(null!);
  const addPasswordRef = useRef<HTMLInputElement>(null!);
  const addAccessLevelRef: any = useRef({});
  const addDepartamentRef: any = useRef({});
  const addGroupsRef: any = useRef({});
  const addStatusRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editNameRef = useRef<HTMLInputElement>(null!);
  const editCodeRef = useRef<HTMLInputElement>(null!);
  const editEmailRef = useRef<HTMLInputElement>(null!);
  const editPhoneRef = useRef<HTMLInputElement>(null!);
  const editUserNameRef = useRef<HTMLInputElement>(null!);
  const editPasswordRef = useRef<HTMLInputElement>(null!);
  const editAccessLevelRef: any = useRef({});
  const editDepartamentRef: any = useRef({});
  const editGroupsRef: any = useRef({});
  const editStatusRef: any = useRef({});

  useEffect(() => {
    if (addModalUser || editModalUser) {
      // getEnumerators();
    }
  }, [addModalUser, editModalUser]);

  useEffect(() => {
    editIdRef.current.value = rowData?.id;
    editNameRef.current.value = rowData?.name;
    editCodeRef.current.value = rowData?.code;
    editUserNameRef.current.value = rowData?.username;
    editPasswordRef.current.value = rowData?.password;
    editEmailRef.current.value = rowData?.email;
    editPhoneRef.current.value = rowData?.phone;
    if (rowData?.id) {
      getUserById(rowData?.id)
    }
  }, [rowData]);

  const closeAddModal = () => {
    dispacth({
      type: ACTIONS.ADD_MODAL_USER,
      payload: false,
    });
  };

  const closeEditModal = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL_USER,
      payload: false,
    });
  };

  const [data, setData]: any = useState([]);
  const [userGroupIds, setUserGroupIds]: any = useState([]);

  useEffect(() => {
    handleData();
  }, []);

  const head = {
    date: "Data",
    name: "Nome",
    description: "Descrição",
  };

  const handleData = () => {
    setData([
      {
        date: "20/01/2023",
        name: "Admin",
        description: "Log descrição",
      },
      {
        date: "20/01/2023",
        name: "Admin",
        description: "Log descrição",
      },
      {
        date: "20/01/2023",
        name: "Admin",
        description: "Log descrição",
      },
      {
        date: "20/01/2023",
        name: "Admin",
        description: "Log descrição",
      },
    ]);
  };

  async function getAllSelectors() {
    // Set the URLs to access
    let urls = [
      "/api/v1/user/enumerators",
      "/api/v1/user/3",
    ];
    /*
    | Perform the HTTP get request via Axios
    | It returns a Promise immediately,
    | not the response
    */
    const requests = urls.map((url) => axiosInstance.get(url));
    /*
    | For waiting the Promise is fulfilled
    | with the Response, use the then() method.
    | If the HTTP request received errors
    | use catch() method
    */
    axios.all(requests).then((responses) => {
      responses.forEach((resp, index) => {
        console.log('info', index);
        console.log(resp.data);
      });
    });
  }

  async function getList({ PageSize, PageNumber }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE_USER,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET({ PageSize, PageNumber }));
      dispacth({
        type: ACTIONS.SET_TABLE_DATA_USER,
        payload: data,
      });
    } catch (err: any) {
      console.error(err)
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE_USER,
        payload: false,
      });
    }
  }
  
  async function getUserById(id: number) {
    try {
      const { data } = await axiosInstance(_GET_BY_ID(id));
      const ids = data?.userGroups.map((item: any) => item?.groupId)
      setUserGroupIds(ids)
    } catch (err) {
      console.error(err)
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
      console.error(err)
    }
  }
  function userGroupIdReducer(data: any) {
    const ids = data?.map((item: any) => item.id);
    return ids
  }

  async function addUser() {
    if (addformCheck()) return;

    dispacth({
      type: ACTIONS.SAVING_USER,
      payload: true,
    });

    try {
      await axiosInstance(
        _POST({
          code: addCodeRef?.current?.value,
          name: addNameRef?.current?.value,
          username: addUserNameRef?.current?.value,
          password: addPasswordRef?.current?.value,
          email: addEmailRef?.current?.value,
          phone: addPhoneRef?.current?.value,
          accessLevel: addAccessLevelRef?.current?.id,
          departmentId: addDepartamentRef?.current?.id,
          status: addStatusRef?.current?.id,
          groupIds: userGroupIdReducer(addGroupsRef?.current)
        })
      );

      getList({ PageSize: 100 });
      clearAddModal();
    } catch (err: any) {
      console.error(err)
      const modal: any = document.getElementById(CNX_ID_ADD);
      modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.SAVING_USER,
        payload: false,
      });
    }
  }

  async function editUser() {
    if (editformCheck()) return;
    dispacth({
      type: ACTIONS.SAVING_USER,
      payload: true,
    });
    try {
      await axiosInstance(
        _PUT({
          id: editIdRef?.current?.value,
          code: editCodeRef?.current?.value,
          name: editNameRef?.current?.value,
          username: editUserNameRef?.current?.value,
          password: editPasswordRef?.current.value,
          email: editEmailRef?.current?.value,
          phone: editPhoneRef?.current?.value,
          accessLevel: editAccessLevelRef?.current?.id,
          departmentId: editDepartamentRef?.current?.id,
          status: editStatusRef?.current?.id,
          groupIds: userGroupIdReducer(editGroupsRef?.current)
        })
      );

      getList({ PageSize: 100 });
    } catch (err: any) {
      console.error(err)
      const modal: any = document.getElementById(CNX_ID_EDIT);
      modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.SAVING_USER,
        payload: false,
      });
    }
  }

  const [clearSelect, setClearSelect] = useState(false);

  const clearAddModal = () => {
    addNameRef.current.value = "";
    addCodeRef.current.value = "";
    addEmailRef.current.value = "";
    addPhoneRef.current.value = "";
    addUserNameRef.current.value = "";
    addPasswordRef.current.value = "";
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
    let addName = false;
    let addCode = false;
    let addUserName = false;
    let addPassword = false;
    let addDepartament = false;
    let addAccessLevel = false;
    let addStatus = false;

    if (addNameRef.current.value === "") {
      addNameRef.current!.classList?.add("cnx-input-border-error-highlight");
      addName = true;
    }
    if (addCodeRef.current.value === "") {
      addCodeRef.current!.classList?.add("cnx-input-border-error-highlight");
      addCode = true;
    }
    if (addUserNameRef.current.value === "") {
      addUserNameRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addUserName = true;
    }
    if (addPasswordRef.current.value === "") {
      addPasswordRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addPassword = true;
    }
    if (!addDepartamentRef.current) {
      document
        ?.querySelector(".cnx-user-departament-add-cuda")!
        .classList?.add("cnx-input-border-error-highlight");
      addDepartament = true;
    }
    if (!addAccessLevelRef.current) {
      document
        ?.querySelector(".cnx-user-access-level-add-cuala")!
        .classList?.add("cnx-input-border-error-highlight");
      addAccessLevel = true;
    }
    if (!addStatusRef.current) {
      document
        ?.querySelector(".cnx-user-status-add-cusa")!
        .classList?.add("cnx-input-border-error-highlight");
      addStatus = true;
    }
    if (
      addName ||
      addCode ||
      addUserName ||
      addPassword ||
      addDepartament ||
      addAccessLevel ||
      addStatus
    ) {
      return true;
    }
  }

  function editformCheck() {
    let editName = false;
    let editCode = false;
    let editUserName = false;
    let editPassword = false;
    let editDepartament = false;
    let editAccessLevel = false;
    let editStatus = false;

    if (editNameRef.current.value === "") {
      editNameRef.current!.classList?.add("cnx-input-border-error-highlight");
      editName = true;
    }
    if (editCodeRef.current.value === "") {
      editCodeRef.current!.classList?.add("cnx-input-border-error-highlight");
      editCode = true;
    }
    if (editUserNameRef.current.value === "") {
      editUserNameRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editUserName = true;
    }
    if (editPasswordRef.current.value === "") {
      editPasswordRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editPassword = true;
    }
    if (!editDepartamentRef.current) {
      document
        ?.querySelector(".cnx-user-departament-edit-cude")!
        .classList?.add("cnx-input-border-error-highlight");
      editDepartament = true;
    }
    if (!editAccessLevelRef.current) {
      document
        ?.querySelector(".cnx-user-access-level-edit-cuale")!
        .classList?.add("cnx-input-border-error-highlight");
      editAccessLevel = true;
    }
    if (!editStatusRef.current) {
      document
        ?.querySelector(".cnx-user-status-edit-cuse")!
        .classList?.add("cnx-input-border-error-highlight");
      editStatus = true;
    }
    if (
      editName ||
      editCode ||
      editUserName ||
      editPassword ||
      editDepartament ||
      editAccessLevel ||
      editStatus
    ) {
      return true;
    }
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
        title="Adicionar Usuário"
        open={addModalUser}
        close={closeAddModal}
        saveButton={() => addUser()}
        saving={savingUser}
        formInputs={
          <>
            <Input
              inputRef={addCodeRef}
              type="text"
              label="Matrícula"
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
              doubleWidth
              onChange={() => {
                addNameRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addUserNameRef}
              type="text"
              label="Usuário"
              mandatory
              onChange={() => {
                addUserNameRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={addPasswordRef}
              type="password"
              label="Senha"
              mandatory
              onChange={() => {
                addPasswordRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Select
              keyLabel="name"
              keyValue="id"
              label="Nível de Acesso"
              mandatory
              clear={clearSelect}
              options={enumerators?.accessLevel || []}
              inputRef={addAccessLevelRef}
              placeholder="Selecionar"
              className="cnx-user-access-level-add-cuala"
              onChange={() => {
                document
                  ?.querySelector(".cnx-user-access-level-add-cuala")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Input inputRef={addPhoneRef} type="phone" label="Telefone" />
            <Input inputRef={addEmailRef} type="email" label="Email" />
            <Select
              keyLabel="name"
              keyValue="id"
              label="Setor"
              mandatory
              clear={clearSelect}
              options={enumerators?.departments || []}
              inputRef={addDepartamentRef}
              placeholder="Selecionar"
              className="cnx-user-departament-add-cuda"
              onChange={() => {
                document
                  ?.querySelector(".cnx-user-departament-add-cuda")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <MultSelectCheckbox
              keyLabel="code"
              keyValue="id"
              label="Grupos"
              clear={clearSelect}
              options={enumerators?.groups || []}
              inputRef={addGroupsRef}
              placeholder="Selecionar"
            />
            <Select
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              clear={clearSelect}
              defaultOption={1}
              options={enumerators?.status || []}
              inputRef={addStatusRef}
              placeholder="Selecionar"
              className="cnx-user-status-add-cusa"
              onChange={() => {
                document
                  ?.querySelector(".cnx-user-status-add-cusa")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
          </>
        }
      />
      <CnxFormModal
        title="Editar Usuário"
        open={editModalUser}
        close={closeEditModal}
        saveButton={() => editUser()}
        saving={savingUser}
        formInputs={
          <>
            <Input inputRef={editIdRef} type="text" label="Id" disabled />
            <Input
              inputRef={editCodeRef}
              type="text"
              label="Matrícula"
              mandatory
              onChange={() => {
                editCodeRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editUserNameRef}
              type="text"
              label="Usuário"
              mandatory
              onChange={() => {
                editUserNameRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editPasswordRef}
              type="password"
              label="Senha"
              mandatory
              onChange={() => {
                editPasswordRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Input
              inputRef={editNameRef}
              type="text"
              label="Nome"
              mandatory
              doubleWidth
              onChange={() => {
                editNameRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Select
              keyLabel="name"
              keyValue="id"
              label="Nível de Acesso"
              mandatory
              defaultOption={rowData?.accessLevel}
              options={enumerators?.accessLevel || []}
              inputRef={editAccessLevelRef}
              placeholder="Selecionar"
              className="cnx-user-access-level-edit-cuale"
              onChange={() => {
                document
                  ?.querySelector(".cnx-user-access-level-edit-cuale")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Input inputRef={editPhoneRef} type="phone" label="Telefone" />
            <Input inputRef={editEmailRef} type="email" label="Email" />
            <Select
              keyLabel="name"
              keyValue="id"
              label="Setor"
              mandatory
              defaultOption={rowData?.departmentId}
              options={enumerators?.departments || []}
              inputRef={editDepartamentRef}
              placeholder="Selecionar"
              className="cnx-user-departament-edit-cude"
              onChange={() => {
                document
                  ?.querySelector(".cnx-user-departament-edit-cude")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <MultSelectCheckbox
              keyLabel="code"
              keyValue="id"
              label="Grupos"
              defaultOptions={userGroupIds}
              options={enumerators?.groups || []}
              inputRef={editGroupsRef}
              placeholder="Selecionar"
            />
            <Select
              keyLabel="name"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={rowData?.status}
              options={enumerators?.status || []}
              inputRef={editStatusRef}
              placeholder="Selecionar"
              className="cnx-user-status-edit-cuse"
              onChange={() => {
                document
                  ?.querySelector(".cnx-user-status-edit-cuse")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
