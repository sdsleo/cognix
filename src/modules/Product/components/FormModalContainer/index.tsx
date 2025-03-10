import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";

import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import StatusLogs from "../../../../components/CnxInput/InputTypes/StatusLogs";
import {
  MultSelectAsyncAutoComplete,
  MultSelectCheckbox,
} from "../../../../components/CnxInput";
import { CnxTable } from "../../../../components/CnxTable";
import { axiosInstance } from '../../../../http/axiosInstance';
import { _POST, _PUT } from '../../routes';
function FormModalContainer() {
  const { dispacth, addModal, editModal } = useContext(UseContext);
  const inputCnxRef = useRef([]);

  const addCodeRef = useRef<HTMLInputElement>(null);
  const addCodeExternRef = useRef<HTMLInputElement>(null);
  const addDescriptionRef = useRef<HTMLInputElement>(null);
  const addRevisionRef = useRef<HTMLInputElement>(null);
  const addModelRef = useRef<HTMLInputElement>(null);
  const addUnitRef = useRef<HTMLInputElement>(null);
  const addIsActiveRef: any = useRef({});


  const editIDRef = useRef<HTMLInputElement>(null);
  const editCodeRef = useRef<HTMLInputElement>(null);
  const editCodeExternRef = useRef<HTMLInputElement>(null);
  const editDescriptionRef = useRef<HTMLInputElement>(null);
  const editRevisionRef = useRef<HTMLInputElement>(null);
  const editModelRef = useRef<HTMLInputElement>(null);
  const editUnitRef = useRef<HTMLInputElement>(null);
  const editIsActivedRef: any = useRef({});


  const [clearSelect, setClearSelect] = useState(false);

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

    const [data, setData]: any = useState([]);

  useEffect(() => {

    //@ts-ignore
    window.setItensProduction = () => {
      const value = localStorage.getItem('@setProduction')

      if(!value) return 

      const object = JSON.parse(value)

      if(editCodeRef && editCodeRef.current) editCodeRef.current.value = object.code
      if(editCodeExternRef && editCodeExternRef.current) editCodeExternRef.current.value = object.codeExternal
      if(editDescriptionRef && editDescriptionRef.current) editDescriptionRef.current.value = object.description
      if(editRevisionRef && editRevisionRef.current) editRevisionRef.current.value = object.revision
      if(editModelRef && editModelRef.current) editModelRef.current.value = object.model
      if(editUnitRef && editUnitRef.current) editUnitRef.current.value = object.unit
      if(editIDRef && editIDRef.current) editIDRef.current.value = object.id
      if(editIsActivedRef && editIsActivedRef.current) editIsActivedRef.current.checked = object.isActived;
    }
    handleData();
  }, []);

  const head = {
    date: 'Data',
    name: 'Nome',
    description: 'Descrição'
  };

  const handleData = () => {
    // setData([
    //   {
    //     date: '20/01/2023',
    //     name: 'Admin',
    //     description: 'Log descrição'
    //   },
    //   {
    //     date: '20/01/2023',
    //     name: 'Admin',
    //     description: 'Log descrição'
    //   },
    //   {
    //     date: '20/01/2023',
    //     name: 'Admin',
    //     description: 'Log descrição'
    //   },
    //   {
    //     date: '20/01/2023',
    //     name: 'Admin',
    //     description: 'Log descrição'
    //   }
    // ]);
  };

  async function add(){
    

     const payload = {
      "code": addCodeRef?.current?.value,
      "codeExternal": addCodeExternRef?.current?.value,
      "description": addDescriptionRef?.current?.value,
      "revision": addRevisionRef?.current?.value,
      "model": addModelRef?.current?.value,
      "extraInformation": "",
      "unit": addUnitRef?.current?.value,
      "type": 1,
      "isActived": 1
     }

    //  console.log({payload})


     await axiosInstance(
      _POST(payload)
    );
    
    resetADD()
    closeAddModal()

   //@ts-ignore
   window.cnx()

  }

  async function edit(){
    

    const payload = {
      "id":editIDRef?.current?.value,
     "code": editCodeRef?.current?.value,
     "codeExternal": editCodeExternRef?.current?.value,
     "description": editDescriptionRef?.current?.value,
     "revision": editRevisionRef?.current?.value,
     "model": editModelRef?.current?.value,
     "extraInformation": "",
     "unit": editUnitRef?.current?.value,
     "type": 1,
     "isActived": editIsActivedRef.current.checked ? 1 : 0,
    }




    await axiosInstance(
     _PUT(payload)
   );
   
  


  //@ts-ignore
  window.cnx()

 }

function resetADD(){
  if(addCodeRef && addCodeRef.current) addCodeRef.current.value = ''
  if(addCodeExternRef && addCodeExternRef.current) addCodeExternRef.current.value = ''
  if(addDescriptionRef && addDescriptionRef.current) addDescriptionRef.current.value = ''
  if(addRevisionRef && addRevisionRef.current) addRevisionRef.current.value = ''
  if(addModelRef && addModelRef.current) addModelRef.current.value = ''
}

function resetEdit(){
  if(editCodeRef && editCodeRef.current) editCodeRef.current.value = ''
  if(editCodeExternRef && editCodeExternRef.current) editCodeExternRef.current.value = ''
  if(editDescriptionRef && editDescriptionRef.current) editDescriptionRef.current.value = ''
  if(editRevisionRef && editRevisionRef.current) editRevisionRef.current.value = ''
  if(editModelRef && editModelRef.current) editModelRef.current.value = ''
}

  return (
    <>
      <CnxFormModal
        title="Adicionar Produto"
        open={addModal}
        close={closeAddModal}
        saveButton={() => add()}
        formInputs={
          <>
            <Input type="text" label="Código" mandatory inputRef={addCodeRef} />
            <Input type="text" label="Código externo" mandatory  inputRef={addCodeExternRef} />
            <Input type="text" label="Descrição" mandatory  doubleWidth inputRef={addDescriptionRef}/>
            <Input type="text" label="Revisão" mandatory inputRef={addRevisionRef}/>            
            <Input type="text" label="Modelo" inputRef={addModelRef} />
            <Input type="unit" label="Unidade" inputRef={addUnitRef} />
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
      />
      <CnxFormModal
        title="Editar Usuário"
        open={editModal}
        saveButton={() => edit()}
        close={closeEditModal}
        formInputs={
          <>
            <Input type="text" label="Id" disabled inputRef={editIDRef}/>
            <Input type="text" label="Código" mandatory inputRef={editCodeRef} />
            <Input type="text" label="Código externo" mandatory  inputRef={editCodeExternRef} />
            <Input type="text" label="Descrição" mandatory  doubleWidth inputRef={editDescriptionRef}/>
            <Input type="text" label="Revisão" mandatory inputRef={editRevisionRef}/>            
            <Input type="text" label="Modelo" inputRef={editModelRef} />
            <Input type="unit" label="Unidade" inputRef={editUnitRef} />
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
        historic={
          <CnxTable
          noSearchBar
          data={data}
          head={head}
          hoverEffect
          enableSummary />
        }
      />
    </>
  );
}

export default FormModalContainer;
