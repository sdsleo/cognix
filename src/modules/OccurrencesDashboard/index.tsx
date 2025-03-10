import { AverageDelayTime } from './models/averageDelayTime';
import { Occurrences } from './models/occurrences';
import { OccurrencesTypes } from './models/occurrencesTypes';
import { Routes } from './models/routes';
import { Container } from './styles';
import ReactApexChart from "react-apexcharts";


function OccurrencesDashboard() {
  
  const occurrencesTypes = new OccurrencesTypes()
  const occurrences = new Occurrences()
  const routes = new Routes()


  
  const series = [{
    name: 'Inflation',
    data: [20,30,10]
  }]

  const height = window.innerHeight > 768 ? 350 : 190




  return (
    <Container>
      <ul>        
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
          <div className="header" style={{opacity:0}}>
            <span>Ocorrências</span>
            <span>107</span>
          </div>

          <div className='graph'>
            <ReactApexChart
              options={occurrencesTypes.options}
              series={occurrencesTypes.series}
              type="donut"
              height={height + 20}
            /> 
          </div>
        </li>

        <li className='plus'>
        

          <div className='graph'>
            <ReactApexChart
              options={routes.options}
              series={routes.series}
              // type=["bar"]
              height={height + 80}
            />
          </div>
        </li>
      </ul>
    </Container>
  );
}
export default OccurrencesDashboard;
