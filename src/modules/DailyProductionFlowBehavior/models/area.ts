export class AreaModel {
  options: ApexCharts.ApexOptions = {
          
      
      chart:{
        foreColor: '#dddddd',
        toolbar: {
          show:false,
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      
      title: {
        // text: 'Comportamento de vazão',
        // align: 'left',
        
      },
      subtitle: {
        text: '',
        align: 'left'
      },
      labels: [
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
      "20h"],
      xaxis: {
        // type: 'datetime',
        labels:{
          style: {
            colors: '#eeeeee',
            fontSize: '18px'
          }
        }
      },
      yaxis: {
        // opposite: true
        labels:{
          style: {
            colors: '#eeeeee',
            fontSize: '18px'
          }
        }
      },
      legend: {
        horizontalAlign: 'left',
        
          show:false
        
      },
      tooltip:{
        enabled:false
      },
      
  
  
  
  };

  series = [{
    name: "",
    data: [20,10,15, 35, 50]
  },
  {
    name: 'm2',
    data: ['15', '15 ', '15', '15'],
    type: 'line',
  }
]

}