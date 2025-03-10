export class Routes {
  options: ApexCharts.ApexOptions = {
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
    stroke: {
      width: [0, 2, 5],
      curve: "smooth",
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: "22px",
      },
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "category",
      axisBorder: {
        color: "#efefef",
      },
      axisTicks: {
        color: "#efefef",
      },
      categories: ["Atrasos", "Troca de turno", "Abastecimento", "Intervalo"],
      labels: {
        style: {
          colors: "#eeeeee",
          fontSize: window.innerHeight > 768 ? "18px" : "16px",
        },
      },
    },
    yaxis: {
      title: {
        // text:"Viagens"
      },
      labels: {
        style: {
          colors: "#eeeeee",
          fontSize: window.innerHeight > 768 ? "18px" : "16px",
        },
      },
    },
    fill: {
      // colors:['#aa0000']
    },
    title: {
      text: "",
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

  series = [
    {
      name: "Viagens",
      data: [50],
      type: "bar",
      dataLabels: {
        enabled: true,
      },
    },
    {
      name: "Viagens",
      data: [40],
      type: "line",
    },
    {
      name: "Perdas",
      data: [40],
      type: "bar",
      dataLabels: {
        enabled: true,
      },
    },
    {
      name: "Perdas",
      data: [30],
      type: "line",
    },
    {
      name: "Viagens",
      data: [50],
      type: "bar",
      dataLabels: {
        enabled: true,
      },
    },
    {
      name: "",
      data: [50],
      type: "line",
    },
  ];
}
