import { Container, Full } from './styles';
import Search from "../../assets/icons/FluentUI/SVGs/Search"
import { ExportIcon, MiniExpandIcon, RefreshIcon, SettingsIcon, SyncOccurenceIcon } from '@fluentui/react-icons-mdl2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { formatedDate } from '../../utils/datesAndTimes';
import CnxDialog from '../../components/CnxDialog';


const URL_ELIPSE = window.apis.elipse;
const URL_ANYLOGIC = window.apis.anyLogic;
const URL_ANGELIRA =  window.apis.angeLira;


const timerToNewRequest = 30000
let syncEngine:undefined|number

function MonitorConnect() {
  const [isRequest, setIsRequest] = useState(false);
  const [isRequestExport, setIsRequestExport] = useState(false);
  const [elpseStatus, setElpseStatus] = useState(false)
  const [elpseLastDate, setElpseLastDate] = useState('')
  const [elpseLogs, setElpseLogs] = useState<any[]>([])

  const [anyStatus, setAnyStatus] = useState(false)
  const [angeLiraStatus, setAngeLiraStatus] = useState(false)
  const [anyLastDate, setAnyLastDate] = useState('')
  const [angeLiraLastDate, setAngeLiraLastDate] = useState('')
  const [anyLogs, setAnyLogs] = useState<any[]>([])
  const [angeLiraLogs, setAngeLiraLogs] = useState<any[]>([])

  const [viewAllLists, setViewAllLists] = useState<any[]>([])

  
 const [ALL_LOGS_ANY, setALL_LOGS_ANY] = useState([])
 const [ALL_LOGS_ELPSE, setALL_LOGS_ELPSE] = useState([])
 const [ALL_LOGS_ANGELIRA, setALL_LOGS_ANGELIRA] = useState([])


 const [showLogs, setShowLogs] = useState(false)

  async function ELPSE(){
    try{
      const api2:any = await axios.get(`${URL_ELIPSE}/api/v1/elipse/global/health-check`)
      
    
      if(api2.status ){
        setElpseStatus(true)
      }else{
        setElpseStatus(false)
      }

      const api:any = await axios.get(`${URL_ELIPSE}/api/v1/elipse/log/integration`)


      // console.dir(api)
      // console.log(api.data[0].dateTime)

      const lastUpdate = formatedDate(api.data[0].dateTime)

      setElpseLastDate(lastUpdate)
      const logs = api.data.map((item:any) => {
        return {
          ...item,
          dateTime: formatedDate(item.dateTime)
        }
      })

      setALL_LOGS_ELPSE(logs)

      setElpseLogs(logs.filter((_:any,i:number) => i < 5))
    }catch{}
  }

  async function ANYLOGIC(){
    try{
      const api2:any = await axios.get(`${URL_ANYLOGIC}/api/v1/anylogic/global/health-check`)
      
    
      if(api2.status ){
        setAnyStatus(true)
      }else{
        setAnyStatus(false)
      }

      const api:any = await axios.get(`${URL_ANYLOGIC}/api/v1/anylogic/log`)


      // console.dir(api)
      // console.log(api.data[0].dateTime)

      const lastUpdate = formatedDate(api.data[0].dateTime)
      setAnyLastDate(lastUpdate)

      const logs = api.data.map((item:any) => {
        return {
          ...item,
          dateTime: formatedDate(item.dateTime)
        }
      })

      setALL_LOGS_ANY(logs)
      setAnyLogs(logs.filter((_:any,i:number) => i < 5))
    }catch{
      
    }
  }

  async function ANGELIRA(){
    try{
      // const api2:any = await axios.get(`${URL_ANYLOGIC}/api/v1/anylogic/global/health-check`)
      
    
      // if(api2.status ){
      //   setAnyStatus(true)
      // }else{
      //   setAnyStatus(false)
      // }


      // http://10.95.12.117:7063/api/v1/angellira/log/integration
      const api:any = await axios.get(`${URL_ANGELIRA}/api/v1/angellira/log/integration`)
      if(api.status == 200 ){
        setAngeLiraStatus(true)
      }else{
        setAngeLiraStatus(false)
      }

      // console.dir(api)
      // console.log(api.data[0].dateTime)

      const lastUpdate = formatedDate(api.data[0].dateTime)
      setAngeLiraLastDate(lastUpdate)

      const logs = api.data.map((item:any) => {
        return {
          ...item,
          dateTime: formatedDate(item.dateTime)
        }
      })

      setALL_LOGS_ANGELIRA(logs)
      setAngeLiraLogs(logs.filter((_:any,i:number) => i < 5))
    }catch{
      
    }
  }

  async function ANYLOGIC_EXEC_FILES(){
    setIsRequest(true)
    //axios.get(`${URL_ANYLOGIC}/api/v1/anylogic/order`)
    //.then(() => {
      axios.post(`${URL_ANYLOGIC}/api/v1/anylogic/order`)
      .then(() => {
        setIsRequest(false)
        ANYLOGIC()
      })
      .catch(() => {
        const modal = document.getElementById('process_monitor_error') as any;
        modal?.showModal()
        setIsRequest(false)
      })
    //})
    // .catch(() => {
    //   const modal = document.getElementById('process_monitor_error_file') as any;
    //   setIsRequest(false)
    //   modal?.showModal()
    // })
  }
  async function ANYLOGIC_ALL_EXPORT(){
    setIsRequestExport(true)
    //axios.get(`${URL_ANYLOGIC}/api/v1/anylogic/order`)
    //.then(() => {
      axios.post(`${URL_ANYLOGIC}/api/v1/anylogic/export/all`)
      .then(() => {
        setIsRequestExport(false)
      })
      .catch(() => {
        const modal = document.getElementById('process_monitor_error') as any;
        modal?.showModal()
        setIsRequestExport(false)
      })
    //})
    // .catch(() => {
    //   const modal = document.getElementById('process_monitor_error_file') as any;
    //   setIsRequest(false)
    //   modal?.showModal()
    // })
  }

  async function ANGELIRA_EXEC_FILES(){
    setIsRequest(true)
    //axios.get(`${URL_ANYLOGIC}/api/v1/anylogic/order`)
    //.then(() => {
      axios.post(`${URL_ANYLOGIC}/api/v1/anylogic/angel`) // FALTA ROTA PARA EXECUTAR RELOAD ANGELIRA
      .then(() => {
        setIsRequest(false)
        ANYLOGIC()
      })
      .catch(() => {
        // const modal = document.getElementById('process_monitor_error') as any;
        // modal?.showModal()
        // setIsRequest(false)
      })
    //})
    // .catch(() => {
    //   const modal = document.getElementById('process_monitor_error_file') as any;
    //   setIsRequest(false)
    //   modal?.showModal()
    // })
  }


  function SYNC(){
    syncEngine = setInterval(() => {
      ELPSE()
      ANYLOGIC()
      ANGELIRA()
    },timerToNewRequest)

  }

  function setViewLogsFull(value: 'elpse' | 'any' | 'angel'){
    setShowLogs(true)

    if(value === 'elpse'){
      setViewAllLists(ALL_LOGS_ELPSE)
      return 
    }

    if(value === 'angel'){
      setViewAllLists(ALL_LOGS_ANGELIRA)
      return 
    }

    setViewAllLists(ALL_LOGS_ANY)
  }

  useEffect(() => {
    ELPSE()
    ANYLOGIC()
    ANGELIRA()
    SYNC()

    return () => {
      try{
        clearInterval(syncEngine)
      }catch{}
    }
  },[])

  return (
    <>

      <CnxDialog
        useId="process_monitor_error"
        type="error"
        content={{
          title: "Error",
          message: "Erro ao solicitar o processamento do arquivo",
        }}
      />

      <CnxDialog
        useId="process_monitor_error_file"
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível verificar se existe arquivo para ser processador.",
        }}
      />
      <Container>
      <header>
        <span>Monitor de conectividade</span>

        <div onClick={SYNC}>
          <span>Reflesh every 30s</span>
          <SyncOccurenceIcon />
        </div>
      </header>


      <ul>
        <li>
          <div className="name">
            <div>
              <button><SyncOccurenceIcon /></button>
              <button> <SettingsIcon /> </button>
            </div>
            
            <article>
              <span>ELIPSE</span>
            </article>
          </div>

          <div className="default">
            <span>Status</span>           
            <h2 className={elpseStatus ? 'ok' : 'nok'}>{elpseStatus ? 'Running': 'Stopped'}</h2>
          </div>

          <div className="default">
            <span>última atualização</span>
              <h3>{elpseLastDate}</h3>
          </div>

          <div className='logs'>
            <div className='header-logs'>
              <div>
                <button type="button" onClick={() => setViewLogsFull('elpse')}><MiniExpandIcon /></button>
              </div>

              <article>
                <span>Logs</span>
              </article>
            </div>

            <div className='body-logs'>
              <div className='body-header'>
                <span>Data Hora</span>
                <span>Evento</span>
              </div>

              <div className='body-container'>
              {
                elpseLogs.map(item => {
                  return (
                    <div key={item.id}>
                      <span>{item.dateTime}</span>
                      <span>{item.message}</span>
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>
        </li>

        <li>
          <div className="name">
            <div>
              <button className={isRequest ? 'anime': ''} disabled={isRequest} style={{cursor:'pointer'}} type="button" onClick={ANYLOGIC_EXEC_FILES}> <SyncOccurenceIcon /> </button>
              <button className={isRequestExport ? 'animePulse': ''} disabled={isRequestExport} style={{cursor:'pointer'}} type="button" onClick={ANYLOGIC_ALL_EXPORT}> <ExportIcon /> </button>
              <button> <SettingsIcon /> </button>
            </div>
            
            <article>
              <span>ANYLOGIC</span>
            </article>
          </div>

          <div className="default">
            <span>Status</span>
            <h2 className={anyStatus ? 'ok': 'nok'}>{anyStatus ? 'Running': 'Stopped'}</h2>
          </div>

          <div className="default">
            <span>última atualização</span>
              <h3>{anyLastDate}</h3>
          </div>

          <div className='logs'>
            <div className='header-logs'>
              <div>
                <button type="button" onClick={() => setViewLogsFull('any')}><MiniExpandIcon /> </button>
              </div>

              <article>
                <span>Logs</span>
              </article>
            </div>

            <div className='body-logs'>
              <div className='body-header'>
                <span>Data Hora</span>
                <span>Evento</span>
              </div>

              <div className='body-container'>
              {
                anyLogs.map(item => {
                  return (
                    <div key={item.id}>
                      <span>{item.dateTime}</span>
                      <span>{item.message}</span>
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>
        </li>

        <li>
          <div className="name">
            <div>
            <button className={isRequest ? 'anime': ''} disabled={isRequest} style={{cursor:'pointer'}} type="button" onClick={ANGELIRA_EXEC_FILES}> <SyncOccurenceIcon /> </button>
              <button> <SettingsIcon /> </button>
            </div>
            
            <article>
              <span>ANGELLIRA</span>
            </article>
          </div>

          <div className="default">
            <span>Status</span>
            <h2 className={angeLiraStatus ? 'ok': 'nok'}>{angeLiraStatus ? 'Running': 'Stopped'}</h2>
          </div>

          <div className="default">
            <span>última atualização</span>
              <h3>{angeLiraLastDate}</h3>
          </div>

          <div className='logs'>
            <div className='header-logs'>
              <div>
              <button type="button" onClick={() => setViewLogsFull('angel')}><MiniExpandIcon /> </button>
              </div>

              <article>
                <span>Logs</span>
              </article>
            </div>

            <div className='body-logs'>
              <div className='body-header'>
                <span>Data Hora</span>
                <span>Evento</span>
              </div>

              <div className='body-container'>
              {
                angeLiraLogs.map(item => {
                  return (
                    <div key={item.id}>
                      <span>{item.dateTime}</span>
                      <span>{item.message}</span>
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>
        </li>

        <li>
          <div className="name">
            <div>
              <button> <SyncOccurenceIcon /> </button>
              <button><SettingsIcon /></button>
            </div>
            
            <article>
              <span>BANCO DADOS</span>
            </article>
          </div>

          <div className="default">
            <span>Status</span>
            <h2 className='ok'>Running</h2>
          </div>

          <div className="default">
            <span>última atualização</span>
              <h3>02/06/2023 - 07:00:00</h3>
          </div>

          <div className='logs'>
            <div className='header-logs'>
              <div>
                <button><MiniExpandIcon /></button>
              </div>

              <article>
                <span>Logs</span>
              </article>
            </div>

            <div className='body-logs'>
              <div className='body-header'>
                <span>Data Hora</span>
                <span>Evento</span>
              </div>
            </div>
          </div>
        </li>

        
      </ul>

     {
      showLogs && (
        <Full>
        <header className='header'>
          <span className='title'>Logs</span>
          <span className='close' onClick={() => setShowLogs(false)}>x</span>
        </header>

        <ul>
          <li>
                <span className='time title'>Data Hora</span>
                <span className='type title'>Tipo</span>
                <span className='desc title'>Evento</span>
          </li>
        </ul>

        <div className='limiter'>
          <ul>
            {
              viewAllLists.map(item => {
                return (
                  <li key={item.id}>
                        <span className='time '>{item.dateTime}</span>
                        <span className='type '></span>
                        <span className='desc '>{item.message}</span>
                  </li>
                )
              })
            }
            
          </ul>  
        </div>
      </Full>
      )
     }
      
    
      </Container>

      
    </>
  );
}
export default MonitorConnect;
