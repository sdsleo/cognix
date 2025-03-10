import "./styles.css";
import {
  useEffect,
  useId,
  useState,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
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
import { _GET, _GET_ENUMERATOS, _GET_ROUTES_ENUMERATOS } from "../../routes";
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

function CompressionGantt() {
  const {
    dispacth,
    loading,
    dashBoardData,
    autoRefresh,
    timeToRefresh,
    filters,
    enumerators,
    routesEnumerators,
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
  async function getRoutesEnumerators() {
    try {
      const { data } = await axiosInstance(_GET_ROUTES_ENUMERATOS());
      dispacth({
        type: ACTIONS.SET_ROUTES_ENUMERATORS,
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
        _GET({ Filters, Routes: routesItem, OrderByField, Desc })
      );
      dispacth({
        type: ACTIONS.SET_DASHBOARD_DATA,
        payload: data,
      });
      if (!periodo) {
        const defaultFilter = [
          {
            id: "Período45457878",
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
    getRoutesEnumerators();
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
    const newData = data?.map((item: any, index: number) => {
      return {
        x: `${item?.orderNumber} - ${
          item?.orderProductions[0]?.orderProductionOperation?.customCavalo
            ?.plate || ""
        } - ${item?.orderCustom?.customVehicle?.plate} - ${
          item?.orderCustom?.customBase?.name
        } - ${item?.client?.name} - (${index + 1})`,
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
    handleToGantt(dashBoardData?.ordensPlanejadasPorOperacao);
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
    startTransport: "Inicio Transporte",
    endTransport: "Fim Transporte",
    operation: "Operação",
    vehicle: "Carreta",
    model: "Modelo",
    orderNumber: "Ordem",
    origin: "Origem",
    destination: "Destino",
    horseTo: "Cavalo",
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
  // DataHoraInicio
  // DataHoraFim
  const [nrOrdem, setNrOrdem] = useState(false);
  const [placaCavalo, setPlacaCavalo] = useState(false);
  const [placaCarreta, setPlacaCarreta] = useState(false);
  const [baseNome, setBaseNome] = useState(false);
  const [clienteNome, setClienteNome] = useState(false);
  const [dataHoraInicio, setDataHoraInicio] = useState(false);
  const [dataHoraFim, setDataHoraFim] = useState(false);

  const customThFunction = [
    {
      key: "startTransport",
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
              Inicio Transporte
            </span>
          </div>
        );
      },
    },
    {
      key: "endTransport",
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
              Fim Transporte
            </span>
          </div>
        );
      },
    },
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
      key: "horseTo",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-short-container-th-re-order">
            {placaCavalo ? <SortUpIcon /> : <SortDownIcon />}
            <span
              className="cnx-custom-th-re-order"
              onClick={() => {
                getDashboard({
                  Filters: handleQueryString(filters),
                  OrderByField: "PlacaCavalo",
                  Desc: placaCavalo,
                });
                setPlacaCavalo(!placaCavalo);
              }}
            >
              Cavalo
            </span>
          </div>
        );
      },
    },
  ];

  const customTdFunction = [
    {
      key: "startTransport",
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
      key: "endTransport",
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
      key: "operation",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {
              rowValue?.orderProductions?.[0]?.orderProductionOperation
                ?.operation?.code
            }
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
      key: "horseTo",
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
      key: "driver",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.orderCustom?.customDriver?.name}
          </span>
        );
      },
    },
    {
      key: "origin",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.orderProductions?.[0]?.orderProductionOperation
              ?.operation?.number == 20
              ? rowValue?.orderCustom?.customBase?.name
              : ""}
            {rowValue?.orderProductions?.[0]?.orderProductionOperation
              ?.operation?.number == 40
              ? rowValue?.client?.name
              : ""}
          </span>
        );
      },
    },
    {
      key: "destination",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowValue?.orderProductions?.[0]?.orderProductionOperation
              ?.operation?.number == 20
              ? rowValue?.client?.name
              : ""}
            {rowValue?.orderProductions?.[0]?.orderProductionOperation
              ?.operation?.number == 40
              ? rowValue?.orderCustom?.customBase?.name
              : ""}
          </span>
        );
      },
    },
  ];

  const [routesItem, setRoutesItem]: any = useState([]);

  const handleQueryString = (data: any) => {
    const initialValue = "";
    const finalQueryString = data?.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + `${currentValue?.query}=${currentValue?.keyValue}&`,
      initialValue
    );

    return `?${finalQueryString?.substring(
      0,
      finalQueryString.length - 1
    )}&Operations=20&Operations=40`;
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
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        options: enumerators?.bases,
      },
      {
        title: "Cliente",
        query: "ClientIds",
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        options: enumerators?.clients,
      },
    ],
  };

  const [periodo, setPeriodo] = useState();
  const [clients, setClients]: any = useState();
  const [bases, setBases]: any = useState();

  const getFilterDateSelected = (filters: any) => {
    const dateSelected = filters?.find(
      (filter: any) => filter?.query === "ScheduleDate"
    );
    if (!dateSelected) return "";
    return dateSelected?.keyValue;
  };
  // const getFilterClientSelected = (filters: any) => {
  //   const dateSelected = filters?.filter(
  //     (filter: any) => filter?.query === "Routes"
  //   ).map((item: any) => item?.keyLabel);
  //   if (!dateSelected) return '';
  //   return dateSelected?.join(', ');
  // };
  const getFilterBaseSelected = (filters: any) => {
    const dateSelected = filters
      ?.filter((filter: any) => filter?.query === "BaseIds")
      .map((item: any) => item?.keyLabel);
    if (!dateSelected) return "";
    return dateSelected?.join(", ");
  };

  const getFilterClientSelected = (filters: any) => {
    const dateSelected = filters
      ?.filter((filter: any) => filter?.query === "ClientIds")
      .map((item: any) => item?.keyLabel);
    if (!dateSelected) return "";
    return dateSelected?.join(", ");
  };

  useEffect(() => {
    setPeriodo(getFilterDateSelected(filters));
    setClients(getFilterClientSelected(filters));
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
      id: "Período45457878",
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
        className="cnx-gantt-background-title-expanded-ctbt cnx-display-none"
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

              tooltip: {
                enabled: true,
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                  return renderToString(
                    <div className="cnx-custom-route-view-tooltip-gantt-max">
                      <div className="cnx-custom-route-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-route-view-tooltip-title-max">
                          Início Transporte:{" "}
                        </span>

                        <span>
                          {useFormatDate(
                            dashBoardData?.ordensPlanejadasPorOperacao[
                              dataPointIndex
                            ]?.orderProductions[0]?.orderProductionOperation
                              ?.scheduleStartDateTime
                          )}
                        </span>
                      </div>
                      <div className="cnx-custom-route-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-route-view-tooltip-title-max">
                          Fim Transporte:{" "}
                        </span>
                        <span>
                          {useFormatDate(
                            dashBoardData?.ordensPlanejadasPorOperacao[
                              dataPointIndex
                            ]?.orderProductions[0]?.orderProductionOperation
                              ?.scheduleFinishDateTime
                          )}
                        </span>
                      </div>
                      <div className="cnx-custom-route-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-route-view-tooltip-title-max">
                          Operação:{" "}
                        </span>
                        <span>
                          {
                            dashBoardData?.ordensPlanejadasPorOperacao[
                              dataPointIndex
                            ]?.orderProductions?.[0]?.orderProductionOperation
                              ?.operation?.code
                          }
                        </span>
                      </div>
                      <div className="cnx-custom-route-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-route-view-tooltip-title-max">
                          Carreta:{" "}
                        </span>
                        <span>
                          {
                            dashBoardData?.ordensPlanejadasPorOperacao[
                              dataPointIndex
                            ]?.orderCustom?.customVehicle?.plate
                          }
                        </span>
                      </div>
                      <div className="cnx-custom-route-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-route-view-tooltip-title-max">
                          Modelo:{" "}
                        </span>
                        <span>
                          {
                            dashBoardData?.ordensPlanejadasPorOperacao[
                              dataPointIndex
                            ]?.orderCustom?.customVehicle?.model
                          }
                        </span>
                      </div>
                      <div className="cnx-custom-route-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-route-view-tooltip-title-max">
                          Ordem:{" "}
                        </span>
                        <span>
                          {
                            dashBoardData?.ordensPlanejadasPorOperacao[
                              dataPointIndex
                            ]?.orderNumber
                          }
                        </span>
                      </div>
                      <div className="cnx-custom-route-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-route-view-tooltip-title-max">
                          Origem:{" "}
                        </span>
                        <span>
                          {dashBoardData?.ordensPlanejadasPorOperacao[
                            dataPointIndex
                          ]?.orderProductions?.[0]?.orderProductionOperation
                            ?.operation?.number == 20
                            ? dashBoardData?.ordensPlanejadasPorOperacao[
                                dataPointIndex
                              ]?.orderCustom?.customBase?.name
                            : ""}
                          {dashBoardData?.ordensPlanejadasPorOperacao[
                            dataPointIndex
                          ]?.orderProductions?.[0]?.orderProductionOperation
                            ?.operation?.number == 40
                            ? dashBoardData?.ordensPlanejadasPorOperacao[
                                dataPointIndex
                              ]?.client?.name
                            : ""}
                        </span>
                      </div>
                      <div className="cnx-custom-route-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-route-view-tooltip-title-max">
                          Destino:{" "}
                        </span>
                        <span>
                          {dashBoardData?.ordensPlanejadasPorOperacao[
                            dataPointIndex
                          ]?.orderProductions?.[0]?.orderProductionOperation
                            ?.operation?.number == 20
                            ? dashBoardData?.ordensPlanejadasPorOperacao[
                                dataPointIndex
                              ]?.client?.name
                            : ""}
                          {dashBoardData?.ordensPlanejadasPorOperacao[
                            dataPointIndex
                          ]?.orderProductions?.[0]?.orderProductionOperation
                            ?.operation?.number == 40
                            ? dashBoardData?.ordensPlanejadasPorOperacao[
                                dataPointIndex
                              ]?.orderCustom?.customBase?.name
                            : ""}
                        </span>
                      </div>
                      <div className="cnx-custom-route-view-tooltip-item-container-gantt-max">
                        <span className="cnx-custom-route-view-tooltip-title-max">
                          Cavalo:{" "}
                        </span>
                        <span>
                          {
                            dashBoardData?.ordensPlanejadasPorOperacao[
                              dataPointIndex
                            ]?.orderProductions[0]?.orderProductionOperation
                              ?.customCavalo?.plate
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
                  maxWidth: 900,
                  style: {
                    colors: ["#fff"],
                    fontSize: "0.9rem",
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
          <span>Rota</span>
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

            {clients?.length > 0 && periodo ? (
              <span style={{ color: "#ffffff14", marginBottom: "5px" }}>|</span>
            ) : null}
            {clients?.length > 0 ? (
              <span className="cnx-filter-data-selected-cfds">
                Clientes: {clients}
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
            {/* <div className="cnx-summary-results-container-csrc">
              <span className="cnx-summary-results-title-csrt">
                Total Volume Medido
              </span>
              <span className="cnx-summary-results-value-csrv">{dashBoardData?.volumeMedido || 0}</span>
            </div>
            <div className="cnx-summary-results-container-csrc">
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
                {dashBoardData?.ordensPlanejadasPorOperacao?.length <= 0 ? (
                  <span className="cnx-no-results">Sem resultados</span>
                ) : null}
                <CnxTable
                  data={dashBoardData?.ordensPlanejadasPorOperacao || []}
                  head={head}
                  noSearchBar
                  customSummary={customSummary()}
                  customTdFunction={customTdFunction}
                  customThFunction={customThFunction}
                  cnxStyles={CNX_STYLES}
                  reOrderColumn
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
                        enabled: true,
                        custom: function ({
                          series,
                          seriesIndex,
                          dataPointIndex,
                          w,
                        }) {
                          return renderToString(
                            <div className="cnx-custom-route-view-tooltip-gantt">
                              <div className="cnx-custom-route-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-route-view-tooltip-title">
                                  Início Transporte:{" "}
                                </span>

                                <span>
                                  {useFormatDate(
                                    dashBoardData?.ordensPlanejadasPorOperacao[
                                      dataPointIndex
                                    ]?.orderProductions[0]
                                      ?.orderProductionOperation
                                      ?.scheduleStartDateTime
                                  )}
                                </span>
                              </div>
                              <div className="cnx-custom-route-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-route-view-tooltip-title">
                                  Fim Transporte:{" "}
                                </span>
                                <span>
                                  {useFormatDate(
                                    dashBoardData?.ordensPlanejadasPorOperacao[
                                      dataPointIndex
                                    ]?.orderProductions[0]
                                      ?.orderProductionOperation
                                      ?.scheduleFinishDateTime
                                  )}
                                </span>
                              </div>
                              <div className="cnx-custom-route-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-route-view-tooltip-title">
                                  Operação:{" "}
                                </span>
                                <span>
                                  {
                                    dashBoardData?.ordensPlanejadasPorOperacao[
                                      dataPointIndex
                                    ]?.orderProductions?.[0]
                                      ?.orderProductionOperation?.operation
                                      ?.code
                                  }
                                </span>
                              </div>
                              <div className="cnx-custom-route-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-route-view-tooltip-title">
                                  Carreta:{" "}
                                </span>
                                <span>
                                  {
                                    dashBoardData?.ordensPlanejadasPorOperacao[
                                      dataPointIndex
                                    ]?.orderCustom?.customVehicle?.plate
                                  }
                                </span>
                              </div>
                              <div className="cnx-custom-route-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-route-view-tooltip-title">
                                  Modelo:{" "}
                                </span>
                                <span>
                                  {
                                    dashBoardData?.ordensPlanejadasPorOperacao[
                                      dataPointIndex
                                    ]?.orderCustom?.customVehicle?.model
                                  }
                                </span>
                              </div>
                              <div className="cnx-custom-route-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-route-view-tooltip-title">
                                  Ordem:{" "}
                                </span>
                                <span>
                                  {
                                    dashBoardData?.ordensPlanejadasPorOperacao[
                                      dataPointIndex
                                    ]?.orderNumber
                                  }
                                </span>
                              </div>
                              <div className="cnx-custom-route-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-route-view-tooltip-title">
                                  Origem:{" "}
                                </span>
                                <span>
                                  {dashBoardData?.ordensPlanejadasPorOperacao[
                                    dataPointIndex
                                  ]?.orderProductions?.[0]
                                    ?.orderProductionOperation?.operation
                                    ?.number == 20
                                    ? dashBoardData
                                        ?.ordensPlanejadasPorOperacao[
                                        dataPointIndex
                                      ]?.orderCustom?.customBase?.name
                                    : ""}
                                  {dashBoardData?.ordensPlanejadasPorOperacao[
                                    dataPointIndex
                                  ]?.orderProductions?.[0]
                                    ?.orderProductionOperation?.operation
                                    ?.number == 40
                                    ? dashBoardData
                                        ?.ordensPlanejadasPorOperacao[
                                        dataPointIndex
                                      ]?.client?.name
                                    : ""}
                                </span>
                              </div>
                              <div className="cnx-custom-route-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-route-view-tooltip-title">
                                  Destino:{" "}
                                </span>
                                <span>
                                  {dashBoardData?.ordensPlanejadasPorOperacao[
                                    dataPointIndex
                                  ]?.orderProductions?.[0]
                                    ?.orderProductionOperation?.operation
                                    ?.number == 20
                                    ? dashBoardData
                                        ?.ordensPlanejadasPorOperacao[
                                        dataPointIndex
                                      ]?.client?.name
                                    : ""}
                                  {dashBoardData?.ordensPlanejadasPorOperacao[
                                    dataPointIndex
                                  ]?.orderProductions?.[0]
                                    ?.orderProductionOperation?.operation
                                    ?.number == 40
                                    ? dashBoardData
                                        ?.ordensPlanejadasPorOperacao[
                                        dataPointIndex
                                      ]?.orderCustom?.customBase?.name
                                    : ""}
                                </span>
                              </div>
                              <div className="cnx-custom-route-view-tooltip-item-container-gantt">
                                <span className="cnx-custom-route-view-tooltip-title">
                                  Cavalo:{" "}
                                </span>
                                <span>
                                  {
                                    dashBoardData?.ordensPlanejadasPorOperacao[
                                      dataPointIndex
                                    ]?.orderProductions[0]
                                      ?.orderProductionOperation?.customCavalo
                                      ?.plate
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
                          maxWidth: 900,
                          style: {
                            colors: ["#fff"],
                            fontSize: "0.9rem",
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

export default CompressionGantt;
