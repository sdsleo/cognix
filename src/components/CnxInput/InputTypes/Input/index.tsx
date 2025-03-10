import React, { useState } from "react";
import Eye from "../../../../assets/icons/FluentUI/SVGs/Eye";
import Hide3 from "../../../../assets/icons/FluentUI/SVGs/Hide3";

import "./styles.css";
import { IInput } from "./types";

const Input = ({
  label,
  type,
  name,
  value,
  min,
  max,
  defaultValue,
  defaultChecked,
  mandatory,
  placeholder,
  doubleWidth,
  inputRef,
  textAreaRows,
  textAreaWidth,
  textAreaDisabled,
  ...rest
}: IInput) => {
  const id = React.useId();
  const idCPF = React.useId();
  const [cpfValue, setCpfValue] = useState('')
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChangeInputType = () => {
    var x: any = document.getElementById(`cnx-default-input-password-${id}`);
    if (x.type === "password") {
      x.type = "text";
      setShowPassword(true);
    } else {
      x.type = "password";
      setShowPassword(false);
    }
  };

  const handleInputType = () => {
    switch (type) {
      case "password":
        return (
          <div className="cnx-default-input-password-container-cdipc">
            <input
              id={`cnx-default-input-password-${id}`}
              ref={inputRef}
              type="password"
              name={name}
              value={value}
              className="cnx-default-input-password-cdip"
              {...rest}
            />
            <button type="button" onClick={() => handleChangeInputType()}>
              {showPassword ? (
                <Hide3 width="1.2rem" height="1.2rem" />
              ) : (
                <Eye width="1.2rem" height="1.2rem" />
              )}
            </button>
          </div>
        );
      case "phone":
        function phoneMask(mask: any) {
          mask = mask.replace(/\D/g, "");
          mask = mask.replace(/^(\d{2})(\d)/g, "($1) $2");
          mask = mask.replace(/(\d)(\d{4})$/, "$1-$2");
          return mask;
        }
        return (
          <input
            id={id}
            ref={inputRef}
            type={type}
            name={name}
            value={value}
            placeholder="(99)99999-9999"
            onChange={(e: any) => {
              e.currentTarget.maxLength = 15;
              const { value } = e.target;
              e.target.value = phoneMask(value);
            }}
            className={
              doubleWidth
                ? "cnx-default-input-double-width-cdidw"
                : "cnx-default-input-cdi"
            }
            {...rest}
          />
        );
      case "datetime-local":
        return (
          <input
            ref={inputRef}
            type="datetime-local"
            placeholder={placeholder}
            defaultValue={defaultValue}
            min={min}
            max={max}
            className={
              doubleWidth
                ? "cnx-default-input-double-width-cdidw"
                : "cnx-default-input-cdi"
            }
            {...rest}
          />
        );
      case "date":
        return (
          <input
            ref={inputRef}
            type="date"
            placeholder={placeholder}
            defaultValue={defaultValue}
            min={min}
            max={max}
            className={
              doubleWidth
                ? "cnx-default-input-double-width-cdidw"
                : "cnx-default-input-cdi"
            }
            {...rest}
          />
        );
      case "textarea":
        return (
          <textarea
            id={`cnx-default-input-text-area-${id}`}
            ref={inputRef}
            name={name}
            // value={value || ""}
            className={`cnx-default-input-text-area-cdita`}
            style={{ width: `${textAreaWidth}` }}
            spellCheck="false"
            placeholder={placeholder}
            rows={textAreaRows || 3}
            defaultValue={defaultValue}
            disabled={textAreaDisabled}
          />
        );
      case "file":
        return <input type="text" placeholder="IN PROGRESS" {...rest} />;
      case "image":
        return <input type="text" placeholder="IN PROGRESS" {...rest} />;
      default:
        return (
          <input
            id={id}
            ref={inputRef}
            type={type}
            name={name}
            value={value}
            defaultValue={defaultValue}
            defaultChecked={defaultChecked}
            placeholder={placeholder}
            autoComplete="off"
            className={
              doubleWidth
                ? "cnx-default-input-double-width-cdidw"
                : "cnx-default-input-cdi"
            }
            {...rest}
          />
        );
    }
  };

  return (
    <div className="cnx-default-input-container-cdic">
      {label && (
        <label className="cnx-default-input-label-cdil" htmlFor={id}>
          {`${label}`}&nbsp;{mandatory ? "*" : ""}
        </label>
      )}
      {handleInputType()}
    </div>
  );
};

export default Input;
