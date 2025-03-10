import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import FlowList from "../FlowList";
import FlowConfig from "../FlowConfig";
import FlowRegister from "../FlowRegister";
import "./styles.css";

function NavigationContainer() {
  const { dispacth, page } = useContext(UseContext);
  const setActivePage = (page: string) => {
    // if (page === 'user') {
    //     document.querySelector('.cnx-user-crumb-skills-cucs')?.classList.add('cnx-display-none');
    //     document.querySelector('.cnx-user-crumb-historic-cuch')?.classList.remove('cnx-display-none')
    // }
    // if (page === 'skills') {
    //     document.querySelector('.cnx-user-crumb-historic-cuch')?.classList.add('cnx-display-none');
    // }
    // if (page === 'historic') {
    //     document.querySelector('.cnx-user-crumb-historic-cuch')?.classList.remove('cnx-display-none');
    // }
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: page,
    });
  };
  return (
    <>
      <div className="cnx-breadcrumbs-container-cbc">
        {page === "flowList" ? (
          <>
            <span
              className="cnx-user-crumb-user-cucu"
              onClick={() => setActivePage("flowList")}
            >
              Lista Roteiros{" "}
            </span>
          </>
        ) : null}
        {page === "flowConfig" ? (
          <>
            <span
              className="cnx-user-crumb-user-cucu cnx-user-hint-crumb-cuhc"
              onClick={() => setActivePage("flowList")}
            >
              Lista Roteiros /{" "}
            </span>
            <span
              className="cnx-user-crumb-skills-cucs"
              onClick={() => setActivePage("flowConfig")}
            >
              Configuração
            </span>
            <span
              className="cnx-user-crumb-historic-cuch cnx-user-hint-crumb-cuhc"
              onClick={() => setActivePage("flowRegister")}
            >
              {" "}
              / Cadastro de Roteiro
            </span>
          </>
        ) : null}
        {page === "flowRegister" ? (
          <>
            <span
              className="cnx-user-crumb-user-cucu cnx-user-hint-crumb-cuhc"
              onClick={() => setActivePage("flowList")}
            >
              Lista Roteiros /{" "}
            </span>
            <span
              className="cnx-user-crumb-skills-cucs cnx-user-hint-crumb-cuhc"
              onClick={() => setActivePage("flowConfig")}
            >
              Configuração
            </span>
            <span
              className="cnx-user-crumb-historic-cuch"
              onClick={() => setActivePage("flowRegister")}
            >
              {" "}
              / Cadastro de Roteiro
            </span>
          </>
        ) : null}
      </div>
      {page === "flowList" ? <FlowList /> : null}
      {page === "flowConfig" ? <FlowConfig /> : null}
      {page === "flowRegister" ? <FlowRegister /> : null}
    </>
  );
}

export default NavigationContainer;
