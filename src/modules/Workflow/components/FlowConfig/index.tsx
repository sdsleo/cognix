import { useRef } from "react";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import "./styles.css";

function FlowConfig() {
  const inputRef = useRef();
  return (
    <div className="cnx-workflow-config-cwc">
      <div className="cnx-workflow-header-actions-cwha">
        <button className="cnx-workflow-header-button-cwhb">Salvar</button>
      </div>
      <div className="cnx-workflow-form-container-cwfc">
        <div className="cnx-workflow-form-content-cwfc">
          <div className="cnx-workflow-form-top-cwft">
            <Input inputRef={inputRef} type="text" label="Código" />
            <Input inputRef={inputRef} type="text" label="Nome" />
            <Input inputRef={inputRef} type="text" label="Revisão" />
            <Input inputRef={inputRef} type="text" label="Ultima atualização" />
          </div>
          <div className="cnx-workflow-form-bottom-cwfb">
            <Input
              inputRef={inputRef}
              type="textarea"
              label="Descrição"
              className="cnx-text-area-flow-size"
              textAreaRows={8}
              textAreaWidth="830px"
            />
          </div>
        </div>
        <div className="cnx-workflow-flow-status-container-cwfsc">
          <div className="cnx-workflow-status-cws cnx-cws-created-ccc">
            <span className="cnx-flow-status-date-cfsd">10/05/2023 - 13:00:00</span>
            <div className="cnx-flow-status-line-cfsl" />
            <div className="cnx-flow-status-circle-cfsc cnx-circle-1">1</div>
            <span className="cnx-flow-status-label-cfsl">CRIADO</span>
          </div>
          <div className="cnx-workflow-status-cws cnx-cws-reviewed-ccr">
            <span className="cnx-flow-status-date-cfsd">10/05/2023 - 14:05:00</span>
            <div className="cnx-flow-status-line-cfsl" />
            <div className="cnx-flow-status-circle-cfsc cnx-circle-2" >2</div>
            <span className="cnx-flow-status-label-cfsl">REVISADO</span>
          </div>
          <div className="cnx-workflow-status-cws cnx-cws-released-ccr">
            <span className="cnx-flow-status-date-cfsd">10/05/2023 - 15:15:00</span>
            <div className="cnx-flow-status-line-cfsl" />
            <div className="cnx-flow-status-circle-cfsc cnx-circle-3">3</div>
            <span className="cnx-flow-status-label-cfsl">LIBERADO</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowConfig;
