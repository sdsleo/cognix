import { useEffect, useContext, useState, useRef } from "react";

import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import FullCalendar from "@fullcalendar/react"; // must go before plugins

import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import "./styles.css";
import useFetch from "../../../../hooks/useFetch";
import allLocales from "@fullcalendar/core/locales-all";

export function Calendar() {
  const { dispacth, addModal, editModal, rowData, saving, tableData } =
    useContext(UseContext);

  const [eventList, setEventList]: any = useState([]);
  const data: any = []
  // const data = [
  //   {
  //     id: 1,
  //     name: "Manutenção corretiva Pojuca-Tramo1",
  //     description: "Manutenção corretiva Pojuca-Tramo1",
  //     startDateTime: "2023-04-08T10:30:00Z",
  //     finishDateTime: "2023-04-08T14:30:00Z",
  //     backgroundColor: "#c42e47",
  //     borderColor: "#c42e47",
  //     type: 2,
  //     status: 3,
  //     resourceId: "Pojuca-Tramo1",
  //   },
  //   {
  //     id: 2,
  //     name: "Manutenção preventiva veiculo HCJ-7635",
  //     description: "Manutenção preventiva veiculo 	HCJ-7635",
  //     startDateTime: "2023-04-14T10:30:00Z",
  //     finishDateTime: "2023-04-15T14:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 1,
  //     status: 3,
  //     resourceId: "HCJ-7635",
  //   },
  //   {
  //     id: 3,
  //     name: "Manutenção corretiva cavalo KDZ-9D02",
  //     description: "Manutenção corretiva cavalo KDZ-9D02",
  //     startDateTime: "2023-04-11T10:30:00Z",
  //     finishDateTime: "2023-04-11T14:30:00Z",
  //     backgroundColor: "#c42e47",
  //     borderColor: "#c42e47",
  //     type: 2,
  //     status: 3,
  //     resourceId: "KDZ-9D02",
  //   },
  //   {
  //     id: 4,
  //     name: "Coleta tanque para reparo",
  //     description: "Coleta do tanque biometano para reparo",
  //     startDateTime: "2023-04-11T12:30:00Z",
  //     finishDateTime: "2023-04-11T15:30:00Z",
  //     backgroundColor: "#8c8c8c",
  //     borderColor: "#8c8c8c",
  //     type: 2,
  //     status: 3,
  //     resourceId: "KXA-9X02",
  //   },
  //   {
  //     id: 5,
  //     name: "Coleta tanque para reparo",
  //     description: "Coleta do tanque biometano para reparo",
  //     startDateTime: "2023-04-25T08:30:00Z",
  //     finishDateTime: "2023-04-25T14:30:00Z",
  //     backgroundColor: "#8c8c8c",
  //     borderColor: "#8c8c8c",
  //     type: 2,
  //     status: 3,
  //     resourceId: "KDA-5X02",
  //   },
  //   {
  //     id: 6,
  //     name: "Manutenção tanque para reparo",
  //     description: "Coleta do tanque biometano para reparo",
  //     startDateTime: "2023-04-26T10:30:00Z",
  //     finishDateTime: "2023-04-26T14:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 2,
  //     status: 1,
  //     resourceId: "KJA-7X02",
  //   },
  //   {
  //     id: 7,
  //     name: "Troca de veículo",
  //     description: "Troca de veículo operação",
  //     startDateTime: "2023-04-26T11:30:00Z",
  //     finishDateTime: "2023-04-26T15:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 3,
  //     status: 1,
  //     resourceId: "KWA-1W02",
  //   },
  //   {
  //     id: 8,
  //     name: "Coleta tanque para armazenamento",
  //     description: "Coleta do tanque biometano para armazenamento",
  //     startDateTime: "2023-04-26T12:40:00Z",
  //     finishDateTime: "2023-04-26T14:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 2,
  //     status: 1,
  //     resourceId: "KDA-7X02",
  //   },
  //   {
  //     id: 9,
  //     name: "Manutenutenção de veículo",
  //     description: "Manutenutenção de veículo operação",
  //     startDateTime: "2023-04-26T13:30:00Z",
  //     finishDateTime: "2023-04-26T15:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 3,
  //     status: 1,
  //     resourceId: "IQA-6X02",
  //   },
  //   {
  //     id: 10,
  //     name: "Coleta tanque para reparo",
  //     description: "Coleta do tanque biometano para reparo",
  //     startDateTime: "2023-04-25T10:30:00Z",
  //     finishDateTime: "2023-04-25T14:30:00Z",
  //     backgroundColor: "#c42e47",
  //     borderColor: "#c42e47",
  //     type: 2,
  //     status: 4,
  //     resourceId: "KDA-7X02",
  //   },
  //   {
  //     id: 11,
  //     name: "Troca de veículo",
  //     description: "Troca de veículo operação",
  //     startDateTime: "2023-04-25T09:20:00Z",
  //     finishDateTime: "2023-04-26T15:30:00Z",
  //     backgroundColor: "#23af6e",
  //     borderColor: "#23af6e",
  //     type: 3,
  //     status: 2,
  //     resourceId: "KBA-2X02",
  //   },
  //   {
  //     id: 12,
  //     name: "Manutenção tanque Gás",
  //     description: "Manutenção tanque Gás",
  //     startDateTime: "2023-04-27T14:30:00Z",
  //     finishDateTime: "2023-04-28T14:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 1,
  //     status: 1,
  //     resourceId: "KIA-8X02",
  //   },
  //   {
  //     id: 13,
  //     name: "Coleta tanque biometano para reparo",
  //     description: "Coleta tanque biometano para reparo",
  //     startDateTime: "2023-04-28T13:20:00Z",
  //     finishDateTime: "2023-04-29T15:50:00Z",
  //     backgroundColor: "#c42e47",
  //     borderColor: "#c42e47",
  //     type: 2,
  //     status: 4,
  //     resourceId: "KDA-7X02",
  //   },
  //   {
  //     id: 14,
  //     name: "Manutenção Veículo",
  //     description: "Manutenção Veículo Carreta",
  //     startDateTime: "2023-05-04T11:00:00Z",
  //     finishDateTime: "2023-05-07T15:00:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 1,
  //     status: 1,
  //     resourceId: "KNA-1X02",
  //   },
  //   {
  //     id: 15,
  //     name: "Troca de tanque",
  //     description: "Troca de tanque operação",
  //     startDateTime: "2023-05-05T14:00:00Z",
  //     finishDateTime: "2023-05-09T15:00:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 3,
  //     status: 1,
  //     resourceId: "KDA-7X02",
  //   },
  //   {
  //     id: 16,
  //     name: "Troca de tanque",
  //     description: "Troca de tanque operação",
  //     startDateTime: "2023-05-18T14:00:00Z",
  //     finishDateTime: "2023-05-18T15:00:00Z",
  //     backgroundColor: "#c42e47",
  //     borderColor: "#c42e47",
  //     type: 3,
  //     status: 4,
  //     resourceId: "KDA-7X02",
  //   },
  //   {
  //     id: 17,
  //     name: "Troca de tanque",
  //     description: "Troca de tanque operação",
  //     startDateTime: "2023-05-20T14:00:00Z",
  //     finishDateTime: "2023-05-20T15:00:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     type: 3,
  //     status: 1,
  //     resourceId: "KUA-6X02",
  //   },
  // ];
  
  const openEditModal = (rowData: any) => {
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: true,
    });
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: rowData,
    });
  };

  const handleTypeColor = (type: any) => {
    switch(type) {
      case 1:
        return '#2192c3'
      case 2:
        return '#c42e47'
      case 3:
        return '#23af6e'
    }
  }

  const handleCalendarEvents = (data: any) => {
    const events = data.map((item: any) => {
      return {
        title: item.name,
        start: item.startDateTime,
        end: item.finishDateTime,
        editable: true,
        interactive: true,
        backgroundColor: handleTypeColor(item?.type),
        borderColor: handleTypeColor(item?.type),
        allDay: false,
        extendedProps: item,
      };
    });

    return events;
  };

  useEffect(() => {
    setEventList(data);
  }, []);

  const filterByPreventiva = () => {
    const filteredList = data.filter((item: any) => item.type === 1);
    setEventList(filteredList);
  };

  const filterByCorretiva = () => {
    const filteredList = data.filter((item: any) => item.type === 2);
    setEventList(filteredList);
  };

  const filterByMelhoria = () => {
    const filteredList = data.filter((item: any) => item.type === 3);
    setEventList(filteredList);
  };

  const preventivaCalendarRef: any = useRef()
  const corretivaCalendarRef: any = useRef()
  const melhoriaCalendarRef: any = useRef()

  useEffect(() => {
    preventivaCalendarRef.current.checked = true
    corretivaCalendarRef.current.checked = true
    melhoriaCalendarRef.current.checked = true
  }, [])

  const filterBy = () => {

    if (preventivaCalendarRef.current.checked && corretivaCalendarRef.current.checked && melhoriaCalendarRef.current.checked) { 
        setEventList(data); 
      return;
    }

    if (preventivaCalendarRef.current.checked && corretivaCalendarRef.current.checked && !melhoriaCalendarRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 1 || item.type === 2);  
      setEventList(filteredList);
      return;
    }

    if (preventivaCalendarRef.current.checked && !corretivaCalendarRef.current.checked && melhoriaCalendarRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 1 || item.type === 3);
      setEventList(filteredList);
      return;
    }

    if (preventivaCalendarRef.current.checked && !corretivaCalendarRef.current.checked && !melhoriaCalendarRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 1);
      setEventList(filteredList);
      return;
    }

    if (corretivaCalendarRef.current.checked && preventivaCalendarRef.current.checked && !melhoriaCalendarRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 2 || item.type === 1);
      setEventList(filteredList);
      return;
    }

    if (corretivaCalendarRef.current.checked && !preventivaCalendarRef.current.checked && melhoriaCalendarRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 2 || item.type === 3);
      setEventList(filteredList);
      return;
    }

    if (corretivaCalendarRef.current.checked && !preventivaCalendarRef.current.checked && !melhoriaCalendarRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 2);
      setEventList(filteredList);
      return;
    }

    if (melhoriaCalendarRef.current.checked && !corretivaCalendarRef.current.checked && preventivaCalendarRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 3 || item.type === 1);
      setEventList(filteredList);
      return;
    }

    if (melhoriaCalendarRef.current.checked && corretivaCalendarRef.current.checked && !preventivaCalendarRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 3 || item.type === 2);
      setEventList(filteredList);
      return;
    }

    if (melhoriaCalendarRef.current.checked && !corretivaCalendarRef.current.checked && !preventivaCalendarRef.current.checked) {
      const filteredList = data.filter((item: any) => item.type === 3);
      setEventList(filteredList);
      return;
    }
    
  };

  const CustomSummary = () => {
    return (
      <div className="cnx-maintenance-schedule-summary-container-calendar-cmsscc">
        <button
          className="cnx-maintenance-schedule-summary-item-container-calendar-cmssicc"
          onClick={() => setEventList(data)}
        >
          <div className="cnx-maintenance-schedule-summary-dot-calendar-cmssdc" />
          <span>{`Todos (${data.length})`}</span>
        </button>
        <div className="cnx-maintenance-schedule-separator-calendar-cmssc" />
        <button
          className="cnx-maintenance-schedule-summary-item-container-calendar-cmssicc"
          onClick={() => filterByPreventiva()}
        >
          <div className="cnx-maintenance-schedule-summary-dot-calendar-cmssdc cnx-blue-tag" />
          <span>{`Preventiva (${data.filter((item: any) => item.type === 1).length})`}</span>
        </button>
        <div className="cnx-maintenance-schedule-separator-calendar-cmssc" />
        <button
          className="cnx-maintenance-schedule-summary-item-container-calendar-cmssicc"
          onClick={() => filterByCorretiva()}
        >
          <div className="cnx-maintenance-schedule-summary-dot-calendar-cmssdc cnx-red-tag" />
          <span>{`Corretiva (${data.filter((item: any) => item.type === 2).length})`}</span>
        </button>
        <div className="cnx-maintenance-schedule-separator-calendar-cmssc" />
        <button
          className="cnx-maintenance-schedule-summary-item-container-calendar-cmssicc"
          onClick={() => filterByMelhoria()}
        >
          <div className="cnx-maintenance-schedule-summary-dot-calendar-cmssdc cnx-green-tag" />
          <span>{`Melhoria (${data.filter((item: any) => item.type === 3).length})`}</span>
        </button>
      </div>
    );
  };

  const CustomSummaryTest = () => {
    return (
      <div className="cnx-maintenance-schedule-summary-container-calendar-cmsscc">
        {/* <div className="cnx-maintenance-schedule-summary-item-container-cmssic">
          <div className="cnx-maintenance-schedule-summary-dot-cmssd" />
          <input type="checkbox" />
          <span>{`Todos (${data.length})`}</span>
        </div>
        <div className="cnx-maintenance-schedule-separator-cmss" /> */}
        <div
          className="cnx-maintenance-schedule-summary-item-container-cmssic">
          <input defaultChecked={preventivaCalendarRef.current?.checked} onChange={() => filterBy()} ref={preventivaCalendarRef} id="cnx-input-checkbox-calendar-blue-cicb" type="checkbox" className="cnx-input-checkbox-blue-color-cicbc" />
          <label htmlFor="cnx-input-checkbox-calendar-blue-cicb" className="cnx-label-dot-calendar-cldc">Preventiva</label>
          <span>{`(${data.filter((item: any) => item.type === 1).length})`}</span>
          <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-blue-tag" />
        </div>
        <div className="cnx-maintenance-schedule-separator-cmss" />
        <div
          className="cnx-maintenance-schedule-summary-item-container-cmssic">
          <input defaultChecked={corretivaCalendarRef.current?.checked} onChange={() => filterBy()} ref={corretivaCalendarRef} id="cnx-input-checkbox-calendar-red-cicr" type="checkbox" className="cnx-input-checkbox-red-color-cicrc" />
          <label htmlFor="cnx-input-checkbox-calendar-red-cicr" className="cnx-label-dot-calendar-cldc">Corretiva</label>
          <span>{`(${data.filter((item: any) => item.type === 2).length})`}</span>
          <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-red-tag" />
        </div>
        <div className="cnx-maintenance-schedule-separator-cmss" />
        <div
          className="cnx-maintenance-schedule-summary-item-container-cmssic">
          <input defaultChecked={melhoriaCalendarRef.current?.checked} onChange={() => filterBy()} ref={melhoriaCalendarRef} id="cnx-input-checkbox-calendar-green-cicg" type="checkbox" className="cnx-input-checkbox-green-color-cicgc" />
          <label htmlFor="cnx-input-checkbox-calendar-green-cicg" className="cnx-label-dot-calendar-cldc">Melhoria</label>
          <span>{`(${data.filter((item: any) => item.type === 3).length})`}</span>
          <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-green-tag" />
        </div>
      </div>
    );
  };

  const CustomSummary2 = () => {
    return (
      <div className="cnx-maintenance-schedule-summary-container-cmssc">
        <div className="cnx-maintenance-schedule-summary-item-container-cmssic">
          <div className="cnx-maintenance-schedule-summary-dot-cmssd" />
          <input type="checkbox" />
          <span>{`Todos (${data.length})`}</span>
        </div>
        <div className="cnx-maintenance-schedule-separator-cmss" />
        <div
          className="cnx-maintenance-schedule-summary-item-container-cmssic">
          <input onChange={() => filterBy()} ref={preventivaCalendarRef} id="cnx-input-checkbox-calendar-blue-cicb" type="checkbox" className="cnx-input-checkbox-blue-color-cicbc" />
          <label htmlFor="cnx-input-checkbox-calendar-blue-cicb" className="cnx-label-dot-calendar-cldc">Preventiva</label>
          <span>{`(${data.filter((item: any) => item.type === 1).length})`}</span>
          <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-blue-tag" />
        </div>
        <div className="cnx-maintenance-schedule-separator-cmss" />
        <div
          className="cnx-maintenance-schedule-summary-item-container-cmssic">
          <input onChange={() => filterBy()} ref={corretivaCalendarRef} defaultChecked id="cnx-input-checkbox-calendar-red-cicr" type="checkbox" className="cnx-input-checkbox-red-color-cicrc" />
          <label htmlFor="cnx-input-checkbox-calendar-red-cicr" className="cnx-label-dot-calendar-cldc">Corretiva</label>
          <span>{`(${data.filter((item: any) => item.type === 2).length})`}</span>
          <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-red-tag" />
        </div>
        <div className="cnx-maintenance-schedule-separator-cmss" />
        <div
          className="cnx-maintenance-schedule-summary-item-container-cmssic">
          <input onChange={() => filterBy()} ref={melhoriaCalendarRef} defaultChecked id="cnx-input-checkbox-calendar-green-cicg" type="checkbox" className="cnx-input-checkbox-green-color-cicgc" />
          <label htmlFor="cnx-input-checkbox-calendar-green-cicg" className="cnx-label-dot-calendar-cldc">Melhoria</label>
          <span>{`(${data.filter((item: any) => item.type === 3).length})`}</span>
          <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-green-tag" />
        </div>
      </div>
    );
  };


  return (
    <div className="cnx-calendar-component-container-cccc">
      <CustomSummaryTest />
      <FullCalendar
        locales={allLocales}
        locale="pt-PT"
        titleFormat={{ month: "long", year: "numeric" }}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "",
        }}
        timeZone="America/Bahia"
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height={"100%"}
        weekends={true}
        editable={true}
        selectable={true}
        dayMaxEvents={true}
        eventClick={(e) => openEditModal(e.event.extendedProps)}
        events={handleCalendarEvents(tableData?.items || [])}
      />
    </div>
  );
}
