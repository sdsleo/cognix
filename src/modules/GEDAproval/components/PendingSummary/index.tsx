import { useState } from "react";
import "./styles.css";
import { IPendingSummary } from "./types";

function PendingSummary({ summary, setFilter }: IPendingSummary) {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleSelect = (type: string) => {
    setActiveFilter(type);
    setFilter(type);
  };

  return (
    <div className="cnx-ged-approval-pending-summary-container">
      <span
        onClick={() => handleSelect("all")}
        className={
          activeFilter === "all"
            ? "cnx-ged-approval-pending-summary-active-filter"
            : ""
        }
      >
        Todos({30})
      </span>
      <span>|</span>
      <span
        onClick={() => handleSelect("myPendings")}
        className={
          activeFilter === "myPendings"
            ? "cnx-ged-approval-pending-summary-active-filter"
            : ""
        }
      >
        Minhas Pendências({0})
      </span>
      <span>|</span>
      <span
        onClick={() => handleSelect("alternativePendings")}
        className={
          activeFilter === "alternativePendings"
            ? "cnx-ged-approval-pending-summary-active-filter"
            : ""
        }
      >
        Pendências Alternativas({0})
      </span>
    </div>
  );
}

export default PendingSummary;
