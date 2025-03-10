import { useContext, useEffect, useId } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import Orders from "../../views/Orders";
import Operations from "../../views/Operations";
import OperationResults from "../../views/ElipseResults";
import AngeLiraResults from "../../views/AngeLiraResults";
import LogsResults from "../../views/LogsResults";
import "./styles.css";
interface INavigationContainer {
  cnxId?: any;
}
function NavigationContainer({ cnxId }: INavigationContainer) {
  const { dispacth, page, rowData } = useContext(UseContext);

  const setActivePage = (page: string) => {
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: page,
    });
  };

  const handleActivePage = (page: any) => {
    if (page === "orders") {
      document
        .getElementById(cnxId + "cnx-order-page-view")
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-operations-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-elipse-results-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-angeLira-results-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-logs-results-page-view")
        ?.classList.add("cnx-display-none");
    }
    if (page === "operations") {
      document
        .getElementById(cnxId + "cnx-order-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-operations-page-view")
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-elipse-results-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-angeLira-results-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-logs-results-page-view")
        ?.classList.add("cnx-display-none");
    }
    if (page === "elipseResults") {
      document
        .getElementById(cnxId + "cnx-order-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-operations-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-elipse-results-page-view")
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-angeLira-results-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-logs-results-page-view")
        ?.classList.add("cnx-display-none");
    }
    if (page === "angeLiraResults") {
      document
        .getElementById(cnxId + "cnx-order-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-operations-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-elipse-results-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-angeLira-results-page-view")
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-logs-results-page-view")
        ?.classList.add("cnx-display-none");
    }
    if (page === "logsResults") {
      document
        .getElementById(cnxId + "cnx-order-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-operations-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-elipse-results-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-angeLira-results-page-view")
        ?.classList.add("cnx-display-none");
      document
        .getElementById(cnxId + "cnx-logs-results-page-view")
        ?.classList.remove("cnx-display-none");
    }
  };

  useEffect(() => {
    handleActivePage(page);
    // dispacth({
    //   type: ACTIONS.SET_ELIPSE_RESULT_DATA,
    //   payload: null,
    // });
    // dispacth({
    //   type: ACTIONS.SET_ANGELIRA_RESULT_DATA,
    //   payload: null,
    // });
  }, [page]);
  return (
    <>
      <div className="cnx-groups-breadcrumbs-cgb">
        {page === "operations" ? (
          <>
            <span
              className="cnx-groups-crumb-groups-cgcg cnx-groups-hint-crumb-cghc"
              onClick={() => setActivePage("orders")}
            >
              Ordem de Produção /{" "}
            </span>
            <span
              className="cnx-groups-crumb-permissions-cgcp"
              onClick={() => setActivePage("operations")}
            >
              Operações
            </span>
          </>
        ) : null}
        {page === "elipseResults" ? (
          <>
            <span
              className="cnx-groups-crumb-groups-cgcg cnx-groups-hint-crumb-cghc"
              onClick={() => {
                setActivePage("orders");
              }}
            >
              Ordem de Produção /{" "}
            </span>
            {/* <span
              className="cnx-groups-crumb-permissions-cgcp cnx-groups-hint-crumb-cghc"
              onClick={() => {
                setActivePage("operations")
              }}
            >
              Operações /{" "}
            </span> */}
            <span
              className="cnx-groups-crumb-permissions-cgcp"
              onClick={() => setActivePage("elipseResults")}
            >
              Resultado Operações
            </span>
          </>
        ) : null}
        {page === "angeLiraResults" ? (
          <>
            <span
              className="cnx-groups-crumb-groups-cgcg cnx-groups-hint-crumb-cghc"
              onClick={() => {
                setActivePage("orders");
              }}
            >
              Ordem de Produção /{" "}
            </span>
            {/* <span
              className="cnx-groups-crumb-permissions-cgcp cnx-groups-hint-crumb-cghc"
              onClick={() => setActivePage("operations")}
            >
              Operações /{" "}
            </span> */}
            <span
              className="cnx-groups-crumb-permissions-cgcp"
              onClick={() => setActivePage("angeLiraResults")}
            >
              Resultado Transporte
            </span>
          </>
        ) : null}
        {page === "logsResults" ? (
          <>
            <span
              className="cnx-groups-crumb-groups-cgcg cnx-groups-hint-crumb-cghc"
              onClick={() => setActivePage("orders")}
            >
              Ordem de Produção /{" "}
            </span>
            {/* <span
              className="cnx-groups-crumb-permissions-cgcp cnx-groups-hint-crumb-cghc"
              onClick={() => setActivePage("operations")}
            >
              Operações /{" "}
            </span> */}
            <span
              className="cnx-groups-crumb-permissions-cgcp cnx-groups-hint-crumb-cghc"
              onClick={() => setActivePage("angeLiraResults")}
            >
              Resultado Transporte /{" "}
            </span>
            <span
              className="cnx-groups-crumb-permissions-cgcp"
              onClick={() => setActivePage("orderResults")}
            >
              Logs
            </span>
          </>
        ) : null}
      </div>
      <div id={cnxId + "cnx-order-page-view"} className={`cnx-order-page-view`}>
        <Orders cnxId={cnxId} />
      </div>
      <div
        id={cnxId + "cnx-operations-page-view"}
        className={`cnx-operations-page-view`}
      >
        <Operations />
      </div>
      <div
        id={cnxId + "cnx-angeLira-results-page-view"}
        className={`cnx-angeLira-results-page-view`}
      >
        <AngeLiraResults cnxId={cnxId} />
      </div>
      <div
        id={cnxId + "cnx-elipse-results-page-view"}
        className={`cnx-elipse-results-page-view`}
      >
        <OperationResults  cnxId={cnxId}/>
      </div>
      <div
        id={cnxId + "cnx-logs-results-page-view"}
        className={`cnx-logs-results-page-view`}
      >
        <LogsResults cnxId={cnxId} />
      </div>
      {/* {page === "orders" ? <Orders /> : null}
      {page === "operations" ? <Operations /> : null}
      {page === "elipseResults" ? <OperationResults /> : null}
      {page === "angeLiraResults" ? <AngeLiraResults /> : null}
      {page === "logsResults" ? <LogsResults /> : null} */}
    </>
  );
}

export default NavigationContainer;
