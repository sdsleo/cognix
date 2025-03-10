import { useRef, useEffect, useId, useState } from "react";
import {
  MultSelectAsyncAutoComplete,
  MultSelectCheckbox,
  Select,
  DateRangerPicker,
} from "../../../../../CnxInput";
import { format, parseISO } from "date-fns";
import "./styles.css";

export function CenterSection({
  currentSelect,
  filtersSelected,
  setFiltersSelected,
}: any) {
  useEffect(() => {
    // if (currentSelect) inputCnxRef.current = [];
    if (currentSelect) {
      if (inputRef.current) inputRef.current.value = null;
      setClearSelect(!clearSelect);
    }
  }, [currentSelect]);

  const operationsApi = {
    func: async (searchValue: string) => {
      // const api = {
      //   baseURL: `${envApi}/api/Production/Operation/Filter/Code`,
      //   headers: {
      //     authorization: `Bearer ${userData?.token}`
      //   },
      //   params: {
      //     code: searchValue,
      //     activeStatus: '1'
      //   },
      //   timeout: 30000
      // };
      return [
        { code: "c001", id: 1 },
        { code: "c002", id: 2 },
        { code: "c003", id: 3 },
      ];

      // return axios(api)
      //   .then(response => {
      //     return response.data;
      //   })
      //   .catch(function (error) {
      //     console.log('Show error notification!');
      //     return Promise.reject(error);
      //   });
    },
  };
  const CNX_ID = Math.random().toString(36).substring(2, 7);
  let inputRef: any = useRef("");
  let inputEndRef: any = useRef("");
  const inputCnxRef: any = useRef([]);
  const [clearSelect, setClearSelect] = useState(false);
  const handleInputType = (type: string) => {
    switch (type) {
      case "text":
        const actionKeySearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            if (inputRef.current.value) {
              getInputRefValue(
                currentSelect?.type,
                currentSelect?.query,
                currentSelect?.title
              );
              inputRef.current.value = "";
            }
          }
        };
        return (
          <>
            <input
              ref={inputRef}
              type="text"
              placeholder="Pesquisar"
              className="cnx-input-text-center-section-citcs"
              onKeyUp={(e) => actionKeySearch(e)}
            />
            <button
              type="button"
              className="cnx-btn-save-center-section-cbscs"
              onClick={() => {
                getInputRefValue(
                  currentSelect?.type,
                  currentSelect?.query,
                  currentSelect?.title
                );
                inputRef.current.value = "";
              }}
            >
              Salvar
            </button>
          </>
        );
      case "MultSelectAsyncAutoComplete":
        return (
          <>
            <MultSelectAsyncAutoComplete
              keyLabel={currentSelect?.keyLabel}
              keyValue={currentSelect?.keyValue}
              resquestAPI={operationsApi}
              inputRef={inputCnxRef}
              placeholder="Pesquisar"
            />
            <button
              type="button"
              className="cnx-btn-save-center-section-cbscs"
              onClick={() =>
                getInputRefValueCnxInput(
                  currentSelect?.type,
                  currentSelect?.query,
                  currentSelect?.title,
                  currentSelect?.keyLabel,
                  currentSelect?.keyValue
                )
              }
            >
              Salvar
            </button>
          </>
        );
      case "MultSelectCheckbox":
        return (
          <>
            <MultSelectCheckbox
              keyLabel={currentSelect?.keyLabel}
              keyValue={currentSelect?.keyValue}
              options={currentSelect?.options || []}
              inputRef={inputCnxRef}
              placeholder="Pesquisar"
              clear={clearSelect}
            />
            <button
              type="button"
              className="cnx-btn-save-center-section-cbscs"
              onClick={() => {
                getInputRefValueCnxInput(
                  currentSelect?.type,
                  currentSelect?.query,
                  currentSelect?.title,
                  currentSelect?.keyLabel,
                  currentSelect?.keyValue
                );
                setClearSelect(!clearSelect);
              }}
            >
              Salvar
            </button>
          </>
        );
      case "Select":
        return (
          <>
            <Select
              keyLabel={currentSelect?.keyLabel}
              keyValue={currentSelect?.keyValue}
              options={currentSelect?.options || []}
              inputRef={inputCnxRef}
              placeholder="Selecionar"
              autoComplete={currentSelect?.autoComplete ? true : false}
              clear={clearSelect}
            />
            <button
              type="button"
              className="cnx-btn-save-center-section-cbscs"
              onClick={() => {
                if (currentSelect?.typeSelection === "singleSelect") {
                  const hasQuery = filtersSelected.some(
                    (item: any) => item?.query == currentSelect?.query
                  );
                  if (hasQuery) return;
                } else if (currentSelect?.typeSelection === "nonRepetition") {
                  const hasItem = filtersSelected.some(
                    (item: any) =>
                      item?.query == currentSelect?.query &&
                      item?.keyValue ==
                        inputCnxRef?.current?.[currentSelect?.keyValue] &&
                      item?.keyLabel ==
                        inputCnxRef?.current?.[currentSelect?.keyLabel]
                  );
                  if (hasItem) {
                    return;
                  }
                }
                getInputRefValueCnxInput(
                  currentSelect?.type,
                  currentSelect?.query,
                  currentSelect?.title,
                  currentSelect?.keyLabel,
                  currentSelect?.keyValue
                );
                setClearSelect(!clearSelect);
              }}
            >
              Salvar
            </button>
          </>
        );
      case "DateRangerPicker":
        return (
          <>
            <DateRangerPicker inputRef={inputRef} idClearButton={`cnx-order-date-ranger-start`} />
            <button
              type="button"
              className="cnx-btn-save-center-section-cbscs"
              onClick={() => {
                getDateRageInputRefValue(
                  currentSelect?.type,
                  currentSelect?.query,
                  currentSelect?.title
                );
                setTimeout(() => {
                  const element: any = document.getElementById(`cnx-order-date-ranger-start`)
                  element.click();
                  
                }, 100)
                
              }
            }
            >
              Salvar
            </button>
          </>
        );
      case "DateRangerPickerEnd":
        return (
          <>
            <DateRangerPicker inputRef={inputRef} idClearButton={`cnx-order-date-ranger-end`}/>

            <button
              type="button"
              className="cnx-btn-save-center-section-cbscs"
              onClick={() => {
                getDateRageInputRefValue(
                  currentSelect?.type,
                  currentSelect?.query,
                  currentSelect?.title
                )
                setTimeout(() => {
                  const element: any = document.getElementById(`cnx-order-date-ranger-end`)
                  element.click();
                  
                }, 100)
              }
            }
            >
              Salvar
            </button>
          </>
        );
      case "Date":
        return (
          <>
            <input
              ref={inputRef}
              type="date"
              placeholder="Text"
              className="cnx-input-text-center-section-citcs"
            />
            <button
              type="button"
              className="cnx-btn-save-center-section-cbscs"
              onClick={() => {
                getInputRefValue(
                  currentSelect?.type,
                  currentSelect?.query,
                  currentSelect?.title
                );
                inputRef.current.value = "";
              }}
            >
              Salvar
            </button>
          </>
        );
      default:
        return null;
    }
  };

  const getInputRefValue = (type: any, query: any, title: any) => {
    function getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    }
    const id = `${title}${getRandomInt(50)}${getRandomInt(100)}`;
    const newSelectedFilterObject = {
      id,
      title,
      type,
      query,
      keyLabel: inputRef?.current?.value,
      keyValue: inputRef?.current?.value,
    };
    setFiltersSelected([...filtersSelected, newSelectedFilterObject]);
  };

  const getDateRageInputRefValue = (type: any, query: any, title: any) => {
    const hasQuery = filtersSelected?.some((item: any) => item.query === query);
    if (hasQuery) return;

    function getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    }
    const id = `${title}${getRandomInt(50)}${getRandomInt(100)}`;
    const newSelectedFilterObject = {
      id,
      title,
      type,
      query,
      keyLabel: inputRef?.current?.value,
      keyValue: inputRef?.current?.value,
    };

    setFiltersSelected([...filtersSelected, newSelectedFilterObject]);
  };

  const getInputRefValueCnxInput = (
    type: any,
    query: any,
    title: any,
    keyLabel: string,
    keyValue: string
  ) => {
    function getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    }

    function handleIsArray(myArray: any) {
      return myArray.constructor === Array;
    }
    const isArray = handleIsArray(inputCnxRef.current);
    const selectedList = inputCnxRef.current;

    if (isArray) {
      const temp = selectedList.map((item: any) => {
        const id = `${title}${getRandomInt(50)}${getRandomInt(100)}`;
        return {
          id,
          title,
          type,
          query,
          keyLabel: item[keyLabel],
          keyValue: item[keyValue],
        };
      });

      setFiltersSelected([...filtersSelected, ...temp]);
    } else {
      const id = `${title}${getRandomInt(50)}${getRandomInt(100)}`;
      const newSelectedFilterObject = {
        id,
        title,
        type,
        query,
        keyLabel: inputCnxRef?.current?.[keyLabel],
        keyValue: inputCnxRef?.current?.[keyValue],
      };

      setFiltersSelected([...filtersSelected, newSelectedFilterObject]);
    }
  };

  return (
    <section className="cnx-filter-center-section-cfcs">
      <div className="cnx-filter-action-container-cfac">
        <span>{currentSelect?.title || ""}</span>
        <div className="cnx-filter-input-type-cfit">
          {handleInputType(currentSelect?.type)}
        </div>
      </div>
    </section>
  );
}
