import { useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import BasesAndClients from '../BasesAndClients';
import Compression from '../Compression';
import CompressionGantt from '../CompressionGantt';
import Decompression from '../Decompression';
import DecompressionGantt from '../DecompressionGantt';
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
        {page === "comp" ? (
          <>
            <span
              className="cnx-logistic-monitoring-crumb-logistic-monitoring-clccl cnx-logistic-monitoring-hint-crumb-clchc"
              onClick={() => setActivePage("main")}
            >
              Monitoramento Logístico /{" "}
            </span>
            <span
              className="cnx-logistic-monitoring-crumb-permissions-clccp"
              onClick={() => setActivePage("comp")}
            >
              Base /{" "}
            </span>
            {/* <span
              className="cnx-logistic-monitoring-crumb-logistic-monitoring-clccl cnx-logistic-monitoring-hint-crumb-clchc"
              onClick={() => setActivePage("compgantt")}
            >
              Gantt
            </span> */}
          </>
        ) : null}
        {/* {page === "compgantt" ? (
          <>
            <span
              className="cnx-logistic-monitoring-crumb-logistic-monitoring-clccl cnx-logistic-monitoring-hint-crumb-clchc"
              onClick={() => setActivePage("main")}
            >
              Monitoramento Logístico /{" "}
            </span>
            <span
              className="cnx-logistic-monitoring-crumb-permissions-clccp cnx-logistic-monitoring-hint-crumb-clchc"
              onClick={() => setActivePage("comp")}
            >
              Base /{" "}
            </span>
            <span
              className="cnx-logistic-monitoring-crumb-logistic-monitoring-clccl "
              onClick={() => setActivePage("compgantt")}
            >
              Gantt
            </span>
          </>
        ) : null} */}
        {/* {page === "decompgantt" ? (
          <>
            <span
              className="cnx-logistic-monitoring-crumb-logistic-monitoring-clccl cnx-logistic-monitoring-hint-crumb-clchc"
              onClick={() => setActivePage("main")}
            >
              Monitoramento Logístico /{" "}
            </span>
            <span
              className="cnx-logistic-monitoring-crumb-permissions-clccp"
              onClick={() => setActivePage("decomp")}
            >
              Gantt
            </span>
          </>
        ) : null} */}
      </div>
      {page === "main" ? <BasesAndClients /> : null}
      {page === "comp" ? <Compression /> : null}
      {/* {page === "compgantt" ? <CompressionGantt /> : null} */}
      {/* {page === "decompgantt" ? <DecompressionGantt /> : null} */}
      {page === "decomp" ? <Decompression /> : null}
    </>
  );
}

export default NavigationContainer;
