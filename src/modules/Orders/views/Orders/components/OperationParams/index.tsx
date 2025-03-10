import { useRef, useState, useContext, useEffect } from "react";
import { UseContext } from "../../../../context/moduleContext";
import { ACTIONS } from "../../../../context/moduleActions";
import { Select } from "../../../../../../components/CnxInput";
import Input from "../../../../../../components/CnxInput/InputTypes/Input";
import {
  AuthLevelContainer,
  FixedFormContainer,
  DynamicFormContainer,
  HeaderActions,
} from "./styles";
import SingleColumnEdit from "../../../../../../assets/icons/FluentUI/SVGs/SingleColumnEdit";
import ChromeClose from "../../../../../../assets/icons/FluentUI/SVGs/ChromeClose";
import { axiosInstance } from "../../../../../../http/axiosInstance";
import { IFiltersTramos } from "../../../../routes/types";
import { _GET_TRAMOS_FILTERED } from "../../../../routes";
export function OperationParams({ clearParams, clientId, baseId }: any) {


  const { dispacth, enumerators, operationParamsData, enumeratorsTramos } = useContext(UseContext);


  const operationCodeRef: any = useRef(null);
  const [operationNumber, setOperationNumber]: any = useState(null);

  const tramoRef: any = useRef(null);
  const vehicleRef: any = useRef(null);
  const horseRef: any = useRef(null);
  const startedDateTimeRef = useRef<HTMLInputElement>(null!);
  const [startedDateTime, setStartedDateTime] = useState("");
  const finishedDateTimeRef = useRef<HTMLInputElement>(null!);
  const [finishedDateTime, setFinishedDateTime] = useState("");
  const statusRef: any = useRef(null);

  const editOperationCodeRef: any = useRef(null);
  const [editOperationNumber, setEditOperationNumber]: any = useState(null);
  const editTramoRef: any = useRef(null);
  const editVehicleRef: any = useRef(null);
  const editHorseRef: any = useRef(null);
  const editStartedDateTimeRef = useRef<HTMLInputElement>(null!);
  const editFinishedDateTimeRef = useRef<HTMLInputElement>(null!);
  const editStatusRef: any = useRef(null);

  const editTextRef = useRef<HTMLInputElement>(null!);
  const editSelectRef: any = useRef(null);

  const [currentEdit, setCurrentEdit]: any = useState();
  const [params, setParams]: any = useState([]);
  const [clearSelect, setClearSelect] = useState(false);

  const [is1030, setIs1030] = useState(false);
  const [is2040, setIs2040] = useState(false);

  useEffect(() => {
    if (!operationParamsData) {
      setParams([]);
    }
  }, [operationParamsData]);

  useEffect(() => {
    setClearSelect(!clearSelect);
    startedDateTimeRef.current.value = "";
    finishedDateTimeRef.current.value = "";
    setStartedDateTime("");
    setFinishedDateTime("");
    setErrorSpan(false);
    setErrorSpanBlock(false);
  }, [clearParams]);

  async function getListTramos({ BaseId, ClientId }: IFiltersTramos) {
    try {
      const { data } = await axiosInstance(
        _GET_TRAMOS_FILTERED({
          BaseId,
          ClientId
        })
      );
      dispacth({
        type: ACTIONS.SET_ENUMERATORS_TRAMOS,
        payload: data,
      });
    } catch (err: any) {
      console.error("ERRO", err);
      // const modal: any = document.getElementById(CNX_ID_LIST);
      // modal?.showModal();
    } finally {
 
    }
  }

  useEffect(() => {
    if (operationNumber === 10) {
      getListTramos({BaseId: baseId })
    }
    if (operationNumber === 30) {
      getListTramos({ClientId: clientId})
    }
    // getListTramos({BaseId: rowData?.orderCustom?.baseId, ClientId: rowData?.clientId})
    // getListTramos({})
  }, [operationNumber]);

  function handleAddLevel() {
    if (currentEdit) return;
    if (params.length === 0) {
      if (operationNumber != 10) {
        const operationName = enumerators?.operations.find((operation: any) => operation.number == 10)
        setOrderNumberTurn(operationName?.code);
        setErrorSpanBlockOperationOrder(true);
        return;
      }
    }
    if (params.length === 1) {
      if (operationNumber != 20) {
        const operationName = enumerators?.operations.find((operation: any) => operation.number == 20)
        setOrderNumberTurn(operationName?.code);
        setErrorSpanBlockOperationOrder(true);
        return;
      }
    }
    if (params.length === 2) {
      if (operationNumber != 30) {
        const operationName = enumerators?.operations.find((operation: any) => operation.number == 30)
        setOrderNumberTurn(operationName?.code);
        setErrorSpanBlockOperationOrder(true);
        return;
      }
    }
    if (params.length === 3) {
      if (operationNumber != 40) {
        const operationName = enumerators?.operations.find((operation: any) => operation.number == 40)
        setOrderNumberTurn(operationName?.code);
        setErrorSpanBlockOperationOrder(true);
        return;
      }
    }

    // if (formCheckOR()) {
    //   toast.error('Nenhum campo de nivél foi selecionado');
    //   return;
    // }

    // if (is1030) {
    //   if (!tramoRef.current) {
    //     document
    //       ?.querySelector(".cnx-operation-params-tramo")!
    //       .classList?.add("cnx-input-border-error-highlight");
    //     return
    //   }
    // }

    if (params.length > 0) {
      if (
        Date.parse(startedDateTime) <=
        Date.parse(params[params.length - 1].finishedDateTime)
      ) {
        setErrorSpanBlock(true);
        return;
      }
    }

    if (
      Date.parse(startedDateTime) <
      Date.parse(finishedDateTime)
    ) {
      //start is less than End
    } else {
      //end is less than start
      setErrorSpan(true);
      return;
    }

    if (is1030) {
      if (!tramoRef.current) {
        document
          ?.querySelector(".cnx-operation-params-tramo")!
          .classList?.add("cnx-input-border-error-highlight");
        return;
      }
    }
    if (is2040) {
      if (!horseRef.current) {
        document
          ?.querySelector(".cnx-operation-params-horse")!
          .classList?.add("cnx-input-border-error-highlight");
        return;
      }
    }

    if (params.length >= 4) return;

    setCurrentEdit(null);
    const oldList = [...params];
    const newLevel: any = {
      id: 0,
      level: params.length + 1,
      operationNumber: operationNumber,
      operationCode: operationCodeRef.current.id,
      tramo: tramoRef.current?.id ? tramoRef?.current?.id : null,
      vehicle: vehicleRef?.current?.id,
      horse: horseRef?.current?.id ? horseRef?.current?.id : null,
      startedDateTime: startedDateTime,
      finishedDateTime: finishedDateTime,
      status: Number(statusRef?.current?.id),
      flowId: 0,
    };

    setParams([...oldList, newLevel]);
    dispacth({
      type: ACTIONS.SET_OPERATION_PARAMS_DATA,
      payload: [...oldList, newLevel],
    });
    setClearSelect(!clearSelect);
    // operationCodeRef.current.value = "";
    startedDateTimeRef.current.value = "";
    finishedDateTimeRef.current.value = "";
    setStartedDateTime('');
    setFinishedDateTime('')
    setOperationNumber(null);

    setIs1030(false);
    setIs2040(false);
    setErrorSpanBlock(false);
    setErrorSpan(false);
  }

  function handleSaveEdit(index: number, operationNumber: any) {
    
    // if (formCheckEditOR()) {
    //   toast.error('Nenhum campo de nivél na edição foi selecionado');
    //   return;
    // }

    if (index == 0) {
      if (params.length > 0) {
        if (
          Date.parse(editStartedDateTimeRef.current.value) >
          Date.parse(editFinishedDateTimeRef.current.value)
        ) {
          setEditErrorSpan(true);
          setEditErrorSpanBlock(false);
          return;
        }
      }
    } else if (index > 0) {
      if (params.length > 0) {
        if (
          Date.parse(editStartedDateTimeRef.current.value) <=
          Date.parse(params[index - 1].finishedDateTime)
        ) {
          setEditErrorSpanBlock(true);
          setEditErrorSpan(false);
          return;
        }
      }
    }
  
    
    if (
      Date.parse(editStartedDateTimeRef.current.value) <
      Date.parse(editFinishedDateTimeRef.current.value)
    ) {
      //start is less than End
    } else {
      //end is less than start
      setEditErrorSpan(true);
      setEditErrorSpanBlock(false);
      return;
    }
    console.log('editOperationNumber', operationNumber);
    if (operationNumber == 10 || operationNumber == 30) {
      if (!editTramoRef.current) {
        document
          ?.querySelector(`.cnx-operation-params-tramo${index}`)!
          .classList?.add("cnx-input-border-error-highlight");
        return;
      }
    }
    if (operationNumber == 20 || operationNumber == 40) {
      if (!editHorseRef.current) {
        document
          ?.querySelector(`.cnx-operation-params-horse${index}`)!
          .classList?.add("cnx-input-border-error-highlight");
        return;
      }
    }

    const editLevelList = [...params];

    editLevelList[currentEdit] = {
      id: 0,
      level: params.length + 1,
      operationCode:
        editOperationCodeRef?.current?.id ||
        editLevelList[currentEdit].operationCode,
      operationNumber:
        editOperationNumber || editLevelList[currentEdit].operationNumber,
      tramo:
        editOperationNumber == 20 || editOperationNumber == 40
          ? null
          : editTramoRef?.current?.id
          ? editTramoRef?.current?.id
          : editLevelList[currentEdit].tramo,
      vehicle: editVehicleRef?.current?.id,
      horse:
        editOperationNumber == 10 || editOperationNumber == 30
          ? null
          : editHorseRef?.current?.id
          ? editHorseRef?.current?.id
          : editLevelList[currentEdit].horse,
      startedDateTime: editStartedDateTimeRef.current.value,
      finishedDateTime: editFinishedDateTimeRef.current.value,
      status: 1,
      flowId: 0,
    };

    setParams(editLevelList);
    dispacth({
      type: ACTIONS.SET_OPERATION_PARAMS_DATA,
      payload: editLevelList,
    });
    editOperationCodeRef.current = null;
    setCurrentEdit(null);
  }

  function handleRemoveLevel(index: number) {
    const oldList = [...params];
    oldList.splice(index, 1);
    setParams(oldList);
    setCurrentEdit(null);
    dispacth({
      type: ACTIONS.SET_OPERATION_PARAMS_DATA,
      payload: oldList,
    });

  }
  const [showHorse, setShowHorse] = useState(false);
  const [showTramo, setShowTramo] = useState(false);
  const handleOperationType = (e: any) => {
   
    tramoRef.current = null;
    horseRef.current = null;
    if (e.number == 10 || e.number == 30) {
      setIs1030(true);
      setIs2040(false);
      setShowHorse(false);
      setShowTramo(true);
    }
    if (e.number == 20 || e.number == 40) {
      setIs1030(false);
      setIs2040(true);
      setShowHorse(true);
      setShowTramo(false);
    }
  };

  const handleOperationTypeEdit = (operationCodeId: any) => {
    const editLevelList = [...params];

    editLevelList[currentEdit] = {
      id: 0,
      level: params.length + 1,
      operationCode: operationCodeId.id,
      operationNumber: operationCodeId.number,
      tramo: null,
      vehicle: editVehicleRef?.current?.id,
      horse: null,
      startedDateTime: editStartedDateTimeRef.current.value,
      finishedDateTime: editFinishedDateTimeRef.current.value,
      status: Number(editStatusRef?.current?.id),
      flowId: 0,
    };
    setParams(editLevelList);
    dispacth({
      type: ACTIONS.SET_OPERATION_PARAMS_DATA,
      payload: editLevelList,
    });
    editOperationCodeRef.current = null;
  };

  const handleOperation1030 = (e: any) => {
    if (e == 13 || 15) {
      return true;
    } else {
      return false;
    }
  };

  const handleOperation2040 = (e: any) => {
    if (e == 14 || 16) {
      return "show";
    }
    return "hide";
  };

  const today = new Date().toISOString();
  const [errorSpan, setErrorSpan] = useState(false);
  const [errorSpanBlock, setErrorSpanBlock] = useState(false);
  const [errorSpanBlockOperationOrder, setErrorSpanBlockOperationOrder] =
    useState(false);
  const [editErrorSpanBlock, setEditErrorSpanBlock] = useState(false);
  const [EditErrorSpan, setEditErrorSpan] = useState(false);
  const [orderNumberTurn, setOrderNumberTurn]: any = useState('');

  const handleClearOperationBlock = () => {
    setClearSelect(!clearSelect);
    // operationCodeRef.current.value = "";
    startedDateTimeRef.current.value = "";
    finishedDateTimeRef.current.value = "";
    setStartedDateTime('');
    setFinishedDateTime('')
    setOperationNumber(null);

    setIs1030(false);
    setIs2040(false);
    setErrorSpanBlock(false);
    setErrorSpan(false);
  }

  return (
    <AuthLevelContainer>
      <span className="cnx-auth-level-span-cals">Adicionar Operação</span>
      {errorSpan ? (
        <span className="cnx-auth-level-span-alert-error-calsar">
          O campo Data Hora Início deve ser menor que o Data Hora fim!
        </span>
      ) : null}
      {errorSpanBlock ? (
        <span className="cnx-auth-level-span-alert-error-calsar">
          A Data hora inicial da operação deve ser maior do que a Data hora
          final da operação anterior!
        </span>
      ) : null}
      {errorSpanBlockOperationOrder ? (
        <span className="cnx-auth-level-span-alert-error-calsar">{`A Operação seguinte deve ser de código: ${orderNumberTurn}`}</span>
      ) : null}

      <FixedFormContainer>
        <div className="cnx-auth-level-input-container-calic">
          <Select
            inputRef={operationCodeRef}
            keyLabel="code"
            keyValue="id"
            label="Código Operação"
            autoComplete
            onChange={(e) => {
              handleOperationType(e);
              setOperationNumber(e.number);
              setErrorSpanBlockOperationOrder(false);
            }}
            options={enumerators?.operations || []}
            placeholder="Selecionar"
            clear={clearSelect}
          />
          {is1030 ? (
            <Select
              inputRef={tramoRef}
              keyLabel="code"
              keyValue="id"
              label="Tramo"
              className="cnx-operation-params-tramo"
              onChange={() => {
                document
                  ?.querySelector(".cnx-operation-params-tramo")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              mandatory
              autoComplete
              options={enumeratorsTramos || []}
              placeholder="Selecionar"
              clear={clearSelect}
            />
          ) : null}

          {/* <Select
            inputRef={vehicleRef}
            keyLabel="plate"
            keyValue="id"
            label="Veículo"
            autoComplete
            options={enumerators?.vehicles || []}
            placeholder="Selecionar"
            clear={clearSelect}
          /> */}
          {is2040 ? (
            <Select
              inputRef={horseRef}
              keyLabel="plate"
              keyValue="id"
              label="Cavalo"
              className="cnx-operation-params-horse"
              onChange={() => {
                document
                  ?.querySelector(".cnx-operation-params-horse")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
              mandatory
              autoComplete
              options={enumerators?.cavalos || []}
              placeholder="Selecionar"
              clear={clearSelect}
            />
          ) : null}

          <Input
            inputRef={startedDateTimeRef}
            type="datetime-local"
            min={today.slice(0, 16)}
            label="Data hora início"
            onChange={(e: any) => {
              setStartedDateTime(e.target.value);
              setErrorSpan(false);
              setErrorSpanBlock(false);
            }}
          />
          <Input
            inputRef={finishedDateTimeRef}
            min={today.slice(0, 16)}
            type="datetime-local"
            label="Data hora fim"
            onChange={(e: any) => {
              setFinishedDateTime(e.target.value);
              setErrorSpan(false);
              setErrorSpanBlock(false);
            }}
          />
          <Select
            inputRef={statusRef}
            keyLabel="name"
            keyValue="id"
            label="Situação"
            disabled
            options={enumerators?.orderProductionStatus || []}
            defaultOption={1}
            placeholder="Selecionar"
            // clear={clearSelect}
          />
        </div>
        <div className="cnx-auth-level-action-buttons-container-calabc">
          <button className="cnx-auth-level-action-button-calab" type="button" onClick={() => handleClearOperationBlock()}>
            Limpar
          </button>
          <button
            className="cnx-auth-level-action-button-calab"
            type="button"
            onClick={() => handleAddLevel()}
          >
            Adicionar
          </button>
        </div>
      </FixedFormContainer>
      <DynamicFormContainer>
        {params.map((item: any, index: number) => (
          <div
            className={
              currentEdit == index
                ? "cnx-auth-level-form-item-calfi"
                : "cnx-auth-level-form-item-calfi cnx-auth-level-background-disable-calbd"
            }
          >
            <HeaderActions>
              <button
                className="cnx-auth-level-header-action-button-calhab"
                type="button"
                // onClick={() => null}
                onClick={() => {
                  setCurrentEdit(index);
                  setEditErrorSpan(false);
                  setEditErrorSpanBlock(false);
                  setOperationNumber(item.operationNumber);
                }}
              >
                <SingleColumnEdit />
              </button>
              {params.length - 1 == index ? (
                <button
                  className="cnx-auth-level-header-action-button-calhab"
                  type="button"
                  onClick={() => handleRemoveLevel(index)}
                >
                  <ChromeClose width="0.8rem" height="0.8rem" />
                </button>
              ) : null}
            </HeaderActions>
            <div className="cnx-auth-level-input-container-calic">
              {/* <Input
                type="text"
                label="Nível"
                value={index + 1}
                className="cnx-auth-level-minus-width-text-calmwt"
              /> */}
              {/* <Input
                inputRef={editOperationCodeRef}
                defaultValue={item?.operationCode}
                type="text"
                label="Código Operação"
              /> */}
              <Select
                inputRef={
                  currentEdit != index ? editSelectRef : editOperationCodeRef
                }
                keyLabel="code"
                keyValue="id"
                disabled
                label="Código Operação"
                autoComplete
                onChange={(e) => {
                  handleOperationTypeEdit(e);
                  setEditOperationNumber(e.number);
                }}
                options={enumerators?.operations || []}
                placeholder="Selecionar"
                defaultOption={item?.operationCode}
              />
              {item.operationNumber == 10 || item.operationNumber == 30 ? (
                <Select
                  inputRef={currentEdit != index ? editSelectRef : editTramoRef}
                  disabled={currentEdit != index}
                  keyLabel="code"
                  keyValue="id"
                  label="Tramo"
                  mandatory
                  className={`cnx-operation-params-tramo${index}`}
                  onChange={() => {
                    document
                      ?.querySelector(`.cnx-operation-params-tramo${index}`)!
                      .classList?.remove("cnx-input-border-error-highlight");
                  }}
                  autoComplete
                  options={enumeratorsTramos || []}
                  placeholder="Selecionar"
                  defaultOption={item?.tramo}
                />
              ) : null}

              {/* <Select
                inputRef={editVehicleRef}
                disabled={currentEdit != index}
                keyLabel="plate"
                keyValue="id"
                label="Veículos"
                className="cnx-auth-level-minus-width-calmw"
                autoComplete
                options={enumerators?.vehicles || []}
                placeholder="Selecionar"
                defaultOption={item?.vehicle}
              /> */}
              {item.operationNumber == 20 || item.operationNumber == 40 ? (
                <Select
                  inputRef={currentEdit != index ? editSelectRef : editHorseRef}
                  disabled={currentEdit != index}
                  keyLabel="plate"
                  keyValue="id"
                  label="Cavalo"
                  // className="cnx-auth-level-minus-width-calmw"
                  className={`cnx-operation-params-horse${index}`}
                  onChange={() => {
                    document
                      ?.querySelector(`.cnx-operation-params-horse${index}`)!
                      .classList?.remove("cnx-input-border-error-highlight");
                  }}
                  autoComplete
                  options={enumerators?.cavalos || []}
                  placeholder="Selecionar"
                  defaultOption={item?.horse}
                />
              ) : null}
              <Input
                inputRef={
                  currentEdit != index ? editTextRef : editStartedDateTimeRef
                }
                type="datetime-local"
                label="Data hora início"
                disabled={currentEdit != index}
                defaultValue={item?.startedDateTime?.slice(0, 16)}
              />
              <Input
                inputRef={
                  currentEdit != index ? editTextRef : editFinishedDateTimeRef
                }
                type="datetime-local"
                label="Data hora fim"
                disabled={currentEdit != index}
                defaultValue={item?.finishedDateTime?.slice(0, 16)}
              />
              <Select
                inputRef={currentEdit != index ? editSelectRef : editStatusRef}
                disabled
                keyLabel="name"
                keyValue="id"
                label="Situação"
                className="cnx-auth-level-minus-width-calmw"
                autoComplete
                options={enumerators?.orderProductionStatus || []}
                placeholder="Selecionar"
                defaultOption={item?.status}
              />
            </div>
            {currentEdit == index ? (
              <>
                <div>
                  {EditErrorSpan ? (
                    <span className="cnx-auth-level-span-alert-error-calsar">
                      O campo Data Hora Início deve ser menor que o Data Hora
                      fim!
                    </span>
                  ) : null}
                  {editErrorSpanBlock ? (
                    <span className="cnx-auth-level-span-alert-error-calsar">
                      A Data hora inicial da operação deve ser maior do que a
                      Data hora final da operação anterior!
                    </span>
                  ) : null}
                </div>
                <div className="cnx-auth-level-action-buttons-container-calabc">
                  <button
                    className="cnx-auth-level-action-button-calab"
                    type="button"
                    onClick={() => {
                      editStartedDateTimeRef.current.value = item?.startedDateTime?.slice(0, 16)
                      editFinishedDateTimeRef.current.value = item?.finishedDateTime?.slice(0, 16)
                      setCurrentEdit(null);
                    }}
                  >
                    Cancelar Edição
                  </button>
                  <button
                    className="cnx-auth-level-action-button-calab"
                    type="button"
                    onClick={() => handleSaveEdit(index, item.operationNumber)}
                  >
                    Salvar Edição
                  </button>
                </div>
              </>
            ) : null}
          </div>
        ))}
      </DynamicFormContainer>
    </AuthLevelContainer>
  );
}
