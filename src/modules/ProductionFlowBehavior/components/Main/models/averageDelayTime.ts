export class AverageDelayTime {
  options: ApexCharts.ApexOptions = {
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
        text: "Qtd",
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
          return "Qtd " + val;
        },
      },
    },
  };

  series = [
    {
      name: "Produzido",
      color: "#2282ff",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 76, 85, 101, 98, 44, 55,85, 101, 98, 87, 105, 91],
    },
    {
      name: "Acumulado",
      color: "#f0831b",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 22, 44, 55, 57, 56, 61, , 55, 57, 56, 61, 58, 63],
    },
  ];
}