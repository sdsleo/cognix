import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../../../context/moduleContext";
import { ACTIONS } from "../../../../context/moduleActions";

import CnxFormModal from "../../../../../../components/CnxFormModal";
import Input from "../../../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../../../components/CnxInput/InputTypes/Select";
import CnxDialog from "../../../../../../components/CnxDialog";
import { axiosInstance } from "../../../../../../http/axiosInstance";
import { _GET, _GET_ENUMERATOS, _GET_ENUMERATOS_ORDER, _GET_HORSE_LOCATION_PAGED, _POST, _PUT, _PUT_HORSE_LOCATION } from "../../../../routes";
import { IPagination } from "../../../../routes/types";

function FormModalContainer() {
  const { dispacth, editHorseModal, rowDataHorse, saving, enumeratorsHorse, cardView, showAll } =
  useContext(UseContext);


  const CNX_ID_EDIT = useId();

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editCavaloIdRef = useRef<HTMLInputElement>(null!);
  const editPlateRef = useRef<HTMLInputElement>(null!);
  
  const editBaseRef: any = useRef({});
  const editClientRef: any = useRef({});

  // useEffect(() => {
  //   if (editHorseModal) {
  //     getEnumerators();
      
  //   }
  // }, [editHorseModal]);

  useEffect(() => {
    // if (rowDataHorse?.customCavalo?.id) {

    //     editIdRef.current.value = rowDataHorse?.id;
    //     editCavaloIdRef.current.value = rowDataHorse?.customCavalo?.id;
    //     editPlateRef.current.value = rowDataHorse?.customCavalo?.plate;

    // }
    getEnumerators();
    setClearSelect(!clearSelect)
  }, [rowDataHorse]);

  function editformCheck() {
    let editBase = false;
    let editClient = false;

    // if (editBaseRef.current.value === "") {
    //   editBaseRef.current!.classList?.add("cnx-input-border-error-highlight");
    //   editBase = true;
    // }
    // if (editClientRef.current.value === "") {
    //   editClientRef.current!.classList?.add("cnx-input-border-error-highlight");
    //   editClient = true;
    // }

    if (!editBaseRef.current && !editClientRef.current) {
      
      setNoBaseClientMessage(true);
      setBaseClientMessage(false);
      editBase = true;
    }
    if (editBaseRef.current && editClientRef.current) {
      setBaseClientMessage(true);
      setNoBaseClientMessage(false);
      editClient = true;
    }

    if (editBase || editClient) {
      return true;
    }
  }

  async function getEnumerators() {
    try {
      const { data } = await axiosInstance(_GET_ENUMERATOS_ORDER());
      dispacth({
        type: ACTIONS.SET_ENUMERATORS_HORSE,
        payload: data,
      });
    } catch (err: any) {
      console.error(err);
    }
  }
  const cardIdS = sessionStorage.getItem('@cnx-card-id')

    async function getList({ PageSize, PageNumber }: IPagination) {
      if (showAll) {
        dispacth({
          type: ACTIONS.LOADING_TABLE,
          payload: true,
        });
        try {
          const { data } = await axiosInstance(_GET_HORSE_LOCATION_PAGED({ PageSize, PageNumber }));
          dispacth({
            type: ACTIONS.SET_TABLE_DATA_HORSE,
            payload: data,
          });
        } catch (err: any) {
          console.error('ERRO', err)
          // const modal: any = document.getElementById(CNX_ID_LIST);
          // modal?.showModal();
        } finally {
          dispacth({
            type: ACTIONS.LOADING_TABLE,
            payload: false,
          });
        }
        return;
      }
      if (cardView === 'bases') {
        dispacth({
          type: ACTIONS.LOADING_TABLE,
          payload: true,
        });
        
        try {
          const { data } = await axiosInstance(_GET_HORSE_LOCATION_PAGED({ PageSize, PageNumber, BaseId: Number(cardIdS) }));
          dispacth({
            type: ACTIONS.SET_TABLE_DATA_HORSE,
            payload: data,
          });
          
        } catch (err: any) {
          console.error('ERRO', err)
          // const modal: any = document.getElementById(CNX_ID_LIST);
          // modal?.showModal();
        } finally {
          dispacth({
            type: ACTIONS.LOADING_TABLE,
            payload: false,
          });
        }
      }
      if (cardView === 'clients') {
        dispacth({
          type: ACTIONS.LOADING_TABLE,
          payload: true,
        });
        try {
          const { data } = await axiosInstance(_GET_HORSE_LOCATION_PAGED({ PageSize, PageNumber, ClientId: Number(cardIdS) }));
          dispacth({
            type: ACTIONS.SET_TABLE_DATA_HORSE,
            payload: data,
          });
        } catch (err: any) {
          console.error('ERRO', err)
          // const modal: any = document.getElementById(CNX_ID_LIST);
          // modal?.showModal();
        } finally {
          dispacth({
            type: ACTIONS.LOADING_TABLE,
            payload: false,
          });
        }
      }
  
    }
  


  async function edit() {
    if (editformCheck()) return;

    dispacth({
      type: ACTIONS.SAVING,
      payload: true,
    });

    try {
      await axiosInstance(
        _PUT_HORSE_LOCATION({
          id: rowDataHorse?.id,
          cavaloId: rowDataHorse?.customCavalo?.id,
          baseId: editBaseRef.current?.id,
          clientId: editClientRef.current?.id,
        })
      );
      getList({ PageSize: 100 });
      setBaseClientMessage(false);
      setNoBaseClientMessage(false);
    } catch (err: any) {
      console.error(err);
      const modal: any = document.getElementById(CNX_ID_EDIT);
      modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.SAVING,
        payload: false,
      });
    }
  }

  const closeEditModal = () => {
    dispacth({
      type: ACTIONS.EDIT_HORSE_MODAL,
      payload: false,
    });
    setBaseClientMessage(false);
    setNoBaseClientMessage(false);
    setClearSelect(!clearSelect)
  };

  const [clearSelect, setClearSelect] = useState(false);

  const clearEditModal = () => {
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {
        id: rowDataHorse?.id,
      },
    });
  };

  const [baseClientMessage, setBaseClientMessage] = useState(false);
  const [noBaseClientMessage, setNoBaseClientMessage] = useState(false);

  return (
    <>
      <CnxFormModal
        title="Editar Cavalo"
        open={editHorseModal}
        close={closeEditModal}
        saveButton={() => edit()}
        clearButton={clearEditModal}
        saving={saving}
        formInputs={
          <>
            <Input
              inputRef={editIdRef}
              value={rowDataHorse?.customCavalo?.id}
              type="text"
              label="id"
              disabled
            />
            <Input
              inputRef={editPlateRef}
              value={rowDataHorse?.customCavalo?.plate}
              type="text"
              label="Placa"
              disabled
            />
            <Select
              inputRef={editBaseRef}
              keyLabel="name"
              keyValue="id"
              placeholder="Selecionar"
              options={enumeratorsHorse.bases || []}
              defaultOption={rowDataHorse?.customBase?.id || []}
              label="Base"
              clear={clearSelect}
              onChange={() => {
                editBaseRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            <Select
              inputRef={editClientRef}
              keyLabel="name"
              keyValue="id"
              placeholder="Selecionar"
              options={enumeratorsHorse.clients || []}
              defaultOption={rowDataHorse?.client?.id  || []}
              label="Cliente"
              clear={clearSelect}
              onChange={() => {
                editClientRef.current!.classList?.remove(
                  "cnx-input-border-error-highlight"
                );
              }}
            />
            {noBaseClientMessage ? (
              <span style={{ color: "#fe5e76" }}>
                Não se pode salvar o registro sem Base ou Cliente, por favor
                selecione apenas um deles
              </span>
            ) : null}
            {baseClientMessage ? (
              <span style={{ color: "#fe5e76" }}>
                Não se pode conter Base e Cliente no mesmo registro, por favor
                selecione apenas um deles
              </span>
            ) : null}
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
