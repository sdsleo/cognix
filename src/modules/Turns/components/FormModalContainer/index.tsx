import { useState, useRef, useEffect, useContext, useId } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";

import CnxFormModal from "../../../../components/CnxFormModal";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import { _GET, _GET_ONE, _POST, _PUT } from "../../routes";
import useFetch from "../../../../hooks/useFetch";
import CnxDialog from "../../../../components/CnxDialog";
import { ContainerDynamic } from "./styles";
import ChromeClose from "../../../../assets/icons/FluentUI/SVGs/ChromeClose";
import Add from "../../../../assets/icons/FluentUI/SVGs/Add";
import { axiosInstance } from "../../../../http/axiosInstance";
import "./styles.css"

function FormModalContainer() {
  const CNX_ID_ADD = useId();
  const CNX_ID_EDIT = useId();
  const { request } = useFetch();
  const { localesData } = useContext<ILocales>(localesContex);
  const { dispacth, addModal, editModal, rowData, saving } =
    useContext(UseContext);

  const [days, setDays] = useState<any[]>([1]);

  const addCodigoRef = useRef<HTMLInputElement>(null!);
  const addNomeRef = useRef<HTMLInputElement>(null!);
  const addDescricaoRef = useRef<HTMLInputElement>(null!);
  const addHoraInicioRef = useRef<HTMLInputElement>(null!);
  const addHoraFimRef = useRef<HTMLInputElement>(null!);
  const addRepeticaoRef = useRef<HTMLInputElement>(null!);
  const addSituacaoRef: any = useRef({});

  const editIdRef = useRef<HTMLInputElement>(null!);
  const editCodigoRef = useRef<HTMLInputElement>(null!);
  const editNomeRef = useRef<HTMLInputElement>(null!);
  const editDescricaoRef = useRef<HTMLInputElement>(null!);
  const editHoraInicioRef = useRef<HTMLInputElement>(null!);
  const editHoraFimRef = useRef<HTMLInputElement>(null!);
  const editRepeticaoRef = useRef<HTMLInputElement>(null!);
  const editSituacaoRef: any = useRef({});

  async function GET_DATA() {
    const { data } = await axiosInstance(_GET_ONE(rowData?.id));

    console.log("response", data);

    const days_ = data.map((a: any) => a.dayOfWeek);
    const days_rest = data.map((a: any) => {
      return {
        dayOfWeek: a.dayOfWeek,
        strFinishTime: a.strFinishTime,
        strStartTime: a.strStartTime,
      };
    });

    setDays(days_);

    setTimeout(() => {
      document.querySelectorAll("._path_EDIT").forEach((el: any, i: any) => {
        //@ts-ignore
        el.querySelector("._value").value = IdToName(+days_rest[i].dayOfWeek);
        //@ts-ignore
        el.querySelector("._value_start").value = days_rest[i].strStartTime;
        //@ts-ignore
        el.querySelector("._value_end").value = days_rest[i].strFinishTime;
      });
    }, 700);
  }
  useEffect(() => {
    editIdRef.current.value = rowData?.id;
    editNomeRef.current.value = rowData?.name;
    editCodigoRef.current.value = rowData?.code;
    editDescricaoRef.current.value = rowData?.description;
    // editHoraInicioRef.current.value = rowData?.hourStart;
    // editHoraFimRef.current.value = rowData?.hourEnd;
    // editRepeticaoRef.current.value = rowData?.loop;

    ///@ts-ignore
    const dados = window.turnData;

    console.log("edit", { dados });
    GET_DATA();
  }, [rowData]);

  const getTableData = async () => {
    const { url, options } = _GET();

    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });

    const { response, json } = await request(url, options);

    if (response?.ok) {
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: json,
      });
    } else {
      console.log("ERROR", response);
    }

    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: false,
    });
  };

  function addformCheck() {
    let addAreaCodigo = false;
    let addAreaNome = false;
    let addImpressoraIP = false;
    let addImpressoraNome = false;
    let addSituacao = false;

    if (addCodigoRef.current.value === "") {
      addCodigoRef.current!.classList?.add("cnx-input-border-error-highlight");
      addAreaCodigo = true;
    }
    if (addNomeRef.current.value === "") {
      addNomeRef.current!.classList?.add("cnx-input-border-error-highlight");
      addAreaNome = true;
    }
    if (addDescricaoRef.current.value === "") {
      addDescricaoRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addImpressoraIP = true;
    }
    if (addHoraInicioRef.current.value === "") {
      addHoraInicioRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      addImpressoraNome = true;
    }
    if (!addSituacaoRef.current) {
      document
        ?.querySelector(".cnx-areas-select-add-situacao-casas")!
        .classList?.add("cnx-input-border-error-highlight");
      addSituacao = true;
    }
    if (
      addAreaCodigo &&
      addAreaNome &&
      addImpressoraIP &&
      addImpressoraNome &&
      addSituacao
    ) {
      return true;
    }
  }

  function editformCheck() {
    let editAreaCodigo = false;
    let editAreaNome = false;
    let editImpressoraIP = false;
    let editImpressoraNome = false;
    let editSituacao = false;

    if (editCodigoRef.current.value === "") {
      editCodigoRef.current!.classList?.add("cnx-input-border-error-highlight");
      editAreaCodigo = true;
    }
    if (editNomeRef.current.value === "") {
      editNomeRef.current!.classList?.add("cnx-input-border-error-highlight");
      editAreaNome = true;
    }
    if (editDescricaoRef.current.value === "") {
      editDescricaoRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editImpressoraIP = true;
    }
    if (editHoraInicioRef.current.value === "") {
      editHoraInicioRef.current!.classList?.add(
        "cnx-input-border-error-highlight"
      );
      editImpressoraNome = true;
    }
    if (!editSituacaoRef.current) {
      document
        ?.querySelector(".cnx-areas-select-edit-situacao-cases")!
        .classList?.add("cnx-input-border-error-highlight");
      editSituacao = true;
    }
    if (
      editAreaCodigo &&
      editAreaNome &&
      editImpressoraIP &&
      editImpressoraNome &&
      editSituacao
    ) {
      return true;
    }
  }

  // const add_ = async () => {
  //   if (addformCheck()) return;
  //   // const { url, options } = _POST({
  //   //   areaCodigo: addCodigoRef.current.value,
  //   //   areaNome: addNomeRef.current.value,
  //   //   impressoraIP: addDescricaoRef.current.value,
  //   //   impressoraNome: addHoraInicioRef.current.value,
  //   //   situacao: addSituacaoRef.current.id,
  //   // });

  //   dispacth({
  //     type: ACTIONS.SAVING,
  //     payload: true,
  //   });

  //   // const { response, json } = await request(url, options);
  //   if (response?.ok) {
  //     getTableData();
  //     clearAddModal();
  //   } else {
  //     console.log("ERROR", response);
  //     const modal: any = document.getElementById(CNX_ID_ADD);
  //     modal?.showModal();
  //   }

  //   dispacth({
  //     type: ACTIONS.SAVING,
  //     payload: false,
  //   });
  // };

  async function add() {
    const payload = {
      code: addCodigoRef.current.value,
      name: addNomeRef.current.value,
      description: addDescricaoRef.current.value,
      // "initialTime": {},
      // "endTime": {},
      // "repetition": 0,
      shiftConfigs: getValuesLOOP(),
    };

    // console.log({payload})

    await axiosInstance(_POST(payload));
    getTableData();
    closeAddModal();
    clearAddModal();
  }

  function nameToId(value: string) {
    switch (value) {
      case "Segunda":
        return 1;
      case "Terça":
        return 2;
      case "Quarta":
        return 3;
      case "Quinta":
        return 4;
      case "Sexta":
        return 5;
      case "Sabado":
        return 6;
      case "Domingo":
        return 7;
      default:
        return 0;
    }
  }

  function IdToName(value: number) {
    switch (value) {
      case 1:
        return "Segunda";
      case 2:
        return "Terça";
      case 3:
        return "Quarta";
      case 4:
        return "Quinta";
      case 5:
        return "Sexta";
      case 6:
        return "Sabado";
      case 7:
        return "Domingo";
      default:
        return "";
    }
  }

  function getValuesLOOP() {
    const path: any[] = [];
    document.querySelectorAll("._path").forEach((el) => {
      console.dir(el);
      //@ts-ignore
      const day = el.querySelector("._value").value;
      //@ts-ignore
      const start = el.querySelector("._value_start").value;
      //@ts-ignore
      const end = el.querySelector("._value_end").value;

      path.push({
        startTime: start,
        finishTime: end,
        dayOfWeek: nameToId(day),
        // "idShift": 0
      });
    });

    return path;
  }

  function getValuesLOOPEDIT() {
    const path: any[] = [];
    document.querySelectorAll("._path_EDIT").forEach((el) => {
      //@ts-ignore
      const day = el.querySelector("._value").value;
      //@ts-ignore
      const start = el.querySelector("._value_start").value;
      //@ts-ignore
      const end = el.querySelector("._value_end").value;

      path.push({
        startTime: start,
        finishTime: end,
        dayOfWeek: nameToId(day),
        // "idShift": 0
      });
    });

    return path;
  }

  async function edit() {
    const payload = {
      id: editIdRef.current.value,
      code: editCodigoRef.current.value,
      name: editNomeRef.current.value,
      description: editDescricaoRef.current.value,
      // "initialTime": {},
      // "endTime": {},
      // "repetition": 0,
      shiftConfigs: getValuesLOOPEDIT(),
    };

    // console.log({payload})

    await axiosInstance(_PUT(payload));
    getTableData();
    closeEditModal();
    clearEditModal();
  }

  // const edit__ = async () => {
  //   if (editformCheck()) return;
  //   const { url, options } = _PUT({
  //     id: Number(editIdRef.current.value),
  //     areaCodigo: editCodigoRef.current.value,
  //     areaNome: editNomeRef.current.value,
  //     impressoraIP: editDescricaoRef.current.value,
  //     impressoraNome: editHoraInicioRef.current.value,
  //     situacao: editSituacaoRef.current.id,
  //   });

  //   dispacth({
  //     type: ACTIONS.SAVING,
  //     payload: true,
  //   });

  //   const { response, json } = await request(url, options);
  //   if (response?.ok) {
  //     getTableData();
  //   } else {
  //     console.log("ERROR", response);
  //     const modal: any = document.getElementById(CNX_ID_EDIT);
  //     modal?.showModal();
  //   }

  //   dispacth({
  //     type: ACTIONS.SAVING,
  //     payload: false,
  //   });
  // };

  const closeAddModal = () => {
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
    setDays([]);
  };

  const closeEditModal = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });

    setDays([]);
  };

  const [clearSelect, setClearSelect] = useState(false);

  const clearAddModal = () => {
    addCodigoRef.current.value = "";
    addNomeRef.current.value = "";
    addDescricaoRef.current.value = "";
    addHoraInicioRef.current.value = "";
    addSituacaoRef.current = [];
    setClearSelect(!clearSelect);
  };

  const clearEditModal = () => {
    setClearSelect(!clearSelect);
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {
        id: rowData?.id,
        areaCodigo: null,
        areaNome: null,
        impressoraIP: null,
        impressoraNome: null,
        situacao: null,
      },
    });
  };

  function removeDay(value: number) {
    const up = days.filter((item) => item !== value);

    setDays(up);
  }

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
        title="Adicionar Turno"
        open={addModal}
        close={closeAddModal}
        saveButton={() => add()}
        clearButton={clearAddModal}
        formInputs={
          <>
            <>
              <Input
                inputRef={addCodigoRef}
                type="text"
                onChange={() => {
                  addCodigoRef.current!.classList?.remove(
                    "cnx-input-border-error-highlight"
                  );
                }}
                label="Código"
                mandatory
              />
              <Input
                inputRef={addNomeRef}
                type="text"
                onChange={() => {
                  addNomeRef.current!.classList?.remove(
                    "cnx-input-border-error-highlight"
                  );
                }}
                label="Nome"
                mandatory
              />
              <Input
                inputRef={addDescricaoRef}
                type="text"
                onChange={() => {
                  addDescricaoRef.current!.classList?.remove(
                    "cnx-input-border-error-highlight"
                  );
                }}
                label="Descrição"
                mandatory
              />
              {/* <Input
                inputRef={addHoraInicioRef}
                type="text"
                onChange={() => {
                  addHoraInicioRef.current!.classList?.remove('cnx-input-border-error-highlight');
                }}
                label="Hora início"
                mandatory
              />
              <Input
                inputRef={addHoraFimRef}
                type="text"
                onChange={() => {
                  addHoraFimRef.current!.classList?.remove('cnx-input-border-error-highlight');
                }}
                label="Hora fim"
                mandatory
              /> */}
              {/* <Input
                inputRef={addRepeticaoRef}
                type="text"
                onChange={() => {
                  addRepeticaoRef.current!.classList?.remove('cnx-input-border-error-highlight');
                }}
                label="Repetição"
                mandatory
              /> */}
              <Select
                inputRef={addSituacaoRef}
                keyLabel="code"
                keyValue="id"
                label="Situação"
                mandatory
                className="cnx-areas-select-add-situacao-casas"
                onChange={() => {
                  document
                    ?.querySelector(".cnx-areas-select-add-situacao-casas")!
                    .classList?.remove("cnx-input-border-error-highlight");
                }}
                defaultOption={1}
                options={[
                  { id: 1, code: "Ativo" },
                  { id: 2, code: "Inativo" },
                ]}
                clear={clearSelect}
                placeholder="Selecionar"
              />
            </>

            <div style={{ width: "300px", marginTop: "20px" }}>
              <button
                type="button"
                className="cnx-turns-add-button"
                onClick={() => {
                  let qtd = days.length;

                  setDays([...days, qtd + 1]);
                }}
                disabled={days.length === 7}
              >
                <Add />
              </button>
            </div>

            {days.map((item) => {
              return (
                <ContainerDynamic>
                  <div className="actions">
                    <button
                      className="cnx-auth-level-header-action-button-calhab"
                      type="button"
                      onClick={() => removeDay(item)}
                    >
                      <ChromeClose width="0.8rem" height="0.8rem" />
                    </button>
                  </div>

                  <div className="inputs-container _path">
                    <Select
                      inputRef={addSituacaoRef}
                      keyLabel="code"
                      keyValue="id"
                      label="Dia"
                      mandatory
                      className="cnx-areas-select-add-situacao-casas _value"
                      onChange={() => {
                        document
                          ?.querySelector(
                            ".cnx-areas-select-add-situacao-casas"
                          )!
                          .classList?.remove(
                            "cnx-input-border-error-highlight"
                          );
                      }}
                      defaultOption={item}
                      options={[
                        { id: 1, code: "Segunda" },
                        { id: 2, code: "Terça" },
                        { id: 3, code: "Quarta" },
                        { id: 4, code: "Quinta" },
                        { id: 5, code: "Sexta" },
                        { id: 6, code: "Sabado" },
                        { id: 7, code: "Domingo" },
                      ]}
                      clear={clearSelect}
                      placeholder="Selecionar"
                    />
                    <Input
                      className="cnx-default-input-cdi _value_start"
                      type="time"
                      label="Hora início"
                      mandatory
                    />

                    <Input
                      className="cnx-default-input-cdi _value_end"
                      type="time"
                      label="Hora Fim"
                      mandatory
                    />
                  </div>
                </ContainerDynamic>
              );
            })}
          </>
        }
      />
      <CnxFormModal
        saving={saving}
        title="Editar Turno"
        open={editModal}
        close={closeEditModal}
        clearButton={clearEditModal}
        saveButton={() => edit()}
        formInputs={
          <>
            <>
              <Input
                inputRef={editIdRef}
                type="text"
                label="id"
                disabled
                mandatory
              />
              <Input
                inputRef={editCodigoRef}
                type="text"
                label="Código"
                mandatory
                onChange={() => {
                  editCodigoRef.current!.classList?.remove(
                    "cnx-input-border-error-highlight"
                  );
                }}
              />
              <Input
                inputRef={editNomeRef}
                type="text"
                label="Nome"
                mandatory
                onChange={() => {
                  editNomeRef.current!.classList?.remove(
                    "cnx-input-border-error-highlight"
                  );
                }}
              />
              <Input
                inputRef={editDescricaoRef}
                type="text"
                label="Descrição"
                mandatory
                onChange={() => {
                  editDescricaoRef.current!.classList?.remove(
                    "cnx-input-border-error-highlight"
                  );
                }}
              />

              {/* <Select
                keyLabel="code"
                keyValue="id"
                label="Situação"
                mandatory
                defaultOption={rowData?.status}
                options={[
                  { id: 1, code: "Ativo" },
                  { id: 2, code: "Inativo" },
                ]}
                className="cnx-areas-select-edit-situacao-cases"
                onChange={() => {
                  document?.querySelector('.cnx-areas-select-edit-situacao-cases')!.classList?.remove('cnx-input-border-error-highlight');
                }}
                inputRef={editSituacaoRef}
                clear={clearSelect}
                placeholder="Selecionar"
              /> */}
            </>

            <div style={{ width: "300px", marginTop: "20px" }}>
              <button
                type="button"
                className="cnx-turns-add-button"
                onClick={() => {
                  let qtd = days.length;

                  setDays([...days, qtd + 1]);
                }}
                disabled={days.length === 7}
              >
                <Add />
              </button>
            </div>

            {days.map((item) => {
              return (
                <ContainerDynamic>
                  <div className="actions">
                    <button
                      className="cnx-auth-level-header-action-button-calhab"
                      type="button"
                      onClick={() => removeDay(item)}
                    >
                      <ChromeClose width="0.8rem" height="0.8rem" />
                    </button>
                  </div>

                  <div className="inputs-container _path_EDIT">
                    <Select
                      inputRef={addSituacaoRef}
                      keyLabel="code"
                      keyValue="id"
                      label="Dia"
                      mandatory
                      className="cnx-areas-select-add-situacao-casas _value"
                      onChange={() => {
                        document
                          ?.querySelector(
                            ".cnx-areas-select-add-situacao-casas"
                          )!
                          .classList?.remove(
                            "cnx-input-border-error-highlight"
                          );
                      }}
                      defaultOption={item}
                      options={[
                        { id: 1, code: "Segunda" },
                        { id: 2, code: "Terça" },
                        { id: 3, code: "Quarta" },
                        { id: 4, code: "Quinta" },
                        { id: 5, code: "Sexta" },
                        { id: 6, code: "Sabado" },
                        { id: 7, code: "Domingo" },
                      ]}
                      clear={clearSelect}
                      placeholder="Selecionar"
                    />
                    <Input
                      className="cnx-default-input-cdi _value_start"
                      type="time"
                      label="Hora início"
                      mandatory
                    />

                    <Input
                      className="cnx-default-input-cdi _value_end"
                      type="time"
                      label="Hora Fim"
                      mandatory
                    />
                  </div>
                </ContainerDynamic>
              );
            })}
          </>
        }
      />
    </>
  );
}

export default FormModalContainer;
