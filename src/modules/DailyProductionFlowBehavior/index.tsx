// @ts-nocheck

import ReactApexChart from 'react-apexcharts'


import {AverageDelayTime} from './models/averageDelayTime'
import { Container } from './styles'
import { Occurrences } from './models/occurrences'
import { AreaModel } from './models/area'

function DailyProductionFlowBehavior(){
  const averageDelayTime = new AverageDelayTime()
  const occurrences = new Occurrences()
  const areaModel = new AreaModel()

  const height = window.innerHeight > 768 ? 350 : 200
  return (
    <Container>

      <div className='divisor'>
        <div className='container-table'>
          <table>
            <thead>
              <th>QDP</th>
              <th>Realizado</th>
              <th>Meta Realizada</th>
              <th>Pressão de entrada</th>
              <th>Vazão Média/Dia</th>
              <th>Tempo Médio Carregamento</th>
              <th>QTD. Carregamento</th>
            </thead>

            <tbody>
              <tr>
                <td>60.000 m³</td>
                <td>58.000 m³</td>
                <td>97%</td>
                <td>5,94 bar</td>
                <td>2.863 m³/h</td>
                <td>2:35h</td>
                <td>20 carretas</td>
              </tr>
            </tbody>
          </table>
        </div>

       <div className='container-graph'>
          
          <div>
          <header>
            Produção Horária
          </header>
            <ReactApexChart
                  options={averageDelayTime.options}
                  series={averageDelayTime.series}
                  // type="bar"
                  height={height}
                />
          </div>

          <div>
          <header>
            Volume entregue nos clientes
          </header>
            <ReactApexChart
                  options={occurrences.options}
                  series={occurrences.series}
                  type="pie"
                  height={height + 10}
                />
          </div>
       </div>
      </div>

      <div className='divisor separe'>
          

        <div className='container-graph2'>
          <header>            
            Comportamento de vazão
          </header>
          <ReactApexChart
                  options={areaModel.options}
                  series={areaModel.series}
                  // type="area"
                  height={height + 80}
                />
        </div>

        <div className="container-table2">
          <table>
            <thead>
              <th>Horario Inicio </th>
              <th>Horario Final</th>
              <th>Duração</th>
              <th>Ocorrencia</th>
              <th>Eventos</th>
            </thead>
          </table>
        </div>
      </div>

    </Container>
  )
}


export default DailyProductionFlowBehavior