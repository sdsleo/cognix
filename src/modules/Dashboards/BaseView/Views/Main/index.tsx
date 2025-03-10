import "./styles.css";
import { useEffect, useId, useState, useContext, useLayoutEffect, useRef } from "react";
import {
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
  FilterIcon,
  MiniContractIcon,
  MiniExpandIcon,
  PlaybackRate1xIcon,
  RefreshIcon,
  RemoveOccurrenceIcon,
  SortDownIcon,
  SortUpIcon,
} from "@fluentui/react-icons-mdl2";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { axiosInstance } from "../../../../../http/axiosInstance";
import { _GET, _GET_ENUMERATOS } from "../../routes";
import { CnxTable } from "../../../../../components/CnxTable";
import ReactApexChart from "react-apexcharts";
import useFormatTimeOnly from "../../../../../hooks/useFormatTimeOnly";
import useFormatDate from "../../../../../hooks/useFormatDate";
import MiniExpandMirrored from "../../../../../assets/icons/FluentUI/SVGs/MiniExpandMirrored";
import MiniContractMirrored from "../../../../../assets/icons/FluentUI/SVGs/MiniContractMirrored";
import CnxFilter from "../../../../../components/CnxAdvancedFilter";
import { IDashboardGET } from "../../routes/types";
import { ILogisticMonitoring } from "../../context/types";
import { renderToString } from "react-dom/server";
import { DateSkipRange } from "../../../../../components/DateSkipRange";

function GanttView() {
  const {
    dispacth,
    loading,
    dashBoardData,
    autoRefresh,
    timeToRefresh,
    filters,
    enumerators,
  }: ILogisticMonitoring = useContext(UseContext);

  const [newGantt, setNewGantt] = useState([]);

  async function getEnumerators() {
    try {
      const { data } = await axiosInstance(_GET_ENUMERATOS());
      dispacth({
        type: ACTIONS.SET_ENUMERATORS,
        payload: data,
      });
    } catch (err: any) {
      console.error(err);
    } finally {
    }
  }

  async function getDashboard({ Filters, OrderByField, Desc }: IDashboardGET) {
    dispacth({
      type: ACTIONS.LOADING,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(
        _GET({ Filters, OrderByField, Desc })
      );
      dispacth({
        type: ACTIONS.SET_DASHBOARD_DATA,
        payload: data,
      });
      if (!periodo) {
        const defaultFilter = [
          {
            id: "Período7674242",
            title: "Período",
            type: "DateRangerPicker",
            query: "ScheduleDate",
            keyLabel: data?.periodo,
            keyValue: data?.periodo,
          },
        ];
        if (data?.periodo) {
          dispacth({
            type: ACTIONS.SET_FILTERS,
            payload: defaultFilter,
          });
        }
      }
    } catch (err: any) {
      console.error(err);
      dispacth({
        type: ACTIONS.SET_DASHBOARD_DATA,
        payload: {
          ordensPlanejadas: [],
          ordensPlanejadasPorOperacao: [],
          qtdTotalOrdens: 0,
          volumeMedido: 0,
          volumeTotalCorrigido: 0,
        },
      });
    } finally {
      dispacth({
        type: ACTIONS.LOADING,
        payload: false,
      });
    }
  }

  useEffect(() => {
    getEnumerators();
  }, []);

  useLayoutEffect(() => {
    if (autoRefresh) {
      const intervalId = setInterval(() => {
        getDashboard({ Filters: handleQueryString(filters) });
      }, timeToRefresh);
      return () => {
        clearInterval(intervalId);
      };
    }
    getDashboard({ Filters: handleQueryString(filters) });
  }, [autoRefresh, filters]);

  const handleToGantt = (data: any) => {
    const newData = data?.map((item: any, index: any) => {
      return {
        x: `${item?.orderNumber} - ${item?.orderCustom?.customVehicle?.plate} - ${item?.client?.name}`,
        y: [
          new Date(
            item?.orderProductions[0]?.orderProductionOperation?.scheduleStartDateTime
          ).getTime(),
          new Date(
            item?.orderProductions[0]?.orderProductionOperation?.scheduleFinishDateTime
          ).getTime(),
        ],
      };
    });
    setNewGantt(newData);
  };

  useEffect(() => {
    handleToGantt(dashBoardData?.ordensPlanejadas);
  }, [dashBoardData]);

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
          `cnx-logistic-monitoring-comp-gantt-contract-button-clmeb-${CNX_ID}`
        )
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(`cnx-dashboard-view-expand-button-clmeb-${CNX_ID}`)
        ?.classList.add("cnx-display-none");
    } else {
      document
        .getElementById(
          `cnx-logistic-monitoring-comp-gantt-contract-button-clmeb-${CNX_ID}`
        )
        ?.classList.add("cnx-display-none");
      document
        .getElementById(`cnx-dashboard-view-expand-button-clmeb-${CNX_ID}`)
        ?.classList.remove("cnx-display-none");
    }
  }

  function customSummary() {
    return (
      <div className="cnx-custom-summary-header-table-ccsht">
        <span>Ordens Planejadas</span>
      </div>
    );
  }

  const [maxGantt, setMaxGantt] = useState(false);

  const handleExpandGannt = () => {
    setMaxGantt(true);
    document
      .getElementById(CNX_ID + "cnx-gantt-background-title-expanded-ctbt")
      ?.classList.remove("cnx-display-none");
  };
  const handleMiniGannt = () => {
    setMaxGantt(false);
    document
      .getElementById(CNX_ID + "cnx-gantt-background-title-expanded-ctbt")
      ?.classList.add("cnx-display-none");
  };

  const head = {
    startLoading: "Inicio Carregamento",
    endLoading: "Fim Carregamento",
    vehicle: "Carreta",
    model: "Modelo",
    volumeMeasured: "Volume Medido",
    volumeFix: "Volume Corrigido",
    orderNumber: "Ordem",
    client: "Cliente",
    horseTo: "Cavalo Ida",
    resource: "Tramo",
  };

  const CNX_STYLES = {
    cnxColumnGap: {
      paddingRight: "20px",
    },
  };

  // NrOrdem
  // PlacaCarreta
  // BaseNome
  // ClienteNome
  const [placaCavalo, setPlacaCavalo] = useState(false);
  const [nrOrdem, setNrOrdem] = useState(false);
  const [placaCarreta, setPlacaCarreta] = useState(false);
  const [baseNome, setBaseNome] = useState(false);
  const [clienteNome, setClienteNome] = useState(false);
  const [dataHoraInicio, setDataHoraInicio] = useState(false);
  const [dataHoraFim, setDataHoraFim] = useState(false);

  const customThFunction = [
    {
      key: "vehicle",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-short-container-th-re-order">
            {placaCarreta ? <SortUpIcon /> : <SortDownIcon />}

            <span
              className="cnx-custom-th-re-order"
              onClick={() => {
                getDashboard({
                  Filters: handleQueryString(filters),
                  OrderByField: "PlacaCarreta",
                  Desc: placaCarreta,
                });
                setPlacaCarreta(!placaCarreta);
              }}
            >
              Carreta
            </span>
          </div>
        );
      },
    },
    {
      key: "orderNumber",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-short-container-th-re-order">
            {nrOrdem ? <SortUpIcon /> : <SortDownIcon />}
            <span
              className="cnx-custom-th-re-order"
              onClick={() => {
                getDashboard({
                  Filters: handleQueryString(filters),
                  OrderByField: "NrOrdem",
                  Desc: nrOrdem,
                });
                setNrOrdem(!nrOrdem);
              }}
            >
              Ordem
            </span>
          </div>
        );
      },
    },
    {
      key: "client",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-short-container-th-re-order">
            {clienteNome ? <SortUpIcon /> : <SortDownIcon />}
            <span
              className="cnx-custom-th-re-order"
              onClick={() => {
                getDashboard({
                  Filters: handleQueryString(filters),
                  OrderByField: "ClienteNome",
                  Desc: clienteNome,
                });
                setClienteNome(!clienteNome);
              }}
            >
              Cliente
            </span>
          </div>
        );
      },
    },
    {
      key: "startLoading",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-short-container-th-re-order">
            {dataHoraInicio ? <SortUpIcon /> : <SortDownIcon />}
            <span
              className="cnx-custom-th-re-order"
              onClick={() => {
                getDashboard({
                  Filters: handleQueryString(filters),
                  OrderByField: "DataHoraInicio",
                  Desc: dataHoraInicio,
                });
                setDataHoraInicio(!dataHoraInicio);
              }}
            >
              Inicio Carregamento
            </span>
          </div>
        );
      },
    },
    {
      key: "endLoading",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-short-container-th-re-order">
            {dataHoraFim ? <SortUpIcon /> : <SortDownIcon />}
            <span
              className="cnx-custom-th-re-order"
              onClick={() => {
                getDashboard({
                  Filters: handleQueryString(filters),
                  OrderByField: "DataHoraFim",
                  Desc: dataHoraFim,
                });
                setDataHoraFim(!dataHoraFim);
              }}
            >
              Fim Carregamento
            </span>
          </div>
        );
      },
    },
    // {
    //   key: "horseTo",
    //   func: (tdValue: any, keyValue: string, rowValue: any) => {
    //     return (
    //       <div className="cnx-custom-short-container-th-re-order">
    //         {placaCavalo ? <SortUpIcon /> : <SortDownIcon />}
    //         <span
    //           className="cnx-custom-th-re-order"
    //           onClick={() => {
    //             getDashboard({
    //               Filters: handleQueryString(filters),
    //               OrderByField: "PlacaCavalo",
    //               Desc: placaCavalo,
    //             });
    //             setPlacaCavalo(!placaCavalo);
    //           }}
    //         >
    //           Cavalo Ida
    //         </span>
    //       </div>
    //     );
    //   },
    // },
  ];
  const customTdFunction = [
    {
      key: "startLoading",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {useFormatDate(
              rowValue?.orderProductions[0]?.orderProductionOperation
                ?.scheduleStartDateTime
            )}
          </span>
        );
      },
    },
    {
      key: "endLoading",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {useFormatDate(
              rowValue?.orderProductions[0]?.orderProductionOperation
                ?.scheduleFinishDateTime
            )}
          </span>
        );
      },
    },
    {
      key: "vehicle",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.orderCustom?.customVehicle?.plate}
          </span>
        );
      },
    },
    {
      key: "model",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.orderCustom?.customVehicle?.model}
          </span>
        );
      },
    },
    {
      key: "volumeMeasured",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.orderCustom?.volume?.toFixed(2)}
          </span>
        );
      },
    },
    {
      key: "volumeFix",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.orderCustom?.volumeCorrigido?.toFixed(2)}
          </span>
        );
      },
    },
    {
      key: "client",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.client?.name}
          </span>
        );
      },
    },
    {
      key: "resource",
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
    {
      key: "horseTo",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {
              rowValue?.orderProductions[1]?.orderProductionOperation
                ?.customCavalo?.plate
            }
          </span>
        );
      },
    },
  ];

  const handleQueryString = (data: any) => {
    const initialValue = "";
    const finalQueryString = data?.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + `${currentValue?.query}=${currentValue?.keyValue}&`,
      initialValue
    );

    return `?${finalQueryString?.substring(0, finalQueryString.length - 1)}`;
  };

  const filterResponse = (data: any) => {
    dispacth({
      type: ACTIONS.SET_FILTERS,
      payload: data?.filtersSelected,
    });

    getDashboard({
      Filters: handleQueryString(data?.filtersSelected),
    });
  };

  const filterOptions = {
    route: "",
    filters: [
      {
        title: "Período",
        query: "ScheduleDate",
        type: "DateRangerPicker",
        keyLabel: "name",
        keyValue: "id",
      },
      {
        title: "Base",
        query: "BaseIds",
        type: "MultSelectCheckbox",
        keyLabel: "name",
        keyValue: "id",
        options: enumerators?.bases,
      },
    ],
  };

  const [periodo, setPeriodo]: any = useState();

  const [bases, setBases]: any = useState();

  const getFilterDateSelected = (filters: any) => {
    const dateSelected = filters?.find(
      (filter: any) => filter?.query === "ScheduleDate"
    );
    if (!dateSelected) return "";
    return dateSelected?.keyValue;
  };
  const getFilterBaseSelected = (filters: any) => {
    const dateSelected = filters
      ?.filter((filter: any) => filter?.query === "BaseIds")
      .map((item: any) => item?.keyLabel);
    if (!dateSelected) return "";
    return dateSelected?.join(", ");
  };

  useEffect(() => {
    setPeriodo(getFilterDateSelected(filters));
    setBases(getFilterBaseSelected(filters));
  }, [filters]);

  const CNX_FILTER_ID = useId();

  const openAdvancedFilter = () => {
    document
      .getElementById(`cnx-travel-dashboard-filter${CNX_FILTER_ID}`)
      ?.classList.remove("cnx-filter-display-none-cfdn");
  };

  const dateRangeRef = useRef("");
  const setNewFilterDateRange = (date: any) => {
    const filtered = filters?.filter(
      (item: any) => item?.query !== "ScheduleDate"
    );

    const defaultFilter = {
      id: "Período7674242",
      title: "Período",
      type: "DateRangerPicker",
      query: "ScheduleDate",
      keyLabel: date,
      keyValue: date,
    };

    dispacth({
      type: ACTIONS.SET_FILTERS,
      payload: [...filtered, defaultFilter],
    });
  };

  return (
    <div id={CNX_ID} className="cnx-dashboard-view-main-container-clmmc">
      <div
        id={CNX_ID + "cnx-gantt-background-title-expanded-ctbt"}
        className="cnx-gantt-client-view-background-title-expanded-ctbt cnx-display-none"
      >
        <button
          className="cnx-gantt-button-expand"
          onClick={() => handleMiniGannt()}
        >
          <MiniContractIcon />
        </button>
        {maxGantt ? (
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

              // tooltip: {
              //   enabled: false,
              // },

              tooltip: {
                enabled: true,
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                  return renderToString(
                    <div className="cnx-custom-base-view-tooltip-gantt-max">
                      <div className="cnx-custom-base-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-base-view-tooltip-title-max">
                          Início Carregamento:{" "}
                        </span>

                        <span>
                          {useFormatDate(
                            dashBoardData?.ordensPlanejadas[dataPointIndex]
                              ?.orderProductions[0]?.orderProductionOperation
                              ?.scheduleStartDateTime
                          )}
                        </span>
                      </div>
                      <div className="cnx-custom-base-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-base-view-tooltip-title-max">
                          Fim Carregamento:{" "}
                        </span>
                        <span>
                          {useFormatDate(
                            dashBoardData?.ordensPlanejadas[dataPointIndex]
                              ?.orderProductions[0]?.orderProductionOperation
                              ?.scheduleFinishDateTime
                          )}
                        </span>
                      </div>
                      <div className="cnx-custom-base-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-base-view-tooltip-title-max">
                          Carreta:{" "}
                        </span>
                        <span>
                          {
                            dashBoardData?.ordensPlanejadas[dataPointIndex]
                              ?.orderCustom?.customVehicle?.plate
                          }
                        </span>
                      </div>
                      <div className="cnx-custom-base-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-base-view-tooltip-title-max">
                          Modelo:{" "}
                        </span>
                        <span>
                          {
                            dashBoardData?.ordensPlanejadas[dataPointIndex]
                              ?.orderCustom?.customVehicle?.model
                          }
                        </span>
                      </div>
                      <div className="cnx-custom-base-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-base-view-tooltip-title-max">
                          Volume Medido:{" "}
                        </span>
                        <span>
                          {dashBoardData?.ordensPlanejadas[
                            dataPointIndex
                          ]?.orderCustom?.volume?.toFixed(2) || 0}
                        </span>
                      </div>
                      <div className="cnx-custom-base-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-base-view-tooltip-title-max">
                          Volume Corrigido:{" "}
                        </span>
                        <span>
                          {dashBoardData?.ordensPlanejadas[
                            dataPointIndex
                          ]?.orderCustom?.volumeCorrigido?.toFixed(2) || 0}
                        </span>
                      </div>
                      <div className="cnx-custom-base-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-base-view-tooltip-title-max">
                          Ordem:{" "}
                        </span>
                        <span>
                          {
                            dashBoardData?.ordensPlanejadas[dataPointIndex]
                              ?.orderNumber
                          }
                        </span>
                      </div>
                      <div className="cnx-custom-base-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-base-view-tooltip-title-max">
                          Client:{" "}
                        </span>
                        <span>
                          {
                            dashBoardData?.ordensPlanejadas[dataPointIndex]
                              ?.client?.name
                          }
                        </span>
                      </div>
                      <div className="cnx-custom-base-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-base-view-tooltip-title-max">
                          Cavalo Ida:{" "}
                        </span>
                        <span>
                          {
                            dashBoardData?.ordensPlanejadas[dataPointIndex]
                              ?.orderProductions[1]?.orderProductionOperation
                              ?.customCavalo?.plate
                          }
                        </span>
                      </div>
                      <div className="cnx-custom-base-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-base-view-tooltip-title-max">
                          Tramo:{" "}
                        </span>
                        <span>
                          {
                            dashBoardData?.ordensPlanejadas[dataPointIndex]
                              ?.orderProductions[0]?.orderProductionOperation
                              ?.resource?.code
                          }
                        </span>
                      </div>
                    </div>
                  );
                },
              },

              xaxis: {
                type: "datetime",
                labels: {
                  datetimeUTC: false,
                },
              },
              yaxis: {
                labels: {
                  show: true,
                  align: "left",
                  minWidth: 0,
                  maxWidth: 500,
                  style: {
                    colors: [],
                    fontSize: "12px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 400,
                    cssClass: "apexcharts-yaxis-label",
                  },
                  offsetX: -10,
                  offsetY: 0,
                  rotate: 0,
                  // formatter: (value) => { return val },
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
        ) : null}
      </div>
      <CnxFilter
        id={`cnx-travel-dashboard-filter${CNX_FILTER_ID}`}
        filterResponse={filterResponse}
        filterOptions={filterOptions}
        clearFilter={() => null}
        setFilter={filters}
      />
      {loading ? (
        <div className="cnx-logistic-control-loading-view-clclv">
          <h1>Carregando...</h1>
        </div>
      ) : null}
      {/* <button
        type="button"
        className="cnx-left-button-nav-crbv"
        onClick={() => {
          dispacth({
            type: ACTIONS.SET_ACTIVE_PAGE,
            payload: "comp",
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
      </button> */}
      <header className="cnx-dashboard-order-view-header-clmh">
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span>Base</span>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {/* {periodo ? (
              <span className="cnx-filter-data-selected-cfds">
                Período: {periodo}
              </span>
            ) : null} */}
            <DateSkipRange
              dayRef={dateRangeRef}
              currentDay={periodo}
              dispatchActions={setNewFilterDateRange}
            />
            {dashBoardData.periodo && !periodo ? (
              <span className="cnx-filter-data-selected-cfds">
                Período: {dashBoardData.periodo}
              </span>
            ) : null}

            {bases?.length > 0 && periodo ? (
              <span style={{ color: "#ffffff14", marginBottom: "5px" }}>|</span>
            ) : null}
            {bases?.length > 0 ? (
              <span className="cnx-filter-data-selected-cfds">
                Bases: {bases}
              </span>
            ) : null}
          </div>
        </div>

        <div className="cnx-dashboard-view-actions-container-clmac">
          <button
            title={
              autoRefresh
                ? "Desativar atualização automática"
                : "Atualizar a cada 30s"
            }
            type="button"
            className="cnx-dashboard-view-header-window-button-clmhwb"
            onClick={() => {
              dispacth({
                type: ACTIONS.AUTO_REFRESH,
                payload: !autoRefresh,
              });
            }}
          >
            {autoRefresh ? (
              <RemoveOccurrenceIcon className="cnx-main-dashboard-highlight-refresh" />
            ) : (
              <PlaybackRate1xIcon className="cnx-main-dashboard-view-header-refresh" />
            )}
          </button>
          <button
            title="Atualizar"
            type="button"
            className="cnx-dashboard-view-header-window-button-clmhwb"
            onClick={() =>
              getDashboard({ Filters: handleQueryString(filters) })
            }
          >
            <RefreshIcon className="cnx-main-dashboard-view-header-refresh" />
          </button>
          <button
            title="Filtro Avançado"
            type="button"
            className="cnx-dashboard-view-header-window-button-clmhwb"
            onClick={() => openAdvancedFilter()}
          >
            <FilterIcon className="cnx-main-dashboard-view-header-refresh" />
          </button>
          <button
            title="Expandir"
            type="button"
            className="cnx-dashboard-view-header-window-button-clmhwb"
            onClick={() => openFullScreenView()}
          >
            <MiniExpandMirrored
              className="cnx-main-dashboard-view-header-refresh"
              width="1.2rem"
              height="1.2rem"
            />
          </button>
        </div>

        <button
          className="cnx-display-none cnx-dashboard-view-header-window-button-clmhwb"
          type="button"
          onClick={() => closeFullScreenView()}
        >
          <MiniContractMirrored
            className="cnx-main-dashboard-view-header-refresh"
            width="1.2rem"
            height="1.2rem"
          />
        </button>
      </header>
      {!loading ? (
        <>
          <div className="cnx-dashboard-view-summary-container-clmccc">
            <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Total Volume Medido
              </span>
              <span className="cnx-summary-results-value-csrv">
                {dashBoardData?.volumeMedido?.toFixed(2) || 0}
              </span>
            </div>
            {/* <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Total Volume Corrigido
              </span>
              <span className="cnx-summary-results-value-csrv">0</span>
            </div> */}
            <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Qtd de ordens
              </span>
              <span className="cnx-summary-results-value-csrv">
                {dashBoardData?.qtdTotalOrdens || 0}
              </span>
            </div>
          </div>
          <>
            <div className="cnx-dashboard-view-left-volume-container-clmlvc">
              <div className="cnx-table-background-title-ctbt">
                {dashBoardData?.ordensPlanejadas?.length <= 0 ? (
                  <span className="cnx-no-results">Sem resultados</span>
                ) : null}
                <CnxTable
                  data={dashBoardData?.ordensPlanejadas || []}
                  head={head}
                  noSearchBar
                  customSummary={customSummary()}
                  customTdFunction={customTdFunction}
                  cnxStyles={CNX_STYLES}
                  reOrderColumn
                  customThFunction={customThFunction}
                />
              </div>
            </div>
            <div className="cnx-dashboard-view-right-volume-container-clmrvc">
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
                {maxGantt ? null : (
                  <ReactApexChart
                    options={{
                      chart: {
                        type: "rangeBar",
                        background: "#2d2d2d",
                        zoom: {
                          enabled: true,
                        },
                        events: {
                          dataPointSelection: function (
                            event,
                            chartContext,
                            config
                          ) {
                            // console.log("CLICK", config.dataPointIndex)
                          },
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

                      // tooltip: {
                      //   enabled: false,
                      // },

                      tooltip: {
                        enabled: true,
                        custom: function ({
                          series,
                          seriesIndex,
                          dataPointIndex,
                          w,
                        }) {
                          return renderToString(
                            <div className="cnx-custom-base-view-tooltip-gantt">
                              <div className="cnx-custom-base-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-base-view-tooltip-title">
                                  Início Carregamento:{" "}
                                </span>

                                <span>
                                  {useFormatDate(
                                    dashBoardData?.ordensPlanejadas[
                                      dataPointIndex
                                    ]?.orderProductions[0]
                                      ?.orderProductionOperation
                                      ?.scheduleStartDateTime
                                  )}
                                </span>
                              </div>
                              <div className="cnx-custom-base-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-base-view-tooltip-title">
                                  Fim Carregamento:{" "}
                                </span>
                                <span>
                                  {useFormatDate(
                                    dashBoardData?.ordensPlanejadas[
                                      dataPointIndex
                                    ]?.orderProductions[0]
                                      ?.orderProductionOperation
                                      ?.scheduleFinishDateTime
                                  )}
                                </span>
                              </div>
                              <div className="cnx-custom-base-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-base-view-tooltip-title">
                                  Carreta:{" "}
                                </span>
                                <span>
                                  {
                                    dashBoardData?.ordensPlanejadas[
                                      dataPointIndex
                                    ]?.orderCustom?.customVehicle?.plate
                                  }
                                </span>
                              </div>
                              <div className="cnx-custom-base-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-base-view-tooltip-title">
                                  Modelo:{" "}
                                </span>
                                <span>
                                  {
                                    dashBoardData?.ordensPlanejadas[
                                      dataPointIndex
                                    ]?.orderCustom?.customVehicle?.model
                                  }
                                </span>
                              </div>
                              <div className="cnx-custom-base-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-base-view-tooltip-title">
                                  Volume Medido:{" "}
                                </span>
                                <span>
                                  {dashBoardData?.ordensPlanejadas[
                                    dataPointIndex
                                  ]?.orderCustom?.volume?.toFixed(2) || 0}
                                </span>
                              </div>
                              <div className="cnx-custom-base-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-base-view-tooltip-title">
                                  Volume Corrigido:{" "}
                                </span>
                                <span>
                                  {dashBoardData?.ordensPlanejadas[
                                    dataPointIndex
                                  ]?.orderCustom?.volumeCorrigido?.toFixed(2) ||
                                    0}
                                </span>
                              </div>
                              <div className="cnx-custom-base-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-base-view-tooltip-title">
                                  Ordem:{" "}
                                </span>
                                <span>
                                  {
                                    dashBoardData?.ordensPlanejadas[
                                      dataPointIndex
                                    ]?.orderNumber
                                  }
                                </span>
                              </div>
                              <div className="cnx-custom-base-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-base-view-tooltip-title">
                                  Client:{" "}
                                </span>
                                <span>
                                  {
                                    dashBoardData?.ordensPlanejadas[
                                      dataPointIndex
                                    ]?.client?.name
                                  }
                                </span>
                              </div>
                              <div className="cnx-custom-base-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-base-view-tooltip-title">
                                  Cavalo Ida:{" "}
                                </span>
                                <span>
                                  {
                                    dashBoardData?.ordensPlanejadas[
                                      dataPointIndex
                                    ]?.orderProductions[1]
                                      ?.orderProductionOperation?.customCavalo
                                      ?.plate
                                  }
                                </span>
                              </div>
                              <div className="cnx-custom-base-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-base-view-tooltip-title">
                                  Tramo:{" "}
                                </span>
                                <span>
                                  {
                                    dashBoardData?.ordensPlanejadas[
                                      dataPointIndex
                                    ]?.orderProductions[0]
                                      ?.orderProductionOperation?.resource?.code
                                  }
                                </span>
                              </div>
                            </div>
                          );
                        },
                      },

                      xaxis: {
                        type: "datetime",
                        labels: {
                          datetimeUTC: false,
                        },
                      },
                      yaxis: {
                        labels: {
                          show: true,
                          align: "left",
                          minWidth: 0,
                          maxWidth: 500,
                          style: {
                            colors: [],
                            fontSize: "12px",
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontWeight: 400,
                            cssClass: "apexcharts-yaxis-label",
                          },
                          offsetX: -10,
                          offsetY: 0,
                          rotate: 0,
                          // formatter: (value) => { return val },
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
                )}
              </div>
            </div>
          </>
        </>
      ) : null}
    </div>
  );
}

export default GanttView;
