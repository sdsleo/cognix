import "./styles.css";
import { useEffect, useId, useState, useContext, useLayoutEffect } from "react";
import MiniExpandMirrored from "../../../../assets/icons/FluentUI/SVGs/MiniExpandMirrored";
import MiniContractMirrored from "../../../../assets/icons/FluentUI/SVGs/MiniContractMirrored";
import CnxFilter from "../../../../components/CnxAdvancedFilter";
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
import { _GET, _GET_GANTT, _GET_GANTT_TRANSPORT } from "../../routes";
import ReactApexChart from "react-apexcharts";
import { OccurrencesTypes } from "./models/occurrencesTypes";
import { Occurrences } from "./models/occurrences";
import { Routes } from "./models/routes";
import { ILogisticMonitoring } from "../../context/types";
import { IDashboardGET } from "../../routes/types";
import { _GET_ENUMERATOS } from "../../routes";

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

  const today = new Date();

  const CNX_FILTER_ID = useId();

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

  const optionsTopLeft: ApexCharts.ApexOptions = {
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

  const seriesTopLeft = [
    dashBoardData?.porcentagemSemOcorencias,
    dashBoardData?.porcentagemComOcorencias,
  ];

  const optionsTopRight: ApexCharts.ApexOptions = {
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: ["#ffffff00"],
      width: 0,
      dashArray: 0,
    },
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
    labels:
      dashBoardData?.dashBoardOcurrencesTypes?.length > 0
        ? dashBoardData?.dashBoardOcurrencesTypes?.map(
            (item: any) => item?.description
          )
        : [],
    // responsive: [{
    //   breakpoint: 480,
    //   options: {
    //     chart: {
    //       width: 200
    //     },
    //     legend: {
    //       position: 'bottom'
    //     }
    //   }
    // }],
    // fill: {
    //   colors:['#00bb00', '#aa0000']
    // },
    title: {
      text: "Tipos de ocorrências",
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
  };

  const seriesTopRight =
    dashBoardData?.dashBoardOcurrencesTypes?.length > 0
      ? dashBoardData?.dashBoardOcurrencesTypes?.map(
          (item: any) => item?.percentage
        )
      : [];

  const optionsBottom: ApexCharts.ApexOptions = {
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
        return `${val} %`;
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
          return `${value}`;
        },
      },
      y: {
        formatter: function (
          value: any,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          return `${dashBoardData?.dashBoardOcurrencesTypes[dataPointIndex]?.quantity}`;
        },
      },
    },
    title: {
      margin: 20,
      offsetY: 5,
      text: "",
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
        dashBoardData?.dashBoardOcurrencesTypes?.length > 0
          ? dashBoardData?.dashBoardOcurrencesTypes?.map(
              (item: any) => item?.description
            )
          : [],
      labels: {
        style: {
          colors: "#fff",
          fontSize: "0.85rem",
        },
      },
    },
  };
  const seriesBottom = [
    {
      name: "Quantidade",
      data:
        dashBoardData?.dashBoardOcurrencesTypes?.length > 0
          ? dashBoardData?.dashBoardOcurrencesTypes?.map(
              (item: any) => item?.percentage
            )
          : [],
    },
  ];

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
        .getElementById(
          `cnx-occurrences-dashboard-contract-button-clmeb-${CNX_ID}`
        )
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(
          `cnx-occurrences-dashboard-expand-button-clmeb-${CNX_ID}`
        )
        ?.classList.add("cnx-display-none");
    } else {
      document
        .getElementById(
          `cnx-occurrences-dashboard-contract-button-clmeb-${CNX_ID}`
        )
        ?.classList.add("cnx-display-none");
      document
        .getElementById(
          `cnx-occurrences-dashboard-expand-button-clmeb-${CNX_ID}`
        )
        ?.classList.remove("cnx-display-none");
    }
  }

  const [currentChart, setCurrentChart]: any = useState(null);

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
      .querySelector(".cnx-chart-ocurrences-container-expanded-ctbt")
      ?.classList.remove("cnx-display-none");
  };

  const handleMiniGannt = () => {
    setCurrentChart(null);
    document
      .querySelector(".cnx-chart-ocurrences-container-expanded-ctbt")
      ?.classList.add("cnx-display-none");
  };

  const handleQueryString = (data: any) => {
    const initialValue = "";
    const finalQueryString = data?.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + `${currentValue?.query}=${currentValue?.keyValue}&`,
      initialValue
    );

    return `?${finalQueryString.substring(0, finalQueryString.length - 1)}`;
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

  const getFilterDateSelected = (filters: any) => {
    const dateSelected = filters?.find(
      (filter: any) => filter.query === "filterDate"
    );
    if (!dateSelected) return today.toLocaleDateString();
    return dateSelected?.keyValue;
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
      .getElementById(`cnx-ocurrences-dashboard-filter${CNX_FILTER_ID}`)
      ?.classList.remove("cnx-filter-display-none-cfdn");
  };

  return (
    <div id={CNX_ID} className="cnx-occurrences-dashboard-main-container-clmmc">
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
      <header className="cnx-occurrences-dashboard-header-clmh">
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

        <span>Ocorrências</span>
        <div className="cnx-occurrences-dashboard-actions-container-clmac">
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
            id={`cnx-occurrences-dashboard-expand-button-clmeb-${CNX_ID}`}
            type="button"
            className="cnx-occurrences-dashboard-header-window-button-clmhwb"
            onClick={() =>
              getDashboard({ Filters: handleQueryString(filters) })
            }
          >
            <RefreshIcon className="cnx-occurrences-dashboard-header-refresh" />
          </button>
          <button
            title="Expandir"
            id={`cnx-occurrences-dashboard-expand-button-clmeb-${CNX_ID}`}
            type="button"
            className="cnx-occurrences-dashboard-header-window-button-clmhwb"
            onClick={() => openFullScreenView()}
          >
            <MiniExpandMirrored
              className="cnx-occurrences-dashboard-header-window-svg-clmhws"
              width="1.2rem"
              height="1.2rem"
            />
          </button>
        </div>

        <button
          id={`cnx-occurrences-dashboard-contract-button-clmeb-${CNX_ID}`}
          className="cnx-display-none cnx-occurrences-dashboard-header-window-button-clmhwb"
          type="button"
          onClick={() => closeFullScreenView()}
        >
          <MiniContractMirrored
            className="cnx-occurrences-dashboard-header-window-svg-clmhws"
            width="1.2rem"
            height="1.2rem"
          />
        </button>
      </header>
      <div className="cnx-chart-ocurrences-container-expanded-ctbt cnx-display-none">
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
        id={`cnx-ocurrences-dashboard-filter${CNX_FILTER_ID}`}
        filterResponse={filterResponse}
        filterOptions={filterOptions}
        clearFilter={() => null}
        setFilter={filters}
      />

      {!loading ? (
        <>
          <div className="cnx-occurrences-dashboard-top-left-ctdtl">
            <div className="cnx-gantt-background-title-ctbt">
              <div className="cnx-chart-total-ctbt">
                <span>Quantidade total ocorrências:</span>
                <span className="cnx-chart-total-value-ctbt">
                  {dashBoardData?.totalOcorrencias}
                </span>
              </div>
              <button
                className="cnx-gantt-button-expand"
                onClick={() =>
                  handleExpandChart({
                    type: "pie",
                    options: optionsTopLeft,
                    series: seriesTopLeft,
                    totalTitle: "Quantidade total de ocorrências:",
                    totalValue: dashBoardData?.totalOcorrencias,
                  })
                }
              >
                <MiniExpandIcon />
              </button>
              <ReactApexChart
                options={optionsTopLeft}
                series={seriesTopLeft}
                type="pie"
                height={"100%"}
                width={"99%"}
              />
            </div>
          </div>
          <div className="cnx-occurrences-dashboard-top-right-ctdtr">
            <div className="cnx-gantt-background-title-ctbt">
              <button
                className="cnx-gantt-button-expand"
                onClick={() =>
                  handleExpandChart({
                    type: "pie",
                    options: optionsTopRight,
                    series: seriesTopRight,
                  })
                }
              >
                <MiniExpandIcon />
              </button>
              <ReactApexChart
                options={optionsTopRight}
                series={seriesTopRight}
                type="pie"
                height={"100%"}
                width={"99%"}
              />
            </div>
          </div>
          {/* <div className="cnx-occurrences-dashboard-bottom-left-ctdbl">
            <div className="cnx-gantt-background-title-ctbt">
              <button
                className="cnx-gantt-button-expand"
                onClick={() => handleExpandGannt()}
              >
                <MiniExpandIcon />
              </button>
              <ReactApexChart
                options={optionsbottomleft}
                series={seriesbottomleft}
                type="donut"
                height={"100%"}
                width={"99%"}
              />
            </div>
          </div> */}
          <div className="cnx-occurrences-dashboard-bottom-ctdb">
            <div className="cnx-gantt-background-title-ctbt">
              <button
                className="cnx-gantt-button-expand"
                onClick={() =>
                  handleExpandChart({
                    type: "bar",
                    options: optionsBottom,
                    series: seriesBottom,
                  })
                }
              >
                <MiniExpandIcon />
              </button>

              <ReactApexChart
                options={optionsBottom}
                series={seriesBottom}
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
