import React, { useEffect, useState, useRef, ChangeEvent, useId } from "react";

import { useClickAway } from "../../utils/useClickAway";
import { useDebounce } from "../../utils/useDebounce";
import { IMultSelect } from "./types";
import "./styles.css";

const MultSelectCheckbox: React.FC<IMultSelect> = ({
  keyLabel,
  keyValue,
  placeholder,
  inputRef,
  onChange,
  options,
  customTheme,
  defaultOptions,
  label,
  mandatory,
  cnxStyles,
  className,
  clear
}) => {
  const id = useId();
  const [searchValueTeste, setSearchValueTeste]: any = useState("");
  const searchValue: any = useRef("");
  const selectedItemsRef: any = useRef();
  const selectMultAutoCompleteRef: any = useRef();
  const [checkboxOptions, setCheckboxOptions]: any = useState([]);
  const [tags, setTags]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTags([]);
    inputRef.current = [];
    if (onChange) {
      onChange([]);
    }
    const tempCheck: any = document.getElementsByClassName(
      "cnx-mult-checkbox-input"
    );
    for (const checkbox of tempCheck) {
      checkbox.checked = false;
    }
    selectedItemsRef.current.value = "";
  }, [clear]);

  useEffect(() => {
    if (options.length > 0) {
      if (defaultOptions) {
        const defaultFilteredOptions = options?.filter((el: any) => {
          return defaultOptions?.some((f: any) => {
            return f[keyValue] === el[keyValue] && f[keyLabel] === el[keyLabel];
          });
        });
        if (defaultFilteredOptions?.length > 0) {
          setTags(defaultFilteredOptions);
          inputRef.current = defaultFilteredOptions;

          const stringSelectedItems = defaultFilteredOptions
            .map((item: any) => {
              return item[keyLabel];
            })
            .join(";");
          selectedItemsRef.current.value = stringSelectedItems;
        } else {
          const myArrayFiltered = options?.filter((el: any) => {
            return defaultOptions?.some((f: any) => {
              return f === el[keyValue];
            });
          });

          setTags(myArrayFiltered);
          inputRef.current = myArrayFiltered;
          const stringSelectedItems = myArrayFiltered
            ?.map((item: any) => {
              return item[keyLabel];
            })
            .join(";");
          selectedItemsRef.current.value = stringSelectedItems;
        }
      }
      setCheckboxOptions(options);
    }
  }, [defaultOptions, options]);

  // useEffect(() => {
  //   setCheckboxOptions(options);
  // }, [options])

  // if (defaultOptions) {
  //   if (defaultOptions[0][keyValue]) {
  //     setTags(defaultOptions);
  //     inputRef.current = defaultOptions;
  //     return null;
  //   }
  //   const myArrayFiltered = options?.filter((el: any) => {
  //     return defaultOptions?.some((f: any) => {
  //       return f === el[keyValue];
  //     });
  //   });
  //   console.log(
  //     '🚀 ~ file: index.tsx ~ line 44 ~ myArrayFiltered ~ myArrayFiltered',
  //     myArrayFiltered
  //   );
  //   setTags([]);
  //   // inputRef.current = myArrayFiltered;
  //   return null;
  // }

  useClickAway(selectMultAutoCompleteRef, () => {
    document
      .getElementById(`cnx-mult-checkbox-select-id${id}`)
      ?.classList.add("cnx-display-none");
    const sel: any = document.getElementById(
      `cnx-mult-checkbox-select-id${id}`
    );
    sel.setAttribute("size", 0);
    // document.getElementById(`cnx-async-search-id${id}`)?.focus();
    if (document.getElementById(`cnx-mult-checkbox-select-id${id}`)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getElementById(`cnx-mult-checkbox-select-id${id}`).value =
        "none";
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.getElementById(`cnx-mult-checkbox-select-id${id}`).value = "";
  });

  useEffect(() => {
    const sel: any = document.getElementById(
      `cnx-mult-checkbox-select-id${id}`
    );
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
    document.getElementById(`cnx-mult-checkbox-select-id${id}`).value = "none";
  }, [checkboxOptions]);

  async function handleRequestAPI() {
    const filteredOptions = options.filter((option: any) =>
      option[keyLabel].includes(searchValue.current.value)
    );

    setCheckboxOptions(filteredOptions);
  }

  async function handleDebounce() {
    setIsLoading(true);
    try {
      await handleRequestAPI();
      document
        .getElementById(`cnx-mult-checkbox-select-id${id}`)
        ?.classList.remove("cnx-display-none");
      const sel: any = document.getElementById(
        `cnx-mult-checkbox-select-id${id}`
      );
      const len = sel?.options?.length;
      sel.setAttribute("size", len > 6 ? 6 : len);
    } catch {
      document
        .getElementById(`cnx-mult-checkbox-select-id${id}`)
        ?.classList.add("cnx-display-none");
    } finally {
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
        .getElementById(`cnx-mult-checkbox-select-id${id}`)
        ?.classList.remove("cnx-display-none");
      const sel: any = document.getElementById(
        `cnx-mult-checkbox-select-id${id}`
      );
      const len = sel?.options?.length;
      const temp = len == 1 ? 1 : 0;
      const tempPlus = len + temp;
      sel.setAttribute("size", tempPlus > 6 ? 6 : tempPlus);
      document.getElementById(`cnx-mult-checkbox-select-id${id}`)?.focus();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getElementById(
        `cnx-mult-checkbox-select-id${id}`
      )!.scrollTop = 0;
    }
  }

  function optionAlreadyselected(option: any) {
    const alreadySelected = tags.some(
      (tag: any) => tag[keyLabel] == option[keyLabel]
    );
    return alreadySelected;
  }

  function handleAddCheckedTag(tag: any) {
    const tagAlreadyExists = tags.some(
      (item: any) => item?.[keyValue] == tag?.[keyValue]
    );
    if (tagAlreadyExists) {
      const filteredTags = tags.filter((item: any) => {
        return item?.[keyValue] != tag?.[keyValue];
      });
      setTags(filteredTags);
      inputRef.current = filteredTags;
      if (onChange) {
        onChange(filteredTags);
      }
      const stringSelectedItems = filteredTags
        .map((item: any) => {
          return item[keyLabel];
        })
        .join(";");
      selectedItemsRef.current.value = stringSelectedItems;
    } else {
      setTags([...tags, tag]);
      inputRef.current = [...tags, tag];
      if (onChange) {
        onChange([...tags, tag]);
      }
      const inputPlaceholderSelectedItems = [...tags, tag];
      const stringSelectedItems = inputPlaceholderSelectedItems
        .map((item: any) => {
          return item[keyLabel];
        })
        .join(";");
      selectedItemsRef.current.value = stringSelectedItems;
    }

    setTimeout(() => {
      document
        .getElementById(`cnx-mult-checkbox-select-id${id}`)
        ?.classList.remove("cnx-display-none");
    }, 0);

    setTimeout(() => {
      if (searchValueTeste) {
        searchValue.current.value = searchValueTeste;
      }
    }, 0);

    const tempCheck: any = document.getElementsByClassName(
      "cnx-mult-checkbox-input"
    );
    for (const checkbox of tempCheck) {
      checkbox.checked = false;
    }
  }

  function alreadyChecked(tag: any) {
    const tagAlreadyExists = tags.some(
      (item: any) => item?.[keyValue] == tag?.[keyValue]
    );
    return tagAlreadyExists;
  }

  return (
    <div
      className="cnx-mult-select-checkbox-label-container"
      style={cnxStyles?.cnxMargin ? cnxStyles?.cnxMargin : null}
    >
      {label ? (
        <label
          htmlFor={`cnx-mult-select-checkbox-container${id}`}
          className="cnx-mult-select-checkbox-label"
        >
          {`${label} ${mandatory ? "*" : ""}`}
        </label>
      ) : null}
      <div
        id={`cnx-mult-select-checkbox-container${id}`}
        // className="cnx-mult-select-checkbox-container"
        className={`cnx-mult-select-checkbox-container ${className}`}
        ref={selectMultAutoCompleteRef}
        style={cnxStyles?.cnxWidth ? cnxStyles?.cnxWidth : null}
      >
        <div className="cnx-mult-select-checkbox-searchcontainer">
          <input
            id={`cnx-mult-checkbox-input-list-items${id}`}
            type="text"
            placeholder={placeholder || ""}
            disabled
            ref={selectedItemsRef}
            className="cnx-mult-checkbox-input-list-items-cmcili"
          />
          {isLoading ? (
            <div className="cnx-loading-search">
              <div className="sbl-circ" />
            </div>
          ) : null}
          <div className="cnx-ckeckbox-actions-buttons-container">
            <button
              type="button"
              className={
                tags?.length > 0
                  ? "cnx-ckeckbox-actions-buttons"
                  : "cnx-ckeckbox-actions-buttons d-none"
              }
              onClick={() => {
                setTags([]);
                inputRef.current = [];
                if (onChange) {
                  onChange([]);
                }
                const tempCheck: any = document.getElementsByClassName(
                  "cnx-mult-checkbox-input"
                );
                for (const checkbox of tempCheck) {
                  checkbox.checked = false;
                }
                selectedItemsRef.current.value = "";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                width="14"
                height="14"
              >
                <path
                  fill="currentColor"
                  d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                />
              </svg>
            </button>
            <div
              className={
                tags?.length
                  ? "cnx-checked-circle"
                  : "cnx-checked-circle d-none"
              }
            >
              <span>{tags?.length}</span>
            </div>
            <button
              type="button"
              className="cnx-ckeckbox-actions-buttons"
              onClick={() => {
                document
                  .getElementById(`cnx-mult-checkbox-select-id${id}`)
                  ?.classList.remove("cnx-display-none");
                searchValue.current.value = searchValueTeste;
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
          </div>
        </div>

        <div
          id={`cnx-mult-checkbox-select-id${id}`}
          className="cnx-mult-checkbox-select cnx-display-none"
        >
          <div className="cnx-search-input-checkbox-container">
            <input
              id={`cnx-mult-checkbox-search-id${id}`}
              type="text"
              ref={searchValue}
              className="cnx-mult-checkbox-select-search"
              placeholder="Pesquisar"
              autoComplete="off"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleDisplayOptionList(e);
                setSearchValueTeste(e.target.value);
              }}
              onKeyDown={(e: any) => handleChangeInputFocus(e)}
            />
            {isLoading ? (
              <div className="cnx-mult-checkbox-loading-search">
                <div className="sbl-circ" />
              </div>
            ) : null}
          </div>
          {checkboxOptions?.length < 1 ? (
            <ul>
              <li value="none" className="cnx-async-option">
                Sem Opções
              </li>
              <option value="none" disabled />
            </ul>
          ) : null}
          <ul
            className="cnx-checkbox-selected-list"
            style={cnxStyles?.cnxSelectList ? cnxStyles?.cnxSelectList : null}
          >
            {tags?.map((option: any, index: number) => (
              <li
                onClick={() => handleAddCheckedTag(option)}
                className={
                  optionAlreadyselected(option)
                    ? "cnx-mult-checkbox-async-option-li-cmcaol cnx-selected-option"
                    : "cnx-mult-checkbox-async-option-li-cmcaol"
                }
                key={option[keyValue]}
              >
                <input
                  type="checkbox"
                  defaultChecked
                  onChange={() => handleAddCheckedTag(option)}
                  className="cnx-mult-checkbox-input-tags"
                />
                <span>{option[keyLabel]}</span>
              </li>
            ))}
          </ul>
          <ul
            className="cnx-no-checkbox-selected-list"
            style={cnxStyles?.cnxSelectList ? cnxStyles?.cnxSelectList : null}
          >
            {checkboxOptions?.map((option: any, index: number) => (
              <li
                onClick={() => {
                  handleAddCheckedTag(option);
                }}
                style={
                  alreadyChecked(option)
                    ? { display: "none" }
                    : {
                        display: "flex",
                      }
                }
                className={
                  optionAlreadyselected(option)
                    ? "cnx-mult-checkbox-async-option-li-cmcaol cnx-selected-option"
                    : "cnx-mult-checkbox-async-option-li-cmcaol"
                }
                key={option[keyValue]}
              >
                <input
                  type="checkbox"
                  onChange={() => {
                    handleAddCheckedTag(option);
                  }}
                  className="cnx-mult-checkbox-input"
                />
                <span>{option[keyLabel]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MultSelectCheckbox;
