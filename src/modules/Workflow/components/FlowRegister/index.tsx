import { useState, useId, useRef, useEffect, useContext } from "react";
import "./styles.css";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { Select } from "../../../../components/CnxInput";
import Form from "./components/Form";
import { CNX_DND } from "./components/DragDropList";

function FlowRegister() {
  const { dispacth } = useContext(UseContext);
  const revisionRef = useRef({});

  const head = {
    code: 'Código',
    name: 'Nome',
    description: 'Descrição'
  }
  const keys1 = [
    {
      id: 1,
      number: 1,
      latestUpdate: "12/05/2023 - 14:30:05",
      executionMode: 1,
      operationId: 1,
      operationName: "OP10",
      workflowId: 1,
      isActived: 1
    }, 
    {
      id: 2,
      number: 2,
      latestUpdate: "12/05/2023 - 15:40:05",
      executionMode: 1,
      operationId: 3,
      operationName: "OP30",
      workflowId: 1,
      isActived: 2
    }, 
    {
      id: 3,
      number: 3,
      latestUpdate: "11/05/2023 - 11:30:05",
      executionMode: 1,
      operationId: 5,
      operationName: "OP50",
      workflowId: 1,
      isActived: 1
    }, 
    {
      id: 4,
      number: 4,
      latestUpdate: "10/05/2023 - 11:10:05",
      executionMode: 1,
      operationId: 2,
      operationName: "OP20",
      workflowId: 1,
      isActived: 1
    }, 
  ];
  const [keys, setKeys] = useState(keys1)

  return (
    <div className="cnx-workflow-register-container-cwrc">
      <div className="cnx-workflow-register-header-cwrh">
        <div className="cnx-workflow-register-left-section-cwrls">
          <span className="cnx-workflow-register-left-section-title-cwrlst">Roteriro de Abastecimento</span>
          <Select
            inputRef={revisionRef}
            keyLabel="label"
            keyValue="id"
            label="Revisão"
            defaultOption={1}
            options={[
              { id: 1, label: "01" },
              { id: 2, label: "02" },
              { id: 3, label: "03" },
            ]}
            placeholder="Selecionar"
          />
        </div>
        <div className="cnx-workflow-register-right-section-cwrrs">

        </div>
      </div>
      <div className="cnx-workflow-register-drag-drop-list-cwrddl">
      <CNX_DND
          keys={keys}
          setKeys={setKeys}
        />
      </div>
      <Form />
    </div>
  );
}

export default FlowRegister;
