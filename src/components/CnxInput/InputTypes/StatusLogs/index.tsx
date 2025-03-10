import React from "react";
import FullHistory from "../../../../assets/icons/FluentUI/SVGs/FullHistory";
import Select from "../Select";

import "./styles.css";
import { IInput } from "./types";
import { useRef } from "react";
import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";
const StatusLogs = ({
  label,
  keyLabel,
  keyValue,
  name,
  value,
  defaultValue,
  defaultOption,
  mandatory,
  placeholder,
  options,
  logOptions,
  ref,
  inputRef,
  customClassName,
  ...rest
}: IInput) => {
  const id = React.useId();
  // const inputCnxRef = useRef([]);
  const dialogRef = useRef(null);

  const CNX_STYLES = {
    cnxMargin: {
      width: '158px'
    }
  }

  const showLogs = () => {
    document.getElementById(`cnx-status-logs-list-container-${id}`)?.classList.toggle(`cnx-display-none`)
  };

  const hideLogs = () => {
    document.getElementById(`cnx-status-logs-list-container-${id}`)?.classList.add(`cnx-display-none`)
  };

  useOnClickOutside(dialogRef, hideLogs);

  return (
    <div ref={dialogRef} className="cnx-status-logs-input-container-cslic">
      {label && (
        <label className="cnx-status-logs-input-label-cslil" htmlFor={id}>
          {`${label}`}&nbsp;{mandatory ? "*" : ""}
        </label>
      )}
      <div className="cnx-status-logs-actions-container-cslac">
        <button
          type="button"
          className="cnx-status-logs-small-icon-button-cslsib"
          onClick={() => showLogs()}
        >
          <FullHistory />
        </button>
        {/* <input
          id={id}
          ref={ref}
          name={name}
          value={value}
          placeholder={placeholder}
          className="cnx-status-logs-input-csli"
          {...rest}
        /> */}
        <Select
          keyLabel={keyLabel}
          keyValue={keyValue}
          mandatory
          className={`cnx-status-logs-width-size-cslws ${customClassName}`}
          cnxStyles={CNX_STYLES}
          options={options}
          inputRef={inputRef}
          defaultOption={defaultOption}
          placeholder="Selecionar"
          onChange={() => {
            document
              ?.querySelector(`.${customClassName}`)!
              .classList?.remove("cnx-input-border-error-highlight");
          }}
        />
        <div id={`cnx-status-logs-list-container-${id}`}  className="cnx-status-logs-list-container-csllc cnx-display-none">
          {logOptions ? logOptions : (
            <div className="cnx-status-logs-no-data-cslnd">
              <span>Não há logs de situação disponíveis</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusLogs;
