export class Routes{
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
        "Braskem",
        "Bracell",
        "Humildes",
        "Total",
      ],
      labels: {
        style: {
          colors: '#eeeeee',
          fontSize: window.innerHeight > 768 ? '18px' : '16px',
        }
      }
    },
    yaxis:{
      title: {
        // text:"Viagens"
      },
      labels: {
        style: {
          colors: '#eeeeee',
          fontSize: window.innerHeight > 768 ? '18px' : '16px',
        }
      }
    },
    fill: {
      // colors:['#aa0000']
    },
    title: {
      text: '',
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
    name: 'Viagens',
    data: [28.224,28.472,22.100,58.300]
  }]
}