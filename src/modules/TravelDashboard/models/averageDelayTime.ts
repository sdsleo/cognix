export class AverageDelayTime{
  options:ApexCharts.ApexOptions = {
    chart: {
      toolbar: {
        show:false,
      },
      zoom: {
        enabled: true,
      },
      foreColor: '#eeeeee',
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      style:{
        fontSize:'18px'
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
          fontSize: '18px'
        }
      },
      title: {
        text:"Motoristas",
      }
    },
    yaxis:{

      // title: {
      //   text:"Minutos",
      // },
      labels: {
        style: {
          colors: '#eeeeee',
          fontSize: '16px'
        }
      },
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