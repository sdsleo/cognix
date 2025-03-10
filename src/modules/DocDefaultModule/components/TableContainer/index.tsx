import { useEffect, useContext, useId, useRef } from "react";
import { CnxTable } from "../../../../components/CnxTable";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import CnxDialog from "../../../../components/CnxDialog";
import "./styles.css";

function Table() {
  
  const CNX_ID_LIST = useId(); // Id elemento modal erro de listagem
  const CNX_ID_DELETE = useId(); // Id elemento modal erro de exclusão
  const CNX_ID_CONFIRM = useId(); // Id elemento modal de confirmação
  
  const { localesData } = useContext<ILocales>(localesContex); // Contexto global de MultLaguange
  
  const { dispacth, loadingTable, tableData }: any = useContext(UseContext); // Contexto do modulo

  const rowDataRef: any = useRef([]);

  // Hook de obtenção da listagem da tabela
  useEffect(() => {
    // getTableData();
  }, []);

  // Exemplo:
  // Usado como parâmetro no componente CnxTable -> head={head}
  // Objeto usado para a criação das colunas na tabela
  const head = {
    column1: "Column 1",
    column2: "Column 2",
    column3: "Column 3",
    column4: "Column 4",
    column5: "Column 5",
  };

  // Exemplo:
  // Este Array também pode vir de qualquer estado local ou global.
  // Usado como parâmetro no componente CnxTable -> data={data || []}
  // Array de objetos que referencia as keys do objeto data.
  // Para renderizar a informação de cada key do objeto 'data', é necessário que seja referenciado com uma key do objeto 'head'
  // Caso não queira renderizar alguma key do objeto 'data', basta não remover ou não adicionar a key em questão no objeto 'head'
  const data = [
    {
      column1: "td1 row1",
      column2: "td2 row1",
      column3: "td3 row1",
      column4: "td4 row1",
      column5: 1,
    },
    {
      column1: "td1 row2",
      column2: "td2 row2",
      column3: "td3 row2",
      column4: "td4 row2",
      column5: 2,
    },
    {
      column1: "td1 row3",
      column2: "td2 row3",
      column3: "td3 row3",
      column4: "td4 row3",
      column5: 1,
    },
    {
      column1: "td1 row4",
      column2: "td2 row4",
      column3: "td3 row4",
      column4: "td4 row4",
      column5: 2,
    },
    {
      column1: "td1 row5",
      column2: "td2 row5",
      column3: "td3 row5",
      column4: "td4 row5",
      column5: 1,
    },
  ];

  // Exemplo:
  // Objeto usado como parâmetro no componente CnxTable -> filterButton={filterOptions}
  // Ao ativar este parâmetro será habilitado um botão 'Filtro' na tabela para o uso do filtro avançado
  // const filterOptions = {
  //   route: "/api/Production/User/GetAll",
  //   filters: [
  //     {
  //       title: "Column 1",
  //       query: "column1",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Column 2",
  //       query: "column2",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Column 3",
  //       query: "column3",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Column 4",
  //       query: "column4",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Column 5",
  //       query: "column5",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //   ],
  // };

  // Função atualiza a lista da tabela
  const refreshList = () => {
    // getTableData();
  };

  // Função que exclui os registros selecionados
  const deleteRecords = async () => {
    // deleteRecords()
  };

  // Função que abre o modal de confirmação de exclusão
  const deleteButton = async () => {
    if (rowDataRef.current.length < 1 || !rowDataRef.current) return;
    const modal: any = document.getElementById(CNX_ID_CONFIRM);
    modal?.showModal();
  };

  // Função que abre o modal de adição
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

  // Função que abre o modal de edição
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

  // Função que passa as linhas checadas da tabela para uma Ref
  const handleRowsChecked = (rows: any) => {
    rowDataRef.current = rows;
  };

  // Objeto usado como parâmetro no componente CnxTable -> customTdFunction={customTdFunction}.
  // Objeto usado para a customização de estilo e renderização de cada td column.
  // O parâmetro 'func' pode retornar qualquer HTMLElement ou REACT Component que será inserido dentro da td Column.
  // Configuração dos parâmetros:
  // key: "column1" : nome da key a ser referenciada do objeto 'head'.
  // func: (tdValue: any = 'Valor', keyValue: string = 'Chave do valor', rowData: any = 'Objeto completo da linha em questão'):
  const customTdFunction = [
    {
      key: "column1",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          // Exemplo: Adiciona estilo de link, e dispara a ação para abrir o modal lateral de Add
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
      key: "column5",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        // Exemplo: Adiciona um enum para cada tipo de valor
        const status = tdValue === 1 ? "Ativo" : "Inativo";
        return <span className="searchable">{status}</span>;
      },
    },
  ];

  // Exemplo objeto de importação CSV
  // const csvExportDefaultModuleExemple = {
  //   urlRequest: "http://api/csvimport",
  //   title: "Template DefaultModule",
  //   head: {
  //     column1: "Column1",
  //     column2: "Column2",
  //     column3: "Column3",
  //     column4: "Column4",
  //     column5: "Column5",
  //   },
  //   rows: [
  //     {
  //       column1: "Column1",
  //       column2: "Column2",
  //       column3: "Column3",
  //       column4: "Column4",
  //       column5: "Column5",
  //     },
  //     {
  //       column1: "Column1",
  //       column2: "Column2",
  //       column3: "Column3",
  //       column4: "Column4",
  //       column5: "Column5",
  //     },
  //     {
  //       column1: "Column1",
  //       column2: "Column2",
  //       column3: "Column3",
  //       column4: "Column4",
  //       column5: "Column5",
  //     },
  //   ],
  // };

  return (
    <>
      {/* Modal de dialogo de erro ao listar a tabela */}
      <CnxDialog
        useId={CNX_ID_LIST}
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível listar a tabela",
        }}
      />
      {/* Modal de dialogo de erro ao excluir registros */}
      <CnxDialog
        useId={CNX_ID_DELETE}
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível deletar o registro(s).",
        }}
      />
      {/* Modal de dialogo de confirmação de exclusão de registro */}
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
        title="DefaultModule" // Titulo exibido na tabela
        data={data || []} // data || tableData -> Array de criação das tr td
        head={head} // Objeto de criação das colunas th
        isLoading={loadingTable} // Habilita vizualização de carremento da tabela
        reOrderColumn // Adiciona o botão e habilita a re-ordenação na tabela
        refreshTable={refreshList} // Adiciona o botão de atualizar lista e dispara uma função
        checkable // Habilita o input de checkbox em cada linha da tabela
        customTdFunction={customTdFunction} // Habilita a customização de estilo ou renderização em uma ou mais td`s
        hoverEffect // Habilita o efeito de hover ao passar o mouse em cima de uma linha da tabela
        enableSummary // Habilita a visualização do sumário da tabela
        rowsChecked={handleRowsChecked} // dispara uma função com a lista das linhas checadas
        actionButton={actionButton} // Adiciona o botão de Adicionar e dispara uma função ao clicar
        deleteButton={() => deleteButton()} // Adiciona o botão de Deletar e dispara uma função ao clicar
        // filterButton={filterOptions} // Parâmetro para ativar os filtros por coluna
        // filterResponse={() => null} // Promise retornada apos aplica'~ao do filtro
        // csvImportButton={csvExportDefaultModuleExemple} // Adiciona o botão e a funcionalidade de importação CSV
      />
    </>
  );
}

export default Table;
