import "./styles.css";
import { useEffect, useId, useState, useContext, useLayoutEffect } from "react";
import MiniExpandMirrored from "../../../../assets/icons/FluentUI/SVGs/MiniExpandMirrored";
import MiniContractMirrored from "../../../../assets/icons/FluentUI/SVGs/MiniContractMirrored";

import {
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
  MiniContractIcon,
  MiniExpandIcon,
  PlaybackRate1xIcon,
  RefreshIcon,
  RemoveOccurrenceIcon,
} from "@fluentui/react-icons-mdl2";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { axiosInstance } from "../../../../http/axiosInstance";
import {
  _GET,
  _GET_GANTT,
  _GET_GANTT_CLIENT,
  _GET_GANTT_CLIENT_TRANSPORT,
} from "../../routes";
import { CnxTable } from "../../../../components/CnxTable";
import ReactApexChart from "react-apexcharts";
import useFormatTimeOnly from "../../../../hooks/useFormatTimeOnly";

function DecompressionGantt() {
  const {
    dispacth,
    loading,
    baseId,
    clientId,
    clientName,
    baseData,
    ganttData,
    viewModeClient,
    timeToRefresh,
    autoRefresh,
  }: any = useContext(UseContext);

  const [newGantt, setNewGantt] = useState([]);

  async function getGantt(id: any) {
    dispacth({
      type: ACTIONS.LOADING,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET_GANTT_CLIENT(id));
      dispacth({
        type: ACTIONS.SET_GANTT_DATA,
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
  async function getTransportGantt(id: any) {
    dispacth({
      type: ACTIONS.LOADING,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET_GANTT_CLIENT_TRANSPORT(id));
      dispacth({
        type: ACTIONS.SET_GANTT_DATA,
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

  useLayoutEffect(() => {
    if (viewModeClient === "decomp") {
      if (autoRefresh) {
        const intervalId = setInterval(() => {
          getGantt(clientId);
        }, timeToRefresh);
        return () => {
          clearInterval(intervalId);
        };
      }
      getGantt(clientId);
    }
    if (viewModeClient === "return-transport") {
      if (autoRefresh) {
        const intervalId = setInterval(() => {
          getTransportGantt(clientId);
        }, timeToRefresh);
        return () => {
          clearInterval(intervalId);
        };
      }
      getTransportGantt(clientId);
    }
  }, [clientId, viewModeClient, autoRefresh]);

  const handleToGantt = (data: any) => {
    const newData = data?.map((item: any) => {
      return {
        x: item?.orderCustom?.customVehicle?.plate,
        y: [
          new Date(
            viewModeClient === "decomp"
              ? item?.orderProductions[0]?.orderProductionOperation
                  ?.scheduleStartDateTime
              : item?.orderProductions[0]?.orderProductionOperation
                  ?.scheduleStartDateTime
          ).getTime(),
          new Date(
            viewModeClient === "decomp"
              ? item?.orderProductions[0]?.orderProductionOperation
                  ?.scheduleFinishDateTime
              : item?.orderProductions[0]?.orderProductionOperation
                  ?.scheduleFinishDateTime
          ).getTime(),
        ],
      };
    });
    setNewGantt(newData);
  };

  useEffect(() => {
    handleToGantt(ganttData?.ordensPlanejadas);
  }, [ganttData]);

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
          `cnx-logistic-monitoring-decomp-gantt-contract-button-clmeb-${CNX_ID}`
        )
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(
          `cnx-logistic-monitoring-decomp-gantt-expand-button-clmeb-${CNX_ID}`
        )
        ?.classList.add("cnx-display-none");
    } else {
      document
        .getElementById(
          `cnx-logistic-monitoring-decomp-gantt-contract-button-clmeb-${CNX_ID}`
        )
        ?.classList.add("cnx-display-none");
      document
        .getElementById(
          `cnx-logistic-monitoring-decomp-gantt-expand-button-clmeb-${CNX_ID}`
        )
        ?.classList.remove("cnx-display-none");
    }
  }

  function customTable1() {
    return (
      <div className="cnx-custom-summary-header-table-ccsht">
        <span>Ordens Planejadas</span>
      </div>
    );
  }
  function customTable2() {
    return (
      <div className="cnx-custom-summary-header-table-ccsht">
        <span>Ordens Planejadas</span>
      </div>
    );
  }

  const handleExpandGannt = () => {
    document
      .querySelector(".cnx-gantt-background-title-expanded-ctbt")
      ?.classList.remove("cnx-display-none");
  };
  const handleMiniGannt = () => {
    document
      .querySelector(".cnx-gantt-background-title-expanded-ctbt")
      ?.classList.add("cnx-display-none");
  };

  const head = {
    start: "Inicio",
    destination: "Destino",
    horse: "Placa do Cavalo",
    plate: "Placa da Carreta",
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
              viewModeClient === "decomp"
                ? rowValue?.orderProductions[0]?.orderProductionOperation
                    ?.scheduleStartDateTime
                : rowValue?.orderProductions[0]?.orderProductionOperation
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
      key: "horse",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {
              rowValue?.orderProductions[0]?.orderProductionOperation
                ?.customCavalo?.plate
            }
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
            {viewModeClient === "decomp"
              ? rowValue?.orderProductions[0]?.orderProductionOperation
                  ?.resource?.code
              : rowValue?.orderProductions[0]?.orderProductionOperation
                  ?.resource?.code}
          </span>
        );
      },
    },
  ];

  return (
    <div
      id={CNX_ID}
      className="cnx-logistic-monitoring-decomp-gantt-main-container-clmmc"
    >
      <div className="cnx-gantt-background-title-expanded-ctbt cnx-display-none">
        <button
          className="cnx-gantt-button-expand"
          onClick={() => handleMiniGannt()}
        >
          <MiniContractIcon />
        </button>
        <ReactApexChart
          options={{
            chart: {
              type: "rangeBar",
              background: "#2d2d2d",
              zoom: {
                enabled: true,
              },
              foreColor: "#eeeeee",
              toolbar: {
                show: true,
                offsetX: -30,
                offsetY: 10,
                tools: {
                  download: true,
                  selection: true,
                  zoom: true,
                  zoomin: true,
                  zoomout: true,
                  pan: true,
                  reset: true,
                  customIcons: [],
                },
                export: {
                  csv: {
                    filename: "Gantt",
                    columnDelimiter: ",",
                    headerCategory: "category",
                    headerValue: "value",
                    // dateFormatter(timestamp: any) {
                      //   return new Date(timestamp).toLocaleDateString();
                      // },
                  },
                  svg: {
                    filename: "Gantt",
                  },
                  png: {
                    filename: "Gantt",
                  },
                },
                autoSelected: "zoom",
              },
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            grid: {
              show: false,
            },

            tooltip: {
              enabled: false,
            },

            xaxis: {
              type: "datetime",
              labels: {
                datetimeUTC: false,
              },
            },
          }}
          series={[
            {
              data: newGantt,
            },
          ]}
          type="rangeBar"
          height={"100%"}
          width={"99%"}
        />
      </div>

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
      <header className="cnx-logistic-monitoring-decomp-gantt-header-clmh">
        <div />
        <span>{clientName}</span>
        <div className="cnx-logistic-monitoring-decomp-gantt-actions-container-clmac">
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
            id={`cnx-logistic-monitoring-decomp-gantt-expand-button-clmeb-${CNX_ID}`}
            type="button"
            className="cnx-logistic-monitoring-decomp-gantt-header-window-button-clmhwb"
            onClick={() =>
              viewModeClient === "decomp"
                ? getGantt(clientId)
                : getTransportGantt(clientId)
            }
          >
            <RefreshIcon className="cnx-logistic-monitoring-decomp-gantt-header-refresh" />
          </button>
          <button
            title="Expandir"
            id={`cnx-logistic-monitoring-decomp-gantt-expand-button-clmeb-${CNX_ID}`}
            type="button"
            className="cnx-logistic-monitoring-decomp-gantt-header-window-button-clmhwb"
            onClick={() => openFullScreenView()}
          >
            <MiniExpandMirrored
              className="cnx-logistic-monitoring-decomp-gantt-header-window-svg-clmhws"
              width="1.2rem"
              height="1.2rem"
            />
          </button>
        </div>

        <button
          id={`cnx-logistic-monitoring-decomp-gantt-contract-button-clmeb-${CNX_ID}`}
          className="cnx-display-none cnx-logistic-monitoring-decomp-gantt-header-window-button-clmhwb"
          type="button"
          onClick={() => closeFullScreenView()}
        >
          <MiniContractMirrored
            className="cnx-logistic-monitoring-decomp-gantt-header-window-svg-clmhws"
            width="1.2rem"
            height="1.2rem"
          />
        </button>
      </header>
      <div className="cnx-logistic-monitoring-decomp-gantt-view-container-clmcvc">
        <div className="cnx-logistic-control-select-view-button-container-clcsvbc">
          <button
            type="button"
            className={`cnx-logistic-monitoring-view-button-clcsvb ${
              viewModeClient === "decomp"
                ? "cnx-bottom-highlight-selector-cbhs"
                : ""
            }`}
            onClick={() => {
              dispacth({
                type: ACTIONS.SET_VIEW_MODE_CLIENT,
                payload: "decomp",
              });
            }}
          >
            Descompressão
          </button>
          <button
            type="button"
            className={`cnx-logistic-monitoring-view-button-clcsvb ${
              viewModeClient === "return-transport"
                ? "cnx-bottom-highlight-selector-cbhs"
                : ""
            }`}
            onClick={() => {
              dispacth({
                type: ACTIONS.SET_VIEW_MODE_CLIENT,
                payload: "return-transport",
              });
            }}
          >
            Transporte de retorno
          </button>
        </div>
      </div>
      {!loading ? (
        <>
          <div className="cnx-logistic-monitoring-decomp-gantt-summary-container-clmccc">
            <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Ordens Executadas
              </span>
              <span className="cnx-summary-results-value-csrv">
                {ganttData?.totalOrdensExecutadas || 0}
              </span>
            </div>
            <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Ordens Canceladas
              </span>
              <span className="cnx-summary-results-value-csrv">
                {ganttData?.totalOrdensCanceladas || 0}
              </span>
            </div>
            <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Ordens Congeladas
              </span>
              <span className="cnx-summary-results-value-csrv">
                {ganttData?.totalOrdensCongeladas || 0}
              </span>
            </div>
            <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Volume Descomprimido
              </span>
              <span className="cnx-summary-results-value-csrv">
                {ganttData?.volumeComprimido || 0} m³
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
                Tempo Médio - Descarregamento
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
            <div className="cnx-logistic-monitoring-decomp-gantt-left-volume-container-clmlvc">
              <div className="cnx-gantt-background-title-ctbt">
                <button
                  className="cnx-gantt-button-expand"
                  onClick={() => handleExpandGannt()}
                >
                  <MiniExpandIcon />
                </button>
                {newGantt?.length <= 0 ? (
                  <span className="cnx-no-results">Sem resultados</span>
                ) : null}
                <ReactApexChart
                  options={{
                    chart: {
                      type: "rangeBar",
                      background: "#2d2d2d",
                      zoom: {
                        enabled: true,
                      },
                      foreColor: "#eeeeee",
                      toolbar: {
                        show: true,
                        offsetX: -30,
                        offsetY: 10,
                        tools: {
                          download: true,
                          selection: true,
                          zoom: true,
                          zoomin: true,
                          zoomout: true,
                          pan: true,
                          reset: true,
                          customIcons: [],
                        },
                        export: {
                          csv: {
                            filename: "Gantt",
                            columnDelimiter: ",",
                            headerCategory: "category",
                            headerValue: "value",
                            // dateFormatter(timestamp: any) {
                      //   return new Date(timestamp).toLocaleDateString();
                      // },
                          },
                          svg: {
                            filename: "Gantt",
                          },
                          png: {
                            filename: "Gantt",
                          },
                        },
                        autoSelected: "zoom",
                      },
                    },
                    plotOptions: {
                      bar: {
                        borderRadius: 4,
                        horizontal: true,
                      },
                    },
                    dataLabels: {
                      enabled: false,
                    },
                    grid: {
                      show: false,
                    },

                    tooltip: {
                      enabled: false,
                    },

                    xaxis: {
                      type: "datetime",
                      labels: {
                        datetimeUTC: false,
                      },
                    },
                  }}
                  series={[
                    {
                      data: newGantt,
                    },
                  ]}
                  type="rangeBar"
                  height={"100%"}
                  width={"99%"}
                />
              </div>
            </div>
            <div className="cnx-logistic-monitoring-decomp-gantt-right-volume-container-clmrvc">
              <div className="cnx-table-background-title-ctbt">
                {ganttData?.ordensPlanejadas?.length <= 0 ? (
                  <span className="cnx-no-results">Sem resultados</span>
                ) : null}
                <CnxTable
                  data={ganttData?.ordensPlanejadas || []}
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

export default DecompressionGantt;
