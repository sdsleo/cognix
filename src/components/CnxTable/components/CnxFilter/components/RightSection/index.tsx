import ChromeClose from "../../../../../../assets/icons/FluentUI/SVGs/ChromeClose";
import { useState, useEffect } from "react";
import "./styles.css";

export function RightSection({
  currentSelect,
  filtersSelected,
  setFiltersSelected
}: any) {
  const [querys, setQuerys] = useState([]);

  useEffect(() => {
    const typeOnly = filtersSelected.map((item: any) => item.query);
    const uniqueCount: any = new Set(typeOnly);
    setQuerys(Array.from(uniqueCount));
  }, [filtersSelected]);

  const handleQueryTypeItems = (query: string) => {
    const querysFiltered = filtersSelected.filter(
      (item: any) => item.query == query
    );

    const handleRemoveFilterTag = (id: any) => {
      const filteredIndex = filtersSelected.findIndex((item: any) => item.id == id);
      const newFiltersSelected = [...filtersSelected];
      newFiltersSelected.splice(filteredIndex, 1);
      setFiltersSelected(newFiltersSelected);
    };

    const handleTypeOf = (data: any) => {
      const type = typeof data;
    }

    return (
      <>
        {querysFiltered.map((item: any) => (
          <div className="cnx-filter-right-tag-cfrt">
            <span className="cnx-filter-right-tag-span-cfrts">
              {item?.keyLabel}
              {handleTypeOf(item)}
            </span>
            <button
              className="cnx-filter-right-tag-btn-cfrtb"
              type="button"
              onClick={() => handleRemoveFilterTag(item.id)}
            >
              <ChromeClose width="0.4rem" height="0.4rem" />
            </button>
          </div>
        ))}
      </>
    );
  };

  const handleTitle = (query: string) => {
    const querysFiltered = filtersSelected.find(
      (item: any) => item.query == query
    );
    return querysFiltered?.title;
  };

  return (
    <section className="cnx-filter-right-section-cfrs">
      <header className="cnx-filter-right-header-cfrh">
        Filtros aplicados
      </header>
      {filtersSelected.length > 0 ? (
        <div className="cnx-filter-right-container-cfrc">
          {querys?.map((query: any) => (
            <div className="cnx-filter-right-content-container-cfrcc">
              <span>{handleTitle(query)}</span>
              <div className="cnx-filter-right-tags-container-cfrtc">
                {handleQueryTypeItems(query)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="cnx-filter-right-no-content-cfrnc">
          <div className="cnx-filter-right-tags-example-cfrte">
            <div className="cnx-filter-right-tag-container-cfrtc">
              <div className="cnx-filter-right-tags-left-cfrtl">
                <div />
              </div>
              <div className="cnx-filter-right-tags-right-cfrtr">
                <ChromeClose width="0.3rem" height="0.3rem" />
              </div>
            </div>
            <div className="cnx-filter-right-tag-container-cfrtc">
              <div className="cnx-filter-right-tags-left-cfrtl">
                <div />
              </div>
              <div className="cnx-filter-right-tags-right-cfrtr">
                <ChromeClose width="0.3rem" height="0.3rem" />
              </div>
            </div>
            <div className="cnx-filter-right-tag-container-cfrtc">
              <div className="cnx-filter-right-tags-left-cfrtl">
                <div />
              </div>
              <div className="cnx-filter-right-tags-right-cfrtr">
                <ChromeClose width="0.3rem" height="0.3rem" />
              </div>
            </div>
          </div>
          <span>Os filtros aplicados irão aparecer aqui</span>
          <span>Para aplicar um filtro, selecione uma opção à esquerda</span>
        </div>
      )}
    </section>
  );
}
