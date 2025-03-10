import moment from "moment";
import "./styles.css";
import { IDateSkip } from "./type";
import { useEffect, useRef, useState } from "react";

function DateSkipRange({ dispatchActions, dayRef, currentDay}: IDateSkip) {
  const [start, setStart]: any = useState('')
  const [end, setEnd]: any = useState('')

  useEffect(() => {
    const startEnd = currentDay?.split('-')
    const startDay = startEnd ? moment(startEnd[0]?.trim(' '), "DD/MM/YYYY") : moment() 
    const endDay = startEnd ? moment(startEnd[1]?.trim(' '), "DD/MM/YYYY") : moment()
    if(startEnd) {
      onDateChange(startDay.format("YYYY-MM-DD"), endDay.format("YYYY-MM-DD"))
    }
  }, [currentDay])

  function add() {
    const addStartDate = moment(start)
    const addEndDate = moment(end)

    const dayDiff = addStartDate.diff(addEndDate, 'days')

    addStartDate.add(Math.abs(dayDiff), "days")
    addEndDate.add(Math.abs(dayDiff), "days")

    setStart(addStartDate.format("YYYY-MM-DD"))
    setEnd(addEndDate.format("YYYY-MM-DD"))

    dayRef.current.value = `${addStartDate.format("DD/MM/YYYY")} - ${addEndDate.format("DD/MM/YYYY")}`
    return `${addStartDate.format("DD/MM/YYYY")} - ${addEndDate.format("DD/MM/YYYY")}`
  }

  function sub() {
    const subStartDate = moment(start)
    const subEndDate = moment(end)

    const dayDiff = subStartDate.diff(subEndDate, 'days')

    subStartDate.subtract(Math.abs(dayDiff), "days")
    subEndDate.subtract(Math.abs(dayDiff), "days")

    setStart(subStartDate.format("YYYY-MM-DD"))
    setEnd(subEndDate.format("YYYY-MM-DD"))

    dayRef.current.value = `${subStartDate.format("DD/MM/YYYY")} - ${subEndDate.format("DD/MM/YYYY")}`
    return `${subStartDate.format("DD/MM/YYYY")} - ${subEndDate.format("DD/MM/YYYY")}`
  }

  function onDateChange(startDate: any, endDate: any) {
    startDate = moment(startDate)
    endDate = moment(endDate)
    if (startDate.format("DD/MM/YYYY") === 'Invalid date') return;
    if (endDate.format("DD/MM/YYYY") === 'Invalid date') return;
    dayRef.current.value = `${startDate.format("DD/MM/YYYY")} - ${endDate.format("DD/MM/YYYY")}`
    setStart(startDate)
    setEnd(endDate)
    dispatchActions(`${startDate.format("DD/MM/YYYY")} - ${endDate.format("DD/MM/YYYY")}`)
  }

  return (
    <div className="cnx-flow-behavior-day-skip">
      <button
        className="cnx-flow-behavior-day-skip-btn-left"
        onClick={() => {
          dispatchActions(sub());
        }}
      >{`<`}</button>
      <input
        className="cnx-date-skip-range-input-date-type"
        type="text"
        disabled
        ref={dayRef}
      />
      <button
        className="cnx-flow-behavior-day-skip-btn-right"
        onClick={() => {
          dispatchActions(add());
        }}
      >{`>`}</button>
    </div>
  );
}

export { DateSkipRange };
