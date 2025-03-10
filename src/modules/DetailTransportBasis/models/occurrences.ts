export class Occurrences{
  options:ApexCharts.ApexOptions = {
    chart:{
      foreColor: '#dddddd',
    },
    legend: {
      position: 'bottom',
      fontSize: window.innerHeight > 768 ? '16px' : '14px',
      
    },
    labels: ['Sem ocorrências', 'Ocorrências',],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    // fill: {
    //   colors:['#00bb00', '#aa0000']
    // },
    title: {
      text: 'Total de ocorrências',
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

  series = [
    75,25
  ]
}