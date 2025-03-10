import { useContext } from "react";
import { UseContext } from "../context/moduleContext";
import { ACTIONS } from "../context/moduleActions";
import Base from '../Views/Main';
import "./styles.css";

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
      <div className="cnx-logistic-monitoring-breadcrumbs-clcb">
        {page === "main" ? (
          <>
            {/* <span
              className="cnx-logistic-monitoring-crumb-logistic-monitoring-clccl"
              onClick={() => setActivePage("main")}
            >
              Painel Monitoramento Logístico
            </span> */}
          </>
        ) : null}
      </div>
      {page === "main" ? <Base /> : null}
    </>
  );
}

export default NavigationContainer;
