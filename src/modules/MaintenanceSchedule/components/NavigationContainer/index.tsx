import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import TableContainer from "../TableContainer";
import FormModalContainer from "../FormModalContainer";
import { Calendar } from "../Calendar";
import {
  CalendarSettingsIcon,
  ListIcon
} from "@fluentui/react-icons-mdl2";
import "./styles.css";

function NavigationContainer() {
  const { dispacth, page } = useContext(UseContext);
  const setActivePage = (page: string) => {
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: page,
    });
  };
  return (
    <>
      <div className="cnx-user-breadcrumbs-cub">
        {page === "list" ? (
          <>
            <button
              className="cnx-list-crumbs-clc"
              onClick={() => setActivePage("list")}
            >
              <ListIcon className="cnx-icon-list-crumb-color-cilcc" />
              Lista /{" "}
            </button>
            <button
              className="cnx-calendar-crumbs-ccc cnx-user-hint-crumb-cuhc"
              onClick={() => setActivePage("calendar")}
            >
              <CalendarSettingsIcon className="cnx-icon-calendar-crumb-color-ciccc cnx-user-hint-crumb-cuhc" />
              Calendário
            </button>
          </>
        ) : null}
        {page === "calendar" ? (
          <>
            <button
              className="cnx-list-crumbs-clc cnx-user-hint-crumb-cuhc"
              onClick={() => setActivePage("list")}
            >
              <ListIcon className="cnx-icon-list-crumb-color-cilcc cnx-user-hint-crumb-cuhc" />
              Lista /{" "}
            </button>
            <button
              className="cnx-calendar-crumbs-ccc"
              onClick={() => setActivePage("calendar")}
            >
              <CalendarSettingsIcon className="cnx-icon-calendar-crumb-color-ciccc" />
              Calendário
            </button>
          </>
        ) : null}
      </div>
      <FormModalContainer />
      {page === "list" ? (
        <>
          <TableContainer />

        </>
      ) : null}
      {page === "calendar" ? (
        <>
          
          <Calendar />
        </>
      ) : null}
    </>
  );
}

export default NavigationContainer;
