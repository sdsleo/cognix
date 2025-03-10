import { useState, useRef, useEffect, useContext, useId } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import CnxDialog from "../../../../components/CnxDialog";

function FormModalContainer() {
  const CNX_ID_ADD = useId(); // Id elemento modal adição
  const CNX_ID_EDIT = useId(); // Id elemento modal edição

  const { localesData } = useContext<ILocales>(localesContex); // Contexto global de MultLaguange

  const { dispacth, addModal, editModal, rowData, saving } =
    useContext(UseContext); // Contexto do modulo

  // Ref`s modal adicão
  const addColumn1Ref = useRef<HTMLInputElement>(null!);
  const addColumn2Ref = useRef<HTMLInputElement>(null!);
  const addColumn3Ref = useRef<HTMLInputElement>(null!);
  const addColumn4Ref = useRef<HTMLInputElement>(null!);
  const addColumn5Ref: any = useRef({});

  // Ref`s modal edicão
  const editColumn1Ref = useRef<HTMLInputElement>(null!);
  const editColumn2Ref = useRef<HTMLInputElement>(null!);
  const editColumn3Ref = useRef<HTMLInputElement>(null!);
  const editColumn4Ref = useRef<HTMLInputElement>(null!);
  const editColumn5Ref: any = useRef({});

  // Hook para repassar os valores da linha selecionada para os refs via contexto do modulo
  useEffect(() => {
    editColumn1Ref.current.value = rowData?.column1;
    editColumn2Ref.current.value = rowData?.column2;
    editColumn3Ref.current.value = rowData?.column3;
    editColumn4Ref.current.value = rowData?.column4;
  }, [rowData]);

  // Função para adicionar um registro
  const add = async () => {
    // if (addformCheck()) return;
    // addRecord()
  };

  // Função para editar um registro
  const edit = async () => {
    // if (editformCheck()) return;
    // editRecord()
  };

  // Função que fecha o modal de adição
  const closeAddModal = () => {
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
  };

  // Função que fecha o modal de edição
  const closeEditModal = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
  };

  // Estado para controlar a limpeza dos imputs do tipo Select
  const [clearSelect, setClearSelect] = useState(false);

  // Função que limpa o formulário do modal de adição
  const clearAddModal = () => {
    addColumn2Ref.current.value = "";
    addColumn1Ref.current.value = "";
    addColumn3Ref.current.value = "";
    addColumn4Ref.current.value = "";
    addColumn5Ref.current = [];
    setClearSelect(!clearSelect);
  };

  // Função que limpa o formulário do modal de edição
  const clearEditModal = () => {
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {
        column1: null,
        column2: null,
        column3: null,
        column4: null,
        column5: null,
      },
    });
  };

  return (
    <>
      {/* Modal de dialogo de erro ao adicionar registro */}
      <CnxDialog
        useId={CNX_ID_ADD}
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível adicionar o registro",
        }}
      />
      {/* Modal de dialogo de erro ao editar registro */}
      <CnxDialog
        useId={CNX_ID_EDIT}
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível editar o registro",
        }}
      />
      <CnxFormModal
        saving={saving} // habilita animação de salvamento no botão
        title="Adicionar Registro" // Titulo do modal
        open={addModal} // Booleano que define se o modal está aberto ou fechado 
        close={closeAddModal} // Função que dispara ação alterar o parâmetro boleano -> open
        saveButton={() => add()} // Adiciona o botão 'Salvar' com a ação
        clearButton={clearAddModal} // Adiciona o botão 'Limpar' com a ação
        formInputs={
          <>
            <Input
              inputRef={addColumn1Ref}
              type="text"
              label="Column1"
              mandatory
            />
            <Input
              inputRef={addColumn2Ref}
              type="text"
              label="Column2"
              mandatory
            />
            <Input
              inputRef={addColumn3Ref}
              type="text"
              label="Column3"
              mandatory
            />
            <Input
              inputRef={addColumn4Ref}
              type="text"
              label="Column4"
              mandatory
            />
            <Select
              inputRef={addColumn5Ref}
              keyLabel="label"
              keyValue="id"
              label="Column5"
              mandatory
              defaultOption={1}
              options={[
                { id: 1, label: "Ativo" },
                { id: 2, label: "Inativo" },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
          </>
        }
        // formParameters={React.ReactElement<string | React.JSXElementConstructor<any>>}
        // customTab={
        //   title: string;
        //   content: React.ReactElement<string | React.JSXElementConstructor<any>>;
        // }
      />
      <CnxFormModal
        saving={saving} // habilita animação de salvamento no botão
        title="Editar Registro" // Titulo do modal
        open={editModal} // Booleano que define se o modal está aberto ou fechado 
        close={closeEditModal} // Função que dispara ação alterar o parâmetro boleano -> open
        clearButton={clearEditModal} // Adiciona o botão 'Salvar' com a ação
        saveButton={() => edit()} // Adiciona o botão 'Limpar' com a ação
        formInputs={
          <>
            <Input
              inputRef={editColumn1Ref}
              type="text"
              label="Column1"
              mandatory
            />
            <Input
              inputRef={editColumn2Ref}
              type="text"
              label="Column2"
              mandatory
            />
            <Input
              inputRef={editColumn3Ref}
              type="text"
              label="Column3"
              mandatory
            />
            <Input
              inputRef={editColumn4Ref}
              type="text"
              label="Column4"
              mandatory
            />
            <Select
              inputRef={editColumn5Ref}
              keyLabel="label"
              keyValue="id"
              label="Column5"
              mandatory
              defaultOption={rowData?.column5} // Passa o valor do linha da coluna selecionada 
              options={[
                { id: 1, label: "Ativo" },
                { id: 2, label: "Inativo" },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            />
          </>
        }
        // formParameters={React.ReactElement<string | React.JSXElementConstructor<any>>}
        // customTab={
        //   title: string;
        //   content: React.ReactElement<string | React.JSXElementConstructor<any>>;
        // }
      />
    </>
  );
}

export default FormModalContainer;
