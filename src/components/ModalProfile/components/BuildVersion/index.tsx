import Embed from "../../../../assets/icons/FluentUI/SVGs/Embed";
import { useContext } from "react";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import "./styles.css";

export function BuildVersion() {
  const { localesData } = useContext<ILocales>(localesContex);
  return (
    <div className="cnx-build-version-container-cbvcc">
      <Embed width="1.3rem" height="1.3rem" />
      <span>{`${localesData?.modalProfile?.about?.version} ${window.about.version}`}</span>
    </div>
  );
}
