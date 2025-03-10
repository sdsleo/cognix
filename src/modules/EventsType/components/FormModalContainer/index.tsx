import { useState, useRef, useEffect, useContext, useId } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import CnxDialog from "../../../../components/CnxDialog";
import { axiosInstance } from '../../../../http/axiosInstance';
import { _GET, _POST, _PUT } from '../../routes';
import { IPagination } from '../../routes/types';

function FormModalContainer() {
  const CNX_ID_ADD = useId();
  const CNX_ID_EDIT = useId();

  const { localesData } = useContext<ILocales>(localesContex);

  const { dispacth, addModal, editModal, rowData, saving } =
    useContext(UseContext);

  const addIdRef = useRef<HTMLInputElement>(null!);
  const addCodeRef = useRef<HTMLInputElement>(null!);
  const addDescriptionRef = useRef<HTMLInputElement>(null!);
  const addColorRef = useRef<HTMLInputElement>(null!);
  const addIsActivedRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editCodeRef = useRef<HTMLInputElement>(null!);
  const editDescriptionRef = useRef<HTMLInputElement>(null!);
  const editColorRef = useRef<HTMLInputElement>(null!);
  const editIsActivedRef: any = useRef({});

  useEffect(() => {
    // console.log({rowData})
    editIdRef.current.value = rowData?.id;
    editCodeRef.current.value = rowData?.code;
    editDescriptionRef.current.value = rowData?.description;
    editColorRef.current.value = rowData?.color;
    editIsActivedRef.current.checked = rowData?.isActived;
    // editIsActiveRef.current.value = rowData?.rowStatus
    
  }, [rowData]);

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

      // console.log({data})
    } catch (err: any) {
      // console.error('ERRO', err)
      // const modal: any = document.getElementById(CNX_ID_ADD);
      // modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  const add = async () => {
    // if (addformCheck()) return;
    try {
      const payload = {
        code: addCodeRef.current.value,
        color:addColorRef.current.value,
        description:addDescriptionRef.current.value,
        isActived: 1
      }

     
      await axiosInstance(
        _POST(payload)
      );

      getList({ PageSize: 100 });

     
      clearAddModal();

     
    } catch (err: any) {
      // console.error(err);
      // const modal: any = document.getElementById(CNX_ID_ADD);
      // modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });

      
      dispacth({
        type: ACTIONS.ADD_MODAL,
        payload: false,
      })
    }
  }

  const edit = async () => {
    // if (editformCheck()) return;
    try {
      dispacth({
        type: ACTIONS.SAVING,
        payload: true,
      });

      const payload = {
        id:editIdRef.current.value,
        code: editCodeRef.current.value,
        color:editColorRef.current.value,
        description:editDescriptionRef.current.value,
        isActived: editIsActivedRef.current.checked ? 1 : 0,
      }

     
      await axiosInstance(
        _PUT(payload)
      );

      getList({ PageSize: 100 });

    

     
    } catch (err: any) {
      // console.error(err);
      // const modal: any = document.getElementById(CNX_ID_ADD);
      // modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });

  
    }
  };

  const closeAddModal = () => {
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
  };

  const closeEditModal = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
  };

  const [clearSelect, setClearSelect] = useState(false);

  const clearAddModal = () => {

    try{
      addIdRef.current.value = ''
    }catch(err){

    }

    try{
      addCodeRef.current.value = '' 
    }catch(err){

    }

    try{
      addDescriptionRef.current.value = '' 
    }catch(err){

    }

    try{
      addColorRef.current.value = '' 
    }catch(err){

    }

    try{
      addIsActivedRef.current.value = ''
    }catch(err){

    }


    setClearSelect(!clearSelect);
  };

  const clearEditModal = () => {
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {
        code: null,
        description: null,
        color: null,
      },
    });
  };

  return (
    <>
      <CnxDialog
        useId={CNX_ID_ADD}
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível adicionar o registro",
        }}
      />
      <CnxDialog
        useId={CNX_ID_EDIT}
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível editar o registro",
        }}
      />
      <CnxFormModal
        saving={saving}
        title="Adicionar Tipo de Evento"
        open={addModal}
        close={closeAddModal}
        saveButton={() => add()}
        clearButton={clearAddModal}
        formInputs={
          <>
            <Input
              inputRef={addCodeRef}
              type="text"
              label="Code"
              mandatory
            />
            <Input
              inputRef={addDescriptionRef}
              type="text"
              label="Descrição"
              mandatory
            />
            <Input
              inputRef={addColorRef}
              type="color"
              label="Cor"
              mandatory
            />
            {/* <Select
              inputRef={addIsActiveRef}
              keyLabel="label"
              keyValue="id"
              label="Situação"
              mandatory
              defaultOption={1}
              options={[
                { id: 1, label: "Ativo" },
                { id: 2, label: "Inativo" },
              ]}
              clear={clearSelect}
              placeholder="Selecionar"
            /> */}
          </>
        }
        // formParameters={React.ReactElement<string | React.JSXElementConstructor<any>>}
        // customTab={
        //   title: string;
        //   content: React.ReactElement<string | React.JSXElementConstructor<any>>;
        // }
      />
      <CnxFormModal
        saving={saving}
        title="Editar Tipo de Evento"
        open={editModal}
        close={closeEditModal}
        clearButton={clearEditModal}
        saveButton={() => edit()}
        formInputs={
          <>
            <Input
              inputRef={editIdRef}
              type="text"
              label="id"
              disabled
              mandatory
            />
            <Input
              inputRef={editCodeRef}
              type="text"
              label="Code"
              mandatory
            />
            <Input
              inputRef={editDescriptionRef}
              type="text"
              label="Descrição"
              mandatory
            />
            <Input
              inputRef={editColorRef}
              type="color"
              label="Cor"
              defaultValue={`${editColorRef}`}
              mandatory
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                marginTop: "12px",
              }}
            >
              <Input
                inputRef={editIsActivedRef}
                type="checkbox"
              />
              <span className="cnx-active-label-checkbox">Ativo</span>
            </div>
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
