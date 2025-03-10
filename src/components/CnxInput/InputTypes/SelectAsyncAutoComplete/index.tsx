import React, {
  useEffect,
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
} from "react";

import { useClickAway } from "../../utils/useClickAway";
import { useDebounce } from "../../utils/useDebounce";
import { ISelect } from "./types";

import "./styles.css";

const SelectAsyncAutoComplete: React.FC<ISelect> = ({
  id,
  keyLabel,
  keyValue,
  placeholder,
  inputRef,
  onChange,
  resquestAPI,
}) => {
  const searchValue: any = useRef();
  const selectedRef: any = useRef();
  const selectAsyncRef: any = useRef();
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useClickAway(selectAsyncRef, () => {
    document
      .getElementById(`cnx-async-select`)
      ?.classList.add("cnx-display-none");
  });

  useEffect(() => {
    const sel: any = document.getElementById(`cnx-async-select-id${id}`);
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
    document.getElementById(`cnx-async-select-id${id}`).value = "none";
  }, [options]);

  async function handleRequestAPI() {
    const temp: any = await resquestAPI.func(searchValue.current.value);
    if (temp.length < 1 || !temp) {
      setOptions([]);
      selectedRef.current = null;
      setTimeout(() => {
        document
          .getElementById(`cnx-async-select-id${id}`)
          ?.classList.add("cnx-display-none");
      }, 0);
    } else {
      setOptions(temp);
    }
  }

  const handleOptionSelected = (e: any) => {
    selectedRef.current = options[e.target.value];
    if (document.getElementById(`cnx-async-search-id${id}`)) {
      const temp = selectedRef.current;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getElementById(`cnx-async-search-id${id}`).value =
        temp[keyLabel];
    }
    // return onChange ? onChange(options[e.target.value]) : null;
  };

  async function handleDebounce() {
    // document.querySelector('.cnx-loading-search')?.classList.remove('d-none');
    setIsLoading(true);
    try {
      await handleRequestAPI();
      document
        .getElementById(`cnx-async-select-id${id}`)
        ?.classList.remove("cnx-display-none");
      const sel: any = document.getElementById(`cnx-async-select-id${id}`);
      const len = sel?.options?.length;
      sel.setAttribute("size", len > 6 ? 6 : len);
    } catch {
      document
        .getElementById(`cnx-async-select-id${id}`)
        ?.classList.add("cnx-display-none");
    } finally {
      // document.querySelector('.cnx-loading-search')?.classList.add('d-none');
      setIsLoading(false);
    }
  }

  const debouncedChange = useDebounce(handleDebounce, 500);

  async function handleDisplayOptionList(event: ChangeEvent<HTMLInputElement>) {
    debouncedChange(event.target.value);
  }

  function handleChangeInputFocus(e: KeyboardEvent) {
    if (e.key === "ArrowDown") {
      document
        .getElementById(`cnx-async-select-id${id}`)
        ?.classList.remove("cnx-display-none");
      const sel: any = document.getElementById(`cnx-async-select-id${id}`);
      const len = sel?.options?.length;
      const temp = len == 1 ? 1 : 0;
      const tempPlus = len + temp;
      sel.setAttribute("size", tempPlus > 6 ? 6 : tempPlus);
      document.getElementById(`cnx-async-select-id${id}`)?.focus();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getElementById(`cnx-async-select-id${id}`)!.scrollTop = 0;
    }
  }

  function closeSelect(e: any) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      // no action
    } else {
      document
        .getElementById(`cnx-async-select-id${id}`)
        ?.classList.add("cnx-display-none");
      const sel: any = document.getElementById(`cnx-async-select-id${id}`);
      sel.setAttribute("size", 0);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getElementById(`cnx-async-search-id${id}`).value = "";
      inputRef.current = null;
      if (onChange) {
        onChange(null);
      }
      document.getElementById(`cnx-async-search-id${id}`)?.focus();
    }

    if (e.key === "Enter") {
      if (e.target.value == "null" || e.target.value == "none") {
        return;
      }

      if (document.getElementById(`cnx-async-search-id${id}`)) {
        const temp = selectedRef.current;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.getElementById(`cnx-async-search-id${id}`).value =
          temp[keyLabel];
        inputRef.current = temp;
        if (onChange) {
          onChange(temp);
        }
      }

      document
        .getElementById(`cnx-async-select-id${id}`)
        ?.classList.add("cnx-display-none");
      const sel: any = document.getElementById(`cnx-async-select-id${id}`);
      sel.setAttribute("size", 0);
      document.getElementById(`cnx-async-search-id${id}`)?.focus();
      if (document.getElementById(`cnx-async-select-id${id}`)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.getElementById(`cnx-async-select-id${id}`).value = "none";
      }
    }
  }

  return (
    <div className="cnx-async-autocomplete-container" ref={selectAsyncRef}>
      <input
        id={`cnx-async-search-id${id}`}
        type="text"
        ref={searchValue}
        className="cnx-async-search"
        placeholder={placeholder}
        autoComplete="off"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleDisplayOptionList(e)
        }
        onKeyDown={(e: KeyboardEvent) => handleChangeInputFocus(e)}
      />
      {isLoading ? (
        <div className="cnx-loading-search">
          <div className="sbl-circ" />
        </div>
      ) : null}

      <select
        size={6}
        id={`cnx-async-select-id${id}`}
        className="cnx-async-select cnx-display-none"
        onKeyUp={(e: any) => closeSelect(e)}
        onChange={handleOptionSelected}
        onFocus={() => {
          if (document.getElementById(`cnx-async-select-id${id}`)) {
            setTimeout(() => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              document.getElementById(
                `cnx-async-select-id${id}`
              )!.scrollTop = 0;
            }, 0);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.getElementById(`cnx-async-select-id${id}`).value = "none";
          }
        }}
        onMouseEnter={() =>
          document.getElementById(`cnx-async-select-id${id}`)?.focus()
        }
      >
        {options.length < 1 ? (
          <>
            <option value="none" disabled className="cnx-async-option">
              Sem Opções
            </option>
            <option value="none" disabled />
          </>
        ) : null}
        {options?.map((option: any, index: number) => (
          <option
            onClick={() =>
              document
                .getElementById(`cnx-async-select-id${id}`)
                ?.classList.add("cnx-display-none")
            }
            className="cnx-async-option"
            key={option[keyValue]}
            value={index}
          >
            {option[keyLabel]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectAsyncAutoComplete;
