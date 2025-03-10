import "./styles.css";
import { useId, useEffect, useContext, useLayoutEffect } from "react";
import MiniExpandMirrored from "../../assets/icons/FluentUI/SVGs/MiniExpandMirrored";
import ChromeClose from "../../assets/icons/FluentUI/SVGs/ChromeClose";
import MiniContractMirrored from "../../assets/icons/FluentUI/SVGs/MiniContractMirrored";
import ChevronDownSmall from "../../assets/icons/FluentUI/SVGs/ChevronDownMed";
import ChevronUpMed from "../../assets/icons/FluentUI/SVGs/ChevronUpMed";
import localesContex from "../../context/localesContex";
import { ILocales } from "../../locales/types";
import { IFormModal } from "./type";

function CnxFormModal({
  open,
  close,
  title,
  clearButton,
  saveButton,
  saving,
  formInputs,
  formParameters,
  historic,
  activity,
  file,
  customTab,
  startOpened,
  noDefaultForm,
  noTabs,
  contractDisable,
}: IFormModal) {
  const { localesData } = useContext<ILocales>(localesContex);

  useEffect(() => {
    if (open) {
      document
        .getElementById(`cnx-form-modal-${formModalId}`)
        ?.classList.remove("cnx-form-modal-container-closed-cfmcc");
    } else {
      document
        .getElementById(`cnx-form-modal-${formModalId}`)
        ?.classList.add("cnx-form-modal-container-closed-cfmcc");
      document
        .getElementById(`cnx-form-modal-${formModalId}`)
        ?.classList.remove("cnx-form-modal-container-expanded-cfmce");
      handleContractFormModal();
    }

    if (startOpened && open) {
      handleExpandFormModal();
    }
  }, [open]);
  const formModalId = useId();

  const handleColorHighlight = (id: string) => {
    if (id === "cnx-form-modal-tab-button-form") {
      document
        .getElementById(`cnx-form-modal-tab-button-form-${formModalId}`)
        ?.classList.add("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-parameters-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-historic-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-activity-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-file-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
    }
    if (id === "cnx-form-modal-tab-button-parameters") {
      document
        .getElementById(`cnx-form-modal-tab-button-parameters-${formModalId}`)
        ?.classList.add("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-form-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-historic-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-activity-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-file-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
    }
    if (id === "cnx-form-modal-tab-button-historic") {
      document
        .getElementById(`cnx-form-modal-tab-button-historic-${formModalId}`)
        ?.classList.add("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-parameters-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-form-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-activity-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-file-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
    }
    if (id === "cnx-form-modal-tab-button-activity") {
      document
        .getElementById(`cnx-form-modal-tab-button-activity-${formModalId}`)
        ?.classList.add("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-parameters-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-historic-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-form-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-file-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
    }
    if (id === "cnx-form-modal-tab-button-file") {
      document
        .getElementById(`cnx-form-modal-tab-button-file-${formModalId}`)
        ?.classList.add("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-activity-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-parameters-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-historic-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-form-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
    }
    if (id === "cnx-form-modal-tab-button-custom-file") {
      document
        .getElementById(`cnx-form-modal-tab-button-custom-file-${formModalId}`)
        ?.classList.add("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-file-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-activity-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-parameters-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-historic-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-form-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
    }
  };

  const handleSelectedColorHighlight = (id: string) => {
    if (id === "cnx-form-modal-tab-button-form") {
      document
        .getElementById(`cnx-form-modal-tab-button-form-${formModalId}`)
        ?.classList.add("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-parameters-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-historic-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-activity-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-file-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-custom-tab-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      const element: any = document.getElementById(
        `cnx-form-modal-form-section-${formModalId}`
      );
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
    if (id === "cnx-form-modal-tab-button-parameters") {
      document
        .getElementById(`cnx-form-modal-tab-button-parameters-${formModalId}`)
        ?.classList.add("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-form-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-historic-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-activity-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-file-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-custom-tab-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      const element: any = document.getElementById(
        `cnx-form-modal-parameters-section-${formModalId}`
      );
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
    if (id === "cnx-form-modal-tab-button-historic") {
      document
        .getElementById(`cnx-form-modal-tab-button-historic-${formModalId}`)
        ?.classList.add("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-parameters-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-form-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-activity-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-file-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-custom-tab-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      const element: any = document.getElementById(
        `cnx-form-modal-historic-section-${formModalId}`
      );
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
    if (id === "cnx-form-modal-tab-button-activity") {
      document
        .getElementById(`cnx-form-modal-tab-button-activity-${formModalId}`)
        ?.classList.add("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-parameters-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-historic-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-form-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-file-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-custom-tab-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      const element: any = document.getElementById(
        `cnx-form-modal-activity-section-${formModalId}`
      );
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
    if (id === "cnx-form-modal-tab-button-file") {
      document
        .getElementById(`cnx-form-modal-tab-button-file-${formModalId}`)
        ?.classList.add("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-activity-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-parameters-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-historic-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-form-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-custom-tab-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      const element: any = document.getElementById(
        `cnx-form-modal-file-section-${formModalId}`
      );
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
    if (id === "cnx-form-modal-tab-button-custom-tab") {
      document
        .getElementById(`cnx-form-modal-tab-button-custom-tab-${formModalId}`)
        ?.classList.add("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-file-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-activity-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-parameters-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-historic-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      document
        .getElementById(`cnx-form-modal-tab-button-form-${formModalId}`)
        ?.classList.remove("cnx-form-modal-tab-button-highlight");
      const element: any = document.getElementById(
        `cnx-form-modal-custom-tab-section-${formModalId}`
      );
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  const handleExpandFormModal = () => {
    document
      .getElementById(`cnx-form-modal-${formModalId}`)
      ?.classList.add("cnx-form-modal-container-expanded-cfmce");
    document
      .getElementById(`cnx-form-modal-expand-button-cfmeb-${formModalId}`)
      ?.classList.add("cnx-display-none");
    document
      .getElementById(`cnx-form-modal-contract-button-cfmcb-${formModalId}`)
      ?.classList.remove("cnx-display-none");
  };

  const handleContractFormModal = () => {
    document
      .getElementById(`cnx-form-modal-${formModalId}`)
      ?.classList.remove("cnx-form-modal-container-expanded-cfmce");
    document
      .getElementById(`cnx-form-modal-expand-button-cfmeb-${formModalId}`)
      ?.classList.remove("cnx-display-none");
    document
      .getElementById(`cnx-form-modal-contract-button-cfmcb-${formModalId}`)
      ?.classList.add("cnx-display-none");
  };

  const handleViewParameters = (type: string) => {
    if (type === "contract") {
      document
        .getElementById(`cnx-form-modal-parameters-content-${formModalId}`)
        ?.classList.add("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-parameters-chevron-down-button-${formModalId}`
        )
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-parameters-chevron-up-button-${formModalId}`
        )
        ?.classList.add("cnx-display-none");
    }

    if (type === "expand") {
      document
        .getElementById(`cnx-form-modal-parameters-content-${formModalId}`)
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-parameters-chevron-down-button-${formModalId}`
        )
        ?.classList.add("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-parameters-chevron-up-button-${formModalId}`
        )
        ?.classList.remove("cnx-display-none");
    }
  };

  const handleViewHistoric = (type: string) => {
    if (type === "contract") {
      document
        .getElementById(`cnx-form-modal-historic-content-${formModalId}`)
        ?.classList.add("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-historic-chevron-down-button-${formModalId}`
        )
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-historic-chevron-up-button-${formModalId}`
        )
        ?.classList.add("cnx-display-none");
    }

    if (type === "expand") {
      document
        .getElementById(`cnx-form-modal-historic-content-${formModalId}`)
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-historic-chevron-down-button-${formModalId}`
        )
        ?.classList.add("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-historic-chevron-up-button-${formModalId}`
        )
        ?.classList.remove("cnx-display-none");
    }
  };

  const handleViewActivity = (type: string) => {
    if (type === "contract") {
      document
        .getElementById(`cnx-form-modal-activity-content-${formModalId}`)
        ?.classList.add("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-activity-chevron-down-button-${formModalId}`
        )
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-activity-chevron-up-button-${formModalId}`
        )
        ?.classList.add("cnx-display-none");
    }

    if (type === "expand") {
      document
        .getElementById(`cnx-form-modal-activity-content-${formModalId}`)
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-activity-chevron-down-button-${formModalId}`
        )
        ?.classList.add("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-activity-chevron-up-button-${formModalId}`
        )
        ?.classList.remove("cnx-display-none");
    }
  };

  const handleViewFile = (type: string) => {
    if (type === "contract") {
      document
        .getElementById(`cnx-form-modal-file-content-${formModalId}`)
        ?.classList.add("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-file-chevron-down-button-${formModalId}`
        )
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(`cnx-form-modal-file-chevron-up-button-${formModalId}`)
        ?.classList.add("cnx-display-none");
    }

    if (type === "expand") {
      document
        .getElementById(`cnx-form-modal-file-content-${formModalId}`)
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-file-chevron-down-button-${formModalId}`
        )
        ?.classList.add("cnx-display-none");
      document
        .getElementById(`cnx-form-modal-file-chevron-up-button-${formModalId}`)
        ?.classList.remove("cnx-display-none");
    }
  };

  const handleViewCustomTab = (type: string) => {
    if (type === "contract") {
      document
        .getElementById(`cnx-form-modal-custom-tab-content-${formModalId}`)
        ?.classList.add("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-custom-tab-chevron-down-button-${formModalId}`
        )
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-custom-tab-chevron-up-button-${formModalId}`
        )
        ?.classList.add("cnx-display-none");
    }

    if (type === "expand") {
      document
        .getElementById(`cnx-form-modal-custom-tab-content-${formModalId}`)
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-custom-tab-chevron-down-button-${formModalId}`
        )
        ?.classList.add("cnx-display-none");
      document
        .getElementById(
          `cnx-form-modal-custom-tab-chevron-up-button-${formModalId}`
        )
        ?.classList.remove("cnx-display-none");
    }
  };

  return (
    <div
      id={`cnx-form-modal-${formModalId}`}
      className="cnx-form-modal-container-cfmc cnx-form-modal-container-closed-cfmcc"
    >
      <header className="cnx-form-modal-header-actions-cfmha">
        <section className="cnx-form-modal-window-container-cfmwc">
          <span className="cnx-form-modal-title-cfmt">{title}</span>
          <div className="cnx-form-modal-window-button-container-cfmwbc">
            <button
              id={`cnx-form-modal-expand-button-cfmeb-${formModalId}`}
              className="cnx-form-modal-window-button-cfmwb cnx-form-modal-window-mobile-no-display"
              type="button"
              onClick={() => handleExpandFormModal()}
            >
              <MiniExpandMirrored width="1.2rem" height="1.2rem" />
            </button>
            <button
              id={`cnx-form-modal-contract-button-cfmcb-${formModalId}`}
              className="cnx-form-modal-window-button-cfmwb cnx-form-modal-window-mobile-no-display cnx-display-none"
              type="button"
              onClick={() => handleContractFormModal()}
            >
              <MiniContractMirrored width="1.2rem" height="1.2rem" />
            </button>
            {close ? (
              <button
                className="cnx-form-modal-window-button-cfmwb"
                type="button"
                onClick={() => close(null)}
              >
                <ChromeClose width="1rem" height="1rem" />
              </button>
            ) : null}
          </div>
        </section>
        <section className="cnx-form-modal-clear-save-container-cfmcsc">
          <div className="cnx-form-modal-action-button-container-cfmabc">
            {clearButton ? (
              <button
                className="cnx-form-modal-clear-button-cfmcb"
                type="button"
                onClick={clearButton}
              >
                {localesData.cnxForm.buttons.cleanButton || "Clean"}
              </button>
            ) : null}

            <button
              className="cnx-form-modal-save-button-cfmsb"
              type="button"
              disabled={saving}
              onClick={saveButton}
            >
              {saving ? (
                <div className="cnx-form-modal-saving-container-cfmsc">
                  <div className="cnx-lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  <span className="cnx-saving">Salvando...</span>
                </div>
              ) : (
                localesData.cnxForm.buttons.saveButton || "Save"
              )}
            </button>
          </div>
        </section>
        {noTabs ? null : (
          <section className="cnx-form-modal-tabs-cfmt">
            {noDefaultForm ? null : (
              <button
                id={`cnx-form-modal-tab-button-form-${formModalId}`}
                className="cnx-form-modal-tab-button cnx-form-modal-tab-button-highlight"
                type="button"
                onClick={() =>
                  handleSelectedColorHighlight("cnx-form-modal-tab-button-form")
                }
              >
                {localesData.cnxForm.tabs.form || "Form"}
              </button>
            )}

            {formParameters ? (
              <button
                id={`cnx-form-modal-tab-button-parameters-${formModalId}`}
                className="cnx-form-modal-tab-button"
                type="button"
                onClick={() =>
                  handleSelectedColorHighlight(
                    "cnx-form-modal-tab-button-parameters"
                  )
                }
              >
                {localesData.cnxForm.tabs.parameters || "Parameters"}
              </button>
            ) : null}
            {historic ? (
              <button
                id={`cnx-form-modal-tab-button-historic-${formModalId}`}
                className="cnx-form-modal-tab-button"
                type="button"
                onClick={() =>
                  handleSelectedColorHighlight(
                    "cnx-form-modal-tab-button-historic"
                  )
                }
              >
                {localesData.cnxForm.tabs.historic || "Historic"}
              </button>
            ) : null}
            {activity ? (
              <button
                id={`cnx-form-modal-tab-button-activity-${formModalId}`}
                className="cnx-form-modal-tab-button"
                type="button"
                onClick={() =>
                  handleSelectedColorHighlight(
                    "cnx-form-modal-tab-button-activity"
                  )
                }
              >
                {localesData.cnxForm.tabs.activity || "Activity"}
              </button>
            ) : null}
            {file ? (
              <button
                id={`cnx-form-modal-tab-button-file-${formModalId}`}
                className="cnx-form-modal-tab-button"
                type="button"
                onClick={() =>
                  handleSelectedColorHighlight("cnx-form-modal-tab-button-file")
                }
              >
                {localesData.cnxForm.tabs.file || "File"}
              </button>
            ) : null}
            {customTab ? (
              <button
                id={`cnx-form-modal-tab-button-custom-tab-${formModalId}`}
                className="cnx-form-modal-tab-button"
                type="button"
                onClick={() =>
                  handleSelectedColorHighlight(
                    "cnx-form-modal-tab-button-custom-tab"
                  )
                }
              >
                {customTab.title}
              </button>
            ) : null}
          </section>
        )}
      </header>
      <div className="cnx-form-modal-main-content-cfmc">
        {noDefaultForm ? null : (
          <div
            id={`cnx-form-modal-form-section-${formModalId}`}
            className="cnx-form-modal-form-container-cfmfc"
            onFocus={() =>
              handleColorHighlight("cnx-form-modal-tab-button-form")
            }
          >
            <input
              type="text"
              id={`cnx-${formModalId}-autofocus-start`}
              className="cnx-autofocus-start-cas"
            />
            <div className="cnx-focus-looping-container-cflc">{formInputs}</div>
            <input
              className="cnx-autofocus-end-cae"
              type="text"
              onFocus={() => {
                if (
                  document.getElementById(`cnx-${formModalId}-autofocus-start`)
                ) {
                  const temp: any = document.getElementById(
                    `cnx-${formModalId}-autofocus-start`
                  );
                  temp.focus();
                }
              }}
            />
          </div>
        )}
        {formParameters ? (
          <div
            className={
              noDefaultForm
                ? "cnx-form-modal-content-container-cfmcc cnx-form-modal-content-border-none-cfmcbn"
                : "cnx-form-modal-content-container-cfmcc"
            }
            id={`cnx-form-modal-parameters-section-${formModalId}`}
            onFocus={() =>
              handleColorHighlight("cnx-form-modal-tab-button-parameters")
            }
          >
            <div className="cnx-form-modal-header-action-drop-dawn-cfmhadd">
              <button
                id={`cnx-form-modal-parameters-chevron-down-button-${formModalId}`}
                onClick={() =>
                  contractDisable ? null : handleViewParameters("expand")
                }
                className="cnx-display-none"
              >
                {contractDisable ? null : (
                  <ChevronDownSmall width="12px" height="12px" />
                )}
                <span>
                  {localesData.cnxForm.tabs.parameters || "Parameters"}
                </span>
              </button>
              <button
                id={`cnx-form-modal-parameters-chevron-up-button-${formModalId}`}
                onClick={() =>
                  contractDisable ? null : handleViewParameters("contract")
                }
              >
                {contractDisable ? null : (
                  <ChevronUpMed width="12px" height="12px" />
                )}
                <span>
                  {localesData.cnxForm.tabs.parameters || "Parameters"}
                </span>
              </button>
            </div>
            <div
              id={`cnx-form-modal-parameters-content-${formModalId}`}
              className="cnx-form-modal-div-content-cfmdc"
            >
              {formParameters}
            </div>
          </div>
        ) : null}
        {historic ? (
          <div
            id={`cnx-form-modal-historic-section-${formModalId}`}
            className={
              noDefaultForm
                ? "cnx-form-modal-content-container-cfmcc cnx-form-modal-content-border-none-cfmcbn"
                : "cnx-form-modal-content-container-cfmcc"
            }
            onFocus={() =>
              handleColorHighlight("cnx-form-modal-tab-button-historic")
            }
          >
            <div className="cnx-form-modal-header-action-drop-dawn-cfmhadd">
              <button
                id={`cnx-form-modal-historic-chevron-down-button-${formModalId}`}
                onClick={() =>
                  contractDisable ? null : handleViewHistoric("expand")
                }
                className="cnx-display-none"
              >
                {contractDisable ? null : (
                  <ChevronDownSmall width="12px" height="12px" />
                )}

                <span>{localesData.cnxForm.tabs.historic || "Historic"}</span>
              </button>
              <button
                id={`cnx-form-modal-historic-chevron-up-button-${formModalId}`}
                onClick={() =>
                  contractDisable ? null : handleViewHistoric("contract")
                }
              >
                {contractDisable ? null : (
                  <ChevronUpMed width="12px" height="12px" />
                )}
                <span>{localesData.cnxForm.tabs.historic || "Historic"}</span>
              </button>
            </div>
            <div
              id={`cnx-form-modal-historic-content-${formModalId}`}
              className="cnx-form-modal-div-content-cfmdc"
            >
              {historic}
            </div>
          </div>
        ) : null}
        {activity ? (
          <div
            id={`cnx-form-modal-activity-section-${formModalId}`}
            className={
              noDefaultForm
                ? "cnx-form-modal-content-container-cfmcc cnx-form-modal-content-border-none-cfmcbn"
                : "cnx-form-modal-content-container-cfmcc"
            }
            onFocus={() =>
              handleColorHighlight("cnx-form-modal-tab-button-activity")
            }
          >
            <div className="cnx-form-modal-header-action-drop-dawn-cfmhadd">
              <button
                id={`cnx-form-modal-activity-chevron-down-button-${formModalId}`}
                onClick={() =>
                  contractDisable ? null : handleViewActivity("expand")
                }
                className="cnx-display-none"
              >
                {contractDisable ? null : (
                  <ChevronDownSmall width="12px" height="12px" />
                )}
                <span>{localesData.cnxForm.tabs.activity || "Activity"}</span>
              </button>
              <button
                id={`cnx-form-modal-activity-chevron-up-button-${formModalId}`}
                onClick={() =>
                  contractDisable ? null : handleViewActivity("contract")
                }
              >
                {contractDisable ? null : (
                  <ChevronUpMed width="12px" height="12px" />
                )}
                <span>{localesData.cnxForm.tabs.activity || "Activity"}</span>
              </button>
            </div>
            <div
              id={`cnx-form-modal-activity-content-${formModalId}`}
              className="cnx-form-modal-div-content-cfmdc"
            >
              {activity}
            </div>
          </div>
        ) : null}
        {file ? (
          <div
            id={`cnx-form-modal-file-section-${formModalId}`}
            className={
              noDefaultForm
                ? "cnx-form-modal-content-container-cfmcc cnx-form-modal-content-border-none-cfmcbn"
                : "cnx-form-modal-content-container-cfmcc"
            }
            onFocus={() =>
              handleColorHighlight("cnx-form-modal-tab-button-file")
            }
          >
            <div className="cnx-form-modal-header-action-drop-dawn-cfmhadd">
              <button
                id={`cnx-form-modal-file-chevron-down-button-${formModalId}`}
                onClick={() =>
                  contractDisable ? null : handleViewFile("expand")
                }
                className="cnx-display-none"
              >
                {contractDisable ? null : (
                  <ChevronDownSmall width="12px" height="12px" />
                )}
                <span>{localesData.cnxForm.tabs.file || "File"}</span>
              </button>
              <button
                id={`cnx-form-modal-file-chevron-up-button-${formModalId}`}
                onClick={() =>
                  contractDisable ? null : handleViewFile("contract")
                }
              >
                {contractDisable ? null : (
                  <ChevronUpMed width="12px" height="12px" />
                )}
                <span>{localesData.cnxForm.tabs.file || "File"}</span>
              </button>
            </div>
            <div
              id={`cnx-form-modal-file-content-${formModalId}`}
              className="cnx-form-modal-div-content-cfmdc"
            >
              {file}
            </div>
          </div>
        ) : null}
        {customTab ? (
          <div
            id={`cnx-form-modal-custom-tab-section-${formModalId}`}
            className={
              noDefaultForm
                ? "cnx-form-modal-content-container-cfmcc cnx-form-modal-content-border-none-cfmcbn"
                : "cnx-form-modal-content-container-cfmcc"
            }
            onFocus={() =>
              handleColorHighlight("cnx-form-modal-tab-button-custom-tab")
            }
          >
            <div className="cnx-form-modal-header-action-drop-dawn-cfmhadd">
              <button
                id={`cnx-form-modal-custom-tab-chevron-down-button-${formModalId}`}
                onClick={() =>
                  contractDisable ? null : handleViewCustomTab("expand")
                }
                className="cnx-display-none"
              >
                {contractDisable ? null : (
                  <ChevronDownSmall width="12px" height="12px" />
                )}
                <span>{customTab.title}</span>
              </button>
              <button
                id={`cnx-form-modal-custom-tab-chevron-up-button-${formModalId}`}
                onClick={() =>
                  contractDisable ? null : handleViewCustomTab("contract")
                }
              >
                {contractDisable ? null : (
                  <ChevronUpMed width="12px" height="12px" />
                )}
                <span>{customTab.title}</span>
              </button>
            </div>
            <div
              id={`cnx-form-modal-custom-tab-content-${formModalId}`}
              className="cnx-form-modal-div-content-cfmdc"
            >
              {customTab.content}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CnxFormModal;
