import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../../components/CnxDialog";
import { CnxTable } from "../../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../../context/moduleContext";
import { ACTIONS } from "../../../context/moduleActions";
import AddFriend from "../../../../../assets/icons/FluentUI/SVGs/AddFriend";

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
    id: "id",
    code: "Código",
    name: "Nome",
    description: "Descrição",
    revision: "Revisão",
    lastUpdate: "Ultima atualização",
    status: "Situação",
  };

  const handleData = () => {
    setData([
      {
        id: 1,
        code: "C001",
        name: "Roeiro Abastecimento",
        description: "Descrição roteiro abastecimento",
        revision: 1,
        lastUpdate: "10/05/2023 - 17:20",
        status: 1,
      },
      {
        id: 2,
        code: "C002",
        name: "Roeiro Compresão",
        description: "Descrição roteiro compresão",
        revision: 3,
        lastUpdate: "11/05/2023 - 14:30",
        status: 2,
      },
      {
        id: 3,
        code: "C003",
        name: "Roeiro Logística",
        description: "Descrição roteiro logística",
        revision: 2,
        lastUpdate: "12/05/2023 - 11:10",
        status: 3,
      },
    ]);
  };

  // const filterOptions = {
  //   route: "/api/Production/User/GetAll",
  //   filters: [
  //     {
  //       title: "Nome",
  //       query: "name",
  //       type: "text",
  //       keyLabel: "name",
  //       keyValue: "id",
  //       // asyncRequest: {
  //       //   func: async (searchValue: string) => {
  //       //     const api = {
  //       //       baseURL: `${envApi}/api/Production/Operation/Filter/Code`,
  //       //       headers: {
  //       //         authorization: `Bearer ${userData?.token}`
  //       //       },
  //       //       params: {
  //       //         code: searchValue,
  //       //         activeStatus: '1'
  //       //       },
  //       //       timeout: 30000
  //       //     };

  //       //     return axios(api)
  //       //       .then(response => {
  //       //         return response.data;
  //       //       })
  //       //       .catch(function (error) {
  //       //         console.log('Show error notification!');
  //       //         return Promise.reject(error);
  //       //       });
  //       //   }
  //       // }
  //     },
  //     {
  //       title: "Usuário",
  //       query: "user",
  //       type: "text",
  //       keyLabel: "code",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Matrícula",
  //       query: "code",
  //       type: "text",
  //       keyLabel: "code",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Nível",
  //       query: "level",
  //       type: "Select",
  //       keyLabel: "code",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Setor",
  //       query: "area",
  //       type: "Select",
  //       keyLabel: "code",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Situação",
  //       query: "status",
  //       type: "Select",
  //       keyLabel: "code",
  //       keyValue: "id",
  //     },
  //   ],
  // };

  const refreshList = () => {};

  const rowClick = (rowData: any) => {
    toSkills()
    // dispacth({
    //   type: ACTIONS.SET_ROW_DATA,
    //   payload: rowData,
    // });
  };

  const handleRowsChecked = (data: any) => {
    // dispacth({
    //   type: ACTIONS.ROW_DATA_SET,
    //   payload: data,
    // });
  };

  const customTdFunction = [
    {
      key: "id",
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
      key: "status",
      func: (dataTd: any) => {
        function handleStatusType(type: number) {
          switch (type) {
            case 1:
              return "Criado";
            case 2:
              return "Revisado";
            case 3:
              return "Liberado";
            default:
              return "Inativo";
          }
        }
        return <span className="searchable">{handleStatusType(dataTd)}</span>;
      },
    },
  ];

  const buttons = [
    {
      renderButton: (rowsChecked: any) => {
        const handleUserSkill = () => {};
        return (
          <button
            title="Gerenciamento de Habilidades"
            className="cnx-small-icon-button-skills-management-csibsm"
            type="button"
            onClick={() => toSkills()}
          >
            <AddFriend />
          </button>
        );
      },
    },
  ];

  const handleDialogEdit = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL_USER,
      payload: true,
    });
    dispacth({
      type: ACTIONS.ADD_MODAL_USER,
      payload: false,
    });
  };

  const handleDialogAdd = () => {
    toSkills()
    // dispacth({
    //   type: ACTIONS.ADD_MODAL_USER,
    //   payload: true,
    // });
  };

  const toSkills = () => {
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: "flowConfig",
    });
  };

  // const csvExportUsersExemple = {
  //   urlRequest: "http://api/csvimport",
  //   title: "Template Operacao",
  //   head: {
  //     code: "code",
  //     name: "name",
  //     description: "description",
  //     starttime: "starttime",
  //     endtime: "endtime",
  //   },
  //   rows: [
  //     {
  //       code: "C001",
  //       name: "RAYBAN",
  //       description: "DESCRICAO_RAYBAN",
  //       starttime: "01/01/2022",
  //       endtime: "30/03/2022",
  //     },
  //     {
  //       code: "C002",
  //       name: "OKLAY",
  //       description: "DESCRICAO_OKLAY",
  //       starttime: "01/01/2022",
  //       endtime: "30/03/2022",
  //     },
  //     {
  //       code: "C003",
  //       name: "CHILLI_BEANS",
  //       description: "DESCRICAO_CHILLI_BEANS",
  //       starttime: "01/01/2022",
  //       endtime: "30/03/2022",
  //     },
  //   ],
  // };

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
        title="Roteiros"
        data={data}
        head={head}
        // buttons={buttons}
        exportButton={rowClick}
        // isLoading={loadingDatatable}
        reOrderColumn
        refreshTable={refreshList}
        enableRowClick={rowClick}
        checkable
        enablePagination={handlePagination}
        summaryPagination={summaryPagination}
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
