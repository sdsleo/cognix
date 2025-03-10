import FontSize from "../../../../assets/icons/FluentUI/SVGs/FontSize";
import "./styles.css";

export function FontSizeSelect() {
  return (
    <div className="cnx-font-size-select-container-cfssc">
      <button type="button">
        <FontSize width="1rem" height="1rem" />
        <span>Pequeno</span>
      </button>
      <button type="button">
        <FontSize width="1.2rem" height="1.2rem" />
        <span>Médio</span>
      </button>
      <button type="button">
        <FontSize width="1.4rem" height="1.4rem" />
        <span>Grande</span>
      </button>
    </div>
  );
}
