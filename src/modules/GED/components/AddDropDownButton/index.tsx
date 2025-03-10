import { useState, useId, useRef, useContext } from "react";
import Add from "../../../../assets/icons/FluentUI/SVGs/Add";
import ChevronDownSmall from "../../../../assets/icons/FluentUI/SVGs/ChevronDownSmall";
import ChevronUpSmall from "../../../../assets/icons/FluentUI/SVGs/ChevronUpSmall";
import FolderHorizontal from "../../../../assets/icons/FluentUI/SVGs/FolderHorizontal";
import PageAdd from "../../../../assets/icons/FluentUI/SVGs/PageAdd";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";
import "./styles.css";

function AddDropDownButton() {
  const { dispacth }: any = useContext(UseContext);
  const dropDownOptionsRef = useRef(null);
  const [open, setOpen] = useState(false);
  const CNX_ID = useId();

  const showDropDownOptions = () => {
    document
      .getElementById(`cnx-ged-add-icon-${CNX_ID}`)
      ?.classList.remove("cnx-display-none");
    document
      .getElementById(`cnx-ged-chevron-down-icon-${CNX_ID}`)
      ?.classList.add("cnx-display-none");
    document
      .getElementById(`cnx-ged-chevron-up-icon-${CNX_ID}`)
      ?.classList.add("cnx-display-none");

      document
      .getElementById(`cnx-ged-add-drop-down-options-container-${CNX_ID}`)
      ?.classList.add("cnx-display-none");

    setOpen(false);
  };
  useOnClickOutside(dropDownOptionsRef, showDropDownOptions);

  const actionButton = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: true,
    });
    showDropDownOptions()
  };

  const openEditModal = (rowData: any) => {
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: true,
    });
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: rowData,
    });
  }; 

  const dialogModal = "CNX_DOC_FOLDER_MODAL";
  const openModal = async () => {
    const modal: any = document.getElementById(dialogModal);
    modal?.showModal();
  };

  return (
    <div className="cnx-ged-add-drop-down-container-cgaddc" ref={dropDownOptionsRef}>
      <button
        id={`cnx-ged-add-drop-down-button-${CNX_ID}`}
        className="cnx-ged-add-drop-down-button-cgaddb cnx-mobile-no-display-cmnd"
        type="button"
        
        onClick={() => {
          if (open) {
            document
              .getElementById(`cnx-ged-add-icon-${CNX_ID}`)
              ?.classList.add("cnx-display-none");
            document
              .getElementById(`cnx-ged-chevron-down-icon-${CNX_ID}`)
              ?.classList.remove("cnx-display-none");
            document
              .getElementById(`cnx-ged-chevron-up-icon-${CNX_ID}`)
              ?.classList.add("cnx-display-none");
            document
              .getElementById(`cnx-ged-add-drop-down-options-container-${CNX_ID}`)
              ?.classList.add("cnx-display-none");
            setOpen(false);
          } else {
            document
              .getElementById(`cnx-ged-add-icon-${CNX_ID}`)
              ?.classList.add("cnx-display-none");
            document
              .getElementById(`cnx-ged-chevron-down-icon-${CNX_ID}`)
              ?.classList.add("cnx-display-none");
            document
              .getElementById(`cnx-ged-chevron-up-icon-${CNX_ID}`)
              ?.classList.remove("cnx-display-none");
            document
              .getElementById(`cnx-ged-add-drop-down-options-container-${CNX_ID}`)
              ?.classList.remove("cnx-display-none");
            setOpen(true);
          }
        }}
        onMouseOutCapture={() => {
          if (
            document
              .getElementById(`cnx-ged-chevron-up-icon-${CNX_ID}`)
              ?.classList.contains("cnx-display-none")
          ) {
            document
              .getElementById(`cnx-ged-add-icon-${CNX_ID}`)
              ?.classList.remove("cnx-display-none");
            document
              .getElementById(`cnx-ged-chevron-down-icon-${CNX_ID}`)
              ?.classList.add("cnx-display-none");
          }
        }}
        onMouseOverCapture={() => {
          if (
            document
              .getElementById(`cnx-ged-chevron-up-icon-${CNX_ID}`)
              ?.classList.contains("cnx-display-none")
          ) {
            document
              .getElementById(`cnx-ged-add-icon-${CNX_ID}`)
              ?.classList.add("cnx-display-none");
            document
              .getElementById(`cnx-ged-chevron-down-icon-${CNX_ID}`)
              ?.classList.remove("cnx-display-none");
          }
        }}
      >
        <div className="cnx-ged-add-drop-down-icons-container-cgaddic">
          <Add id={`cnx-ged-add-icon-${CNX_ID}`} />
          <ChevronUpSmall
            id={`cnx-ged-chevron-up-icon-${CNX_ID}`}
            className="cnx-display-none"
          />
          <ChevronDownSmall
            id={`cnx-ged-chevron-down-icon-${CNX_ID}`}
            className="cnx-display-none"
          />
        </div>
        Adicionar
      </button>
        <div
          id={`cnx-ged-add-drop-down-options-container-${CNX_ID}`}
          className="cnx-ged-add-drop-down-options-container-cgaddoc cnx-display-none"
        >
          <button type="button" onClick={() => actionButton()}>
            <PageAdd />
            Arquivo
          </button>
          <button type="button" onClick={() => openModal()}>
            <FolderHorizontal />
            Pasta
          </button>
        </div>
    </div>
  );
}

export default AddDropDownButton;
