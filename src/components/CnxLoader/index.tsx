import { useRef } from "react";
import "./styles.css";
import ChromeClose from "../../assets/icons/FluentUI/SVGs/ChromeClose";
import StatusErrorFull from "../../assets/icons/FluentUI/SVGs/StatusErrorFull";
import CompletedSolid from "../../assets/icons/FluentUI/SVGs/CompletedSolid";
import InfoSolid from "../../assets/icons/FluentUI/SVGs/InfoSolid";
import AlertSolid from "../../assets/icons/FluentUI/SVGs/AlertSolid";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { IDialog } from "./types";

function CnxLoader({
  useId,
  type,
  content,
  cancelButton,
  confirmButton,
}: IDialog) {

  return (
    <dialog id={useId} className="cnx-dialog-loader-center-cdlc">
      <div className="cnx-dialog-loader-center-container-cdlcc">
      <span className="cnx-printing-loader-cpl"></span>
      <span className="cnx-printing-span-cps">Imprimindo...</span>
      </div>
    </dialog>
  );
}

export default CnxLoader;
