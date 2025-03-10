export class AverageDelayTime{
  options:ApexCharts.ApexOptions = {
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
      }
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      style:{
        fontSize:'14px'
      }
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      type: "category",
      axisBorder: {
        color: '#efefef',
      },
      axisTicks: {
        color: '#efefef',
      },
      categories: [
        "Marcos",
        "João",
        "Felipe"
      ],
      labels: {
        style: {
          colors: '#eeeeee',
          fontSize: '16px'
        }
      },
      title: {
        text:"Motoristas",
      }
    },
    yaxis:{

      title: {
        text:"Minutos",

      }
    },
    fill: {
      colors:['#FF4560']
    },
    title: {
      text: 'Total médio de atraso',
      align: 'center',
      margin: 20,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize:  '18px',
        fontWeight:  'bold',
        color:  '#fff'
      },
    }
  }

  series = [{
    name: 'Minutos de atraso',
    data: [2,3,6]
  }]
}