import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../components/CnxDialog";
import { CnxTable } from "../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import AddFriend from "../../../../assets/icons/FluentUI/SVGs/AddFriend";

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
    item: 'Item',
    operationCode: 'Código Operação',
    dateHour: 'Data/Hora',
    user: 'Usuário',
    action: 'Ação'
  };

  const handleData = () => {
    setData([
      {
        item: '24775',
        operationCode: 'BRAM107',
        dateHour: '12/07/2022 17:00:17',
        user: 'Super Administrador IT',
        action: 'O nível da habilidade foi alterado para 25% - Em treinamento'
      },
      {
        item: '24774',
        operationCode: 'BRAM033',
        dateHour: '12/07/2022 16:35:49',
        user: 'Super Administrador IT',
        action: 'O nível da habilidade foi alterado para 75% - Apto a operar'
      },
      {
        item: '24785',
        operationCode: 'BRAM031',
        dateHour: '12/07/2022 18:08:48',
        user: 'Super Administrador IT',
        action: 'O nível da habilidade foi alterado para 100% - Multiplicador'
      },
      {
        item: '24775',
        operationCode: 'BRAM107',
        dateHour: '12/07/2022 17:00:17',
        user: 'Super Administrador IT',
        action: 'O nível da habilidade foi alterado para 25% - Em treinamento'
      },
      {
        item: '24774',
        operationCode: 'BRAM033',
        dateHour: '12/07/2022 16:35:49',
        user: 'Super Administrador IT',
        action: 'O nível da habilidade foi alterado para 75% - Apto a operar'
      },
      {
        item: '24785',
        operationCode: 'BRAM031',
        dateHour: '12/07/2022 18:08:48',
        user: 'Super Administrador IT',
        action: 'O nível da habilidade foi alterado para 100% - Multiplicador'
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
    },
    {
      key: "skills",
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
  ];

  const handleDialogEdit = () => {
    OpenModal?.classList.add("ContainerOpen");
    // dispacth({
    //   type: ACTIONS.MODAL_USER_EDIT,
    //   payload: false,
    // });
  };

  const handleDialogAdd = () => {
    OpenModal?.classList.add("ContainerOpen");
    // dispacth({
    //   type: ACTIONS.ROW_DATA_SET,
    //   payload: {},
    // });
    // dispacth({
    //   type: ACTIONS.MODAL_USER_ADD,
    //   payload: true,
    // });
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
    <div className="cnx-user-skills-historic-table-container-cushtc">
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
          title="Histórico Matriz de Habilidades"
          data={data}
          head={head}
          // buttons={buttons}
          exportButton={rowClick}
          // isLoading={loadingDatatable}
          // reOrderColumn
          // refreshTable={refreshList}
          // enableRowClick={rowClick}
          // checkable
          // enablePagination={handlePagination}
          // summaryPagination={summaryPagination}
          customTdFunction={customTdFunction}
          // cnxStyles={CNX_STYLES}
          // customTheme={customTheme}
          hoverEffect
          enableSummary
          // rowsChecked={handleRowsChecked}
          // actionButton={handleDialogAdd}
          // editButton={handleRowsChecked}
          // deleteButton={handleRowsChecked}
          // filterButton={filterOptions}
          // filterResponse={handleRowsChecked}
          // csvImportButton={csvExportUsersExemple}
        />

    </div>
  );
}

export default Table;
