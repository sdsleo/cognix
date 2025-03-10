import { useId } from "react";
import ChevronRightMed from "../../../../../../assets/icons/FluentUI/SVGs/ChevronRightMed";
import "./styles.css";

export function LeftSection({ filters, setCurrentSelect }: any) {
  const btnColumnId = useId();
  const handleSelect = (filter: any) => {
    setCurrentSelect(filter);
  }
  const handleColorHighlight = (index: any) => {
    const inactiveColumns = document.querySelectorAll(
      ".cnx-filter-btn-column-cfbc"
    );
    for (const inactiveTab of inactiveColumns) {
      inactiveTab.classList.remove("cnx-filter-btn-column-highlight-cfbch");
    }

    const activeTab = document.getElementById(`cnx-${btnColumnId}-${index}`);
    activeTab!.classList.add("cnx-filter-btn-column-highlight-cfbch");
  };

  return (
    <section className="cnx-filter-left-section-cfls">
      <header className="cnx-filter-header-left-title-cfhlt">Colunas</header>
      <div className="cnx-filter-column-list-cfcl">
        {filters.map((filter: any, index: number) => (
          <button
            id={`cnx-${btnColumnId}-${index}`}
            type="button"
            className="cnx-filter-btn-column-cfbc"
            onClick={() => {
              handleColorHighlight(index);
              handleSelect(filter);
            }}
          >
            <span>{filter?.title}</span>
            <ChevronRightMed width="0.8rem" height="0.8rem" />
          </button>
        ))}
      </div>
    </section>
  );
}
