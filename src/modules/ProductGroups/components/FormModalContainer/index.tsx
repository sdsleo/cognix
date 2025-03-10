import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";

import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import StatusLogs from "../../../../components/CnxInput/InputTypes/StatusLogs";
import {
  MultSelectAsyncAutoComplete,
  MultSelectCheckbox,
} from "../../../../components/CnxInput";
import { CnxTable } from "../../../../components/CnxTable";
function FormModalContainer() {
  const { dispacth, addModal, editModal } = useContext(UseContext);
  const inputCnxRef = useRef([]);

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
        title="Adicionar Usuário"
        open={addModal}
        close={closeAddModal}
        formInputs={
          <>
            <Input type="text" label="Código" mandatory />
            <Input type="text" label="Nome" mandatory doubleWidth />
            <Input type="text" label="Usuário" mandatory />
            <Input type="password" label="Senha" mandatory />
            <Select
              keyLabel="code"
              keyValue="id"
              label="Nível de Acesso"
              mandatory
              options={[
                { id: 1, code: "code1" },
                { id: 2, code: "code2" },
              ]}
              inputRef={inputCnxRef}
              placeholder="Selecionar"
            />
            <Input type="phone" label="Telefone" />
            <Input type="email" label="Email" />
            <Select
              keyLabel="code"
              keyValue="id"
              label="Setor"
              mandatory
              options={[
                { id: 1, code: "code1" },
                { id: 2, code: "code2" },
              ]}
              inputRef={inputCnxRef}
              placeholder="Selecionar"
            />
            <StatusLogs
              keyLabel="code"
              keyValue="id"
              label="Situação"
              mandatory
              options={[
                { id: 1, code: "code1" },
                { id: 2, code: "code2" },
              ]}
              inputRef={inputCnxRef}
              placeholder="Selecionar"
            />
            <Select
              keyLabel="code"
              keyValue="id"
              label="Grupos"
              mandatory
              options={[
                { id: 1, code: "code1" },
                { id: 2, code: "code2" },
              ]}
              inputRef={inputCnxRef}
              placeholder="Selecionar"
            />
          </>
        }
      />
      <CnxFormModal
        title="Editar Usuário"
        open={editModal}
        close={closeEditModal}
        formInputs={
          <>
            <Input type="text" label="Id" disabled />
            <Input type="text" label="Código" mandatory />
            <Input type="text" label="Usuário" mandatory />
            <Input type="password" label="Senha" mandatory />
            <Input type="text" label="Nome" mandatory doubleWidth />
            <Select
              keyLabel="code"
              keyValue="id"
              label="Nível de Acesso"
              mandatory
              options={[
                { id: 1, code: "code1" },
                { id: 2, code: "code2" },
              ]}
              inputRef={inputCnxRef}
              placeholder="Selecionar"
            />
            <Input type="phone" label="Telefone" />
            <Input type="email" label="Email" />
            <Select
              keyLabel="code"
              keyValue="id"
              label="Setor"
              mandatory
              options={[
                { id: 1, code: "code1" },
                { id: 2, code: "code2" },
              ]}
              inputRef={inputCnxRef}
              placeholder="Selecionar"
            />
            <StatusLogs
              keyLabel="code"
              keyValue="id"
              label="Situação"
              mandatory
              options={[
                { id: 1, code: "code1" },
                { id: 2, code: "code2" },
              ]}
              inputRef={inputCnxRef}
              placeholder="Selecionar"
            />
            <Select
              keyLabel="code"
              keyValue="id"
              label="Grupos"
              mandatory
              options={[
                { id: 1, code: "code1" },
                { id: 2, code: "code2" },
              ]}
              inputRef={inputCnxRef}
              placeholder="Selecionar"
            />
          </>
        }
        historic={
          <CnxTable
          noSearchBar
          data={data}
          head={head}
          hoverEffect
          enableSummary />
        }
      />
    </>
  );
}

export default FormModalContainer;
