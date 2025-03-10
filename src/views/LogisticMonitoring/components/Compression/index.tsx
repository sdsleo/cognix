import "./styles.css";
import { useEffect, useId, useState, useContext, useLayoutEffect } from "react";
import MiniExpandMirrored from "../../../../assets/icons/FluentUI/SVGs/MiniExpandMirrored";
import MiniContractMirrored from "../../../../assets/icons/FluentUI/SVGs/MiniContractMirrored";
import {
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
  PlaybackRate1xIcon,
  RefreshIcon,
  RemoveOccurrenceIcon,
} from "@fluentui/react-icons-mdl2";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { axiosInstance } from "../../../../http/axiosInstance";
import { _GET, _GET_BASE } from "../../routes";
import { CnxTable } from "../../../../components/CnxTable";
import useFormatTimeOnly from "../../../../hooks/useFormatTimeOnly";

function Compression() {
  const { dispacth, loading, baseId, baseName, baseData, autoRefresh, timeToRefresh }: any =
    useContext(UseContext);

  async function getBases(id: any) {
    dispacth({
      type: ACTIONS.LOADING,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET_BASE(id));

      dispacth({
        type: ACTIONS.SET_BASE_DATA,
        payload: data,
      });
    } catch (err: any) {
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING,
        payload: false,
      });
    }
  }

  useEffect(() => {
    if (autoRefresh) {
      const intervalId = setInterval(() => {
        getBases(baseId);
      }, timeToRefresh);
      return () => {
        clearInterval(intervalId);
      };
    } 
    getBases(baseId);
  }, [autoRefresh]);

  const today = new Date();

  const CNX_ID = useId();
  const openFullScreenView = () => {
    const element: any = document.getElementById(CNX_ID);
    element
      .requestFullscreen()
      .then(function () {
        // element has entered fullscreen mode successfully
      })
      .catch(function (error: any) {
        // element could not enter fullscreen mode
        // error message
        console.log(error.message);
      });
  };
  const closeFullScreenView = () => {
    document
      .exitFullscreen()
      .then(function () {
        // element has exited fullscreen mode
      })
      .catch(function (error) {
        // element could not exit fullscreen mode
        // error message
        console.log(error.message);
      });
  };

  function fullscreenchanged(event: any) {
    if (document.fullscreenElement) {
      document
        .getElementById(
          `cnx-logistic-monitoring-comp-contract-button-clmeb-${CNX_ID}`
        )
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(
          `cnx-logistic-monitoring-comp-expand-button-clmeb-${CNX_ID}`
        )
        ?.classList.add("cnx-display-none");
    } else {
      document
        .getElementById(
          `cnx-logistic-monitoring-comp-contract-button-clmeb-${CNX_ID}`
        )
        ?.classList.add("cnx-display-none");
      document
        .getElementById(
          `cnx-logistic-monitoring-comp-expand-button-clmeb-${CNX_ID}`
        )
        ?.classList.remove("cnx-display-none");
    }
  }

  const head = {
    start: "Inicio",
    destination: "Destino",
    plate: "Placa",
    orderNumber: "Ordem",
    tramo: "Tramo",
  };

  const customTdFunction = [
    {
      key: "start",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {useFormatTimeOnly(
              rowValue?.orderProductions[0]?.orderProductionOperation
                ?.scheduleStartDateTime
            )}
          </span>
        );
      },
    },
    {
      key: "destination",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.client?.name}
          </span>
        );
      },
    },
    {
      key: "plate",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.orderCustom?.customVehicle?.plate}
          </span>
        );
      },
    },
    {
      key: "orderNumber",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.orderNumber}
          </span>
        );
      },
    },
    {
      key: "tramo",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {
              rowValue?.orderProductions[0]?.orderProductionOperation?.resource
                ?.code
            }
          </span>
        );
      },
    },
  ];

  function customTable1() {
    return (
      <div className="cnx-custom-summary-header-table-ccsht">
        <span>Ordens Planejadas - {today.toLocaleDateString()}</span>
      </div>
    );
  }
  function customTable2() {
    return (
      <div className="cnx-custom-summary-header-table-ccsht">
        <span>Ordens Executadas - {today.toLocaleDateString()}</span>
      </div>
    );
  }

  return (
    <div
      id={CNX_ID}
      className="cnx-logistic-monitoring-comp-main-container-clmmc"
    >
      {loading ? (
        <div className="cnx-logistic-control-loading-view-clclv">
          <h1>Carregando...</h1>
        </div>
      ) : null}
      <button
        type="button"
        className="cnx-left-button-nav-crbv"
        onClick={() => {
          dispacth({
            type: ACTIONS.SET_ACTIVE_PAGE,
            payload: "main",
          });
        }}
      >
        <ChevronLeftSmallIcon className="cnx-icon" />
      </button>
      <button
        type="button"
        className="cnx-right-button-nav-crbv"
        onClick={() => {
          dispacth({
            type: ACTIONS.SET_ACTIVE_PAGE,
            payload: "main",
          });
        }}
      >
        <ChevronRightSmallIcon className="cnx-icon" />
      </button>
      <header className="cnx-logistic-monitoring-comp-header-clmh">
        <div />
        <span>{baseName}</span>
        <div className="cnx-logistic-monitoring-comp-actions-container-clmac">
          <button
            title={
              autoRefresh
                ? "Desativar atualização automática"
                : "Atualizar a cada 30s"
            }
            id={`cnx-logistic-monitoring-expand-button-clmeb-${CNX_ID}`}
            type="button"
            className="cnx-logistic-monitoring-header-window-button-clmhwb"
            onClick={() => {
              dispacth({
                type: ACTIONS.AUTO_REFRESH,
                payload: !autoRefresh,
              });
            }}
          >
            {autoRefresh ? (
              <RemoveOccurrenceIcon className="cnx-logistic-monitoring-highlight-refresh" />
            ) : (
              <PlaybackRate1xIcon className="cnx-logistic-monitoring-header-refresh" />
            )}
          </button>
          <button
            title="Atualizar"
            id={`cnx-logistic-monitoring-comp-expand-button-clmeb-${CNX_ID}`}
            type="button"
            className="cnx-logistic-monitoring-comp-header-window-button-clmhwb"
            onClick={() => getBases(baseId)}
          >
            <RefreshIcon className="cnx-logistic-monitoring-comp-header-refresh" />
          </button>
          <button
            title="Expandir"
            id={`cnx-logistic-monitoring-comp-expand-button-clmeb-${CNX_ID}`}
            type="button"
            className="cnx-logistic-monitoring-comp-header-window-button-clmhwb"
            onClick={() => openFullScreenView()}
          >
            <MiniExpandMirrored
              className="cnx-logistic-monitoring-comp-header-window-svg-clmhws"
              width="1.2rem"
              height="1.2rem"
            />
          </button>
        </div>

        <button
          id={`cnx-logistic-monitoring-comp-contract-button-clmeb-${CNX_ID}`}
          className="cnx-display-none cnx-logistic-monitoring-comp-header-window-button-clmhwb"
          type="button"
          onClick={() => closeFullScreenView()}
        >
          <MiniContractMirrored
            className="cnx-logistic-monitoring-comp-header-window-svg-clmhws"
            width="1.2rem"
            height="1.2rem"
          />
        </button>
      </header>
      {!loading ? (
        <>
          <div className="cnx-logistic-monitoring-comp-summary-container-clmccc">
            <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Ordens Executadas
              </span>
              <span className="cnx-summary-results-value-csrv">
                {baseData?.totalOrdensExecutadas || 0}
              </span>
            </div>
            <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Ordens Canceladas
              </span>
              <span className="cnx-summary-results-value-csrv">
                {baseData?.totalOrdensCanceladas || 0}
              </span>
            </div>
            <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Ordens Congeladas
              </span>
              <span className="cnx-summary-results-value-csrv">
                {baseData?.totalOrdensCongeladas || 0}
              </span>
            </div>
            <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Volume Comprimido
              </span>
              <span className="cnx-summary-results-value-csrv">
                {baseData?.volumeComprimido || 0} m³
              </span>
            </div>
            <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Eficiência Logística
              </span>
              <span className="cnx-summary-results-value-csrv">0 %</span>
            </div>
            <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Tempo Médio - Carregamento
              </span>
              <span className="cnx-summary-results-value-csrv">0</span>
            </div>
            <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Tempo Médio - Fila
              </span>
              <span className="cnx-summary-results-value-csrv">0</span>
            </div>
          </div>
          <>
            <div className="cnx-logistic-monitoring-comp-left-volume-container-clmlvc">
              <div className="cnx-table-background-title-ctbt">
                {baseData?.ordensPlanejadas?.length <= 0 ? (
                  <span className="cnx-no-results">Sem resultados</span>
                ) : null}
                <CnxTable
                  data={baseData?.ordensPlanejadas || []}
                  head={head}
                  noSearchBar
                  customSummary={customTable1()}
                  customTdFunction={customTdFunction}
                />
              </div>
            </div>
            <div className="cnx-logistic-monitoring-comp-right-volume-container-clmrvc">
              <div className="cnx-table-background-title-ctbt">
                {baseData?.ordensEncerradas?.length <= 0 ? (
                  <span className="cnx-no-results">Sem resultados</span>
                ) : null}
                <CnxTable
                  data={baseData?.ordensEncerradas || []}
                  head={head}
                  noSearchBar
                  customSummary={customTable2()}
                  customTdFunction={customTdFunction}
                />
              </div>
            </div>
          </>
        </>
      ) : null}
    </div>
  );
}

export default Compression;
