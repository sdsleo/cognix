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
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth'
    },
    legend:{
      show:false
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
      style:{
        fontSize:'22px'
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
        "Atrasos",
        "Troca de turno",
        "Abastecimento",
        "Intervalo",
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
    data: [50,20,90,80],
    type: 'bar',
    dataLabels:{
      enabled: true,
    }
  },
  {
    name: '',
    data: [50,60,70,80],
    type: 'line',
  }
]
}