import { useState, useEffect } from "react";
import { LeftSection } from "./components/LeftSection";
import { CenterSection } from "./components/CenterSection";
import { RightSection } from "./components/RightSection";
import ChromeClose from "../../assets/icons/FluentUI/SVGs/ChromeClose";
import useFetch from "../../hooks/useFetch";
import "./styles.css";

interface ICnxFilter {
  id: any;
  filterResponse: any;
  filterOptions: any;
  clearFilter: any;
  setFilter: any;
  singleSelects?: string[];
  keepSelect?: string;
}

function CnxFilter({
  id,
  filterResponse,
  filterOptions,
  clearFilter,
  setFilter,
  singleSelects,
  keepSelect
}: ICnxFilter) {
  const token = localStorage.getItem("token");
  const [currentSelect, setCurrentSelect] = useState(null);
  const [filtersSelected, setFiltersSelected] = useState([]);

  // useEffect(() => {
  //   setFiltersSelected([]);
  // }, [clearFilter]);

  useEffect(() => {
    if (setFilter) {
      setFiltersSelected(setFilter);
    }
  }, [setFilter]);

  const handleQueryObject = (filters: any) => {
    function removeDuplicates(arr: any) {
      return [...new Set(arr)];
    }

    const duplicateQuerys = filters.map((filter: any) => filter.query);

    const querys = removeDuplicates(duplicateQuerys);

    const ObjectEntriesQuery = querys.map((query: any) => {
      const objectFiltered = filters.filter(
        (filter: any) => filter.query == query
      );
      const joinKeyValues = objectFiltered.map((item: any) => item.keyValue);
      return [query, joinKeyValues.join(";")];
    });
    const finalObjectQuery = Object.fromEntries(ObjectEntriesQuery);
    return finalObjectQuery;
  };

  const temp = {
    url: window.apis.core + filterOptions.route,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      query: JSON.stringify(handleQueryObject(filtersSelected)),
    },
  };

  const { request } = useFetch();

  const handleSubmit = async () => {
    filterResponse({ filtersSelected });
    document.getElementById(id)?.classList.add("cnx-filter-display-none-cfdn");
    // const { url, options } = temp;
    // const { response, json } = await request(url, options);
    // if (response?.ok) {
    //   filterResponse({response: json, filtersSelected});
    //   document
    //   .getElementById(id)
    //   ?.classList.add("cnx-filter-display-none-cfdn");
    // } else {
    //   filterResponse({response, filtersSelected});
    //   document
    //   .getElementById(id)
    //   ?.classList.add("cnx-filter-display-none-cfdn");
    // }
  };

  const handleClearFilter = () => {
    setFiltersSelected([]);
  };

  return (
    <div
      id={id}
      className="cnx-filter-container-cfc cnx-filter-display-none-cfdn"
    >
      <div className="cnx-filter-modal-cfm">
        <header className="cnx-filter-header-container-cfhc">
          <h2>Filtro avançado</h2>
          <button
            type="button"
            onClick={() => {
              document
                .getElementById(id)
                ?.classList.add("cnx-filter-display-none-cfdn");
            }}
          >
            <ChromeClose />
          </button>
        </header>
        <LeftSection
          filters={filterOptions?.filters}
          setCurrentSelect={setCurrentSelect}
        />
        <CenterSection
          currentSelect={currentSelect}
          setFiltersSelected={setFiltersSelected}
          filtersSelected={filtersSelected}
          singleSelects={singleSelects}
          keepSelect={keepSelect}
        />
        <RightSection
          currentSelect={currentSelect}
          filtersSelected={filtersSelected}
          setFiltersSelected={setFiltersSelected}
        />
        <footer className="cnx-filter-footer-container-cffc">
          <button
            type="button"
            className="cnx-filter-btn-clear-cfbc"
            onClick={() => handleClearFilter()}
          >
            Limpar
          </button>
          <button
            type="button"
            className="cnx-filter-btn-apply-cfba"
            onClick={() => handleSubmit()}
          >
            Aplicar
          </button>
        </footer>
      </div>
    </div>
  );
}

export default CnxFilter;
