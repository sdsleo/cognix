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
        "Bracell X Pojuca",
        "Braskem X Ouriçangas",
        "Pojuca X Bracell",
        "Pojuca X Humildes",
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
      }
    },
    fill: {
      // colors:['#aa0000']
    },
    title: {
      text: 'Quantidade de viagens por rotas',
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
    data: [180,169,130,90]
  }]
}