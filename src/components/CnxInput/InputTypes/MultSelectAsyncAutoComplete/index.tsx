import React, {
  useEffect,
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  useId,
} from "react";

import { useClickAway } from "../../utils/useClickAway";
import { useDebounce } from "../../utils/useDebounce";
import { IMultSelect } from "./types";

import ChromeClose from "../../../../assets/icons/FluentUI/SVGs/ChromeClose";
import "./styles.css";

const MultSelectAsyncAutoComplete: React.FC<IMultSelect> = ({
  keyLabel,
  keyValue,
  placeholder,
  inputRef,
  onChange,
  label,
  mandatory,
  resquestAPI,
}) => {
  const id = useId();
  const searchValue: any = useRef();
  const selectedRef: any = useRef();
  const selectMultAutoCompleteRef: any = useRef();
  const [options, setOptions] = useState([]);
  const [tags, setTags]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useClickAway(selectMultAutoCompleteRef, () => {
    document
      .getElementById(`cnx-async-select-id${id}`)
      ?.classList.add("cnx-display-none");
    const sel: any = document.getElementById(`cnx-async-select-id${id}`);
    sel.setAttribute("size", 0);
    // document.getElementById(`cnx-async-search-id${id}`)?.focus();
    if (document.getElementById(`cnx-async-select-id${id}`)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getElementById(`cnx-async-select-id${id}`).value = "none";
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.getElementById(`cnx-async-search-id${id}`).value = "";
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
      document.getElementById(`cnx-async-search-id${id}`)!.value =
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

  function handleChangeInputFocus(e: any) {
    if (e.key === "Backspace" && e.target.value === "") {
      // eslint-disable-next-line prefer-const
      let newArray = [...tags];
      newArray.pop();
      setTags(newArray);
      inputRef.current = newArray;
      if (onChange) {
        onChange(newArray);
      }
    }
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
      document.getElementById(`cnx-async-search-id${id}`)?.focus();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getElementById(`cnx-async-search-id${id}`).value = "";
    }

    if (e.key === "Enter") {
      if (e.target.value == "null" || e.target.value == "none") {
        return;
      }

      if (document.getElementById(`cnx-async-search-id${id}`)) {
        const temp = selectedRef.current;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.getElementById(`cnx-async-search-id${id}`)!.value =
          temp[keyLabel];
        const tagAlreadyExists = tags.some(
          (tag: any) => tag[keyLabel] == temp[keyLabel]
        );
        if (!tagAlreadyExists) {
          setTags([...tags, temp]);
          inputRef.current = [...tags, temp];
          if (onChange) {
            onChange([...tags, temp]);
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          document.getElementById(`cnx-async-search-id${id}`).value = "";
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

  function handleClickMultSelect(option: any) {
    const tagAlreadyExists = tags.some(
      (tag: any) => tag[keyLabel] == option[keyLabel]
    );
    if (!tagAlreadyExists) {
      setTags([...tags, option]);
      inputRef.current = [...tags, option];
      if (onChange) {
        onChange([...tags, option]);
      }
    }
    document
      .getElementById(`cnx-async-select-id${id}`)
      ?.classList.add("cnx-display-none");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.getElementById(`cnx-async-search-id${id}`).value = "";
  }

  function optionAlreadyselected(option: any) {
    const alreadySelected = tags.some(
      (tag: any) => tag[keyLabel] == option[keyLabel]
    );
    return alreadySelected;
  }

  function handleRemoveTag(tag: any) {
    const temp = tags.findIndex(
      (tagItem: any) => tagItem[keyLabel] == tag[keyLabel]
    );
    const newArray = [...tags];
    newArray.splice(temp, 1);
    setTags(newArray);
    inputRef.current = newArray;
    if (onChange) {
      onChange(newArray);
    }
  }

  return (
    <div className="cnx-default-container-inputs-cdci">
      {label ? (
        <span className="cnx-input-label-async-mult-autocomplete-cilama">{`${label} ${
          mandatory ? "*" : ""
        }`}</span>
      ) : null}
      <div
        className="cnx-async-mult-autocomplete-container-camac"
        ref={selectMultAutoCompleteRef}
      >
        <div className="cnx-tags-container-msaac-ctcm">
          {tags.map((tag: any, index: number) => (
            <div className="cnx-tag-content-msaac-ctcm" key={index}>
              <span className="cnx-tag-text-msaac-cttm">{tag[keyLabel]}</span>
              <button
                className="cnx-tag-button-msaac-ctbm"
                type="button"
                onClick={() => handleRemoveTag(tag)}
              >
                <ChromeClose width="6px" height="6px" />
              </button>
            </div>
          ))}
        </div>
        <div className="cnx-mult-async-searchcontainer-cmas">
          <input
            id={`cnx-async-search-id${id}`}
            type="text"
            ref={searchValue}
            className="cnx-mult-async-search-cmas"
            placeholder={placeholder}
            autoComplete="off"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleDisplayOptionList(e)
            }
            onKeyDown={(e: any) => handleChangeInputFocus(e)}
          />
          {isLoading ? (
            <div className="cnx-loading-search-cls">
              <div className="sbl-circ" />
            </div>
          ) : null}
        </div>

        <select
          size={6}
          id={`cnx-async-select-id${id}`}
          className="cnx-async-select-cas cnx-display-none"
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
              document.getElementById(`cnx-async-select-id${id}`).value =
                "none";
            }
          }}
          // onBlur={() => closeSelectList()}
          onMouseEnter={() =>
            document.getElementById(`cnx-async-select-id${id}`)?.focus()
          }
        >
          {options.length < 1 ? (
            <>
              <option value="none" disabled className="cnx-async-option-cao">
                Sem Opções
              </option>
              <option value="none" disabled />
            </>
          ) : null}
          {options?.map((option: any, index: number) => (
            <option
              onClick={() => handleClickMultSelect(option)}
              className={
                optionAlreadyselected(option)
                  ? "cnx-async-option-cao cnx-selected-option-cso"
                  : "cnx-async-option-cao"
              }
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

export default MultSelectAsyncAutoComplete;
