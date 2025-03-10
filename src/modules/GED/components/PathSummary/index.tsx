import ChevronRightMed from "../../../../assets/icons/FluentUI/SVGs/ChevronRightMed";
import ChevronRightSmall from "../../../../assets/icons/FluentUI/SVGs/ChevronRightSmall";
import { IPathSummary } from "./types";
import "./styles.css";

function PathSummary({ path, navigationPath }: IPathSummary) {
  return (
    <div className="cnx-path-summary-container-cpsc">
      {path.map((item: any, index: number) => (
        <button className="cnx-path-summary-item-cpsi" type="button" onClick={() => navigationPath({index, item})}>
          {index == 0 ? null : <ChevronRightSmall width="12px" heigth="12px" className={path.length == (index + 1) ? 'cnx-path-summary-item-selected-cpsis' : ''} />}
          <span className={path.length == (index + 1) ? 'cnx-path-summary-item-selected-cpsis' : ''}>{item.name}</span>
        </button>
      ))}
    </div>
  );
}

export default PathSummary;
