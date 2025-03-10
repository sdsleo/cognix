import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../components/CnxDialog";
import { CnxTable } from "../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import AddFriend from "../../../../assets/icons/FluentUI/SVGs/AddFriend";
import PathSummary from "../PathSummary";
import ChevronDownSmall from "../../../../assets/icons/FluentUI/SVGs/ChevronDownSmall";
import CalculatorAddition from "../../../../assets/icons/FluentUI/SVGs/Add";
import Add from "../../../../assets/icons/FluentUI/SVGs/Add";
import ChevronUpSmall from "../../../../assets/icons/FluentUI/SVGs/ChevronUpSmall";
import PageAdd from "../../../../assets/icons/FluentUI/SVGs/PageAdd";
import FolderHorizontal from "../../../../assets/icons/FluentUI/SVGs/FolderHorizontal";
import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";
import AddDropDownButton from "../AddDropDownButton";
import Input from "../../../../components/CnxInput/InputTypes/Input";

function Table({ ids }: string | any) {
  const OpenModal = document.getElementById(ids);
  const { dispacth } = useContext(UseContext);
  const dialogModal = "CNX_DOC_FOLDER_MODAL";
  const dropDownOptionsRef = useRef(null);
  const CNX_ID = useId();
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
    name: "Nome",
    code: "Código",
    revision: "Revisão",
    lastUpdate: "Última Atualizacão",
    status: "Status",
    actions: "Ações",
  };

  const handleData = () => {
    setData([
      {
        name: "Laudo PCS POJUCA",
        code: "PCS01",
        revision: "2",
        lastUpdate: "10/01/2023",
        status: "Criado",
        actions: "...",
      },
      {
        name: "Laudo PCS OURIÇANGAS",
        code: "PCS02",
        revision: "2",
        lastUpdate: "10/01/2023",
        status: "Criado",
        actions: "...",
      },
      {
        name: "Laudo NOVA SOURE",
        code: "PCS03",
        revision: "2",
        lastUpdate: "10/01/2023",
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
    // {
    //   key: "skills",
    //   func: (dataTd: any) => {
    //     return (
    //       <button
    //         type="button"
    //         className="cnx-add-area-record-th-number-link"
    //         onClick={() => toSkills()}
    //       >
    //         <span className="searchable">{dataTd}</span>
    //       </button>
    //     );
    //   },
    // },
  ];

    const buttons = [
    {
      renderButton: (rowsChecked: any) => {
        return (
          <AddDropDownButton />
        );
      }
    },
  ];

  const handleDialogEdit = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: true,
    });
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
  };

  const handleDialogAdd = () => {
    dispacth({
      type: ACTIONS.ADD_MODAL,
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

  const handleNavigation = (data: any) => {

  };

  const openModal = async () => {
    const modal: any = document.getElementById(dialogModal);
    modal?.showModal();
  };


  return (
    <div className="cnx-user-table-container-cutc">
      <CnxDialog
        useId={dialogModal}
        type="warning"
        content={{
          title: "Adicionar pasta",
          message: <Input type="text" label="Nome da pasta" doubleWidth mandatory />,
        }}
        cancelButton={() => null}
        confirmButton={() => null}
      />
      <CnxTable
        title="Cadastro de Documentos"
        data={data}
        head={head}
        buttons={buttons}
        customSummary={() => (
          <PathSummary
            path={[
              { name: "root" },
              { name: "folder 1" },
              { name: "folder 2" },
            ]}
            navigationPath={handleNavigation}
          />
        )}
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
        deleteButton={handleRowsChecked}
      />
    </div>
  );
}

export default Table;
