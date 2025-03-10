import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../components/CnxDialog";
import { CnxTable } from "../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import AddFriend from "../../../../assets/icons/FluentUI/SVGs/AddFriend";
import { axiosInstance } from '../../../../http/axiosInstance';
import { _DELETE, _GET } from '../../routes';

function Table({ ids }: string | any) {
  const OpenModal = document.getElementById(ids);
  const { dispacth, tableData} = useContext(UseContext);
  const dialogModal = useId();
  const [modal, setModal] = useState({
    title: "Sucesso!",
    type: "success",
    message: "O registro foi adicionado com êxito",
  });

  const rowDataRef: any = useRef([]);
  const CNX_ID_CONFIRM = useId();
  
  const [data, setData]: any = useState([]);
  const [dataFull, setDataFull]: any = useState([]);

  // useEffect(() => {
  //   handleData();
  // }, []);

  const head = {
    id:'id',
    code: "Código",
    description:"Descrição",
    sku:"SKU",
    type:"Tipos",
    unit:"Unidade",
    group:"Grupos",
    status:"Situação"
  };

  // const handleData = () => {
  //   setData([
  //     {
  //       code: "0KP3147",
  //       description:"Gás natural",
  //       sku:"G007813",
  //       type:"Completo",
  //       unit:"PC",
  //       group:"",
  //       status:"Ativo"
  //     },
  //     {
  //       code: "0JP2097",
  //       description:"Biometano",
  //       sku:"G008004",
  //       type:"Completo",
  //       unit:"PC",
  //       group:"",
  //       status:"Ativo"
  //     },
  //   ]);
  // };

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

  const handleRowsChecked = (rows: any) => {
    rowDataRef.current = rows;
  };

  // const customTdFunction = [
  //   {
  //     key: "name",
  //     func: (dataTd: any) => {
  //       return (
  //         <button
  //           type="button"
  //           className="cnx-add-area-record-th-number-link"
  //           onClick={() => handleDialogEdit()}
  //         >
  //           <span className="searchable">{dataTd}</span>
  //         </button>
  //       );
  //     },
  //   },
  //   {
  //     key: "skills",
  //     func: (dataTd: any) => {
  //       return (
  //         <button
  //           type="button"
  //           className="cnx-add-area-record-th-number-link"
  //           onClick={() => toSkills()}
  //         >
  //           <span className="searchable">{dataTd}</span>
  //         </button>
  //       );
  //     },
  //   },
  // ];

  const buttons = [
    {
      renderButton: (rowsChecked: any) => {
        const handleUserSkill = () => {
        };
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
      payload: 'skills',
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

    if (dataPage === 'first') {

    }
    if (dataPage === 'previous') {

    }
    if (dataPage === 'next') {

    }
    if (dataPage === 'last') {

    }
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




    localStorage.setItem('@setProduction', JSON.stringify(rowData))
    //@ts-ignore
    window.setItensProduction() 
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


  async function getList() {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET());
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: data,
      });

      // console.log({data:data.items})

      const dados = data.items.map( (item:any) => {
        return {
          ...item,
          id:item.id,
          code: item.code,
          description: item.description,
          sku: "",
          type: item.type,
          unit:item.unit,
          group:"",
          status: item.strIsActived
        }
      })

      setData(dados);
    } catch (err: any) {
      // console.error('ERRO', err)
      // const modal: any = document.getElementById(CNX_ID_LIST);
      // modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  const summaryPagination = {
    currentPage: 1,
    pageCount: 5,
    itemCount: 5
  };

  const deleteButton = async () => {
    if (rowDataRef.current.length < 1 || !rowDataRef.current) return;
    const modal: any = document.getElementById(CNX_ID_CONFIRM);
    modal?.showModal();
  };

  useEffect(() => {
    //@ts-ignore
    window.cnx = () =>  getList()
      
    
    getList()
  }, []);

  const deleteRecords = async () => {
    const ids = rowDataRef.current.map((item: any) => item?.id)


    try {
      await axiosInstance(_DELETE(ids));
      getList();
    } catch (err: any) {
      // console.error(err)
      // const modal: any = document.getElementById(CNX_ID_DELETE);
      // modal?.showModal();
    } finally {
      const modal: any = document.getElementById(CNX_ID_CONFIRM);
      modal?.close();
    }
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
          title="Cadastro de Produtos"
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
          deleteButton={() => deleteButton()}
          // filterButton={filterOptions}
          filterResponse={handleRowsChecked}
          // csvImportButton={csvExportUsersExemple}
        />

    </div>
  );
}

export default Table;
