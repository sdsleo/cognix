import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../components/CnxDialog";
import { CnxTable } from "../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";

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

  const handleData = () => {
    setData([
      {
        group: "GN01",
        description: "GRUPO GÁS",
        status: "Ativo",
      },
      {
        group: "GM01",
        description: "GRUPO METANO",
        status: "Ativo",
      },
      {
        group: "AD01",
        description: "GRUPO ADMINISTRADOR",
        status: "Ativo",
      },
    ]);
  };

  const head = {
    group: "Código",
    description: "Descrição",
    status: "Situação",
  };

  const refreshList = () => {};

  const rowClick = (rowData: any) => {
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: rowData,
    });
  };

  const toPermission = () => {
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: "permissions",
    });
  };

  const handleRowsChecked = (data: any) => {
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: data,
    });
  };

  const customTdFunction = [
    {
      key: "group",
      func: (dataTd: any) => {
        return (
          <button
            type="button"
            className="cnx-add-area-record-th-number-link"
            onClick={() => handleDialogEdit()}
          >
            <span className="searchable">{dataTd}</span>
          </button>
        );
      },
    },
    {
      key: "permissions",
      func: (dataTd: any) => {
        return (
          <button
            type="button"
            className="cnx-add-area-record-th-number-link"
            onClick={() => toPermission()}
          >
            <span className="searchable">{dataTd}</span>
          </button>
        );
      },
    },
  ];

  const handleDialogEdit = () => {
    OpenModal?.classList.add("ContainerOpen");
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
  };

  const handleDialogAdd = () => {
    OpenModal?.classList.add("ContainerOpen");
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {},
    });
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: true,
    });
  };

  const csvExportUsersExemple = {
    urlRequest: "http://api/csvimport",
    title: "Template Operacao",
    head: {
      code: "code",
      name: "name",
      description: "description",
      starttime: "starttime",
      endtime: "endtime",
    },
    rows: [
      {
        code: "C001",
        name: "RAYBAN",
        description: "DESCRICAO_RAYBAN",
        starttime: "01/01/2022",
        endtime: "30/03/2022",
      },
      {
        code: "C002",
        name: "OKLAY",
        description: "DESCRICAO_OKLAY",
        starttime: "01/01/2022",
        endtime: "30/03/2022",
      },
      {
        code: "C003",
        name: "CHILLI_BEANS",
        description: "DESCRICAO_CHILLI_BEANS",
        starttime: "01/01/2022",
        endtime: "30/03/2022",
      },
    ],
  };

  return (
    <div className="cnx-modules-main-container-cmmc">
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
        title="Grupo de Produtos"
        data={data}
        head={head}
        // buttons={buttons}
        // exportButton={rowClick}
        // isLoading={loadingDatatable}
        reOrderColumn
        refreshTable={refreshList}
        enableRowClick={rowClick}
        checkable
        // enablePagination={handlePagination}
        // summaryPagination={summaryPagination}
        customTdFunction={customTdFunction}
        // cnxStyles={CNX_STYLES}
        // customTheme={customTheme}
        hoverEffect
        enableSummary
        rowsChecked={handleRowsChecked}
        actionButton={handleDialogAdd}
        // editButton={handleRowsChecked}
        deleteButton={handleRowsChecked}
        // filterButton={filterOptions}
        // filterResponse={handleRowsChecked}
        // csvImportButton={csvExportUsersExemple}
      />
    </div>
  );
}

export default Table;
