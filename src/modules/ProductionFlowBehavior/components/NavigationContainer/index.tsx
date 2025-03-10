import { useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import Main from '../Main';
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
      <div className="cnx-travel-dashboard-breadcrumbs-clcb">
        {page === "main" ? (
          <>
            {/* <span
              className="cnx-travel-dashboard-crumb-travel-dashboard-clccl"
              onClick={() => setActivePage("main")}
            >
              Painel Monitoramento Logístico
            </span> */}
          </>
        ) : null}
        {/* {page === "comp" ? (
          <>
            <span
              className="cnx-travel-dashboard-crumb-travel-dashboard-clccl cnx-travel-dashboard-hint-crumb-clchc"
              onClick={() => setActivePage("main")}
            >
              Monitoramento Logístico /{" "}
            </span>
            <span
              className="cnx-travel-dashboard-crumb-permissions-clccp"
              onClick={() => setActivePage("comp")}
            >
              Base /{" "}
            </span>
            <span
              className="cnx-travel-dashboard-crumb-travel-dashboard-clccl cnx-travel-dashboard-hint-crumb-clchc"
              onClick={() => setActivePage("compgantt")}
            >
              Gantt
            </span>
          </>
        ) : null}
        {page === "compgantt" ? (
          <>
            <span
              className="cnx-travel-dashboard-crumb-travel-dashboard-clccl cnx-travel-dashboard-hint-crumb-clchc"
              onClick={() => setActivePage("main")}
            >
              Monitoramento Logístico /{" "}
            </span>
            <span
              className="cnx-travel-dashboard-crumb-permissions-clccp cnx-travel-dashboard-hint-crumb-clchc"
              onClick={() => setActivePage("comp")}
            >
              Base /{" "}
            </span>
            <span
              className="cnx-travel-dashboard-crumb-travel-dashboard-clccl "
              onClick={() => setActivePage("compgantt")}
            >
              Gantt
            </span>
          </>
        ) : null}
        {page === "decompgantt" ? (
          <>
            <span
              className="cnx-travel-dashboard-crumb-travel-dashboard-clccl cnx-travel-dashboard-hint-crumb-clchc"
              onClick={() => setActivePage("main")}
            >
              Monitoramento Logístico /{" "}
            </span>
            <span
              className="cnx-travel-dashboard-crumb-permissions-clccp"
              onClick={() => setActivePage("decomp")}
            >
              Gantt
            </span>
          </>
        ) : null} */}
      </div>
      {page === "main" ? <Main /> : null}
      {/* {page === "comp" ? <Compression /> : null}
      {page === "compgantt" ? <CompressionGantt /> : null}
      {page === "decompgantt" ? <DecompressionGantt /> : null}
      {page === "decomp" ? <Decompression /> : null} */}
    </>
  );
}

export default NavigationContainer;
