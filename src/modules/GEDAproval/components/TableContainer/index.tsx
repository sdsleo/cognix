import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../components/CnxDialog";
import { CnxTable } from "../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import AddFriend from "../../../../assets/icons/FluentUI/SVGs/AddFriend";
import Completed from "../../../../assets/icons/FluentUI/SVGs/Completed";
import ErrorBadge from "../../../../assets/icons/FluentUI/SVGs/ErrorBadge";
import Eye from "../../../../assets/icons/FluentUI/SVGs/Eye";
import IconType from "../IconType";
import PendingSummary from "../PendingSummary";

function Table({ ids }: string | any) {
  const OpenModal = document.getElementById(ids);
  const { dispacth } = useContext(UseContext);
  const dialogModal = useId();
  const [modal, setModal] = useState({
    title: "Sucesso!",
    type: "success",
    message: "O registro foi adicionado com êxito",
  });

  const [data, setData]: any = useState([]);

  useEffect(() => {
    handleData();
  }, []);

  const head = {
    type: " ",
    code: "Código",
    name: "Nome",
    responsible: "Responsável",
    lastUpdate: "Última Atualizacão",
    step: "Etapa",
    revision: "Revisão",
    status: "Status",
    actions: "Ações",
  };

  const handleData = () => {
    setData([
      {
        type: "pdf",
        code: "SOP__034",
        name: "UPLOADT001",
        responsible: "Super Administrador IT",
        lastUpdate: "23/03/2022 10:35:19",
        step: "0 / 1",
        revision: "1",
        status: "Criado",
        actions: "...",
      },
      {
        type: "docx",
        code: "SOP__034",
        name: "UPLOADT001",
        responsible: "Super Administrador IT",
        lastUpdate: "23/03/2022 10:35:19",
        step: "0 / 1",
        revision: "1",
        status: "Criado",
        actions: "...",
      },
      {
        type: "csv",
        code: "SOP__034",
        name: "UPLOADT001",
        responsible: "Super Administrador IT",
        lastUpdate: "23/03/2022 10:35:19",
        step: "0 / 1",
        revision: "1",
        status: "Criado",
        actions: "...",
      },
      {
        type: "xlsx",
        code: "SOP__034",
        name: "UPLOADT001",
        responsible: "Super Administrador IT",
        lastUpdate: "23/03/2022 10:35:19",
        step: "0 / 1",
        revision: "1",
        status: "Criado",
        actions: "...",
      },
      {
        type: "pptx",
        code: "SOP__034",
        name: "UPLOADT001",
        responsible: "Super Administrador IT",
        lastUpdate: "23/03/2022 10:35:19",
        step: "0 / 1",
        revision: "1",
        status: "Criado",
        actions: "...",
      },
      {
        type: "txt",
        code: "SOP__034",
        name: "UPLOADT001",
        responsible: "Super Administrador IT",
        lastUpdate: "23/03/2022 10:35:19",
        step: "0 / 1",
        revision: "1",
        status: "Criado",
        actions: "...",
      },
      {
        type: "png",
        code: "SOP__034",
        name: "UPLOADT001",
        responsible: "Super Administrador IT",
        lastUpdate: "23/03/2022 10:35:19",
        step: "0 / 1",
        revision: "1",
        status: "Criado",
        actions: "...",
      },
      {
        type: "jpg",
        code: "SOP__034",
        name: "UPLOADT001",
        responsible: "Super Administrador IT",
        lastUpdate: "23/03/2022 10:35:19",
        step: "0 / 1",
        revision: "1",
        status: "Criado",
        actions: "...",
      },
      {
        type: "jpeg",
        code: "SOP__034",
        name: "UPLOADT001",
        responsible: "Super Administrador IT",
        lastUpdate: "23/03/2022 10:35:19",
        step: "0 / 1",
        revision: "1",
        status: "Criado",
        actions: "...",
      },
      {
        type: "video",
        code: "SOP__034",
        name: "UPLOADT001",
        responsible: "Super Administrador IT",
        lastUpdate: "23/03/2022 10:35:19",
        step: "0 / 1",
        revision: "1",
        status: "Criado",
        actions: "...",
      },
      {
        type: "mp4",
        code: "SOP__034",
        name: "UPLOADT001",
        responsible: "Super Administrador IT",
        lastUpdate: "23/03/2022 10:35:19",
        step: "0 / 1",
        revision: "1",
        status: "Criado",
        actions: "...",
      },
      {
        type: "avi",
        code: "SOP__034",
        name: "UPLOADT001",
        responsible: "Super Administrador IT",
        lastUpdate: "23/03/2022 10:35:19",
        step: "0 / 1",
        revision: "1",
        status: "Criado",
        actions: "...",
      },
    ]);
  };

  const refreshList = () => {};

  const rowClick = (rowData: any) => {
    // dispacth({
    //   type: ACTIONS.ROW_DATA_SET,
    //   payload: rowData,
    // });
  };

  const handleRowsChecked = (data: any) => {
    // dispacth({
    //   type: ACTIONS.ROW_DATA_SET,
    //   payload: data,
    // });
  };

  const customTdFunction: any = [
    {
      key: "type",
      func: (dataTd: any) => {
        return (
          <IconType type={dataTd} />
        );
      },
    },
    {
      key: "actions",
      func: (dataTd: any) => {
        return (
          <div className="cnx-ged-approval-small-button-container-cgasbc">
            <button
              type="button"
              className="cnx-ged-approval-small-button-approval-cgasba"
              onClick={() => toSkills()}
            >
              <Completed />
            </button>
            <button
              type="button"
              className="cnx-ged-approval-small-button-repproval-cgasbr"
              onClick={() => toSkills()}
            >
              <ErrorBadge />
            </button>
            <button
              type="button"
              className="cnx-ged-approval-small-button-show-cgasbs"
              onClick={() => toSkills()}
            >
              <Eye />
            </button>
          </div>
        );
      },
    },
  ];

  const buttons = [
    {
      renderButton: (rowsChecked: any) => {
        const handleUserSkill = () => {};
        return (
          <button
            className="cnx-ged-approval-button-approval-cgaba"
            type="button"
            onClick={() => toSkills()}
          >
            <Completed />
            Aprovar
          </button>
        );
      },
    },
    {
      renderButton: (rowsChecked: any) => {
        const handleUserSkill = () => {};
        return (
          <button
            className="cnx-ged-approval-button-repproval-cgabr"
            type="button"
            onClick={() => toSkills()}
          >
            <ErrorBadge />
            Reprovar
          </button>
        );
      },
    },
  ];

  const handleDialogEdit = () => {
    dispacth({
      type: ACTIONS.MODAL_USER_EDIT,
      payload: true,
    });
    dispacth({
      type: ACTIONS.MODAL_USER_ADD,
      payload: false,
    });
  };

  const handleDialogAdd = () => {
    dispacth({
      type: ACTIONS.MODAL_USER_ADD,
      payload: true,
    });
  };

  const toSkills = () => {
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: "skills",
    });
  };

  const handlePagination = (dataPage: any) => {
    if (dataPage === "first") {
    }
    if (dataPage === "previous") {
    }
    if (dataPage === "next") {
    }
    if (dataPage === "last") {
    }
  };

  const summaryPagination = {
    currentPage: 1,
    pageCount: 5,
    itemCount: 5,
  };

  const returnTest = (data: string | number) => {

  }

  const customSummary = () => {
    return (
      <PendingSummary setFilter={returnTest} summary={{all: 30, myPendings: 0, alternativePendings: 0}} />
    );
  };

  return (
    <div className="cnx-user-table-container-cutc">
      <CnxDialog
        useId={dialogModal}
        type={modal.type}
        content={{
          title: modal.title,
          message: modal.message,
        }}
        // cancelButton={handleCancelButton}
        // confirmButton={handleCancelButton}
      />
      <CnxTable
        title="Cadastro de Documentos"
        data={data}
        head={head}
        buttons={buttons}
        customSummary={customSummary}
        reOrderColumn
        refreshTable={refreshList}
        enableRowClick={rowClick}
        checkable
        enablePagination={handlePagination}
        summaryPagination={summaryPagination}
        customTdFunction={customTdFunction}
        hoverEffect
        enableSummary
        rowsChecked={handleRowsChecked}
      />
    </div>
  );
}

export default Table;
