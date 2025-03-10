import { useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../../components/CnxDialog";
import { CnxTable } from "../../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../../context/moduleContext";
import { ACTIONS } from "../../../context/moduleActions";
// import AddFriend from "../../../../../assets/icons/FluentUI/SVGs/AddFriend";
import { axiosInstance } from "../../../../../http/axiosInstance";
import {
  _POST,
  _GET,
  _DELETE,
  _GET_ENUMERATOS,
  _GET_BY_FILTERS,
} from "../../../routes";
import { IPagination } from "../../../routes/types";

function Table() {
  const {
    dispacth,
    loadingTableUser,
    tableDataUser,
    enumerators,
    appliedFilters,
  } = useContext(UseContext);
  const dialogModalDelete = useId();
  const rowsCheckedRef: any = useRef(null);

  useEffect(() => {
    getList({ PageSize: 100 });
    getEnumerators();
  }, []);

  async function getEnumerators() {
    try {
      const { data } = await axiosInstance(_GET_ENUMERATOS());
      dispacth({
        type: ACTIONS.SET_ENUMERATORS,
        payload: data,
      });
    } catch (err: any) {
      console.error(err);
    }
  }

  const head = {
    id: "id",
    name: "Nome",
    username: "Usuário",
    code: "Matrícula",
    strAccessLevel: "Nível de Acesso",
    department: "Setor",
    strStatus: "Situação",
  };

  async function getList({ PageSize, PageNumber }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE_USER,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET({ PageSize, PageNumber }));
      dispacth({
        type: ACTIONS.SET_TABLE_DATA_USER,
        payload: data,
      });
    } catch (err: any) {
      console.log("ERRO", err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE_USER,
        payload: false,
      });
    }
  }

  // PR teste

  async function getListFiltered({
    PageSize,
    PageNumber,
    Filters,
  }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE_USER,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(
        _GET_BY_FILTERS({ PageSize, PageNumber, Filters })
      );
      dispacth({
        type: ACTIONS.SET_TABLE_DATA_USER,
        payload: data,
      });
    } catch (err: any) {
      console.log("ERRO", err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE_USER,
        payload: false,
      });
    }
  }

  const filterOptions = {
    route: "",
    filters: [
      {
        title: "Nome",
        query: "Names",
        type: "text",
        keyLabel: "name",
        keyValue: "id",
      },
      {
        title: "Usuário",
        query: "Usernames",
        type: "text",
        keyLabel: "code",
        keyValue: "id",
      },
      {
        title: "Matrícula",
        query: "Codes",
        type: "text",
        keyLabel: "code",
        keyValue: "id",
      },
      {
        title: "Nível de Acesso",
        query: "AccessLevels",
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        options: enumerators?.accessLevel,
      },
      {
        title: "Setor",
        query: "DepartmentIds",
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        options: enumerators?.departments,
      },
      {
        title: "Grupos",
        query: "GroupIds",
        type: "MultSelectCheckbox",
        keyLabel: "code",
        keyValue: "id",
        options: enumerators?.groups,
      },
      {
        title: "Situação",
        query: "Status",
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        options: enumerators?.status,
      },
    ],
  };

  async function refreshList() {
    if (appliedFilters.length > 0) {
      getListFiltered({
        PageSize: 100,
        Filters: handleQueryString(appliedFilters),
      });
    } else {
      getList({ PageSize: 100 });
    }
  }

  async function clearAppliedFilters() {
    dispacth({
      type: ACTIONS.SET_FILTERS,
      payload: [],
    });
    getList({ PageSize: 100 });
  }

  const rowClick = (rowData: any) => {
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: rowData,
    });
  };

  const handleRowsChecked = (data: any) => {
    rowsCheckedRef.current = data;
  };

  const handleQueryString = (data: any) => {
    const initialValue = "";
    const finalQueryString = data?.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + `${currentValue?.query}=${currentValue?.keyValue}&`,
      initialValue
    );

    return `?${finalQueryString.substring(0, finalQueryString.length - 1)}`;
  };

  const filterResponse = (data: any) => {
    dispacth({
      type: ACTIONS.SET_FILTERS,
      payload: data?.filtersSelected,
    });
    
    getListFiltered({
      PageSize: 100,
      Filters: handleQueryString(data?.filtersSelected),
    });
  };

  const openDeleteConfirm = () => {
    const modal: any = document.getElementById(dialogModalDelete);
    modal?.showModal();
  };

  const closeDeleteConfirm = () => {
    const modal: any = document.getElementById(dialogModalDelete);
    modal?.close();
  };

  async function DeleteRecords() {
    const ids = rowsCheckedRef.current.map((item: any) => item?.id);
    try {
      await axiosInstance(_DELETE(ids));
      getList({ PageSize: 100 });
    } catch (err: any) {
      console.log("ERRO", err);
    } finally {
      closeDeleteConfirm();
    }
  }

  const customTdFunction = [
    {
      key: "id",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <button
            type="button"
            className="cnx-add-area-record-th-number-link"
            onClick={() => handleDialogEdit()}
          >
            <span className="searchable">{tdValue}</span>
          </button>
        );
      },
    },
    {
      key: "department",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowData?.department?.name}
          </span>
        );
      },
    },
  ];

  // const buttons = [
  //   {
  //     renderButton: (rowsChecked: any) => {
  //       const handleUserSkill = () => {};
  //       return (
  //         <button
  //           title="Gerenciamento de Habilidades"
  //           className="cnx-small-icon-button-skills-management-csibsm"
  //           type="button"
  //           onClick={() => toSkills()}
  //         >
  //           <AddFriend />
  //         </button>
  //       );
  //     },
  //   },
  // ];

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
    dispacth({
      type: ACTIONS.ADD_MODAL_USER,
      payload: true,
    });
  };

  const toSkills = () => {
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: "skills",
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

  const handlePagination = (dataPage: any) => {
    if (dataPage === "first") {
      if (tableDataUser?.pageNumber === 1) return;
      if (appliedFilters.length > 0) {
        getListFiltered({
          PageSize: 100,
          PageNumber: 1,
          Filters: handleQueryString(appliedFilters),
        });
      } else {
        getList({ PageSize: 100, PageNumber: 1 });
      }
    }
    if (dataPage === "previous") {
      if (tableDataUser?.pageNumber === 1) return;
      if (appliedFilters.length > 0) {
        getListFiltered({
          PageSize: 100,
          PageNumber: tableDataUser?.pageNumber - 1,
          Filters: handleQueryString(appliedFilters),
        });
      } else {
        getList({ PageSize: 100, PageNumber: tableDataUser?.pageNumber - 1 });
      }
    }
    if (dataPage === "next") {
      if (tableDataUser?.pageNumber === tableDataUser?.totalPages) return;
      if (appliedFilters.length > 0) {
        getListFiltered({
          PageSize: 100,
          PageNumber: tableDataUser?.pageNumber + 1,
          Filters: handleQueryString(appliedFilters),
        });
      } else {
        getList({ PageSize: 100, PageNumber: tableDataUser?.pageNumber + 1 });
      }
    }
    if (dataPage === "last") {
      if (tableDataUser?.pageNumber === tableDataUser?.totalPages) return;
      if (appliedFilters.length > 0) {
        getListFiltered({
          PageSize: 100,
          PageNumber: tableDataUser?.totalPages,
          Filters: handleQueryString(appliedFilters),
        });
      } else {
        getList({ PageSize: 100, PageNumber: tableDataUser?.totalPages });
      }
    }
  };

  const summaryPagination = {
    currentPage: tableDataUser?.pageNumber,
    pageCount: tableDataUser?.totalPages,
    itemCount: tableDataUser?.totalItems,
  };

  return (
    <div className="cnx-user-table-container-cutc">
      <CnxDialog
        useId={dialogModalDelete}
        type="warning"
        content={{
          title: "Atenção!",
          message: "Deseja realmente excluir este(s) registro(s)?",
        }}
        cancelButton={() => null}
        confirmButton={() => DeleteRecords()}
      />
      <CnxTable
        title="Adicionar Usuários"
        data={tableDataUser?.items || []}
        head={head}
        exportButton={rowClick}
        isLoading={loadingTableUser}
        reOrderColumn
        refreshTable={refreshList}
        clearAppliedFilters={clearAppliedFilters}
        enableRowClick={rowClick}
        checkable
        enablePagination={handlePagination}
        summaryPagination={summaryPagination}
        customTdFunction={customTdFunction}
        hoverEffect
        enableSummary
        rowsChecked={handleRowsChecked}
        actionButton={handleDialogAdd}
        deleteButton={openDeleteConfirm}
        filterButton={filterOptions}
        filterResponse={filterResponse}
        setFilter={appliedFilters}
        csvImportButton={csvExportUsersExemple}
      />
    </div>
  );
}

export default Table;
