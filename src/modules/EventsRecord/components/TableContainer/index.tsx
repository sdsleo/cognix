import { useEffect, useContext, useId, useRef, useState } from "react";
import { CnxTable } from "../../../../components/CnxTable";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import CnxDialog from "../../../../components/CnxDialog";
import "./styles.css";
import { axiosInstance } from '../../../../http/axiosInstance';
import { _DELETE, _GET, _GET_BY_FILTERS, _GET_ENUMS, _GET_USERS } from '../../routes';
import { IPagination } from '../../routes/types';

function Table() {
  const CNX_ID_LIST = useId();
  const CNX_ID_DELETE = useId();
  const CNX_ID_CONFIRM = useId();

  const [status,setStatus] = useState<{id: number, name: string}[]>([])
  const [productionLossTypes,setProductionLossTypes] = useState<{id: number, code: string}[]>([])
  const [productionLoss,setProductionLoss] = useState<{id: number, code: string}[]>([])
  const [usersList,setUsersList] = useState<{id: number, name: string}[]>([])
  
  const { localesData } = useContext<ILocales>(localesContex);
  
  const { dispacth, loadingTable, tableData, appliedFilters }: any = useContext(UseContext);

  const rowDataRef: any = useRef([]);


  async function getEnuns(){
    

    try{
      const { data } = await axiosInstance(
        _GET_ENUMS()
      );

      

      setStatus(data.status)
      setProductionLossTypes(data.productionLossTypes)
      setProductionLoss(data.productionLoss)
    }catch{}
  }

  async function gerUsers(){
    try{
      const { data } = await axiosInstance(
        _GET_USERS()
      );

      

      const users = data.map((item:any) => {
        return {
          id: item.id,
          name:item.name
        }
      })

      setUsersList(users)

      getList({ PageSize: 100 })
    }catch{
      getList({ PageSize: 100 })
    }
  }

  useEffect(() => {
    // getTableData();
    getEnuns()
    gerUsers()
  }, []);

  const head = {
    id: "id",
    productionLossId: "Tipo Evento",
    description: "Descrição",
    coments:"Comentários",
    startedDateTime: "Data Hora Início",
    finishedDateTime: "Data Hora Fim",
    order: "Ordem",
    operation:'Operação',
    userId:'Usuário',
    strStatus: "Situação", 
  };

 
  const filterOptions = {
    route: "",
    filters: [
      {
        title: "Período",
        query: "Date",
        type: "DateRangerPicker",
        keyLabel: "label",
        keyValue: "id",
      },
      {
        title: "Usuarios",
        query: "UserIds",
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        options: usersList,
        autoComplete: true
      },
      {
        title: "Tipo evento",
        query: "ProductionLossTypeIds",
        type: "Select",
        keyLabel: "code",
        keyValue: "id",
        options: productionLossTypes,
        autoComplete: true
      },
      {
        title: "Motivo Evento",
        query: "ProductionLossIds",
        type: "Select",
        keyLabel: "code",
        keyValue: "id",
        options: productionLoss,
        autoComplete: true
      },
      {
        title: "Ordem Nº",
        query: "OrderNumbers",
        type: "text",
        keyLabel: "name",
        keyValue: "id",        
      },
      // {
      //   title: "Operação",
      //   query: "OperationDescriptions",
      //   type: "text",
      //   keyLabel: "name",
      //   keyValue: "id",
        
      // },
      {
        title: "Situação",
        query: "Status",
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        options: status,
        autoComplete: true
      }
      
    ],
  };

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
      console.log("ERRO", err);
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
    getList({ PageSize: 100 })
  };

  const deleteRecords = async () => {
    const ids = rowDataRef.current.map((item: any) => item?.id)

   
    try {
      await axiosInstance(_DELETE(ids));
      getList({ PageSize: 100 });
    } catch (err: any) {
      console.error(err)
      const modal: any = document.getElementById(CNX_ID_DELETE);
      modal?.showModal();
    } finally {
      const modal: any = document.getElementById(CNX_ID_CONFIRM);
      modal?.close();
    }
  };

  const deleteButton = async () => {
    if (rowDataRef.current.length < 1 || !rowDataRef.current) return;
    const modal: any = document.getElementById(CNX_ID_CONFIRM);
    modal?.showModal();
  };

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
    // dispacth({
    //   type: ACTIONS.ADD_MODAL,
    //   payload: false,
    // });
    // dispacth({
    //   type: ACTIONS.EDIT_MODAL,
    //   payload: true,
    // });
    // dispacth({
    //   type: ACTIONS.SET_ROW_DATA,
    //   payload: rowData,
    // });
  }; 

  const handleRowsChecked = (rows: any) => {
    rowDataRef.current = rows;
  };

  const customTdFunction = [
    {
      key: "id",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <button
            type="button"
            className="cnx-text-decoration-link"
            onClick={() => openEditModal(rowData)}
          >
            <span className="searchable">{tdValue}</span>
          </button>
        );
      },
    },
    
    {
      key: "coments",
      func: (tdValue: any, keyValue: string, rowData: any) => {
       
        return <span className="searchable">{tdValue}</span>;
      },
    },
    {
      key: "userId",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        const user = usersList.find(user => user.id === rowData.userId)

        
        return <span className="searchable">{user ? user.name : tdValue}</span>;
      },
    },
    {
      key: "order",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        const order = rowData.orderProductionOperation?.orderProduction?.order?.orderNumber
        return <span className="searchable">{order}</span>;
      },
    },
    {
      key: "operation",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        const order = rowData?.orderProductionOperation?.operation?.code
        return <span className="searchable">{order}</span>;
      },
    },
    {
      key: "startedDateTime",
      func: (tdValue: any, keyValue: string, rowData: any) => {
       const date = tdValue ? new Date(tdValue).toLocaleDateString() : '--/--/--'
       const time = tdValue ? new Date(tdValue).toLocaleTimeString() : '--:--'

        return <span className="searchable">{date} {time}</span>;
      },
    },

    {
      key: "finishedDateTime",
      func: (tdValue: any, keyValue: string, rowData: any) => {
       const date = tdValue ? new Date(tdValue).toLocaleDateString() : '--/--/--'
       const time = tdValue ? new Date(tdValue).toLocaleTimeString() : '--:--'

        return <span className="searchable">{date} {time}</span>;
      },
    },
    {
      key: "productionLossId",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        const producionLossType = rowData?.productionLoss ? rowData?.productionLoss?.productionLossType?.code : ''

        return <span className="searchable">{producionLossType}</span>;
      },
    },
    {
      key: "description",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        const value = rowData?.productionLoss?.description
        return <span className="searchable">{value}</span>;
      },
    },
    {
      key: "status",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        const status = tdValue === 1 ? "Ativo" : "Inativo";
        return <span className="searchable">{status}</span>;
      },
    },
  ];



  async function getList({ PageSize, PageNumber }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET({ PageSize, PageNumber }));
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: data,
      });

      
    } catch (err: any) {
      console.error('ERRO', err)
      const modal: any = document.getElementById(CNX_ID_LIST);
      modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  async function clearAppliedFilters() {
    dispacth({
      type: ACTIONS.SET_FILTERS,
      payload: [],
    });
    getList({ PageSize: 100, Filters: "?RowStatus=1" });
  }


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



  // useEffect(() => {
    
  // }, []);

  return (
    <>
      <CnxDialog
        useId={CNX_ID_LIST}
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível listar a tabela",
        }}
      />
      <CnxDialog
        useId={CNX_ID_DELETE}
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível deletar o registro(s).",
        }}
      />
      <CnxDialog
        useId={CNX_ID_CONFIRM}
        type="warning"
        content={{
          title: "Atenção!",
          message: "Deseja realmente deletar o(s) registro(s).",
        }}
        confirmButton={() => deleteRecords()}
        cancelButton={() => null}
      />
      <CnxTable
        title="Registro de Eventos"
        data={tableData?.items || []}
        // data={[]}
        head={head}
        isLoading={loadingTable}
        reOrderColumn
        refreshTable={refreshList}
        checkable 
        customTdFunction={customTdFunction} 
        hoverEffect 
        enableSummary
        enablePagination={handlePagination}
        rowsChecked={handleRowsChecked} 
        // actionButton={actionButton} 
        deleteButton={() => deleteButton()} 
        // filterButton={filterOptions}
        // filterResponse={() => null}
        exportButton={() => null}
        // csvImportButton={csvExportDefaultModuleExemple} // Adiciona o botão e a funcionalidade de importação CSV
        filterButton={filterOptions}
        filterResponse={filterResponse}
        setFilter={appliedFilters}
        clearAppliedFilters={clearAppliedFilters}
        summaryPagination={summaryPagination}
      />
    </>
  );
}

export default Table;
