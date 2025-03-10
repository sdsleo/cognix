import moment from "moment";
import "./styles.css";
import { IDateSkip } from "./type";
import { useEffect, useRef, useState } from "react";
import Input from "../CnxInput/InputTypes/Input";

function DateSkip({ dispatchActions, dayRef, currentDay}: IDateSkip) {
  let today = moment();

  useEffect(() => {
    dayRef.current.value = currentDay;
    onDateChange(currentDay)
    if (currentDay === 'Invalid date') {
      const today2 = moment()
      dayRef.current.value = today2.format("YYYY-MM-DD");
      dispatchActions(today2.format("YYYY-MM-DD"))
    }
  }, [currentDay])

  // const dayRef = useRef<any>(today.format('DD-MM-YYYY'));
  // console.log(today.format("DD-MM-YYYY"));

  function add() {
    today = moment(currentDay)
    today.add(1, "days");
    dayRef.current.value = today.format("YYYY-MM-DD");
    return today.format("YYYY-MM-DD");
    // setDay(today.format('DD-MM-YYYY'))
  }

  function sub() {
    today = moment(currentDay)
    today.subtract(1, "days");
    dayRef.current.value = today.format("YYYY-MM-DD");
    return today.format("YYYY-MM-DD");
    // setDay(today.format('DD-MM-YYYY'))
  }

  function onDateChange(date: string) {
    today = moment(date)
    dayRef.current.value = date;
    dispatchActions(today.format("YYYY-MM-DD"))
    // return today.format("DD/MM/YYYY");
    // return today.format("DD/MM/YYYY");
    // setDay(today.format('DD-MM-YYYY'))
  }

  return (
    <div className="cnx-flow-behavior-day-skip">
      <button
        className="cnx-flow-behavior-day-skip-btn-left"
        onClick={() => {
          dispatchActions(sub());
        }}
      >{`<`}</button>
      {/* <input disabled className="cnx-input-date-skip" type="text" defaultValue={today.format('DD/MM/YYYY')} ref={dayRef}/> */}
      <input
        className="cnx-date-skip-input-date-type"
        type="date"
        // value={today.format("YYYY-MM-DD")}
        defaultValue={today.format("YYYY-MM-DD")}
        onChange={(e) => onDateChange(e.target.value)}
        ref={dayRef}
      />
      {/* <span id="cnx-day-date-id" className="cnx-flow-behavior-day-date">{}</span> */}
      <button
        className="cnx-flow-behavior-day-skip-btn-right"
        onClick={() => {
          dispatchActions(add());
        }}
      >{`>`}</button>
    </div>
  );
}

export { DateSkip };
