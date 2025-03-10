import "./styles.css";
import {
  useEffect,
  useId,
  useState,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import MiniExpandMirrored from "../../../../assets/icons/FluentUI/SVGs/MiniExpandMirrored";
import MiniContractMirrored from "../../../../assets/icons/FluentUI/SVGs/MiniContractMirrored";
import { CnxTable } from "../../../../components/CnxTable";
import {
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
  FilterIcon,
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
  _GET_ENUMERATOS,
  _GET_EXPORT_BY_FILTERS,
  _GET_GANTT,
  _GET_GANTT_TRANSPORT,
} from "../../routes";
import ReactApexChart from "react-apexcharts";
import { AverageDelayTime } from "./models/averageDelayTime";
import { Occurrences } from "./models/occurrences";
import { AreaModel } from "./models/area";
import CnxFilter from "../../../../components/CnxAdvancedFilter";
import { IDashboardGET, IDashboardObject } from "../../context/types";
import { DateSkip } from "../../../../components/DateSkip";
import moment from "moment";
import CnxDialog from "../../../../components/CnxDialog";
import { IExport } from "../../../Orders/routes/types";

function Main() {
  const {
    dispacth,
    loading,
    dashBoardData,
    filters,
    autoRefresh,
    timeToRefresh,
    enumerators,
  }: IDashboardObject = useContext(UseContext);

  const averageDelayTime = new AverageDelayTime();
  const occurrences = new Occurrences();
  const areaModel = new AreaModel();

  const today = new Date();
  const todayRef = moment();

  const [periodo, setPeriodo]: any = useState(null);

  const [bases, setBases]: any = useState();
  const [clients, setClients]: any = useState();
  const summarySelected =
    clients?.length > 0 ? "em Cliente" : bases?.length > 0 ? " em Bases" : "";

  const CNX_FILTER_ID = useId();

  useEffect(() => {
    setTimeout(() => {
      const defaultFilter = [
        {
          id: "Período7674242",
          title: "Dia",
          type: "Date",
          query: "FilterDate",
          keyLabel: todayRef.format("YYYY-MM-DD"),
          keyValue: todayRef.format("YYYY-MM-DD"),
        },
      ];
      setPeriodo(todayRef.format("YYYY-MM-DD"));
      dispacth({
        type: ACTIONS.SET_FILTERS,
        payload: defaultFilter,
      });
    }, 300);
  }, []);

  const getFilterBaseSelected = (filters: any) => {
    const dateSelected = filters
      ?.filter((filter: any) => filter?.query === "BaseId")
      .map((item: any) => item?.keyLabel);
    if (!dateSelected) return "";
    return dateSelected?.join(", ");
  };
  const getFilterClientSelected = (filters: any) => {
    const dateSelected = filters
      ?.filter((filter: any) => filter?.query === "ClientId")
      .map((item: any) => item?.keyLabel);

    if (!dateSelected) return "";
    return dateSelected?.join(", ");
  };

  useEffect(() => {
    setPeriodo(getFilterDateSelected(filters));
    setBases(getFilterBaseSelected(filters));
    setClients(getFilterClientSelected(filters));
  }, [filters]);

  const getFilterDateSelected = (filters: any) => {
    const dateSelected = filters?.find(
      (filter: any) => filter.query === "FilterDate"
    );
    if (!dateSelected) return today.toLocaleDateString();
    return dateSelected?.keyValue;
  };

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

  useEffect(() => {
    getEnumerators();
  }, []);

  // async function getDashboard(id: any) {
  //   dispacth({
  //     type: ACTIONS.LOADING,
  //     payload: true,
  //   });
  //   try {
  //     const { data } = await axiosInstance(_GET());
  //     dispacth({
  //       type: ACTIONS.SET_DASHBOARD_DATA,
  //       payload: data,
  //     });
  //   } catch (err: any) {
  //     console.error(err);
  //   } finally {
  //     dispacth({
  //       type: ACTIONS.LOADING,
  //       payload: false,
  //     });
  //   }
  // }

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

  //
  async function getDashboard({ Filters }: IDashboardGET) {
    if (Filters.includes("Invalid date") || Filters === "?") return;
    dispacth({
      type: ACTIONS.LOADING,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET({ Filters }));
      dispacth({
        type: ACTIONS.SET_DASHBOARD_DATA,
        payload: data,
      });
    } catch (err: any) {
      dispacth({
        type: ACTIONS.SET_DASHBOARD_DATA,
        payload: [],
      });
      openloadDashboardError();
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING,
        payload: false,
      });
    }
  }

  const refreshData = () => {
    getDashboard({ Filters: handleQueryString(filters) });
  };

  useEffect(() => {
    getDashboard({ Filters: handleQueryString(filters) });
  }, []);

  useLayoutEffect(() => {
    if (autoRefresh) {
      const intervalId = setInterval(() => {
        getDashboard({ Filters: handleQueryString(filters) });
      }, timeToRefresh);
      if (filters?.length > 0) {
        clearInterval(intervalId);
        const intervalId2 = setInterval(() => {
          getDashboard({ Filters: handleQueryString(filters) });
        }, timeToRefresh);
        return () => {
          clearInterval(intervalId2);
        };
      }
      return () => {
        clearInterval(intervalId);
      };
    }
    getDashboard({ Filters: handleQueryString(filters) });
  }, [autoRefresh, filters]);

  function fullscreenchanged(event: any) {
    if (document.fullscreenElement) {
      document
        .getElementById(`cnx-travel-dashboard-contract-button-clmeb-${CNX_ID}`)
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(`cnx-travel-dashboard-expand-button-clmeb-${CNX_ID}`)
        ?.classList.add("cnx-display-none");
    } else {
      document
        .getElementById(`cnx-travel-dashboard-contract-button-clmeb-${CNX_ID}`)
        ?.classList.add("cnx-display-none");
      document
        .getElementById(`cnx-travel-dashboard-expand-button-clmeb-${CNX_ID}`)
        ?.classList.remove("cnx-display-none");
    }
  }

  type IChartObject = {
    type: string | undefined;
    options: any;
    series: any;
  };

  const handleExpandChart = ({ type, options, series }: IChartObject) => {
    setCurrentChart({
      type,
      options,
      series,
    });
    document
      .querySelector(".cnx-chart-travel-container-expanded-ctbt")
      ?.classList.remove("cnx-display-none");
  };
  const handleMiniGannt = () => {
    setCurrentChart(null);
    document
      .querySelector(".cnx-chart-travel-container-expanded-ctbt")
      ?.classList.add("cnx-display-none");
  };

  // DASHBOARD DATA
  const optionsTopLeft: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
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
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
      borderColor: "#ffffff50",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    noData: {
      text: "Sem Resultados.",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "14px",
        fontFamily: undefined,
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "0h",
        "1h",
        "2h",
        "3h",
        "4h",
        "5h",
        "6h",
        "7h",
        "8h",
        "9h",
        "10h",
        "11h",
        "12h",
        "13h",
        "14h",
        "15h",
        "16h",
        "17h",
        "18h",
        "19h",
        "20h",
        "21h",
        "22h",
        "23h",
      ],
    },
    yaxis: {
      title: {
        text: "Volume (m3)",
      },
    },
    fill: {
      opacity: 1,
    },
    title: {
      text: "Produção Horária",
      align: "center",
      margin: 20,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#fff",
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "Volume (m3) " + val;
        },
      },
    },
  };

  const acumulado = dashBoardData?.vazaoAcumuladoHoraHora;
  const produzido = dashBoardData?.vazaoProduzidoHoraHora;
  const volumeEntregue = dashBoardData?.volumeEntregue;
  // const volumeEntregue = [
  //   {
  //     name: "Pojuca",
  //     percent: 30,
  //     volume: 30
  //   },
  //   {
  //     name: "Ouriçangas",
  //     percent: 30,
  //     volume: 30
  //   },
  //   {
  //     name: "Nova Soure",
  //     percent: 40,
  //     volume: 40
  //   },
  // ]
  // Object.values(produzido)

  const seriesTopLeft = [
    {
      name: "Produzido",
      color: "#2282ff",
      data: produzido
        ? produzido?.output0Hour === null
          ? []
          : Object.values(produzido)
        : [],
    },
    {
      name: "Acumulado",
      color: "#f0831b",
      data: acumulado
        ? acumulado?.output0Hour === null
          ? []
          : Object.values(acumulado)
        : [],
    },
  ];

  const optionsTopRight: ApexCharts.ApexOptions = {
    chart: {
      foreColor: "#dddddd",
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: true,
      borderColor: "#ffffff50",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    noData: {
      text: "Sem Resultados.",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "14px",
        fontFamily: undefined,
      },
    },
    stroke: {
      curve: "straight",
    },

    title: {
      text: "Comportamento de vazão",
      align: "center",
      margin: 20,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#fff",
      },
    },
    subtitle: {
      text: "",
      align: "left",
    },
    labels: [
      "0h",
      "1h",
      "2h",
      "3h",
      "4h",
      "5h",
      "6h",
      "7h",
      "8h",
      "9h",
      "10h",
      "11h",
      "12h",
      "13h",
      "14h",
      "15h",
      "16h",
      "17h",
      "18h",
      "19h",
      "20h",
      "21h",
      "22h",
      "23h",
    ],
    xaxis: {
      // type: 'datetime',
      labels: {
        style: {
          colors: "#eeeeee",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      // opposite: true
      labels: {
        style: {
          colors: "#eeeeee",
          fontSize: "12px",
        },
      },
    },
    legend: {
      horizontalAlign: "center",

      show: true,
    },
    tooltip: {
      enabled: false,
    },
  };

  const seriesTopRight = [
    {
      name: "Produzido",
      data: produzido
        ? produzido?.output0Hour === null
          ? []
          : Object.values(produzido)
        : [],
      color: "#4fb9ff",
      type: "area",
    },
    {
      name: "Vazão Média",
      data: produzido
        ? produzido?.output0Hour === null
          ? []
          : Object.values(produzido)
              ?.map((item: any) => dashBoardData?.qdp)
              ?.map((qtd: any) => (qtd / 24)?.toFixed(0))
        : [],
      // data: acumulado ? Object.values(acumulado) : [],
      type: "line",
      color: "#f0831b",
    },
  ];

  const optionsBottomLeft: ApexCharts.ApexOptions = {
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: ["#ffffff00"],
      width: 0,
      dashArray: 0,
    },
    noData: {
      text: "Sem Resultados.",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "14px",
        fontFamily: undefined,
      },
    },
    chart: {
      type: "pie",
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
    legend: {
      position: "bottom",
      fontSize: "16px",
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "1.3rem",
      },
      textAnchor: "middle",
      distributed: false,
      offsetX: 0,
      offsetY: 0,
      background: {
        enabled: true,
        foreColor: "#fff",
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#fff",
        opacity: 0.5,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: "#000",
          opacity: 0.45,
        },
      },
    },
    // labels: ["Bracell", "Braskem"],
    labels: volumeEntregue?.map((item: any) => item?.name) || [],
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value: any) {
          return `${value?.toFixed(1)}%`;
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
          style: {
            colors: "#fff",
            fontSize: "18px",
          },
        },
      },
    ],
    // fill: {
    //   colors:['#00bb00', '#aa0000']
    // },
    title: {
      text: `Volume entregue ${summarySelected}`,
      align: "center",
      margin: 40,
      offsetY: 5,
      offsetX: 0,
      floating: false,
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#fff",
      },
    },
  };

  const seriesBottomLeft =
    volumeEntregue?.map((item: any) => item?.percent) || [];
  // const seriesBottomLeft = [
  //   // dashBoardData?.porcentagemSemOcorencias,
  //   // dashBoardData?.porcentagemComOcorencias,
  //   40, 60,
  // ];

  const [currentChart, setCurrentChart]: any = useState(null);

  function customTable2() {
    return (
      <div className="cnx-custom-summary-header-table-ccsht">
        <span>Ordens Planejadas</span>
      </div>
    );
  }

  const head = {
    start: "Hora inicio",
    destination: "Hora fim",
    plate: "Duração",
    orderNumber: "Ocorrência",
    tramo: "Eventos",
  };

  const handleQueryString = (data: any) => {
    const initialValue = "";
    const finalQueryString = data?.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + `${currentValue?.query}=${currentValue?.keyValue}&`,
      initialValue
    );

    return `?${finalQueryString.substring(0, finalQueryString?.length - 1)}`;
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
        title: "Data",
        query: "FilterDate",
        type: "Date",
        // type: "DateRangerPicker",
        keyLabel: "name",
        keyValue: "id",
      },
      {
        title: "Base",
        query: "BaseId",
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        options: enumerators?.bases,
      },
      {
        title: "Cliente",
        query: "ClientId",
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        options: enumerators?.clients,
      },
    ],
  };

  const openAdvancedFilter = () => {
    document
      .getElementById(`cnx-flow-behavior-dashboard-filter${CNX_FILTER_ID}`)
      ?.classList.remove("cnx-filter-display-none-cfdn");
  };

  function dispatchActions(action: any) {
    setPeriodo(action);
  }
  const dayRef = useRef<any>("");

  const setNewFilterDate = (date: any) => {
    const filtered = filters?.filter(
      (item: any) => item?.query !== "FilterDate"
    );

    const defaultFilter = {
      id: "Período7674242",
      title: "Dia",
      type: "Date",
      query: "FilterDate",
      keyLabel: date,
      keyValue: date,
    };

    dispacth({
      type: ACTIONS.SET_FILTERS,
      payload: [...filtered, defaultFilter],
    });
  };
  const loadError = useId();

  const openloadDashboardError = () => {
    const modal: any = document.getElementById(loadError);
    modal?.showModal();
  };

  async function getExportByFiltered({ Filters }: IExport) {
    // dispacth({
    //   type: ACTIONS.LOADING_TABLE,
    //   payload: true,
    // });
    document
      .getElementById("cnx-order-message-loading-export")
      ?.classList.remove("cnx-display-none");
    try {
      const { data } = await axiosInstance(_GET_EXPORT_BY_FILTERS({ Filters }));

      const blob = new Blob([data], { type: "text/csv;charset=utf-8," });
      const objUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", objUrl);
      link.setAttribute("download", "Ordens.csv");
      link.click();

      // document!.querySelector("body").append(link);
    } catch (err: any) {
      console.log("ERRO", err);
      openExportRequestError();
    } finally {
      // dispacth({
      //   type: ACTIONS.LOADING_TABLE,
      //   payload: false,
      // });
      document
        .getElementById("cnx-order-message-loading-export")
        ?.classList.add("cnx-display-none");
    }
  }

  const handleExport = (data: any) => {
    console.log("data?.filtersSelected", filters);
    if (filters.length <= 0) {
      openExportError();
      return;
    }
    getExportByFiltered({
      Filters: handleQueryString(filters),
    });
  };

  const CNX_NO_FILTER = useId();
  const orderExportError = useId();

  const openExportError = () => {
    const modal: any = document.getElementById(CNX_NO_FILTER);
    modal?.showModal();
  };
  const openExportRequestError = () => {
    const modal: any = document.getElementById(orderExportError);
    modal?.showModal();
  };

  const handleToggle = () => {
    // document.querySelector('.cnx-export-chevron-svg-cfpcs')?.classList.toggle('cnx-factory-plant-chevron-svg-up-cfpcsu');
    document
      .querySelector(".cnx-export-ul-ceu-flow-behavior")
      ?.classList.toggle("cnx-export-ul-ceu-show-flow-behavior");
  };

  return (
    <>
      <CnxDialog
        useId={CNX_NO_FILTER}
        type="error"
        content={{
          title: "Exportação cancelada!",
          message: "Necessário selecionar um filtro avançado.",
        }}
      />
      <CnxDialog
        useId={orderExportError}
        type="error"
        content={{
          title: "Erro",
          message: "Erro ao exportar o CSV.",
        }}
      />
      <CnxDialog
        useId={loadError}
        type="error"
        content={{
          title: "Erro",
          message: "Erro ao carregar o Dashboard.",
        }}
      />
      <div id={CNX_ID} className="cnx-travel-dashboard-main-container-clmmc">
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
        <header className="cnx-travel-dashboard-header-clmh">
          <div className="cnx-flow-behavior-left-container">
            <DateSkip
              dispatchActions={setNewFilterDate}
              dayRef={dayRef}
              currentDay={periodo}
            />
            {bases?.length > 0 ? (
              <span className="cnx-filter-data-selected-cfds">
                Bases: {bases}
              </span>
            ) : null}
            {clients?.length > 0 ? (
              <span className="cnx-filter-data-selected-cfds">
                Clientes: {clients}
              </span>
            ) : null}
          </div>
          {/* <span style={{fontSize: '16px', marginLeft: '-520px'}}>Base: Brasken</span> */}

          <span className="cnx-flow-behavior-title">Produção e Vazão</span>
          <div className="cnx-travel-dashboard-actions-container-clmac">
            
            <div className="cnx-export-button-container-cebc">
                <button
                  className="cnx-table-export-button-cteb"
                  type="button"
                  onClick={() => {
                    // handleExport("")
                    handleToggle()
                    // document.getElementById("cnx-export-options-id")?.classList.toggle("cnx-display-none")
                  }}
                >
                  Exportar
                </button>
                 
                  <ul id="cnx-export-ul-id" className='cnx-export-ul-ceu-flow-behavior'>
                    <li><button onClick={() => {
                      handleExport("");
                      // handleClickOutside()
                      document.querySelector('.cnx-export-ul-ceu-flow-behavior')?.classList.toggle('cnx-export-ul-ceu-show-flow-behavior');
                      // document.getElementById("cnx-export-options-id")?.classList.add("cnx-display-none")
                      }}>CSV</button></li>
                  </ul>
                
              </div>
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
              title="Filtro Avançado"
              id={`cnx-occurrences-dashboard-expand-button-clmeb-${CNX_ID}`}
              type="button"
              className="cnx-occurrences-dashboard-header-window-button-clmhwb"
              onClick={() => openAdvancedFilter()}
            >
              <FilterIcon className="cnx-occurrences-dashboard-header-refresh" />
            </button>
            <button
              title="Atualizar"
              id={`cnx-travel-dashboard-expand-button-clmeb-${CNX_ID}`}
              type="button"
              className="cnx-travel-dashboard-header-window-button-clmhwb"
              onClick={() => refreshData()}
            >
              <RefreshIcon className="cnx-travel-dashboard-header-refresh" />
            </button>
            <button
              title="Expandir"
              id={`cnx-travel-dashboard-expand-button-clmeb-${CNX_ID}`}
              type="button"
              className="cnx-travel-dashboard-header-window-button-clmhwb"
              onClick={() => openFullScreenView()}
            >
              <MiniExpandMirrored
                className="cnx-travel-dashboard-header-window-svg-clmhws"
                width="1.2rem"
                height="1.2rem"
              />
            </button>
          </div>

          <button
            id={`cnx-travel-dashboard-contract-button-clmeb-${CNX_ID}`}
            className="cnx-display-none cnx-travel-dashboard-header-window-button-clmhwb"
            type="button"
            onClick={() => closeFullScreenView()}
          >
            <MiniContractMirrored
              className="cnx-travel-dashboard-header-window-svg-clmhws"
              width="1.2rem"
              height="1.2rem"
            />
          </button>
        </header>
        <div className="cnx-flow-behavior-summary-container">
          <div className="cnx-summary-results-container-flow-behavior">
            <span className="cnx-summary-results-title-csrt">QDP</span>
            <span className="cnx-summary-results-value-csrv">
              {dashBoardData?.qdp || 0} m³
            </span>
          </div>
          <div className="cnx-summary-results-container-flow-behavior">
            <span className="cnx-summary-results-title-csrt">Realizado</span>
            <span className="cnx-summary-results-value-csrv">
              {dashBoardData?.realizado || 0} m³
            </span>
          </div>
          <div className="cnx-summary-results-container-flow-behavior">
            <span className="cnx-summary-results-title-csrt">
              Meta Realizada
            </span>
            <span className="cnx-summary-results-value-csrv">
              {dashBoardData?.metaRealizada || 0}%
            </span>
          </div>
          <div className="cnx-summary-results-container-flow-behavior">
            <span className="cnx-summary-results-title-csrt">
              Vazão Média/Dia
            </span>
            <span className="cnx-summary-results-value-csrv">
              {dashBoardData?.vazaoMediaDia?.toFixed(2) || 0} m³/h
            </span>
          </div>
          <div className="cnx-summary-results-container-flow-behavior">
            <span className="cnx-summary-results-title-csrt">
              Tempo Médio Carregamento
            </span>
            <span className="cnx-summary-results-value-csrv">
              {dashBoardData?.tempoMediaCargaDescarga?.toFixed(0) || 0}min
            </span>
          </div>
          <div className="cnx-summary-results-container-flow-behavior">
            <span className="cnx-summary-results-title-csrt">
              QTD Carregamento
            </span>
            <span className="cnx-summary-results-value-csrv">
              {dashBoardData?.qtdCarregamento || 0} Carretas
            </span>
          </div>
        </div>
        <div className="cnx-chart-travel-container-expanded-ctbt cnx-display-none">
          <button
            className="cnx-chart-button-expand"
            onClick={() => handleMiniGannt()}
          >
            <MiniContractIcon />
          </button>
          {currentChart ? (
            <>
              {currentChart.type === "" ? (
                <ReactApexChart
                  options={optionsTopRight}
                  // @ts-ignore
                  series={seriesTopRight}
                  // type="bar"
                  height={"100%"}
                  width={"99%"}
                />
              ) : (
                <ReactApexChart
                  options={currentChart?.options}
                  series={currentChart?.series}
                  type={currentChart?.type}
                  height={"100%"}
                  width={"99%"}
                />
              )}
            </>
          ) : null}
        </div>

        <CnxFilter
          id={`cnx-flow-behavior-dashboard-filter${CNX_FILTER_ID}`}
          filterResponse={filterResponse}
          filterOptions={filterOptions}
          clearFilter={() => null}
          setFilter={filters}
          singleSelects={["BaseId", "ClientId"]}
          keepSelect="FilterDate"
        />

        {!loading ? (
          <>
            <div className="cnx-travel-dashboard-top-left-ctdtl">
              <div className="cnx-chart-container-ctbt">
                <button
                  className="cnx-chart-button-expand"
                  onClick={() =>
                    handleExpandChart({
                      type: "bar",
                      options: optionsTopLeft,
                      series: seriesTopLeft,
                    })
                  }
                >
                  <MiniExpandIcon />
                </button>
                <ReactApexChart
                  options={optionsTopLeft}
                  // @ts-ignore
                  series={seriesTopLeft}
                  type="bar"
                  height={"100%"}
                  width={"99%"}
                />
              </div>
            </div>
            <div className="cnx-travel-dashboard-top-right-ctdtr">
              <div className="cnx-chart-container-ctbt">
                <button
                  className="cnx-chart-button-expand"
                  onClick={() =>
                    handleExpandChart({
                      type: "",
                      options: optionsTopRight,
                      series: seriesTopRight,
                    })
                  }
                >
                  <MiniExpandIcon />
                </button>
                <ReactApexChart
                  options={optionsTopRight}
                  // @ts-ignore
                  series={seriesTopRight}
                  // type="bar"
                  height={"100%"}
                  width={"99%"}
                />
              </div>
            </div>
            <div className="cnx-travel-dashboard-bottom-left-ctdbl">
              <div className="cnx-chart-container-ctbt">
                <button
                  className="cnx-chart-button-expand"
                  onClick={() =>
                    handleExpandChart({
                      type: "pie",
                      options: optionsBottomLeft,
                      series: seriesBottomLeft,
                    })
                  }
                >
                  <MiniExpandIcon />
                </button>
                <ReactApexChart
                  options={optionsBottomLeft}
                  series={seriesBottomLeft}
                  type="pie"
                  height={"100%"}
                  width={"99%"}
                />
              </div>
            </div>
            {/* <div className="cnx-travel-dashboard-bottom-right-ctdbr">
            <div className="cnx-table-background-title-ctbt">
              <CnxTable
                data={[]}
                head={head}
                noSearchBar
                // customSummary={customTable2()}
                // customTdFunction={customTdFunction}
              />
            </div>
          </div> */}
          </>
        ) : null}
      </div>
    </>
  );
}

export default Main;
