import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../components/CnxDialog";
import { CnxTable } from "../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { axiosInstance } from "../../../../http/axiosInstance";
import { _DELETE, _GET, _GET_BY_FILTERS } from "../../routes";
import { IPagination } from "../../routes/types";
import { SortLinesAscendingIcon, SortLinesIcon } from "@fluentui/react-icons-mdl2";

function Table() {
  const { dispacth, loadingTable, tableData, appliedFilters }: any = useContext(UseContext);
  const CNX_ID_LIST = useId();
  const CNX_ID_DELETE = useId();
  const CNX_ID_CONFIRM = useId();
  const rowDataRef: any = useRef([]);

  const [sort, setSort] = useState('')

  async function getList({ PageSize, PageNumber, Filters }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET({ PageSize, PageNumber, Filters }));
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: data,
      });
    } catch (err: any) {
      const modal: any = document.getElementById(CNX_ID_LIST);
      modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  useEffect(() => {
    getList({ PageSize: 100, Filters: "" });
  }, []);

  const head = {
    id: 'id',
    plate: 'Placa',
    model: 'Modelo',
    strIsActived: 'Situação'
  };

  const filterOptions = {
    route: "",
    filters: [
      {
        title: "Situação",
        query: "RowStatus",
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        typeSelection: "singleSelect",
        options: [
          {
            id: 0,
            name: "Excluido"
          },
          {
            id: 1,
            name: "Ativo"
          },
          {
            id: 2,
            name: "Inativo"
          }
        ],
      },
    ],
  };

  async function clearAppliedFilters() {
    dispacth({
      type: ACTIONS.SET_FILTERS,
      payload: [],
    });
    getList({ PageSize: 100, Filters: "" });
  }

  async function getListFiltered({
    PageSize,
    PageNumber,
    Filters,
  }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(
        _GET_BY_FILTERS({ PageSize, PageNumber, Filters })
      );
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: data,
      });
    } catch (err: any) {
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

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

  const refreshList = () => {
    getList({ PageSize: 100, Filters: "" });
  };

  async function deleteRecords() {
    const ids = rowDataRef.current.map((item: any) => item?.id)
    try {
      await axiosInstance(_DELETE(ids));
      getList({ PageSize: 100, Filters: "" });
    } catch (err: any) {
      const modal: any = document.getElementById(CNX_ID_DELETE);
      modal?.showModal();
    } finally {
      const modal: any = document.getElementById(CNX_ID_CONFIRM);
      modal?.close();
    }
  };

  const deleteButton = async () => {
    if (rowDataRef.current.length < 1 || !rowDataRef.current) return
    const modal: any = document.getElementById(CNX_ID_CONFIRM);
    modal?.showModal();
  };

  const customTdFunction = [
    {
      key: "id",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <button
            type="button"
            className="cnx-add-area-record-th-number-link"
            onClick={() => openEditModal(rowData)}
          >
            <span className="searchable">{tdValue}</span>
          </button>
        );
      },
    }
  ];

  const customThFunction = [
    {
      key: "id",
      func: () => {
        return (
          <div
            style={{ width: '50px'}} className="searchable"
            onClick={() => {
              setSort(s => s === 'order_desc' ? 'order_asc' : s === 'order_asc' ? '' : 'order_desc')  
            }}>

            {sort === 'order_desc' ? (
              <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
            ) :  sort === 'order_asc' ? (
              <SortLinesIcon style={{ marginRight: '5px' }} />
            ) : <></>}
            Id
          </div>
        );
      },
    },
    {
      key: "plate",
      func: () => {
        return (
          <div
            style={{ width: '200px'}} className="searchable"
            onClick={() => {
              setSort(s => s === 'plate_desc' ? 'plate_asc' : s === 'plate_asc' ? '' : 'plate_desc')  
            }}>

            {sort === 'plate_desc' ? (
              <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
            ) :  sort === 'plate_asc' ? (
              <SortLinesIcon style={{ marginRight: '5px' }} />
            ) : <></>}
            Placa
          </div>
        );
      },
    },
    {
      key: "model",
      func: () => {
        return (
          <div
            style={{ width: '200px'}} className="searchable"
            onClick={() => {
              setSort(s => s === 'model_desc' ? 'model_asc' : s === 'model_asc' ? '' : 'model_desc')  
            }}>

            {sort === 'model_desc' ? (
              <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
            ) :  sort === 'model_asc' ? (
              <SortLinesIcon style={{ marginRight: '5px' }} />
            ) : <></>}
            Modelo
          </div>
        );
      },
    },
    {
      key: "strIsActived",
      func: () => {
        return (
          <div
            style={{ width: '100px'}} className="searchable"
            onClick={() => {
              setSort(s => s === 'strIsActived_desc' ? 'strIsActived_asc' : s === 'strIsActived_asc' ? '' : 'strIsActived_desc')  
            }}>

            {sort === 'strIsActived_desc' ? (
              <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
            ) :  sort === 'strIsActived_asc' ? (
              <SortLinesIcon style={{ marginRight: '5px' }} />
            ) : <></>}
            Situação
          </div>
        );
      },
    }
  ];

  const actionButton = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: true,
    });
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

  const handleRowsChecked = (data: any) => {
    rowDataRef.current = data;
  };

  const handlePagination = (dataPage: any) => {
    if (dataPage === "first") {
      if (tableData?.pageNumber === 1) return;
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
      if (tableData?.pageNumber === 1) return;
      if (appliedFilters.length > 0) {
        getListFiltered({
          PageSize: 100,
          PageNumber: tableData?.result?.pageNumber - 1,
          Filters: handleQueryString(appliedFilters),
        });
      } else {
        getList({
          PageSize: 100,
          PageNumber: tableData?.result?.pageNumber - 1,
        });
      }
    }
    if (dataPage === "next") {
      if (tableData?.pageNumber === tableData?.totalPages) return;
      if (appliedFilters.length > 0) {
        getListFiltered({
          PageSize: 100,
          PageNumber: tableData?.result?.pageNumber + 1,
          Filters: handleQueryString(appliedFilters),
        });
      } else {
        getList({
          PageSize: 100,
          PageNumber: tableData?.result?.pageNumber + 1,
        });
      }
    }
    if (dataPage === "last") {
      if (tableData?.pageNumber === tableData?.totalPages) return;
      if (appliedFilters.length > 0) {
        getListFiltered({
          PageSize: 100,
          PageNumber: tableData?.result?.totalPages,
          Filters: handleQueryString(appliedFilters),
        });
      } else {
        getList({ PageSize: 100, PageNumber: tableData?.result?.totalPages });
      }
    }
  };

  const summaryPagination = {
    currentPage: tableData?.pageNumber,
    pageCount: tableData?.totalPages,
    itemCount: tableData?.totalItems,
  };


  return (
    <div className="cnx-modules-main-container-cmmc">
      <CnxDialog
        useId={CNX_ID_LIST}
        type="error"
        content={{ title: "Error", message: "Não foi possível listar a tabela" }}
      />
      <CnxDialog
        useId={CNX_ID_DELETE}
        type="error"
        content={{ title: "Error", message: "Não foi possível deletar o registro(s)." }}
      />
      <CnxDialog
        useId={CNX_ID_CONFIRM}
        type="warning"
        content={{ title: "Atenção!", message: "Deseja realmente deletar o(s) registro(s)." }}
        confirmButton={() => deleteRecords()}
        cancelButton={() => null}
      />
      <CnxTable
        title="Cavalos"
        sort={sort}
        data={tableData?.items || []}
        head={head}
        isLoading={loadingTable}
        reOrderColumn
        refreshTable={refreshList}
        checkable
        customTdFunction={customTdFunction}
        customThFunction={customThFunction}
        hoverEffect
        enableSummary
        rowsChecked={handleRowsChecked}
        actionButton={actionButton}
        deleteButton={() => deleteButton()}
        enablePagination={handlePagination}
        summaryPagination={summaryPagination}
        filterButton={filterOptions}
        filterResponse={filterResponse}
        setFilter={appliedFilters}
        clearAppliedFilters={clearAppliedFilters}
      />
    </div>
  );
}

export default Table;
