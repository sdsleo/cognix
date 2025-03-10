import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../../context/moduleContext";
import { ACTIONS } from "../../../context/moduleActions";

import CnxFormModal from "../../../../../components/CnxFormModal";
import Input from "../../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../../components/CnxInput/InputTypes/Select";
import StatusLogs from "../../../../../components/CnxInput/InputTypes/StatusLogs";
import {
  MultSelectAsyncAutoComplete,
  MultSelectCheckbox,
} from "../../../../../components/CnxInput";
import { CnxTable } from "../../../../../components/CnxTable";
function FormModalContainer() {
  const { dispacth, addModalUserSkills, editModalUserSkills, rowData } = useContext(UseContext);
  const inputCnxRef = useRef([]);

  const closeAddModal = () => {
    dispacth({
      type: ACTIONS.ADD_MODAL_USER_SKILLS,
      payload: false,
    });
  };

  const closeEditModal = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL_USER_SKILLS,
      payload: false,
    });
  };

    const [data, setData]: any = useState([]);

  useEffect(() => {
    handleData();
  }, []);

  const head = {
    date: 'Data',
    name: 'Nome',
    description: 'Descrição'
  };

  const handleData = () => {
    setData([
      {
        date: '20/01/2023',
        name: 'Admin',
        description: 'Log descrição'
      },
      {
        date: '20/01/2023',
        name: 'Admin',
        description: 'Log descrição'
      },
      {
        date: '20/01/2023',
        name: 'Admin',
        description: 'Log descrição'
      },
      {
        date: '20/01/2023',
        name: 'Admin',
        description: 'Log descrição'
      }
    ]);
  };

  return (
    <>
      <CnxFormModal
        title="Adicionar Habilidade"
        open={addModalUserSkills}
        close={closeAddModal}
        formInputs={
          <>
            <Input type="text" label="Nome" mandatory />
            <Input type="text" label="Recurso" mandatory />
            <Input type="text" label="Código Recurso" mandatory />
            <Input type="text" label="Operação" mandatory />
            <Input type="text" label="Código Operação" mandatory />
            <Input type="text" label="Nível" mandatory />
            <Input type="text" label="Última Atualização" mandatory />
          </>
        }
      />
      <CnxFormModal
        title="Editar Habilidade"
        open={editModalUserSkills}
        close={closeEditModal}
        formInputs={
          <>
            <Input type="text" label="Nome" value={rowData?.name} mandatory />
            <Input type="text" label="Recurso" value={rowData?.resource} mandatory />
            <Input type="text" label="Código Recurso" value={rowData?.resourceCode} mandatory />
            <Input type="text" label="Operação" value={rowData?.operation} mandatory />
            <Input type="text" label="Código Operação" value={rowData?.operationCode} mandatory />
            <Input type="text" label="Nível" value={rowData?.level} mandatory />
            <Input type="text" label="Última Atualização" value={rowData?.lastUpdate} mandatory />
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
