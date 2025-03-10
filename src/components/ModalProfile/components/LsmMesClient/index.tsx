import { useContext } from "react";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import CnxLogo from "../../../../assets/icons/CnxIcons/CnxLogo";
import "./styles.css";

export function LsmMesClient() {
  const { localesData } = useContext<ILocales>(localesContex);
  return (
    <div className="cnx-lsm-mes-client-container-clmcc">
      <CnxLogo width="1.3rem" height="1.3rem" />
      <span>{`MES - ${window.about.client}`}</span>
    </div>
  );
}
