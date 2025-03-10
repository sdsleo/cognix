import { useContext } from "react";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import "./styles.css";

export function LastUpdate() {
  const { localesData } = useContext<ILocales>(localesContex);
  return (
    <div className="cnx-last-update-container-cluc">
      <span>{`${localesData?.modalProfile?.about?.lastUpdate} ${window.about.lastUpdate}`}</span>
    </div>
  );
}
