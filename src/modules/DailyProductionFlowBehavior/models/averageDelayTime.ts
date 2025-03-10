export class AverageDelayTime{
  options:ApexCharts.ApexOptions = {
    chart: {
      toolbar: {
        show:false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: '#eeeeee',
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      style:{
        fontSize:'16px'
      }
    },
    tooltip: {
      enabled: false,
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
      ],
      labels: {
        style: {
          colors: '#eeeeee',
          fontSize: '18px'
        }
      },
      title: {
        // text:"Motoristas",
      }
    },
    yaxis:{

      title: {
        // text:"Minutos",

      },
      labels: {
        style: {
          colors: '#eeeeee',
          fontSize: '18px'
        }
      },
    },
    fill: {
      // colors:['#FF4560', '#FFEE00']
    },
    title: {
      // text: 'Produção Horária',
      align: 'left',
      margin: 20,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize:  '18px',
        fontWeight:  'bold',
        color:  '#fff'
      },
    },
    legend:{
      show:false
    }
  }

  series = [
    {
      name: 'm2',
      data: ['10000', '11000 ', '12000', '15500'],
      type: 'bar',
    },
    {
      name: 'm2',
      data: ['10000', '11000 ', '12000', '15000'],
      type: 'line',
    }
]
}