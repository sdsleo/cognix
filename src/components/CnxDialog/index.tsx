import { useRef } from "react";
import "./styles.css";
import ChromeClose from "../../assets/icons/FluentUI/SVGs/ChromeClose";
import StatusErrorFull from "../../assets/icons/FluentUI/SVGs/StatusErrorFull";
import CompletedSolid from "../../assets/icons/FluentUI/SVGs/CompletedSolid";
import InfoSolid from "../../assets/icons/FluentUI/SVGs/InfoSolid";
import AlertSolid from "../../assets/icons/FluentUI/SVGs/AlertSolid";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { IDialog } from "./types";

function CnxDialog({
  useId,
  type,
  content,
  cancelButton,
  confirmButton,
}: IDialog) {
  const dialogRef = useRef(null);

  function closeDialog() {
    const modal: any = document.getElementById(useId);
    modal?.close();
  }

  function closeDialogByOnClickOutside() {
    if (cancelButton || confirmButton) return;
    const modal: any = document.getElementById(useId);
    modal?.close();
  }

  function handleCancelButton() {
    cancelButton();
    closeDialog();
  }

  function handleConfirmButton() {
    confirmButton();
    closeDialog();
  }

  function handleType(type: string) {
    switch (type) {
      case "success":
        return "cnx-dialog-success-cds";
      case "error":
        return "cnx-dialog-error-cde";
      case "info":
        return "cnx-dialog-info-cdi";
      case "warning":
        return "cnx-dialog-warning-cdw";
      default:
        return "cnx-dialog-default-cdd";
    }
  }

  function handleDialogIcon(type: string) {
    switch (type) {
      case "success":
        return <CompletedSolid width="30px" height="30px" />;
      case "error":
        return <StatusErrorFull width="30px" height="30px" />;
      case "info":
        return <InfoSolid width="30px" height="30px" />;
      case "warning":
        return <AlertSolid width="30px" height="30px" />;
      default:
        return null;
    }
  }

  function handleDialogColor(type: string) {
    switch (type) {
      case "success":
        return "cnx-dialog-color-success-cdcs";
      case "error":
        return "cnx-dialog-color-error-cdce";
      case "info":
        return "cnx-dialog-color-info-cdci";
      case "warning":
        return "cnx-dialog-color-warning-cdcw";
      default:
        return "cnx-dialog-color-default-cdcd";
    }
  }

  useOnClickOutside(dialogRef, closeDialogByOnClickOutside);

  return (
    <dialog id={useId} className={`cnx-dialog-component-cdc ${handleType(type || "default")}`}>
      <div className="cnx-dialog-container-cdc" ref={dialogRef}>
        <div
          className={`cnx-dialog-content-cdc ${handleDialogColor(
            type || "default"
          )}`}
        >
          <div className="cnx-dialog-icon-container-cdic">
            {handleDialogIcon(type || "default")}
          </div>
          <div className={`cnx-gap-cg ${handleDialogColor(type || "default")}`}>
            <span style={{ fontWeight: "500", fontSize: "1.2rem" }}>
              {content?.title}
            </span>
            <div className={type === "warning" ? "cnx-dialog-message-warning-cdmw" : "cnx-dialog-message-cdm"}>{content?.message}</div>
            <div className="cnx-dialog-buttons-cdb">
              {cancelButton ? (
                <button
                  type="button"
                  className="cnx-dialog-cancel-button-cdcb"
                  onClick={handleCancelButton}
                >
                  Cancelar
                </button>
              ) : null}
              {confirmButton ? (
                <button
                  type="button"
                  className="cnx-dialog-confirm-button-cdcb"
                  onClick={handleConfirmButton}
                >
                  Confirmar
                </button>
              ) : null}
            </div>
          </div>
        </div>
        {cancelButton || confirmButton ? null : (
          <button
            type="button"
            className="cnx-dialog-close-button-cdcb"
            onClick={closeDialog}
          >
            <ChromeClose width="14px" height="14px" />
          </button>
        )}
      </div>
    </dialog>
  );
}

export default CnxDialog;
