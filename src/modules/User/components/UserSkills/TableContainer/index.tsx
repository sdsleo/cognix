import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../../components/CnxDialog";
import { CnxTable } from "../../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../../context/moduleContext";
import { ACTIONS } from "../../../context/moduleActions";
import History from "../../../../../assets/icons/FluentUI/SVGs/History";

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
    name: 'Nome',
    resource: 'Recurso',
    resourceCode: 'Código Recurso',
    operation: 'Operação',
    operationCode: 'Código Operação',
    level: 'Nível',
    lastUpdate: '	Última Atualização'
  };

  const handleData = () => {
    setData([
      {
        name: 'Super Adimistrador',
        resource: 'Injetora 02',
        resourceCode: 'TST001',
        operation: 'MONTAR CANALETAS',
        operationCode: 'BRAM031',
        level: '0% - A ser treinado',
        lastUpdate: '19/07/2022 10:28:19'
      },
      {
        name: 'Super Adimistrador',
        resource: 'Injetora 23',
        resourceCode: 'INJ 23',
        operation: 'MONTAR ADORNO',
        operationCode: 'BRAM026',
        level: '25% - Em treinamento',
        lastUpdate: '12/07/2022 17:04:16'
      },
      {
        name: 'Super Adimistrador',
        resource: 'Injetora 01',
        resourceCode: 'TST002',
        operation: 'MONTAR HASTES E FRONTAL (ENCAIXE)',
        operationCode: 'BRAM101',
        level: '75% - Apto a operar',
        lastUpdate: '19/07/2022 10:28:19'
      },
      {
        name: 'Super Adimistrador',
        resource: 'Injetora 02',
        resourceCode: 'TST001',
        operation: 'MONTAR CANALETAS',
        operationCode: 'BRAM031',
        level: '0% - A ser treinado',
        lastUpdate: '19/07/2022 10:28:19'
      },
      {
        name: 'Super Adimistrador',
        resource: 'Injetora 23',
        resourceCode: 'INJ 23',
        operation: 'MONTAR ADORNO',
        operationCode: 'BRAM026',
        level: '25% - Em treinamento',
        lastUpdate: '12/07/2022 17:04:16'
      },
      {
        name: 'Super Adimistrador',
        resource: 'Injetora 01',
        resourceCode: 'TST002',
        operation: 'MONTAR HASTES E FRONTAL (ENCAIXE)',
        operationCode: 'BRAM101',
        level: '75% - Apto a operar',
        lastUpdate: '19/07/2022 10:28:19'
      },
    ]);
  };

  const filterOptions = {
    route: "/api/Production/User/GetAll",
    filters: [
      {
        title: "Nome",
        query: "name",
        type: "text",
        keyLabel: "name",
        keyValue: "id",
        // asyncRequest: {
        //   func: async (searchValue: string) => {
        //     const api = {
        //       baseURL: `${envApi}/api/Production/Operation/Filter/Code`,
        //       headers: {
        //         authorization: `Bearer ${userData?.token}`
        //       },
        //       params: {
        //         code: searchValue,
        //         activeStatus: '1'
        //       },
        //       timeout: 30000
        //     };

        //     return axios(api)
        //       .then(response => {
        //         return response.data;
        //       })
        //       .catch(function (error) {
        //         console.log('Show error notification!');
        //         return Promise.reject(error);
        //       });
        //   }
        // }
      },
      {
        title: "Usuário",
        query: "user",
        type: "text",
        keyLabel: "code",
        keyValue: "id",
      },
      {
        title: "Matrícula",
        query: "code",
        type: "text",
        keyLabel: "code",
        keyValue: "id",
      },
      {
        title: "Nível",
        query: "level",
        type: "Select",
        keyLabel: "code",
        keyValue: "id",
      },
      {
        title: "Setor",
        query: "area",
        type: "Select",
        keyLabel: "code",
        keyValue: "id",
      },
      {
        title: "Situação",
        query: "status",
        type: "Select",
        keyLabel: "code",
        keyValue: "id",
      },
    ],
  };

  const refreshList = () => {
  };

  const rowClick = (rowData: any) => {
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: rowData,
    });
  };

  const toHistoric = () => {
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: 'historic',
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
      key: "name",
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
    }
  ];

  const buttons = [
    {
      renderButton: (rowsChecked: any) => {
        const handleUserSkill = () => {
        };
        return (
          <button
            title="Histórico Matriz de Habilidades"
            className="cnx-small-icon-button-skills-historic-csibsh"
            type="button"
            onClick={() => toHistoric()}
          >
            <History />
          </button>
        );
      }
    },
  ];

  const handleDialogEdit = () => {
    OpenModal?.classList.add("ContainerOpen");
    dispacth({
      type: ACTIONS.ADD_MODAL_USER_SKILLS,
      payload: false,
    });
    dispacth({
      type: ACTIONS.EDIT_MODAL_USER_SKILLS,
      payload: true,
    });
  };

  const handleDialogAdd = () => {
    OpenModal?.classList.add("ContainerOpen");
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {},
    });
    dispacth({
      type: ACTIONS.ADD_MODAL_USER_SKILLS,
      payload: true,
    });
    dispacth({
      type: ACTIONS.EDIT_MODAL_USER_SKILLS,
      payload: false,
    });
  };

  const csvExportUsersExemple = {
    urlRequest: "http://api/csvimport",
    title: "Template Habilidade",
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

  const handlePagination = (dataPage: any) => {

    if (dataPage === 'first') {

    }
    if (dataPage === 'previous') {

    }
    if (dataPage === 'next') {

    }
    if (dataPage === 'last') {

    }
  };

  const summaryPagination = {
    currentPage: 1,
    pageCount: 5,
    itemCount: 5
  };


  return (
    <div className="cnx-user-skills-table-container-custc">
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
          title="Habilidades do Usuário: Super Administrador IT"
          data={data}
          head={head}
          buttons={buttons}
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
          filterButton={filterOptions}
          filterResponse={handleRowsChecked}
          csvImportButton={csvExportUsersExemple}
        />

    </div>
  );
}

export default Table;
