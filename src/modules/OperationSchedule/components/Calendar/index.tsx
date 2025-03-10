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
  const data: any = [];
  // const data = [
  //   {
  //     id: 1,
  //     name: "OP POJUCA",
  //     description: "Operação Pojuca",
  //     startDateTime: "2023-05-16T10:30:00Z",
  //     finishDateTime: "2023-05-17T14:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     valueFactorCapacity: "2300",
  //     status: 1,
  //     resourceId: "POJUCA",
  //   },
  //   {
  //     id: 2,
  //     name: "OP OURIÇANGAS",
  //     description: "Operação OURIÇANGAS",
  //     startDateTime: "2023-05-21T10:30:00Z",
  //     finishDateTime: "2023-05-22T14:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     valueFactorCapacity: "3500",
  //     status: 1,
  //     resourceId: "OURIÇANGAS",
  //   },
  //   {
  //     id: 3,
  //     name: "OP NOVA SOURE",
  //     description: "Operação NOVA SOURE",
  //     startDateTime: "2023-05-22T10:30:00Z",
  //     finishDateTime: "2023-05-23T14:30:00Z",
  //     backgroundColor: "#2192c3",
  //     borderColor: "#2192c3",
  //     valueFactorCapacity: "3200",
  //     status: 1,
  //     resourceId: "NOVA SOURE",
  //   }
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

  const handleCalendarEvents = (data: any) => {
    const events = data.map((item: any) => {
      return {
        title: item.name,
        start: item.startDateTime,
        end: item.finishDateTime,
        editable: true,
        interactive: true,
        backgroundColor: '#2192c3',
        borderColor: '#2192c3',
        allDay: false,
        extendedProps: item,
      };
    });

    return events;
  };

  useEffect(() => {
    setEventList(data);
  }, []);

  // const filterByPreventiva = () => {
  //   const filteredList = data.filter((item: any) => item.type === 1);
  //   setEventList(filteredList);
  // };

  // const filterByCorretiva = () => {
  //   const filteredList = data.filter((item: any) => item.type === 2);
  //   setEventList(filteredList);
  // };

  // const filterByMelhoria = () => {
  //   const filteredList = data.filter((item: any) => item.type === 3);
  //   setEventList(filteredList);
  // };

  // const preventivaCalendarRef: any = useRef()
  // const corretivaCalendarRef: any = useRef()
  // const melhoriaCalendarRef: any = useRef()

  // useEffect(() => {
  //   preventivaCalendarRef.current.checked = true
  //   corretivaCalendarRef.current.checked = true
  //   melhoriaCalendarRef.current.checked = true
  // }, [])

  // const filterBy = () => {
  //   console.log('preventivaCalendarRef', preventivaCalendarRef.current.checked)
  //   console.log('corretivaCalendarRef', corretivaCalendarRef.current.checked)
  //   console.log('melhoriaCalendarRef', melhoriaCalendarRef.current.checked)

  //   if (preventivaCalendarRef.current.checked && corretivaCalendarRef.current.checked && melhoriaCalendarRef.current.checked) { 
  //       setEventList(data); 
  //     return;
  //   }

  //   if (preventivaCalendarRef.current.checked && corretivaCalendarRef.current.checked && !melhoriaCalendarRef.current.checked) {
  //     const filteredList = data.filter((item: any) => item.type === 1 || item.type === 2);  
  //     setEventList(filteredList);
  //     return;
  //   }

  //   if (preventivaCalendarRef.current.checked && !corretivaCalendarRef.current.checked && melhoriaCalendarRef.current.checked) {
  //     const filteredList = data.filter((item: any) => item.type === 1 || item.type === 3);
  //     setEventList(filteredList);
  //     return;
  //   }

  //   if (preventivaCalendarRef.current.checked && !corretivaCalendarRef.current.checked && !melhoriaCalendarRef.current.checked) {
  //     const filteredList = data.filter((item: any) => item.type === 1);
  //     setEventList(filteredList);
  //     return;
  //   }

  //   if (corretivaCalendarRef.current.checked && preventivaCalendarRef.current.checked && !melhoriaCalendarRef.current.checked) {
  //     const filteredList = data.filter((item: any) => item.type === 2 || item.type === 1);
  //     setEventList(filteredList);
  //     return;
  //   }

  //   if (corretivaCalendarRef.current.checked && !preventivaCalendarRef.current.checked && melhoriaCalendarRef.current.checked) {
  //     const filteredList = data.filter((item: any) => item.type === 2 || item.type === 3);
  //     setEventList(filteredList);
  //     return;
  //   }

  //   if (corretivaCalendarRef.current.checked && !preventivaCalendarRef.current.checked && !melhoriaCalendarRef.current.checked) {
  //     const filteredList = data.filter((item: any) => item.type === 2);
  //     setEventList(filteredList);
  //     return;
  //   }

  //   if (melhoriaCalendarRef.current.checked && !corretivaCalendarRef.current.checked && preventivaCalendarRef.current.checked) {
  //     const filteredList = data.filter((item: any) => item.type === 3 || item.type === 1);
  //     setEventList(filteredList);
  //     return;
  //   }

  //   if (melhoriaCalendarRef.current.checked && corretivaCalendarRef.current.checked && !preventivaCalendarRef.current.checked) {
  //     const filteredList = data.filter((item: any) => item.type === 3 || item.type === 2);
  //     setEventList(filteredList);
  //     return;
  //   }

  //   if (melhoriaCalendarRef.current.checked && !corretivaCalendarRef.current.checked && !preventivaCalendarRef.current.checked) {
  //     const filteredList = data.filter((item: any) => item.type === 3);
  //     setEventList(filteredList);
  //     return;
  //   }
    
  // };

  // const CustomSummary = () => {
  //   return (
  //     <div className="cnx-maintenance-schedule-summary-container-calendar-cmsscc">
  //       <button
  //         className="cnx-maintenance-schedule-summary-item-container-calendar-cmssicc"
  //         onClick={() => setEventList(data)}
  //       >
  //         <div className="cnx-maintenance-schedule-summary-dot-calendar-cmssdc" />
  //         <span>{`Todos (${data.length})`}</span>
  //       </button>
  //       <div className="cnx-maintenance-schedule-separator-calendar-cmssc" />
  //       <button
  //         className="cnx-maintenance-schedule-summary-item-container-calendar-cmssicc"
  //         onClick={() => filterByPreventiva()}
  //       >
  //         <div className="cnx-maintenance-schedule-summary-dot-calendar-cmssdc cnx-blue-tag" />
  //         <span>{`Preventiva (${data.filter((item: any) => item.type === 1).length})`}</span>
  //       </button>
  //       <div className="cnx-maintenance-schedule-separator-calendar-cmssc" />
  //       <button
  //         className="cnx-maintenance-schedule-summary-item-container-calendar-cmssicc"
  //         onClick={() => filterByCorretiva()}
  //       >
  //         <div className="cnx-maintenance-schedule-summary-dot-calendar-cmssdc cnx-red-tag" />
  //         <span>{`Corretiva (${data.filter((item: any) => item.type === 2).length})`}</span>
  //       </button>
  //       <div className="cnx-maintenance-schedule-separator-calendar-cmssc" />
  //       <button
  //         className="cnx-maintenance-schedule-summary-item-container-calendar-cmssicc"
  //         onClick={() => filterByMelhoria()}
  //       >
  //         <div className="cnx-maintenance-schedule-summary-dot-calendar-cmssdc cnx-green-tag" />
  //         <span>{`Melhoria (${data.filter((item: any) => item.type === 3).length})`}</span>
  //       </button>
  //     </div>
  //   );
  // };

  // const CustomSummaryTest = () => {
  //   return (
  //     <div className="cnx-maintenance-schedule-summary-container-calendar-cmsscc">
  //       {/* <div className="cnx-maintenance-schedule-summary-item-container-cmssic">
  //         <div className="cnx-maintenance-schedule-summary-dot-cmssd" />
  //         <input type="checkbox" />
  //         <span>{`Todos (${data.length})`}</span>
  //       </div>
  //       <div className="cnx-maintenance-schedule-separator-cmss" /> */}
  //       <div
  //         className="cnx-maintenance-schedule-summary-item-container-cmssic">
  //         <input defaultChecked={preventivaCalendarRef.current?.checked} onChange={() => filterBy()} ref={preventivaCalendarRef} id="cnx-input-checkbox-calendar-blue-cicb" type="checkbox" className="cnx-input-checkbox-blue-color-cicbc" />
  //         <label htmlFor="cnx-input-checkbox-calendar-blue-cicb" className="cnx-label-dot-calendar-cldc">Preventiva</label>
  //         <span>{`(${data.filter((item: any) => item.type === 1).length})`}</span>
  //         <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-blue-tag" />
  //       </div>
  //       <div className="cnx-maintenance-schedule-separator-cmss" />
  //       <div
  //         className="cnx-maintenance-schedule-summary-item-container-cmssic">
  //         <input defaultChecked={corretivaCalendarRef.current?.checked} onChange={() => filterBy()} ref={corretivaCalendarRef} id="cnx-input-checkbox-calendar-red-cicr" type="checkbox" className="cnx-input-checkbox-red-color-cicrc" />
  //         <label htmlFor="cnx-input-checkbox-calendar-red-cicr" className="cnx-label-dot-calendar-cldc">Corretiva</label>
  //         <span>{`(${data.filter((item: any) => item.type === 2).length})`}</span>
  //         <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-red-tag" />
  //       </div>
  //       <div className="cnx-maintenance-schedule-separator-cmss" />
  //       <div
  //         className="cnx-maintenance-schedule-summary-item-container-cmssic">
  //         <input defaultChecked={melhoriaCalendarRef.current?.checked} onChange={() => filterBy()} ref={melhoriaCalendarRef} id="cnx-input-checkbox-calendar-green-cicg" type="checkbox" className="cnx-input-checkbox-green-color-cicgc" />
  //         <label htmlFor="cnx-input-checkbox-calendar-green-cicg" className="cnx-label-dot-calendar-cldc">Melhoria</label>
  //         <span>{`(${data.filter((item: any) => item.type === 3).length})`}</span>
  //         <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-green-tag" />
  //       </div>
  //     </div>
  //   );
  // };

  // const CustomSummary2 = () => {
  //   return (
  //     <div className="cnx-maintenance-schedule-summary-container-cmssc">
  //       <div className="cnx-maintenance-schedule-summary-item-container-cmssic">
  //         <div className="cnx-maintenance-schedule-summary-dot-cmssd" />
  //         <input type="checkbox" />
  //         <span>{`Todos (${data.length})`}</span>
  //       </div>
  //       <div className="cnx-maintenance-schedule-separator-cmss" />
  //       <div
  //         className="cnx-maintenance-schedule-summary-item-container-cmssic">
  //         <input onChange={() => filterBy()} ref={preventivaCalendarRef} id="cnx-input-checkbox-calendar-blue-cicb" type="checkbox" className="cnx-input-checkbox-blue-color-cicbc" />
  //         <label htmlFor="cnx-input-checkbox-calendar-blue-cicb" className="cnx-label-dot-calendar-cldc">Preventiva</label>
  //         <span>{`(${data.filter((item: any) => item.type === 1).length})`}</span>
  //         <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-blue-tag" />
  //       </div>
  //       <div className="cnx-maintenance-schedule-separator-cmss" />
  //       <div
  //         className="cnx-maintenance-schedule-summary-item-container-cmssic">
  //         <input onChange={() => filterBy()} ref={corretivaCalendarRef} defaultChecked id="cnx-input-checkbox-calendar-red-cicr" type="checkbox" className="cnx-input-checkbox-red-color-cicrc" />
  //         <label htmlFor="cnx-input-checkbox-calendar-red-cicr" className="cnx-label-dot-calendar-cldc">Corretiva</label>
  //         <span>{`(${data.filter((item: any) => item.type === 2).length})`}</span>
  //         <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-red-tag" />
  //       </div>
  //       <div className="cnx-maintenance-schedule-separator-cmss" />
  //       <div
  //         className="cnx-maintenance-schedule-summary-item-container-cmssic">
  //         <input onChange={() => filterBy()} ref={melhoriaCalendarRef} defaultChecked id="cnx-input-checkbox-calendar-green-cicg" type="checkbox" className="cnx-input-checkbox-green-color-cicgc" />
  //         <label htmlFor="cnx-input-checkbox-calendar-green-cicg" className="cnx-label-dot-calendar-cldc">Melhoria</label>
  //         <span>{`(${data.filter((item: any) => item.type === 3).length})`}</span>
  //         <div className="cnx-maintenance-schedule-summary-dot-cmssd cnx-green-tag" />
  //       </div>
  //     </div>
  //   );
  // };


  return (
    <div className="cnx-calendar-component-container-cccc">
      {/* <CustomSummaryTest /> */}
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
        events={handleCalendarEvents(tableData?.items)}
      />
    </div>
  );
}
