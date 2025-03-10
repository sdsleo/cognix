import { useState, useId, useRef, useEffect } from "react";
import { IDateRangerPicker } from "./types";
import "./styles.css";
import Calendar from "../../../../assets/icons/FluentUI/SVGs/Calendar";
import ChromeClose from "../../../../assets/icons/FluentUI/SVGs/ChromeClose";
import subDays from "date-fns/subDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";
import { format, parseISO } from "date-fns";
import { useContext } from "react";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";

function DateRangerPicker({ inputRef, clear, idClearButton }: IDateRangerPicker) {
  const CNX_ID = useId();
  const { localesData } = useContext<ILocales>(localesContex);
  const [open, setOpen] = useState(false);
  const [date, setDate]: any = useState([]);
  const startDate: any = useRef(null);
  const endDate: any = useRef(null);
  const elementRef: any = useRef(null);

  interface IRangerList {
    label: string;
    value: any;
  }

  const teste = new Date();
  const predefinedRanges = [
    {
      label: localesData?.inputs?.dateRangerPicker?.rangerList?.today || "Hoje",
      value: [
        format(new Date(), "dd/MM/yyyy"),
        format(new Date(), "dd/MM/yyyy"),
      ],
    },
    {
      label:
        localesData?.inputs?.dateRangerPicker?.rangerList?.yesterday || "Ontem",
      value: [
        format(addDays(new Date(), -1), "dd/MM/yyyy"),
        format(addDays(new Date(), -1), "dd/MM/yyyy"),
      ],
    },
    {
      label: localesData?.inputs?.dateRangerPicker?.rangerList?.thisWeek || "Esta Semana",
      value: [
        format(startOfWeek(new Date()), "dd/MM/yyyy"),
        format(endOfWeek(new Date()), "dd/MM/yyyy"),
      ],
    },
    {
      label:
        localesData?.inputs?.dateRangerPicker?.rangerList?.last7days || "Últimos 7 dias",
      value: [
        format(subDays(new Date(), 6), "dd/MM/yyyy"),
        format(new Date(), "dd/MM/yyyy"),
      ],
    },
    {
      label:
        localesData?.inputs?.dateRangerPicker?.rangerList?.last30days || "Últimos 30 dias",
      value: [
        format(subDays(new Date(), 29), "dd/MM/yyyy"),
        format(new Date(), "dd/MM/yyyy"),
      ],
    },
    {
      label:
        localesData?.inputs?.dateRangerPicker?.rangerList?.thisMonth || "Este Mês",
      value: [
        format(startOfMonth(new Date()), "dd/MM/yyyy"),
        format(new Date(), "dd/MM/yyyy"),
      ],
    },
    {
      label:
        localesData?.inputs?.dateRangerPicker?.rangerList?.lastMonth || "Último Mês",
      value: [
        format(startOfMonth(addMonths(new Date(), -1)), "dd/MM/yyyy"),
        format(endOfMonth(addMonths(new Date(), -1)), "dd/MM/yyyy"),
      ],
    },
    {
      label: localesData?.inputs?.dateRangerPicker?.rangerList?.thisYear || "Este Ano",
      value: [
        format(new Date(new Date().getFullYear(), 0, 1), "dd/MM/yyyy"),
        format(new Date(), "dd/MM/yyyy"),
      ],
    },
    {
      label: localesData?.inputs?.dateRangerPicker?.rangerList?.lastYear || "Último Ano",
      value: [
        format(new Date(new Date().getFullYear() - 1, 0, 1), "dd/MM/yyyy"),
        format(new Date(new Date().getFullYear(), 0, 0), "dd/MM/yyyy"),
      ],
    },
    {
      label: localesData?.inputs?.dateRangerPicker?.rangerList?.allTime || "Todo Período",
      value: [
        format(new Date(new Date().getFullYear() - 1, 0, 1), "dd/MM/yyyy"),
        format(new Date(), "dd/MM/yyyy"),
      ],
    },
    {
      label: localesData?.inputs?.dateRangerPicker?.rangerList?.custom || "Personalizado",
      value: null,
    },
  ];

  const openCustomDateRangerPicker = () => {
    const element0: HTMLElement | null = document.getElementById(
      `cnx-date-ranger-picker-float-inputs-container${CNX_ID}`
    );
    element0?.classList.remove("cnx-display-none");

    const element1: HTMLElement | null = document.getElementById(
      `cnx-date-ranger-picker-shortcut-list-${CNX_ID}`
    );
    element1?.classList.remove("cnx-date-ranger-picker-shortcut-list-cdrpsl");
    element1?.classList.add(
      "cnx-date-ranger-picker-shortcut-list-flex-row-cdrpslfr"
    );

    const element2: HTMLElement | null = document.getElementById(
      `cnx-date-ranger-picker-float-container-${CNX_ID}`
    );
    element2?.classList.remove("cnx-date-ranger-picker-float-container-cdrpfc");
    element2?.classList.add(
      "cnx-date-ranger-picker-float-custom-container-cdrpfcc"
    );
  };

  const handleStartEndVerify = () => {
    if (startDate.current && endDate.current) {
      // console.log('####', [format(parseISO(startDate.current), 'dd/MM/yyyy'), format(parseISO(endDate.current), 'dd/MM/yyyy')])
      setOpen(false);
      setDate([format(parseISO(startDate.current), 'dd/MM/yyyy'), format(parseISO(endDate.current), 'dd/MM/yyyy')]);
      startDate.current = null;
      endDate.current = null;
    }
  }

  useOnClickOutside(elementRef, () => {
    setOpen(false);
    startDate.current = null;
    endDate.current = null;
  });

  return (
    <div ref={elementRef} className="cnx-date-ranger-picker-main-container-cdrpmc">
      <div className="cnx-date-ranger-picker-main-input-container-cdrpmic">
        <input
          className="cnx-date-ranger-picker-main-input-cdrpmi"
          type="text"
          ref={inputRef}
          disabled
          value={date.length > 0 ? `${date[0]} - ${date[1]}` : ""}
          placeholder={localesData?.inputs?.dateRangerPicker?.placeholder || "Select"}
        />
        <button
          id={idClearButton}
          className="cnx-date-ranger-picker-main-button-cdrpmb"
          type="button"
          onClick={() =>
            date.length > 0 ? (setOpen(false), setDate([])) : setOpen(!open)
          }
        >
          {date.length > 0 ? (
            <ChromeClose width="12px" height="12px" />
          ) : (
            <Calendar />
          )}
        </button>
      </div>
      {open ? (
        <div
          id={`cnx-date-ranger-picker-float-container-${CNX_ID}`}
          className="cnx-date-ranger-picker-float-container-cdrpfc"
        >
          <div
            id={`cnx-date-ranger-picker-float-inputs-container${CNX_ID}`}
            className="cnx-date-ranger-picker-float-inputs-container-cdrpfic cnx-display-none"
          >
            <div className="cnx-date-ranger-picker-label-input-container-cdrplic">
              <label
                htmlFor={`cnx-date-ranger-picker-label-start-date-${CNX_ID}`}
              >
                Data início
              </label>
              <input
                id={`cnx-date-ranger-picker-label-start-date-${CNX_ID}`}
                type="date"
                onChange={(e) => (startDate.current = e.currentTarget.value)}
              />
            </div>
            <div className="cnx-date-ranger-picker-label-input-container-cdrplic">
              <label
                htmlFor={`cnx-date-ranger-picker-label-end-date-${CNX_ID}`}
              >
                Data fim
              </label>
              <input
                id={`cnx-date-ranger-picker-label-end-date-${CNX_ID}`}
                type="date"
                onChange={(e) => (endDate.current = e.currentTarget.value)}
              />
            </div>
            <button
              className="cnx-date-ranger-picker-apply-button-cdrpab"
              type="button"
              onClick={() =>
                handleStartEndVerify()
              }
            >
              aplicar
            </button>
          </div>
          <div
            id={`cnx-date-ranger-picker-shortcut-list-${CNX_ID}`}
            className="cnx-date-ranger-picker-shortcut-list-cdrpsl"
          >
            {predefinedRanges?.map((item: IRangerList) => (
              <button
                type="button"
                onClick={() =>
                  item.value
                    ? (setDate(item.value), setOpen(false))
                    : openCustomDateRangerPicker()
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default DateRangerPicker;
