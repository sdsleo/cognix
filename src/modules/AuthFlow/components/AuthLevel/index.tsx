import { useRef, useState } from "react";
import { Select } from "../../../../components/CnxInput";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import {
  AuthLevelContainer,
  FixedFormContainer,
  DynamicFormContainer,
  HeaderActions,
} from "./styles";
import SingleColumnEdit from "../../../../assets/icons/FluentUI/SVGs/SingleColumnEdit";
import ChromeClose from "../../../../assets/icons/FluentUI/SVGs/ChromeClose";
export function AuthLevel() {
  const departamentRef: any = useRef(null);
  const userLevelRef: any = useRef(null);
  const groupRef: any = useRef(null);
  const userRef: any = useRef(null);
  const editDepartamentRef: any = useRef(null);
  const editUserLevelRef: any = useRef(null);
  const editGroupRef: any = useRef(null);
  const editUserRef: any = useRef(null);

  const [currentEdit, setCurrentEdit]: any = useState();
  const [authFlowParams, setAuthFlowParams]: any = useState([]);
  const [clearSelect, setClearSelect] = useState(false);

  const departmentOprions = [
    {
      id: 1,
      code: "Produção",
    },
    {
      id: 2,
      code: "Qualidade",
    },
    {
      id: 3,
      code: "Processo",
    },
    {
      id: 4,
      code: "Logistica",
    },
    {
      id: 5,
      code: "Engenharia",
    },
  ];

  const userLevelOprions = [
    {
      id: 1,
      code: "Operador",
    },
    {
      id: 2,
      code: "Lider",
    },
    {
      id: 3,
      code: "Supervisor",
    },
    {
      id: 4,
      code: "Gestor",
    },
    {
      id: 5,
      code: "Administrador",
    },
    {
      id: 6,
      code: "Super Admin",
    },
  ];

  const groupsOprions = [
    {
      id: 1,
      code: "GP01",
    },
    {
      id: 2,
      code: "AJUDA_PROD_MF",
    },
    {
      id: 3,
      code: "AJUDA_MANUT",
    },
    {
      id: 4,
      code: "AJUDA_QUALI",
    },
    {
      id: 5,
      code: "AJUDA_PREP_MF",
    },
  ];

  const userOprions = [
    {
      id: 1,
      code: "JOÃO ANTONIO",
    },
    {
      id: 2,
      code: "MARIA ANTONIA",
    },
    {
      id: 3,
      code: "AMANDA SILVA",
    },
    {
      id: 4,
      code: "SILVIO RIBEIRO",
    },
    {
      id: 5,
      code: "FLAVIO MESQUITA",
    },
  ];

  function handleAddLevel() {
    // if (formCheckOR()) {
    //   toast.error('Nenhum campo de nivél foi selecionado');
    //   return;
    // }

    setCurrentEdit(null);
    const oldList = [...authFlowParams];
    const newLevel: any = {
      id: 0,
      level: authFlowParams.length + 1,
      departmentId: Number(departamentRef?.current?.id),
      levelAllowed: Number(userLevelRef?.current?.id),
      userGroups: [Number(groupRef?.current?.id)],
      users: [Number(userRef?.current?.id)],
      flowId: 0,
    };

    setAuthFlowParams([...oldList, newLevel]);
    setClearSelect(!clearSelect);
  }

  function handleSaveEdit() {
    // if (formCheckEditOR()) {
    //   toast.error('Nenhum campo de nivél na edição foi selecionado');
    //   return;
    // }

    const editLevelList = [...authFlowParams];
    editLevelList[currentEdit] = {
      id: Number(editLevelList[currentEdit].id),
      level: Number(editLevelList[currentEdit].level),
      departmentId: Number(editDepartamentRef?.current?.id),
      levelAllowed: Number(editUserLevelRef?.current?.id),
      userGroups: [Number(editGroupRef?.current?.id)],
      users: [Number(editUserRef?.current?.id)],
      flowId: 0,
    };
    setAuthFlowParams(editLevelList);
    setCurrentEdit(null);
  }

  function handleRemoveLevel(index: number) {
    const oldList = [...authFlowParams];
    oldList.splice(index, 1);
    setAuthFlowParams(oldList);
    setCurrentEdit(null);
  }

  return (
    <AuthLevelContainer>
      <span className="cnx-auth-level-span-cals">Adicionar Nível</span>
      <FixedFormContainer>
        <div className="cnx-auth-level-input-container-calic">
          <Input type="text" label="Nível" />
          <Select
            inputRef={departamentRef}
            keyLabel="code"
            keyValue="id"
            label="Setor"
            autoComplete
            options={departmentOprions}
            placeholder="Selecionar"
            clear={clearSelect}
          />
          <Select
            inputRef={userLevelRef}
            keyLabel="code"
            keyValue="id"
            label="Nível do usuário"
            autoComplete
            options={userLevelOprions}
            placeholder="Selecionar"
            clear={clearSelect}
          />
          <Select
            inputRef={groupRef}
            keyLabel="code"
            keyValue="id"
            label="Grupo"
            autoComplete
            options={groupsOprions}
            placeholder="Selecionar"
            clear={clearSelect}
          />
          <Select
            inputRef={userRef}
            keyLabel="code"
            keyValue="id"
            label="Usuário"
            autoComplete
            options={userOprions}
            placeholder="Selecionar"
            clear={clearSelect}
          />
        </div>
        <div className="cnx-auth-level-action-buttons-container-calabc">
          <button className="cnx-auth-level-action-button-calab" type="button">
            Limpar
          </button>
          <button
            className="cnx-auth-level-action-button-calab"
            type="button"
            onClick={() => handleAddLevel()}
          >
            Adicionar
          </button>
        </div>
      </FixedFormContainer>
      <DynamicFormContainer>
        {authFlowParams.map((item: any, index: number) => (
          <div
            className={
              currentEdit == index
                ? "cnx-auth-level-form-item-calfi"
                : "cnx-auth-level-form-item-calfi cnx-auth-level-background-disable-calbd"
            }
          >
            <HeaderActions>
              <button
                className="cnx-auth-level-header-action-button-calhab"
                type="button"
                onClick={() => setCurrentEdit(index)}
              >
                <SingleColumnEdit />
              </button>
              <button
                className="cnx-auth-level-header-action-button-calhab"
                type="button"
                onClick={() => handleRemoveLevel(index)}
              >
                <ChromeClose width="0.8rem" height="0.8rem" />
              </button>
            </HeaderActions>
            <div className="cnx-auth-level-input-container-calic">
              <Input
                type="text"
                label="Nível"
                value={index + 1}
                className="cnx-auth-level-minus-width-text-calmwt"
              />
              <Select
                inputRef={editDepartamentRef}
                disabled={currentEdit != index}
                keyLabel="code"
                keyValue="id"
                label="Setor"
                className="cnx-auth-level-minus-width-calmw"
                autoComplete
                options={departmentOprions}
                placeholder="Selecionar"
                defaultOption={item?.departmentId}
              />
              <Select
                inputRef={editUserLevelRef}
                disabled={currentEdit != index}
                keyLabel="code"
                keyValue="id"
                label="Nível do usuário"
                className="cnx-auth-level-minus-width-calmw"
                autoComplete
                options={userLevelOprions}
                placeholder="Selecionar"
                defaultOption={item?.levelAllowed}
              />
              <Select
                inputRef={editGroupRef}
                disabled={currentEdit != index}
                keyLabel="code"
                keyValue="id"
                label="Grupo"
                className="cnx-auth-level-minus-width-calmw"
                autoComplete
                options={groupsOprions}
                placeholder="Selecionar"
                defaultOption={item?.userGroups}
              />
              <Select
                inputRef={editUserRef}
                disabled={currentEdit != index}
                keyLabel="code"
                keyValue="id"
                label="Usuário"
                className="cnx-auth-level-minus-width-calmw"
                autoComplete
                options={userOprions}
                placeholder="Selecionar"
                defaultOption={item?.users}
              />
            </div>
            {currentEdit == index ? (
              <div className="cnx-auth-level-action-buttons-container-calabc">
                <button
                  className="cnx-auth-level-action-button-calab"
                  type="button"
                  onClick={() => setCurrentEdit(null)}
                >
                  Cancelar Edição
                </button>
                <button
                  className="cnx-auth-level-action-button-calab"
                  type="button"
                  onClick={() => handleSaveEdit()}
                >
                  Salvar Edição
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </DynamicFormContainer>
    </AuthLevelContainer>
  );
}
