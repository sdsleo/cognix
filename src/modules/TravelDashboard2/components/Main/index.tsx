import "./styles.css";
import { useEffect, useId, useState, useContext, useLayoutEffect } from "react";
import MiniExpandMirrored from "../../../../assets/icons/FluentUI/SVGs/MiniExpandMirrored";
import MiniContractMirrored from "../../../../assets/icons/FluentUI/SVGs/MiniContractMirrored";
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
  _GET_GANTT,
  _GET_GANTT_TRANSPORT,
} from "../../routes";
import ReactApexChart from "react-apexcharts";
import { ILogisticMonitoring } from "../../context/types";
import { IDashboardGET } from "../../routes/types";
import CnxFilter from "../../../../components/CnxAdvancedFilter";

function Main() {
  const {
    dispacth,
    loading,
    dashBoardData,
    filters,
    autoRefresh,
    timeToRefresh,
    enumerators,
  }: ILogisticMonitoring = useContext(UseContext);

  const CNX_FILTER_ID = useId();

  const today = new Date();

  const getFilterDateSelected = (filters: any) => {
    const dateSelected = filters?.find(
      (filter: any) => filter?.query === "filterDate"
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

  async function getDashboard({ Filters }: IDashboardGET) {
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
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING,
        payload: false,
      });
    }
  }

  useEffect(() => {
    getDashboard({ Filters: handleQueryString(filters) });
  }, []);

  useLayoutEffect(() => {
    if (autoRefresh) {
      const intervalId = setInterval(() => {
        getDashboard({ Filters: handleQueryString(filters) });
      }, timeToRefresh);
      if (filters.length > 0) {
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
    type: string;
    options: any;
    series: any;
    totalTitle?: any;
    totalValue?: any;
  };

  const handleExpandChart = ({
    type,
    options,
    series,
    totalTitle,
    totalValue,
  }: IChartObject) => {
    setCurrentChart({
      type,
      options,
      series,
      totalTitle,
      totalValue,
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
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
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
        columnWidth: "30%",
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    // colors: ['#D64040'],
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      // formatter(val: any) {
      //   return `${val}%`;
      // },
      offsetY: -20,
      style: {
        fontSize: "1rem",
        colors: ["#fff"],
      },
      formatter: function (val: any, opts: any) {
        return `${val} Km`;
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
        formatter: function (
          value: any,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return `${value} `;
        },
      },
      y: {
        formatter: function (
          value: any,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return `${value} Km`;
        },
      },
    },
    title: {
      margin: 40,
      offsetY: 45,
      text: "Quilometragem por motorista",
      align: "center",
      style: {
        fontSize: "1.06rem",
        fontWeight: "bold",
        color: "#fff",
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
          fontSize: "0.85rem",
        },
      },
    },
    xaxis: {
      categories:
        dashBoardData?.dashBoardKmMotoristas?.length > 0
          ? dashBoardData?.dashBoardKmMotoristas?.map((item: any) => item?.name)
          : [],
      labels: {
        style: {
          colors: "#fff",
          fontSize: "0.85rem",
        },
      },
    },
    legend: {
      show: false,
      showForSingleSeries: true,
      customLegendItems: ["Tipo da Parada", "Total da Parada"],
      markers: {
        fillColors: ["#D64040", "#abb2b9"],
      },
      labels: {
        colors: "#fff",
      },
    },
  };
  const series = [
    {
      name: "Quilometragem",
      data:
        dashBoardData?.dashBoardKmMotoristas?.length > 0
          ? dashBoardData?.dashBoardKmMotoristas?.map((item: any) => item?.km)
          : [],
    },
  ];

  const optionstopright: ApexCharts.ApexOptions = {
    chart: {
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
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "1rem",
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
        formatter: function (
          value: any,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return `${value} - CPF: ${dashBoardData?.dashBoardAtrasosMotorista[dataPointIndex]?.driverDocument}`;
        },
      },
    },
    xaxis: {
      type: "category",
      axisBorder: {
        color: "#efefef",
      },
      axisTicks: {
        color: "#efefef",
      },
      categories:
        dashBoardData?.dashBoardAtrasosMotorista?.length > 0
          ? dashBoardData?.dashBoardAtrasosMotorista?.map(
              (item: any) => item?.driverName
            )
          : [],
      labels: {
        style: {
          colors: "#eeeeee",
          fontSize: "0.85rem",
        },
      },
      title: {
        text: "Motoristas",
      },
    },
    yaxis: {
      // title: {
      //   text:"Minutos",
      // },
      labels: {
        style: {
          colors: "#eeeeee",
          fontSize: "0.85rem",
        },
      },
    },
    fill: {
      colors: ["#FF4560"],
    },
    title: {
      margin: 40,
      offsetY: 40,
      text: "Total médio de atraso",
      align: "center",
      offsetX: 0,
      floating: false,
      style: {
        fontSize: "1.06rem",
        fontWeight: "bold",
        color: "#fff",
      },
    },
  };

  const seriestopright = [
    {
      name: "Minutos de atraso",
      data:
        dashBoardData?.dashBoardAtrasosMotorista?.length > 0
          ? dashBoardData?.dashBoardAtrasosMotorista?.map(
              (item: any) => item?.totalDalay
            )
          : [],
    },
  ];

  const optionsbottomleft: ApexCharts.ApexOptions = {
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: ["#ffffff00"],
      width: 0,
      dashArray: 0,
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
    labels: ["Sem ocorrências", "Ocorrências"],
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value: any) {
          return `${value}%`;
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
      text: "Total de ocorrências",
      align: "center",
      margin: 40,
      offsetY: 35,
      offsetX: 0,
      floating: false,
      style: {
        fontSize: "1.06rem",
        fontWeight: "bold",
        color: "#fff",
      },
    },
  };

  const seriesbottomleft = [
    dashBoardData?.porcentagemSemOcorencias,
    dashBoardData?.porcentagemComOcorencias,
  ];

  const optionsbottomright: ApexCharts.ApexOptions = {
    chart: {
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
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "1rem",
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (
          value: any,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return value.toFixed(0);
        },
      },
    },
    xaxis: {
      type: "category",
      axisBorder: {
        color: "#efefef",
      },
      axisTicks: {
        color: "#efefef",
      },
      categories:
        dashBoardData?.dashBoardViagensRota?.length > 0
          ? dashBoardData?.dashBoardViagensRota?.map(
              (item: any) => item?.routeName
            )
          : [],
      labels: {
        style: {
          colors: "#eeeeee",
          fontSize: "0.85rem",
        },
      },
    },
    yaxis: {
      title: {
        // text:"Viagens"
      },
    },
    fill: {
      // colors:['#aa0000']
    },
    title: {
      text: "Quantidade de viagens por rotas",
      align: "center",
      offsetY: 20,
      margin: 20,
      offsetX: 0,
      floating: false,
      style: {
        fontSize: "1.06rem",
        fontWeight: "bold",
        color: "#fff",
      },
    },
  };

  const seriesbottomright = [
    {
      name: "Viagens",
      data:
        dashBoardData?.dashBoardViagensRota?.length > 0
          ? dashBoardData?.dashBoardViagensRota?.map((item: any) => 1)
          : [],
    },
  ];

  const [currentChart, setCurrentChart]: any = useState(null);

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

  interface IFilter {
    title: string;
    query: string;
    type: string;
    keyLabel: string;
    keyValue: string;
  }

  interface IFilterSelected {
    filters: IFilter[];
    query: string;
  }

  const getFilterSelected = ({ filters, query }: IFilterSelected) => {
    const dateSelected = filters?.find(
      (filter: IFilter) => filter.query === query
    );
    if (!dateSelected) return today.toLocaleDateString();
    return dateSelected?.keyValue;
  };

  const [periodo, setPeriodo] = useState(today.toLocaleDateString());
  const [vehicle, setVehicle] = useState(today.toLocaleDateString());
  const [driver, setDriver] = useState(today.toLocaleDateString());
  const [base, setBase] = useState(today.toLocaleDateString());
  const [client, setClient] = useState(today.toLocaleDateString());

  useEffect(() => {
    // setPeriodo(getFilterDateSelected(filters));
    setPeriodo(getFilterSelected({ filters, query: "filterDate" }));
    setVehicle(getFilterSelected({ filters, query: "VehicleIds" }));
    setDriver(getFilterSelected({ filters, query: "CustomDriverIds" }));
    setBase(getFilterSelected({ filters, query: "BaseIds" }));
    setClient(getFilterSelected({ filters, query: "ClientIds" }));
  }, [filters]);

  const filterOptions = {
    route: "",
    filters: [
      {
        title: "Período",
        query: "filterDate",
        type: "DateRangerPicker",
        keyLabel: "name",
        keyValue: "id",
      },
      {
        title: "Carreta",
        query: "VehicleIds",
        type: "MultSelectCheckbox",
        keyLabel: "plate",
        keyValue: "id",
        options: enumerators?.vehicles,
      },
      {
        title: "Motorista",
        query: "DriverIds",
        type: "MultSelectCheckbox",
        keyLabel: "name",
        keyValue: "id",
        options: enumerators?.customDrivers,
      },
      {
        title: "Base",
        query: "BaseIds",
        type: "MultSelectCheckbox",
        keyLabel: "name",
        keyValue: "id",
        options: enumerators?.bases,
      },
      {
        title: "Cliente",
        query: "ClientIds",
        type: "MultSelectCheckbox",
        keyLabel: "name",
        keyValue: "id",
        options: enumerators?.clients,
      },
    ],
  };

  const openAdvancedFilter = () => {
    document
      .getElementById(`cnx-travel-dashboard-filter${CNX_FILTER_ID}`)
      ?.classList.remove("cnx-filter-display-none-cfdn");
  };

  return (
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
        <div className="cnx-occurrences-dashboard-header-left-clmhl">
          <span className="cnx-filter-data-selected-cfds">
            Período: {periodo}
          </span>
          {filters.length > 0 ? (
            <>
              <div className="cnx-more-filters-applyed-separator" />
              <div className="cnx-more-filters-applyed-container">
                <span>mais</span>
                <span>
                  {filters.length}
                </span>
                <span>filtros aplicados</span>
              </div>
            </>
          ) : null}
        </div>
        <span>Viagens</span>
        <div className="cnx-travel-dashboard-actions-container-clmac">
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
            onClick={() =>
              getDashboard({ Filters: handleQueryString(filters) })
            }
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
      <div className="cnx-chart-travel-container-expanded-ctbt cnx-display-none">
        {currentChart?.totalValue ? (
          <div className="cnx-chart-total-ctbt">
            <span>{currentChart.totalTitle}</span>
            <span className="cnx-chart-total-value-ctbt">
              {currentChart.totalValue}
            </span>
          </div>
        ) : null}

        <button
          className="cnx-chart-button-expand"
          onClick={() => handleMiniGannt()}
        >
          <MiniContractIcon />
        </button>
        {currentChart ? (
          <ReactApexChart
            options={currentChart?.options}
            series={currentChart?.series}
            type={currentChart?.type}
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

      {!loading ? (
        <>
          <div className="cnx-travel-dashboard-top-left-ctdtl">
            <div className="cnx-chart-container-ctbt">
              <div className="cnx-chart-total-ctbt">
                <span>Quantidade de viagens:</span>
                <span className="cnx-chart-total-value-ctbt">
                  {dashBoardData?.totalViagens}
                </span>
              </div>
              <button
                className="cnx-chart-button-expand"
                onClick={() =>
                  handleExpandChart({
                    type: "bar",
                    options: options,
                    series: series,
                    totalTitle: "Quantidade de viagens:",
                    totalValue: dashBoardData?.totalViagens,
                  })
                }
              >
                <MiniExpandIcon />
              </button>
              <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={"100%"}
                width={"99%"}
              />
            </div>
          </div>
          <div className="cnx-travel-dashboard-top-right-ctdtr">
            <div className="cnx-chart-container-ctbt">
              <div className="cnx-chart-total-ctbt">
                <span>Tempo médio de atraso:</span>
                <span className="cnx-chart-total-value-ctbt">
                  {dashBoardData?.mediaAtraso} min
                </span>
              </div>
              <button
                className="cnx-chart-button-expand"
                onClick={() =>
                  handleExpandChart({
                    type: "bar",
                    options: optionstopright,
                    series: seriestopright,
                    totalTitle: "Tempo médio de atraso:",
                    totalValue: `${dashBoardData?.mediaAtraso} min`,
                  })
                }
              >
                <MiniExpandIcon />
              </button>
              <ReactApexChart
                options={optionstopright}
                series={seriestopright}
                type="bar"
                height={"100%"}
                width={"99%"}
              />
            </div>
          </div>
          <div className="cnx-travel-dashboard-bottom-left-ctdbl">
            <div className="cnx-chart-container-ctbt">
              <div className="cnx-chart-total-ctbt">
                <span>Ocorrências:</span>
                <span className="cnx-chart-total-value-ctbt">
                  {dashBoardData?.totalOcorrencias}
                </span>
              </div>
              <button
                className="cnx-chart-button-expand"
                onClick={() =>
                  handleExpandChart({
                    type: "pie",
                    options: optionsbottomleft,
                    series: seriesbottomleft,
                    totalTitle: "Ocorrências:",
                    totalValue: dashBoardData?.totalOcorrencias,
                  })
                }
              >
                <MiniExpandIcon />
              </button>
              <ReactApexChart
                options={optionsbottomleft}
                series={seriesbottomleft}
                type="pie"
                height={"100%"}
                width={"99%"}
              />
            </div>
          </div>
          <div className="cnx-travel-dashboard-bottom-right-ctdbr">
            <div className="cnx-chart-container-ctbt">
              <button
                className="cnx-chart-button-expand"
                onClick={() =>
                  handleExpandChart({
                    type: "bar",
                    options: optionsbottomright,
                    series: seriesbottomright,
                  })
                }
              >
                <MiniExpandIcon />
              </button>

              <ReactApexChart
                options={optionsbottomright}
                series={seriesbottomright}
                type="bar"
                height={"100%"}
                width={"99%"}
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Main;
