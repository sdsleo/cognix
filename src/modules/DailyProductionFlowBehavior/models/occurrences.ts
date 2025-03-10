export class Occurrences{
  options:ApexCharts.ApexOptions = {
    chart:{
      foreColor: '#dddddd',
    },
  tooltip:{
    enabled:false
  },
    legend: {
      position: 'bottom',
      fontSize: window.innerHeight > 768 ? '16px' : '14px',
      
    },
    labels: ['Braskem', 'Bracell'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 400,
        },
        legend: {
          position: 'center'
        }
      }
    }],
    // fill: {
    //   colors:['#00bb00', '#aa0000']
    // },
    title: {
      // text: 'Volume entregue nos clientes',
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
    }
  }

  series = [
    75,25
  ]
}