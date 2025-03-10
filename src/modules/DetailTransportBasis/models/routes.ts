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
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false,
    },
   
    tooltip: {
      enabled: false,
    },
    
    xaxis: {
      categories: ['XBA-4A16', 'INP-2f47','RBA-4A16','INP-EG47','RBA-8A16'],
      labels: {
        style: {
          // colors: '#eeeeee',
          fontSize: '16px'
        }
      },
    },
    yaxis:{
      title: {
        // text:"Viagens"
      },
      labels: {
        style: {
          // colors: '#eeeeee',
          fontSize: '18px'
        }
      },
    },
    fill: {
      // colors:['#aa0000']
    },
   
  }

  series = [{
    data: ['00:00','01:00','02:00','03:00', '04:00']
  }]
}