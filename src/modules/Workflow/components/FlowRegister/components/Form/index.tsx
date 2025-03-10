import { useState, useRef, useEffect, useContext, useId } from "react";
import { UseContext } from "../../../../context/moduleContext";
import { ACTIONS } from "../../../../context/moduleActions";

import CnxFormModal from "../../../../../../components/CnxFormModal";
import Input from "../../../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../../../components/CnxInput/InputTypes/Select";
import './styles.css';


function Form() {
  const { dispacth } = useContext(UseContext);
  const inputRef = useRef(null)
  const selectRef = useRef({})


  return (
      <CnxFormModal
        saving={false}
        title="Adicionar Operação"
        open={true}
        saveButton={() => null}
        clearButton={() => null}
        formInputs={
          <>
            <Input
              inputRef={inputRef}
              type="text"
              label="id"
              mandatory
            />
            <Input
              inputRef={inputRef}
              type="text"
              label="Número"
              mandatory
            />
            <Select
              inputRef={selectRef}
              keyLabel="code"
              keyValue="id"
              label="Modo de execução"
              mandatory
              options={[
                { id: 1, code: "Ativo" },
                { id: 2, code: "Inativo" },
              ]}
              placeholder="Selecionar"
            />
            <Select
              inputRef={selectRef}
              keyLabel="code"
              keyValue="id"
              label="Operações"
              mandatory
              options={[
                { id: 1, code: "OP10" },
                { id: 2, code: "OP20" },
                { id: 3, code: "OP30" },
                { id: 4, code: "OP40" },
                { id: 5, code: "OP50" },
              ]}
              placeholder="Selecionar"
            />
            <div className="cnx-flow-register-is-actived-checked-cfriac">
              <span>Ativo</span><input type="checkbox" defaultChecked />
            </div>
          </>
        }
        formParameters={<></>}

      />
  );
}

export default Form;
