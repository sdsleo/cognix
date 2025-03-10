import { useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { MainView } from "../../views/MainView";
import Events from "../../views/Events";
import "./styles.css";
import Carretas from "../../views/Carretas";
import Horses from "../../views/Horses";

function NavigationContainer() {
  const { dispacth, page } = useContext(UseContext);
  const setActivePage = (page: string) => {
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: page,
    });
  };
  return (
    <>
      <div className="cnx-logistic-control-breadcrumbs-clcb">
        {page === "main" ? (
          <>
            <span
              className="cnx-logistic-control-crumb-logistic-control-clccl"
              onClick={() => setActivePage("main")}
            >
              Controle Logístico
            </span>
          </>
        ) : null}
        {page === "events" ? (
          <>
            <span
              className="cnx-logistic-control-crumb-logistic-control-clccl cnx-logistic-control-hint-crumb-clchc"
              onClick={() => setActivePage("main")}
            >
              Controle Logístico /{" "}
            </span>
            <span
              className="cnx-logistic-control-crumb-permissions-clccp"
              onClick={() => setActivePage("events")}
            >
              Eventos
            </span>
          </>
        ) : null}
        {page === "carretas" ? (
          <>
            <span
              className="cnx-logistic-control-crumb-logistic-control-clccl cnx-logistic-control-hint-crumb-clchc"
              onClick={() => setActivePage("main")}
            >
              Controle Logístico /{" "}
            </span>
            <span
              className="cnx-logistic-control-crumb-permissions-clccp"
              onClick={() => setActivePage("events")}
            >
              Carretas
            </span>
          </>
        ) : null}
        {page === "horses" ? (
          <>
            <span
              className="cnx-logistic-control-crumb-logistic-control-clccl cnx-logistic-control-hint-crumb-clchc"
              onClick={() => setActivePage("main")}
            >
              Controle Logístico /{" "}
            </span>
            <span
              className="cnx-logistic-control-crumb-permissions-clccp"
              onClick={() => setActivePage("horses")}
            >
              Localização Cavalos
            </span>
          </>
        ) : null}
      </div>
      {page === "main" ? <MainView /> : null}
      {page === "events" ? <Events /> : null}
      {page === "carretas" ? <Carretas /> : null}
      {page === "horses" ? <Horses /> : null}
    </>
  );
}

export default NavigationContainer;
