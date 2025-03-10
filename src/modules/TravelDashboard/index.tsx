import FontSize from '../../assets/icons/FluentUI/SVGs/FontSize';
import { AverageDelayTime } from './models/averageDelayTime';
import { Occurrences } from './models/occurrences';
import { Routes } from './models/routes';
import { Container } from './styles';
import ReactApexChart from "react-apexcharts";


function TravelDashboard() {
  
  const averageDelayTime = new AverageDelayTime()
  const occurrences = new Occurrences()
  const routes = new Routes()


  const options_: ApexCharts.ApexOptions = {
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
        fontSize:'14px'
      }
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      title: {
        text:"Motoristas",
      },
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
      }
    },
    yaxis:{

      title: {
        text:"Quilometragem",
      }
    },
    fill: {
      // colors:['#eeffff']
    },

title: {
  text: 'Quilometragem por motorista',
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
  };
  
  const series = [{
    name: '',
    data: [35,27,25]
  }]

  const height = window.innerHeight > 768 ? 350 : 180


  const options: ApexCharts.ApexOptions = {
    chart: {
      height: 250,
      type: 'bar'
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
        dataLabels: {
          position: 'top' // top, center, bottom
        }
      }
    },
    // colors: ['#D64040'],
    dataLabels: {
      enabled: true,
      // formatter(val: any) {
      //   return `${val}%`;
      // },
      offsetY: -20,
      style: {
        fontSize: '16px',
        colors: ['#fff']
      }
    },
    title: {
      text: 'Quilometragem por motorista',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'normal',
        color: '#fff'
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff',
          fontSize : '16px'
        }
      }
    },
    xaxis: {
      categories: [
        "Marcos",
        "João",
        "Felipe"
      ],
      labels: {
        style: {
          colors: '#fff',
          fontSize: '18px',
        }
      }
    },
    legend: {
      show: false,
      showForSingleSeries: true,
      customLegendItems: ['Tipo da Parada', 'Total da Parada'],
      markers: {
        fillColors: ['#D64040', '#abb2b9']
      },
      labels: {
        colors: '#fff'
      }
    }
  }
 


  return (
    <Container>
      <ul>
        <li>
          <div className="header">
            <span>Quantidade de viagens</span>
            <span>435</span>
          </div>

          <div className='graph'>
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={height}
            />
          </div>
        </li>

        <li>
          <div className="header">
            <span>Tempo médio de atraso</span>
            <span>09:00</span>
          </div>

          <div className='graph'>
            <ReactApexChart
              options={averageDelayTime.options}
              series={averageDelayTime.series}
              type="bar"
              height={height}
            />
          </div>
        </li>

        <li>
          <div className="header">
            <span>Ocorrências</span>
            <span>107</span>
          </div>

          <div className='graph'>
            <ReactApexChart
              options={occurrences.options}
              series={occurrences.series}
              type="donut"
              height={height}
            />
          </div>
        </li>

        <li>        
          <div className='graph'>
            <ReactApexChart
              options={routes.options}
              series={routes.series}
              type="bar"
              height={height + 80}
            />
          </div>
        </li>
      </ul>
    </Container>
  );
}
export default TravelDashboard;
