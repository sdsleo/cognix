import React, {
  useEffect,
  useState,
  useRef,
  useId,
  KeyboardEvent,
  ChangeEvent,
} from "react";

import { useClickAway } from "../../utils/useClickAway";
import { useDebounce } from "../../utils/useDebounce";
import { ISelectAutoComplete } from "./types";

import "./styles.css";

const Select: React.FC<ISelectAutoComplete> = ({
  keyLabel,
  keyValue,
  placeholder,
  inputRef,
  onChange,
  onSelectNoOption,
  options,
  autoComplete,
  label,
  mandatory,
  defaultOption,
  cnxStyles,
  className,
  disabled,
  clear,
}) => {
  const id = useId();
  const searchValue: any = useRef();
  const selectedRef: any = useRef();
  const selectRef: any = useRef();
  const [openOptions, setOpenOptions]: any = useState([]);

  useEffect(() => {
    inputRef.current = null;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.getElementById(`cnx-search-auto-complete${id}`).value = "";
    document
      .getElementById(`cnx-select-auto-complete${id}`)
      ?.classList.add("cnx-display-none");
  }, [clear]);

  useEffect(() => {
    if (document.getElementById(`cnx-search-auto-complete${id}`)) {
      const optionSelected = options.find(
        (option: any) => defaultOption == option[keyValue]
      );
      selectedRef.current = optionSelected;
      inputRef.current = optionSelected;
      const temp = selectedRef.current;

      try {
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          document.getElementById(`cnx-search-auto-complete${id}`).value =
            temp[keyLabel];
        }, 0);
      } catch (e) {
        console.error(e);
      }
    }
    setOpenOptions(options);
  }, [defaultOption, options]);

  // useEffect(() => {
  //   setOpenOptions(options);
  // }, [options]);

  useClickAway(selectRef, () => {
    document
      .getElementById(`cnx-select-auto-complete${id}`)
      ?.classList.add("cnx-display-none");
  });

  useEffect(() => {
    const sel: any = document.getElementById(`cnx-select-auto-complete${id}`);
    const len = sel?.options?.length;

    if (len == 2) {
      sel.setAttribute("size", len > 6 ? 6 : len);
    } else if (len == 1) {
      sel.setAttribute("size", len > 6 ? 6 : len + 1);
    } else {
      sel.setAttribute("size", len > 6 ? 6 : len);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.getElementById(`cnx-select-auto-complete${id}`).value = "none";
  }, [openOptions]);

  async function handleFilterOptions() {
    const filteredOptions = options.filter((option: any) =>
      option[keyLabel]
        .toLowerCase()
        .includes(searchValue.current.value.toLowerCase())
    );

    if (searchValue.current.value == "") {
      inputRef.current = null;
      if (onChange) {
        onChange(null);
      }
    }

    if (filteredOptions.length < 1) {
      setOpenOptions([]);
      selectedRef.current = null;
      inputRef.current = null;
      if (onChange) {
        onChange(null);
      }
    } else {
      setOpenOptions(filteredOptions);
    }
  }

  // eslint-disable-next-line consistent-return
  const handleOptionSelected = (e: any) => {
    if (e.target.value == "none") {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getElementById(`cnx-search-auto-complete${id}`).value = "";
      return null;
    }
    selectedRef.current = openOptions[e.target.value];
    if (document.getElementById(`cnx-search-auto-complete${id}`)) {
      const temp = selectedRef.current;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getElementById(`cnx-search-auto-complete${id}`).value =
        temp[keyLabel];
    }
  };

  async function handleDebounce() {
    try {
      await handleFilterOptions();
      document
        .getElementById(`cnx-select-auto-complete${id}`)
        ?.classList.remove("cnx-display-none");
      const sel: any = document.getElementById(`cnx-select-auto-complete${id}`);
      const len = sel?.options?.length;
      sel.setAttribute("size", len > 6 ? 6 : len);
    } catch {
      document
        .getElementById(`cnx-select-auto-complete${id}`)
        ?.classList.add("cnx-display-none");
    }
  }

  const debouncedChange = useDebounce(handleDebounce, 500);

  async function handleDisplayOptionList(event: ChangeEvent<HTMLInputElement>) {
    debouncedChange(event.target.value);
  }

  function handleChangeInputFocus(e: KeyboardEvent) {
    if (e.key === "ArrowDown") {
      document
        .getElementById(`cnx-select-auto-complete${id}`)
        ?.classList.remove("cnx-display-none");
      const sel: any = document.getElementById(`cnx-select-auto-complete${id}`);
      const len = sel?.options?.length;
      const temp = len == 1 ? 1 : 0;
      const tempPlus = len + temp;
      sel.setAttribute("size", tempPlus > 6 ? 6 : tempPlus);
      document.getElementById(`cnx-select-auto-complete${id}`)?.focus();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getElementById(`cnx-select-auto-complete${id}`)!.scrollTop = 0;
    }
  }

  function closeSelect(e: any) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      // no action
    } else {
      document
        .getElementById(`cnx-select-auto-complete${id}`)
        ?.classList.add("cnx-display-none");
      const sel: any = document.getElementById(`cnx-select-auto-complete${id}`);
      sel.setAttribute("size", 0);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getElementById(`cnx-search-auto-complete${id}`).value = "";
      inputRef.current = null;
      setOpenOptions(options);
      if (onChange) {
        // onChange(null);
      }
      document.getElementById(`cnx-search-auto-complete${id}`)?.focus();
    }

    if (e.key === "Enter") {
      if (e.target.value == "null" || e.target.value == "none") {
        return;
      }

      if (document.getElementById(`cnx-search-auto-complete${id}`)) {
        const temp = selectedRef.current;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.getElementById(`cnx-search-auto-complete${id}`).value =
          temp[keyLabel];
        inputRef.current = temp;
        if (onChange) {
          onChange(temp);
        }
      }

      document
        .getElementById(`cnx-select-auto-complete${id}`)
        ?.classList.add("cnx-display-none");
      const sel: any = document.getElementById(`cnx-select-auto-complete${id}`);
      sel.setAttribute("size", 0);
      document.getElementById(`cnx-search-auto-complete${id}`)?.focus();
      if (document.getElementById(`cnx-select-auto-complete${id}`)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.getElementById(`cnx-select-auto-complete${id}`).value = "none";
      }
    }
  }

  function handleClickSelect(option: any, index: number) {
    inputRef.current = option;

    if (document.getElementById(`cnx-search-auto-complete${id}`)) {
      selectedRef.current = openOptions[index];
      const temp = selectedRef.current;
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.getElementById(`cnx-search-auto-complete${id}`).value =
          temp[keyLabel];
      }, 0);
    }
    if (onChange) {
      onChange(option);
    }

    document
      .getElementById(`cnx-select-auto-complete${id}`)
      ?.classList.add("cnx-display-none");
  }

  return (
    <div
      className="cnx-default-select-container"
      style={cnxStyles?.cnxMargin ? cnxStyles?.cnxMargin : null}
    >
      {label ? (
        <span className="cnx-input-label">{`${label} ${
          mandatory ? "*" : ""
        }`}</span>
      ) : null}
      <div className={`cnx-async-autocomplete-container`} ref={selectRef}>
        <input
          id={`cnx-search-auto-complete${id}`}
          type="text"
          disabled={!autoComplete || disabled}
          ref={searchValue}
          className={`cnx-default-select-search ${className}`}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleDisplayOptionList(e)
          }
          onKeyDown={(e: KeyboardEvent) => handleChangeInputFocus(e)}
        />

        <button
          type="button"
          className="cnx-drop-down"
          disabled={disabled}
          onClick={() => {
            document
              .getElementById(`cnx-select-auto-complete${id}`)
              ?.classList.toggle("cnx-display-none");
            const sel: any = document.getElementById(
              `cnx-select-auto-complete${id}`
            );
            const len = sel?.options?.length;
            const temp = len == 1 ? 1 : 0;
            const tempPlus = len + temp;
            sel.setAttribute("size", tempPlus > 6 ? 6 : tempPlus);
            document.getElementById(`cnx-select-auto-complete${id}`)?.focus();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.getElementById(
              `cnx-select-auto-complete${id}`
            )!.scrollTop = 0;
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <select
          size={6}
          id={`cnx-select-auto-complete${id}`}
          className="cnx-async-select-default cnx-display-none"
          onKeyUp={(e: any) => closeSelect(e)}
          onChange={handleOptionSelected}
          onBlur={() => {
            setOpenOptions(options)
          }}
          onFocus={() => {
            if (document.getElementById(`cnx-select-auto-complete${id}`)) {
              setTimeout(() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                document.getElementById(
                  `cnx-select-auto-complete${id}`
                )!.scrollTop = 0;
              }, 0);

              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              document.getElementById(`cnx-select-auto-complete${id}`).value =
                "none";
            }
          }}
        >
          {openOptions?.length < 1 ? (
            <>
              <option
                value="none"
                disabled
                className="cnx-select-default-option"
              >
                Sem Opções
              </option>
              <option value="none" disabled />
            </>
          ) : (
            <option
              value="none"
              className="cnx-select-default-option"
              onClick={() => {
                if (onChange) {
                  onChange(null);
                }
                if (onSelectNoOption) onSelectNoOption();
                inputRef.current = null;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                document.getElementById(`cnx-search-auto-complete${id}`).value =
                  "";
                document
                  .getElementById(`cnx-select-auto-complete${id}`)
                  ?.classList.add("cnx-display-none");
              }}
            >
              Selecione
            </option>
          )}
          {openOptions?.map((option: any, index: number) => (
            <option
              onClick={() => handleClickSelect(option, index)}
              className="cnx-select-default-option"
              key={option[keyValue]}
              value={index}
            >
              {option[keyLabel]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
