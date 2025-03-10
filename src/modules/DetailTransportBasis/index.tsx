// @ts-nocheck
import ReactApexChart from 'react-apexcharts'
import { Container, Row } from './style'
import {Routes} from './models/routes'
import moment from 'moment'

function DetailTransportBasis(){
  const routes = new Routes()
  const height = window.innerHeight > 768 ? 350 : 280
  const timestamp = moment('2023-09-01T17:06:24.5933333').unix();

  return (
    <Container>
      <header>
        <span>POJUCA - detalhe por base transportes</span>
      </header>

      <Row>
        <div>
          <span>Ordens Executadas</span>
          <span><b>7</b>/11</span>
        </div>

        <div>
          <span>Ordens Canceladas</span>
          <span><b>1</b></span>
        </div>

        <div>
          <span>Ordens Congeladas</span>
          <span><b>0</b></span>
        </div>

        <div>
          <span>Vazão Média</span>
          <span><b>1730 m³</b></span>
        </div>

        <div>
          <span>Volume Comprimido</span>
          <span><b>58.900</b>/90.000m³</span>
        </div>
      </Row>


      <Row>
        <div>
          <span>Eficiência Logística</span>
          <span><b>92%</b></span>
        </div>

        <div>
          <span>Eficiência XXXX</span>
          <span><b>??</b></span>
        </div>

        <div>
          <span>Eficiência XXXX</span>
          <span><b>??</b></span>
        </div>

        <div>
          <span>Tempo Médio - Carregamento</span>
          <span><b>03:45</b></span>
        </div>

        <div>
          <span>Tempo Médio - Fila</span>
          <span><b>05:00</b></span>
        </div>
      </Row>

     
      
      <Row className='tables'>
        <article>
          <ReactApexChart
              options={{
                chart: {
                  height: height,
                  type: 'rangeBar',
                  toolbar: {
                    show:true,
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
                  type: 'datetime'
                },
    
              }}
              series={[
                {
                  data: [
                    {
                      x: 'Code',
                      y: [
                        new Date('2019-03-02').getTime(),
                        new Date('2019-03-04').getTime()
                      ]
                    },
                    {
                      x: 'Test',
                      y: [
                        new Date('2019-03-04').getTime(),
                        new Date('2019-03-08').getTime()
                      ]
                    },
                    {
                      x: 'Validation',
                      y: [
                        new Date('2019-03-08').getTime(),
                        new Date('2019-03-12').getTime()
                      ]
                    },
                    {
                      x: 'Deployment',
                      y: [
                        new Date('2019-03-12').getTime(),
                        new Date('2019-03-18').getTime()
                      ]
                    }
                  ]
                }
              ]}
              type="rangeBar"
              height={height + 80}
            />
        </article>

        <article className='table'>
          <h2>Ordens Planejadas</h2>
          <table >
            <thead>
              <tr>
                <th>Inicio</th>
                <th>Destino</th>
                <th>Placa</th>
                <th>Ordem</th>
                <th>Tramo</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={5}>Quarta, 4 de Agosto</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td>02:20</td>
                <td>Braskem</td>
                <td>KXW-0322</td>
                <td>PJ-107</td>
                <td>#2</td>
              </tr>

              <tr>
                <td>02:20</td>
                <td>Braskem</td>
                <td>LOY-7A98</td>
                <td>PJ-107</td>
                <td>#3</td>
              </tr>

              
            </tbody>
          </table>
        </article>
      </Row>
    </Container>
  )
}

export default DetailTransportBasis