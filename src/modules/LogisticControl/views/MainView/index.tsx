import { useState, useId, useRef, useEffect, useContext } from "react";
import "./styles.css";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import useFormatDate from "../../../../hooks/useFormatDate";
import {
  CheckListTextIcon,
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
  ChromeCloseIcon,
  MiniContractIcon,
  MiniExpandIcon,
  PlaybackRate1xIcon,
  RemoveOccurrenceIcon,
  SortDownIcon,
  SortUpIcon,
  SyncIcon,
} from "@fluentui/react-icons-mdl2";
import { axiosInstance } from "../../../../http/axiosInstance";
import {
  _GET_BASES,
  _GET_CLIENTS,
  _GET_ENUMERATOS,
  _GET_ENUMERATOS_ELIPSE,
  _GET_ENUMERATOS_ORDER,
  _GET_HORSE_LOCATION_LIST,
} from "../../routes";
import { IPagination } from "../../routes/types";
import { CnxTable } from "../../../../components/CnxTable";

export function MainView() {
  const {
    dispacth,
    addModal,
    editModal,
    saving,
    rowData,
    enumeratorsOrder,
    cardView,
    editOperationModal,
    cardData,
    loadingTable,
    timeToRefresh,
    autoRefresh,
  } = useContext(UseContext);

  const CNX_HORSE = useId()

  useEffect(() => {
    
    if (cardView == "bases") {
      getBases({ PageSize: 3 });
    }

    if (cardView == "clients") {
      getClients({ PageSize: 3 });
    }

    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {},
    });

    getEnumerators();
    getEnumeratorsOrder();
    getEnumeratorsElipse();
  }, [cardView]);

  function refreshCards(view?: string) {
    if (cardView == "bases") {
      getBases({ PageSize: 3 });
    }

    if (cardView == "clients") {
      getClients({ PageSize: 3 });
    }

    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {},
    });

    getEnumerators();
    getEnumeratorsOrder();
    getEnumeratorsElipse();
  }

  useEffect(() => {
    if (autoRefresh) {
      const intervalId = setInterval(() => {
        const element: any = document.getElementById(
          "cnx-logistic-control-btn-refresh"
        );
        element.click();
        dispacth({
          type: ACTIONS.EDIT_MODAL,
          payload: false,
        });
        dispacth({
          type: ACTIONS.ADD_MODAL,
          payload: false,
        });
        dispacth({
          type: ACTIONS.EDIT_OPERATION_MODAL,
          payload: false,
        });
        const tempCheck: any = document.querySelectorAll(
          `.cnx-horse-list-container-chlc`
        );

        for (const checkbox of tempCheck) {
          checkbox.classList.add("cnx-display-none");
        }
      }, timeToRefresh);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [autoRefresh]);

  async function getEnumerators() {
    try {
      const { data } = await axiosInstance(_GET_ENUMERATOS());
      dispacth({
        type: ACTIONS.SET_ENUMERATORS,
        payload: data,
      });
    } catch (err: any) {
      console.error(err);
    }
  }
  async function getEnumeratorsOrder() {
    try {
      const { data } = await axiosInstance(_GET_ENUMERATOS_ORDER());
      dispacth({
        type: ACTIONS.SET_ENUMERATORS_ORDER,
        payload: data,
      });
    } catch (err: any) {
      console.error(err);
    }
  }
  async function getEnumeratorsElipse() {
    try {
      const { data } = await axiosInstance(_GET_ENUMERATOS_ELIPSE());
      dispacth({
        type: ACTIONS.SET_ENUMERATORS_ELIPSE,
        payload: data,
      });
    } catch (err: any) {
      console.error(err);
    }
  }

  async function getBases({ PageSize, PageNumber }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET_BASES({}));
      dispacth({
        type: ACTIONS.SET_CARD_DATA,
        payload: data,
      });
    } catch (err) {
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  async function getClients({ PageSize, PageNumber }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET_CLIENTS({}));
      dispacth({
        type: ACTIONS.SET_CARD_DATA,
        payload: data,
      });
    } catch (err) {
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  const enumeratorStatus = [
    {
      id: 1,
      name: "Liberado",
    },
    {
      id: 2,
      name: "Chegada de veiculo",
    },
    {
      id: 3,
      name: "Aguardando Início Operação",
    },
    {
      id: 4,
      name: "Em progresso",
    },
    {
      id: 5,
      name: "Encerrado",
    },
    {
      id: 6,
      name: "Cancelado",
    },
    {
      id: 7,
      name: "Bloqueado",
    },
  ];

  function setCardView(view: string) {
    dispacth({
      type: ACTIONS.SET_ACTIVE_CARD_VIEW,
      payload: view,
    });
    setCurrentPage(1);
  }

  function toHorses() {
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: "horses",
    });
  }
  function toEvents() {
    if (!rowData.id) return;
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: "events",
    });
  }
  function toCarretas() {
    // if (!rowData.id) return;
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: "carretas",
    });
  }

  function setSelectRow(event: any, selectedData: any) {
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: selectedData,
    });

    const tempCheck: any = document.querySelectorAll(
      ".cnx-logistic-control-tr-clct"
    );
    for (const checkbox of tempCheck) {
      checkbox?.classList.remove("cnx-logistic-control-selected-row-clcsr");
    }

    setTimeout(() => {
      document
        .getElementById(event)
        ?.classList.add("cnx-logistic-control-selected-row-clcsr");
    }, 20);
  }

  function editOperation() {
    if (!rowData.id) return;
    dispacth({
      type: ACTIONS.EDIT_OPERATION_MODAL,
      payload: true,
    });
  }

  function handleStatusColor(status: number) {
    switch (status) {
      case 1:
        return "cnx-logistic-control-td-yellow-clcty";
      case 2:
        return "cnx-logistic-control-td-lilac-clctl";
      case 3:
        return "cnx-logistic-control-td-grey-clctg";
      case 4:
        return "cnx-logistic-control-td-blue-clctb";
      case 5:
        return "cnx-logistic-control-td-green-clctg";
      case 6:
        return "cnx-logistic-control-td-red-clctr";
      case 7:
        return "cnx-logistic-control-td-dark-red-clctr";
      default:
        return "";
    }
  }

  const selectedItemData: any = [
    {
      id: 3452345,
      orderNumber: 500,
      driverId: 2,
      operationId: 1,
      baseId: 2,
      clientId: 3,
      vehicle: "UOG-3H21",
      destination: "Brasken",
      horse: "6000",
    },
    {
      id: 45245,
      orderNumber: 500,
      driverId: 2,
      operationId: 1,
      baseId: 2,
      clientId: 3,
      vehicle: "PPG-1H61",
      destination: "Brasken",
      horse: "6000",
    },
    {
      id: 245,
      orderNumber: 500,
      driverId: 2,
      operationId: 1,
      baseId: 2,
      clientId: 3,
      vehicle: "IYU-90Y7",
      destination: "Bracell",
      horse: "6000",
    },
    {
      id: 4442,
      orderNumber: 500,
      driverId: 2,
      operationId: 1,
      baseId: 2,
      clientId: 3,
      vehicle: "RDI-23DE",
      destination: "Brasken",
      horse: "6000",
    },
    {
      id: 2240,
      orderNumber: 500,
      driverId: 2,
      operationId: 1,
      baseId: 2,
      clientId: 3,
      vehicle: "PHG-1H61",
      destination: "Humildes",
      horse: "6000",
    },
    {
      id: 67667,
      orderNumber: 500,
      driverId: 2,
      operationId: 1,
      baseId: 2,
      clientId: 3,
      vehicle: "RVU-90Y7",
      destination: "Brasken",
      horse: "6000",
    },
  ];

  // const handleAddId = (data: object[] | undefined) => {
  //   const temp = data?.map((item: object, index: number) => {
  //     return {
  //       ...item,
  //       indexId: index + 1,
  //     };
  //   });
  //   return temp;
  // };

  // const actionBtnSearch = () => {
  //   const selectedList = document.querySelectorAll(".searchable");
  //   const searchableList = Array.from(selectedList);
  //   const filtered = searchableList.filter((item: any) =>
  //     item.innerText
  //       .toLowerCase()
  //       .includes(searchInput.current?.value.toLowerCase())
  //   );
  //   const tempIds = filtered.map((item: any) => {
  //     return Number(item?.dataset?.row_id);
  //   });

  //   const ids = Array.from(new Set(tempIds));

  //   const final = dataList?.filter((item: any) => {
  //     return ids.indexOf(item.indexId) !== -1;
  //   });
  //   setDataList(final);
  // };

  const [maxSelectedData, setMaxSelectedData]: any = useState([]);
  const [group, setGroup] = useState("group0");
  const [groupTitle, setGroupTitle] = useState("");

  let headGroup0 = {
    tramo: "Tramo",
    carreta: "Carreta",
    orderNumber: "Ordem",
    destino: "Destino",
    cavalo: "Cavalo",
    status: "Situação",
  };

  let headGroup1 = {
    tramo: "Tramo",
    carreta: "Carreta",
    orderNumber: "Ordem",
    destino: "Destino",
    status: "Situação",
    estagio: "Estágio",
  };

  let headGroup2 = {
    carreta: "Carreta",
    orderNumber: "Ordem",
    destino: "Destino",
    cavalo: "Cavalo",
  };

  let headGroup3 = {
    carreta: "Carreta",
    orderNumber: "Ordem",
    destino: "Destino",
    cavalo: "Cavalo",
    chegadaPrevista: "Chegada Prevista",
    estagio2: "Estágio",
  };

  function handleHeadGroup(group: string) {
    switch (group) {
      case "group0":
        return headGroup0;
      case "group1":
        return headGroup1;
      case "group2":
        return headGroup2;
      case "group3":
        return headGroup3;
      default:
        return headGroup0;
    }
  }

  const [reTramo, setReTramo] = useState(false);
  const [reCarreta, setReCarreta] = useState(false);
  const [reOrderNumber, setReOrderNumber] = useState(false);
  const [reDestino, setReDestino] = useState(false);
  const [reCavalo, setReCavalo] = useState(false);
  const [reChegadaPrevista, setReChegadaPrevista] = useState(false);
  const [situacao, setSituacao] = useState(false);
  const [estagio, setEstagio] = useState(false);

  const shortByTramo = () => {
    if (reTramo) {
      const sortedByTramo = maxSelectedData.toSorted((a: any, b: any) =>
        a.orderProductions[0]?.orderProductionOperation?.resource?.code.localeCompare(
          b.orderProductions[0]?.orderProductionOperation?.resource?.code
        )
      );
      setMaxSelectedData(sortedByTramo);
    } else {
      const sortedByTramo = maxSelectedData.toSorted((a: any, b: any) =>
        b.orderProductions[0]?.orderProductionOperation?.resource?.code.localeCompare(
          a.orderProductions[0]?.orderProductionOperation?.resource?.code
        )
      );
      setMaxSelectedData(sortedByTramo);
    }
  };

  const shortByCarreta = () => {
    if (reCarreta) {
      const sortedByCarreta = maxSelectedData.toSorted((a: any, b: any) =>
        a.orderCustom?.customVehicle?.plate.localeCompare(
          b.orderCustom?.customVehicle?.plate
        )
      );
      setMaxSelectedData(sortedByCarreta);
    } else {
      const sortedByCarreta = maxSelectedData.toSorted((a: any, b: any) =>
        b.orderCustom?.customVehicle?.plate.localeCompare(
          a.orderCustom?.customVehicle?.plate
        )
      );
      setMaxSelectedData(sortedByCarreta);
    }
  };

  const shortByOrderNumber = () => {
    if (reOrderNumber) {
      const sortedByOrderNumber = maxSelectedData.toSorted((a: any, b: any) =>
        a.orderNumber.localeCompare(b.orderNumber)
      );
      setMaxSelectedData(sortedByOrderNumber);
    } else {
      const sortedByOrderNumber = maxSelectedData.toSorted((a: any, b: any) =>
        b.orderNumber.localeCompare(a.orderNumber)
      );
      setMaxSelectedData(sortedByOrderNumber);
    }
  };

  const shortByDestino = () => {
    if (reDestino) {
      const sortedByDestino = maxSelectedData.toSorted((a: any, b: any) =>
        cardView === "bases"
          ? a.client.name.localeCompare(b.client.name)
          : a?.orderCustom.customBase.name.localeCompare(
              b.orderCustom.customBase.name
            )
      );
      setMaxSelectedData(sortedByDestino);
    } else {
      const sortedByDestino = maxSelectedData.toSorted((a: any, b: any) =>
        cardView === "bases"
          ? b?.client.name.localeCompare(a.client.name)
          : b?.orderCustom.customBase.name.localeCompare(
              a.orderCustom.customBase.name
            )
      );
      setMaxSelectedData(sortedByDestino);
    }
  };

  const shortByCavalo = () => {
    if (reCavalo) {
      const sortedByCavalo = maxSelectedData.toSorted((a: any, b: any) =>
        a.orderProductions[0]?.orderProductionOperation?.customCavalo?.plate.localeCompare(
          b.orderProductions[0]?.orderProductionOperation?.customCavalo?.plate
        )
      );
      setMaxSelectedData(sortedByCavalo);
    } else {
      const sortedByCavalo = maxSelectedData.toSorted((a: any, b: any) =>
        b.orderProductions[0]?.orderProductionOperation?.customCavalo?.plate.localeCompare(
          a.orderProductions[0]?.orderProductionOperation?.customCavalo?.plate
        )
      );
      setMaxSelectedData(sortedByCavalo);
    }
  };

  const shortByChegadaPrevista = () => {
    if (reChegadaPrevista) {
      const sortedByChegadaPrevista = maxSelectedData.toSorted(
        (a: any, b: any) =>
          useFormatDate(
            a?.orderProductions[0]?.orderProductionOperation
              ?.orderProductionOperationAngelLiraResult
              ?.estimatedDestinationArrivedDateTime
          ).localeCompare(
            useFormatDate(
              b?.orderProductions[0]?.orderProductionOperation
                ?.orderProductionOperationAngelLiraResult
                ?.estimatedDestinationArrivedDateTime
            )
          )
      );
      setMaxSelectedData(sortedByChegadaPrevista);
    } else {
      const sortedByChegadaPrevista = maxSelectedData.toSorted(
        (a: any, b: any) =>
          useFormatDate(
            b?.orderProductions[0]?.orderProductionOperation
              ?.orderProductionOperationAngelLiraResult
              ?.estimatedDestinationArrivedDateTime
          ).localeCompare(
            useFormatDate(
              a?.orderProductions[0]?.orderProductionOperation
                ?.orderProductionOperationAngelLiraResult
                ?.estimatedDestinationArrivedDateTime
            )
          )
      );
      setMaxSelectedData(sortedByChegadaPrevista);
    }
  };

  const shortByStatus = () => {
    if (situacao) {
      const sortedByStatus = maxSelectedData.toSorted((a: any, b: any) =>
        a.orderProductions[0]?.status
          .toString()
          .localeCompare(b.orderProductions[0]?.status.toString())
      );
      setMaxSelectedData(sortedByStatus);
    } else {
      const sortedByStatus = maxSelectedData.toSorted((a: any, b: any) =>
        b.orderProductions[0]?.status
          .toString()
          .localeCompare(a.orderProductions[0]?.status.toString())
      );
      setMaxSelectedData(sortedByStatus);
    }
  };
  const shortByStage = () => {
    if (estagio) {
      const sortedByEstagio = maxSelectedData.toSorted((a: any, b: any) =>
        a.orderProductions[0]?.orderProductionOperation?.orderProductionOperationElipseResults[
          a?.orderProductions[0]?.orderProductionOperation
            ?.orderProductionOperationElipseResults.length - 1
        ]?.status
          .toString()
          .localeCompare(
            b.orderProductions[0]?.orderProductionOperation?.orderProductionOperationElipseResults[
              b?.orderProductions[0]?.orderProductionOperation
                ?.orderProductionOperationElipseResults.length - 1
            ]?.status.toString()
          )
      );
      setMaxSelectedData(sortedByEstagio);
    } else {
      const sortedByEstagio = maxSelectedData.toSorted((a: any, b: any) =>
        b.orderProductions[0]?.orderProductionOperation?.orderProductionOperationElipseResults[
          a?.orderProductions[0]?.orderProductionOperation
            ?.orderProductionOperationElipseResults.length - 1
        ]?.status
          .toString()
          .localeCompare(
            a.orderProductions[0]?.orderProductionOperation?.orderProductionOperationElipseResults[
              b?.orderProductions[0]?.orderProductionOperation
                ?.orderProductionOperationElipseResults.length - 1
            ]?.status.toString()
          )
      );
      setMaxSelectedData(sortedByEstagio);
    }
  };

  const customThFunction = [
    {
      key: "tramo",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-short-container-th-re-order">
            {situacao ? <SortUpIcon /> : <SortDownIcon />}

            <span
              className="cnx-custom-th-re-order"
              onClick={() => {
                // TO DO
                setReTramo(!reTramo);
                shortByTramo();
              }}
            >
              Tramo
            </span>
          </div>
        );
      },
    },
    {
      key: "carreta",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-short-container-th-re-order">
            {reCarreta ? <SortUpIcon /> : <SortDownIcon />}
            <span
              className="cnx-custom-th-re-order"
              onClick={() => {
                // TO DO
                setReCarreta(!reCarreta);
                shortByCarreta();
              }}
            >
              Carreta
            </span>
          </div>
        );
      },
    },
    {
      key: "orderNumber",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-short-container-th-re-order">
            {reOrderNumber ? <SortUpIcon /> : <SortDownIcon />}
            <span
              className="cnx-custom-th-re-order"
              onClick={() => {
                // TO DO
                setReOrderNumber(!reOrderNumber);
                shortByOrderNumber();
              }}
            >
              Ordem
            </span>
          </div>
        );
      },
    },
    {
      key: "destino",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-short-container-th-re-order">
            {reDestino ? <SortUpIcon /> : <SortDownIcon />}
            <span
              className="cnx-custom-th-re-order"
              onClick={() => {
                // TO DO
                setReDestino(!reDestino);
                shortByDestino();
              }}
            >
              Destino
            </span>
          </div>
        );
      },
    },
    {
      key: "cavalo",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-short-container-th-re-order">
            {reCavalo ? <SortUpIcon /> : <SortDownIcon />}
            <span
              className="cnx-custom-th-re-order"
              onClick={() => {
                // TO DO
                setReCavalo(!reCavalo);
                shortByCavalo();
              }}
            >
              Cavalo
            </span>
          </div>
        );
      },
    },
    {
      key: "chegadaPrevista",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-short-container-th-re-order">
            {reChegadaPrevista ? <SortUpIcon /> : <SortDownIcon />}
            <span
              className="cnx-custom-th-re-order"
              onClick={() => {
                // TO DO
                setReChegadaPrevista(!reChegadaPrevista);
                shortByChegadaPrevista();
              }}
            >
              Chegada Prevista
            </span>
          </div>
        );
      },
    },
    {
      key: "status",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-short-container-th-re-order">
            {situacao ? <SortUpIcon /> : <SortDownIcon />}
            <span
              className="cnx-custom-th-re-order"
              onClick={() => {
                // TO DO
                setSituacao(!situacao);
                shortByStatus();
              }}
            >
              Situação
            </span>
          </div>
        );
      },
    },
    {
      key: "estagio",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-short-container-th-re-order">
            {situacao ? <SortUpIcon /> : <SortDownIcon />}
            <span
              className="cnx-custom-th-re-order"
              onClick={() => {
                // TO DO
                setEstagio(!estagio);
                shortByStage();
              }}
            >
              Estagio
            </span>
          </div>
        );
      },
    },
  ];

  const customTdFunction = [
    {
      key: "carreta",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {rowData?.orderCustom?.customVehicle?.plate}
          </span>
        );
      },
    },
    {
      key: "destino",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {cardView === "bases"
              ? rowData?.client?.name
              : rowData?.orderCustom?.customBase?.name}
          </span>
        );
      },
    },
    {
      key: "cavalo",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {
              rowData?.orderProductions[0]?.orderProductionOperation
                ?.customCavalo?.plate
            }
          </span>
        );
      },
    },
    {
      key: "tramo",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <span style={{ fontSize: "14px" }} className="searchable">
            {
              rowData?.orderProductions[0]?.orderProductionOperation?.resource
                ?.code
            }
          </span>
        );
      },
    },
    {
      key: "status",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <span style={{ fontSize: "14px" }} className={`searchable`}>
            {rowData?.orderProductions[0]?.strStatus}
          </span>
        );
      },
    },
    {
      key: "chegadaPrevista",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className={`searchable`}>
            {useFormatDate(
              rowValue?.orderProductions[0]?.orderProductionOperation
                ?.orderProductionOperationAngelLiraResult
                ?.estimatedDestinationArrivedDateTime
            ) || ""}
          </span>
        );
      },
    },
    {
      key: "estagio",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className={`searchable`}>
            {
              rowValue?.orderProductions[0]?.orderProductionOperation
                ?.orderProductionOperationElipseResults[
                rowValue?.orderProductions[0]?.orderProductionOperation
                  ?.orderProductionOperationElipseResults.length - 1
              ]?.statusDescription
            }
          </span>
        );
      },
    },
    {
      key: "estagio2",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span style={{ fontSize: "14px" }} className={`searchable`}>
            {
              rowValue?.orderProductions[0]?.orderProductionOperation
                ?.orderProductionOperationAngelLiraResult?.status
            }
          </span>
        );
      },
    },
  ];

  const rowsCheckedRef: any = useRef(null);

  const handleRowsChecked = (data: any) => {
    rowsCheckedRef.current = data;
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: data[0],
    });
  };

  function editMaxOperation() {
    if (rowsCheckedRef.current.length > 1) return;
    dispacth({
      type: ACTIONS.EDIT_OPERATION_MODAL,
      payload: true,
    });
  }

  function toMaxEvents() {
    if (rowsCheckedRef.current.length > 1) return;
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: "events",
    });
  }

  function toResults() {
    if (
      rowData?.orderProductions[0]?.orderProductionOperation?.operation
        ?.number == 10 ||
      rowData?.orderProductions[0]?.orderProductionOperation?.operation
        ?.number == 30
    ) {
      dispacth({
        type: ACTIONS.ADD_ELIPSE_RESULT_MODAL,
        payload: true,
      });
    }
    if (
      rowData?.orderProductions[0]?.orderProductionOperation?.operation
        ?.number == 20 ||
      rowData?.orderProductions[0]?.orderProductionOperation?.operation
        ?.number == 40
    ) {
      dispacth({
        type: ACTIONS.ADD_ANGELIRA_RESULT_MODAL,
        payload: true,
      });
    }
  }

  // **** PAGINATION **** //

  const Data = [
    {
      id: 1,
      name: "POJUCA",
    },
    {
      id: 2,
      name: "BRASKEN",
    },
    {
      id: 3,
      name: "OURIÇANGAS",
    },
    {
      id: 4,
      name: "NOVO CLIENTE 1",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const records = cardData.slice(firstIndex, lastIndex);


  // const numberPage = Math.ceil(Data.length / recordsPerPage);
  const numberPage = Math.ceil(
    cardData ? cardData?.length / recordsPerPage : Data.length / recordsPerPage
  );

  const numbers = [...Array(numberPage + 1).keys()].slice(1);

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== numberPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  const [horseList, setHorseList] = useState([]);

  interface IRenderHorseBy {
    view: string;
    name: string;
  }
  async function renderHorseBy({ name, view }: IRenderHorseBy) {
    const handleCardBaseId = () => {
      const base = enumeratorsOrder?.bases.find(
        (item: any) => item.name?.toLowerCase() === name?.toLowerCase()
      );
      return base.id;
    };
    const handleCardClientId = () => {
      const client = enumeratorsOrder?.clients.find(
        (item: any) => item.name?.toLowerCase() === name?.toLowerCase()
      );
      return client.id;
    };
    if (view === "bases") {
      // dispacth({
      //   type: ACTIONS.LOADING_TABLE,
      //   payload: true,
      // });
      document.getElementById(`cnx-loading-horse-list${CNX_HORSE}`)?.classList.remove('cnx-display-none')
      try {
        const { data } = await axiosInstance(
          _GET_HORSE_LOCATION_LIST({ BaseId: handleCardBaseId() })
        );

        // dispacth({
        //   type: ACTIONS.LOADING_TABLE,
        //   payload: false,
        // });
        setHorseList(data);
        document.getElementById(`cnx-loading-horse-list${CNX_HORSE}`)?.classList.add('cnx-display-none')
      } catch (err) {
        console.error(err);
        dispacth({
          type: ACTIONS.LOADING_TABLE,
          payload: false,
        });
        document.getElementById(`cnx-loading-horse-list${CNX_HORSE}`)?.classList.add('cnx-display-none')
        return null;
      }
    }
    if (view === "clients") {
      // dispacth({
      //   type: ACTIONS.LOADING_TABLE,
      //   payload: true,
      // });
      document.getElementById(`cnx-loading-horse-list${CNX_HORSE}`)?.classList.remove('cnx-display-none')
      try {
        const { data } = await axiosInstance(
          _GET_HORSE_LOCATION_LIST({ ClientId: handleCardClientId() })
        );

        // dispacth({
        //   type: ACTIONS.LOADING_TABLE,
        //   payload: false,
        // });
        setHorseList(data);
        document.getElementById(`cnx-loading-horse-list${CNX_HORSE}`)?.classList.add('cnx-display-none')
      } catch (err) {
        console.error(err);
        dispacth({
          type: ACTIONS.LOADING_TABLE,
          payload: false,
        });
        document.getElementById(`cnx-loading-horse-list${CNX_HORSE}`)?.classList.add('cnx-display-none')
        return null;
      }
    }
  }

  async function setCardId({ name, view }: IRenderHorseBy) {
    const handleCardBaseId = () => {
      const base = enumeratorsOrder?.bases.find(
        (item: any) => item.name?.toLowerCase() === name?.toLowerCase()
      );
      return base.id;
    };
    const handleCardClientId = () => {
      const client = enumeratorsOrder?.clients.find(
        (item: any) => item.name?.toLowerCase() === name?.toLowerCase()
      );
      return client.id;
    };

    if (view === "bases") {
      console.log('disp', handleCardBaseId())
      sessionStorage.setItem('@cnx-card-id', handleCardBaseId())
      sessionStorage.setItem('@cnx-card-view', 'bases')
      dispacth({
        type: ACTIONS.SET_ID_CARD,
        payload: 1,
      });
      return
    }
    if (view === "clients") {
      console.log('disp', handleCardClientId())
      sessionStorage.setItem('@cnx-card-id', handleCardClientId())
      sessionStorage.setItem('@cnx-card-view', 'clients')
      dispacth({
        type: ACTIONS.SET_ID_CARD,
        payload: handleCardClientId(),
      });
      return
    }
  }

  return (
    <div className="cnx-logistic-control-view-container-clcvc">
      {loadingTable ? (
        <div className="cnx-logistic-control-loading-view-clclv">
          <h1>Carregando...</h1>
        </div>
      ) : null}

      <div className="cnx-logistic-control-loaded-container-max-window-clclcmw cnx-display-none">
        <div className="cnx-logistic-control-header-action-max-window-clchmw">
          <span>{groupTitle}</span>

          <div className="cnx-logistic-control-action-buttons-container-clcabc">
            <button
              className="cnx-logistic-control-action-button-clcab"
              type="button"
              onClick={() => editMaxOperation()}
            >
              Operações
            </button>
            <button
              className="cnx-logistic-control-action-button-clcab"
              type="button"
              onClick={() => toMaxEvents()}
            >
              Eventos
            </button>
            <button
              className="cnx-logistic-control-action-button-clcab"
              type="button"
              onClick={() => toResults()}
            >
              Resultados
            </button>
            <div></div>
            <div></div>
            <div></div>
            <button
              type="button"
              onClick={() => {
                document
                  .querySelector(
                    ".cnx-logistic-control-loaded-container-max-window-clclcmw"
                  )
                  ?.classList.add("cnx-display-none");
              }}
            >
              <MiniContractIcon />
            </button>
          </div>
        </div>

        <CnxTable
          title=""
          data={maxSelectedData || []}
          // head={hasTramo ? headTramo : headNoTramo}
          head={handleHeadGroup(group)}
          // buttons={buttons}
          isLoading={loadingTable}
          checkable
          customTdFunction={customTdFunction}
          customThFunction={customThFunction}
          hoverEffect
          enableSummary
          rowsChecked={handleRowsChecked}
        />

        {/* <table className="cnx-logistic-control-table-max-window-clctmw">
          <thead className="cnx-logistic-control-thead-clct">
            <tr className="cnx-logistic-control-tr-max-window-clctmw">
              <th className="cnx-logistic-control-tr-th-max-window-clcttmw">
                Carreta
              </th>
              <th className="cnx-logistic-control-tr-th-max-window-clcttmw">
                Ordem
              </th>
              <th className="cnx-logistic-control-tr-th-max-window-clcttmw">
                Destino
              </th>
              <th className="cnx-logistic-control-tr-th-max-window-clcttmw">
                Cavalo
              </th>
            </tr>
          </thead>
          <tbody className="cnx-logistic-control-max-tbody-clcmt">
            {maxSelectedData?.map((item: any, indexMaxData: number) => (
              <tr
                id={`cnx-transport-${indexMaxData}-max-view`}
                className="cnx-logistic-control-tr-clct"
                onClick={() =>
                  setSelectRow(`cnx-transport-${indexMaxData}-max-view`, item)
                }
              >
                <td className="cnx-logistic-control-tr-td-max-window-clcttmw">
                  {item?.orderCustom?.customVehicle?.plate}
                </td>
                <td className="cnx-logistic-control-tr-td-max-window-clcttmw">
                  {item?.orderNumber}
                </td>
                <td className="cnx-logistic-control-tr-td-max-window-clcttmw">
                  {cardView === "bases"
                    ? item?.client?.name
                    : item?.orderCustom?.customBase?.name}
                </td>
                <td className="cnx-logistic-control-tr-td-max-window-clcttmw">
                  {
                    item?.orderProductions[0]?.orderProductionOperation
                      ?.customCavalo?.plate
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>

      <div className="cnx-logistic-control-header-title-clcht"></div>
      <div className="cnx-logistic-control-header-actions-clcha">
        <div className="cnx-logistic-control-select-view-button-container-clcsvbc">
          <button
            type="button"
            className={`cnx-logistic-control-view-button-clcsvb ${
              cardView === "bases" ? "cnx-bottom-highlight-selector-cbhs" : ""
            }`}
            onClick={async () => {
              setCardView("bases");
              await document.querySelector(".cnx-horse-list-container-chlc")
                ?.classList;

              const tempCheck: any = document.querySelectorAll(
                `.cnx-horse-list-container-chlc`
              );

              for (const checkbox of tempCheck) {
                checkbox.classList.add("cnx-display-none");
              }
            }}
          >
            Base
          </button>
          <button
            type="button"
            className={`cnx-logistic-control-view-button-clcsvb ${
              cardView === "clients" ? "cnx-bottom-highlight-selector-cbhs" : ""
            }`}
            onClick={async () => {
              setCardView("clients");
              await document.querySelector(".cnx-horse-list-container-chlc")
                ?.classList;

              const tempCheck: any = document.querySelectorAll(
                `.cnx-horse-list-container-chlc`
              );

              for (const checkbox of tempCheck) {
                checkbox.classList.add("cnx-display-none");
              }
            }}
          >
            Cliente
          </button>
          <button
            className="cnx-logistic-control-action-button-clcab"
            type="button"
            onClick={() => toCarretas()}
          >
            Carretas
          </button>
        </div>
        {/* <div className="cnx-logistic-control-summary-container-clcsc">
          <span className="cnx-logistic-control-summary-green-color-clcsgc">
            Liberado
          </span>
          <span className="cnx-logistic-control-summary-grey-color-clcsgc">
            Aguardando
          </span>
          <span className="cnx-logistic-control-summary-yellow-color-clcsyc">
            Em Progresso
          </span>
          <span className="cnx-logistic-control-summary-red-color-clcsrc">
            Encerrado
          </span>
        </div> */}
        <div className="cnx-logistic-control-action-buttons-container-clcabc">
          <button
            title={
              autoRefresh
                ? "Desativar atualização automática"
                : "Atualizar a cada 30s"
            }
            type="button"
            className="cnx-logistic-control-view-header-window-button-clmhwb"
            onClick={() => {
              dispacth({
                type: ACTIONS.AUTO_REFRESH,
                payload: !autoRefresh,
              });
            }}
          >
            {autoRefresh ? (
              <RemoveOccurrenceIcon className="cnx-main-dashboard-highlight-refresh" />
            ) : (
              <PlaybackRate1xIcon className="cnx-main-dashboard-view-header-refresh" />
            )}
          </button>
          <button
            id="cnx-logistic-control-btn-refresh"
            title="Atualizar"
            className="cnx-logistic-control-async-button-clcab"
            type="button"
            onClick={() => refreshCards()}
          >
            <SyncIcon />
          </button>
          <button
            className="cnx-logistic-control-action-button-clcab"
            type="button"
            onClick={() => editOperation()}
          >
            Operações
          </button>
          <button
            className="cnx-logistic-control-action-button-clcab"
            type="button"
            onClick={() => toEvents()}
          >
            Eventos
          </button>

          <button
            className="cnx-logistic-control-action-button-clcab"
            type="button"
            onClick={() => toResults()}
          >
            Resultados
          </button>
        </div>
      </div>
      <div className="cnx-logistic-control-card-client-container-clcccc">
        <button
          type="button"
          className="cnx-logistic-control-card-chevron-right-clcccr"
          onClick={() => nextPage()}
        >
          <ChevronRightSmallIcon className="cnx-icon" />
        </button>
        <button
          type="button"
          className="cnx-logistic-control-card-chevron-left-clcccl"
          onClick={() => prevPage()}
        >
          <ChevronLeftSmallIcon className="cnx-icon" />
        </button>
        {records?.map((item: any, indexCard: number) => (
          <div className="cnx-logistic-control-card-client-clccc">
            <div className="cnx-logistic-control-card-title-clcct">
              <div />
              <h1>{item?.name?.toUpperCase()}</h1>
              <div className="cnx-logistic-control-header-actions-container-clchac">
                <button
                  type="button"
                  onClick={async () => {
                    // await document.querySelector(
                    //   ".cnx-horse-list-container-chlc"
                    // )?.classList;

                    const tempCheck: any = document.querySelectorAll(
                      `.cnx-horse-list-container-chlc`
                    );

                    for (const checkbox of tempCheck) {
                      checkbox.classList.add("cnx-display-none");
                    }
                    setTimeout(() => {
                      document
                        .getElementById(`cnx-horse-list-container${CNX_HORSE}${item?.name}`)
                        ?.classList.remove("cnx-display-none");
                      renderHorseBy({ name: item?.name, view: cardView });
                    }, 10);
                  }}
                >
                  <CheckListTextIcon />
                </button>
                <div
                  id={`cnx-horse-list-container${CNX_HORSE}${item?.name}`}
                  className="cnx-horse-list-container-chlc cnx-display-none"
                >
                  <div className="cnx-horse-list-header-chlh">
                    <span>Lista de Cavalo: {item?.name?.toUpperCase()}</span>
                    <button
                      type="button"
                      onClick={() => {
                        document
                          .getElementById(
                            `cnx-horse-list-container${CNX_HORSE}${item?.name}`
                          )
                          ?.classList.add("cnx-display-none");
                      }}
                    >
                      <ChromeCloseIcon />
                    </button>
                  </div>
                  <div
                    id={`cnx-horse-list-ul-li${item?.name?.toLowerCase()}`}
                    className="cnx-horse-list-container"
                  >
                    <span id={`cnx-loading-horse-list${CNX_HORSE}`} className="cnx-loading-horse-list cnx-display-none">Carregando...</span>
                    <ul>
                      {horseList.map((horse: any, indexTramos: number) => (
                        <li className="cnx-nth-bg">
                          {horse.customCavalo?.plate}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* <table className="cnx-logistic-control-table-clct">
                    <thead className="cnx-logistic-control-thead-clct">
                      <tr className="cnx-logistic-control-tr-clct">
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Cavalo
                        </th>
                      </tr>
                    </thead>
                    <tbody className="cnx-logistic-control-tbody-clct">
                      {["HGF5-1234", "DHDY-3542", "KHAF-5643", "HSFA-2652"].map(
                        (horse: any, indexTramos: number) => (
                          <tr
                            id={`cnx-tramo-${indexTramos}-${indexCard}`}
                            className="cnx-logistic-control-tr-clct"
                          >
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {horse}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table> */}
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      type="button"
                      className="cnx-horse-list-edit-button-chleb"
                      onClick={() => {
                        setCardId({ name: item?.name, view: cardView });
                        toHorses();
                      }}
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="cnx-logistic-control-status-card-container2-clcscc">
              <div className="cnx-logistic-control-loaded-container2-clclc">
                <div className="cnx-logistic-control-header-action-clch">
                  <span className="cnx-logistic-control-header-count-clchc">
                    {item?.orders?.groupOne?.length}
                  </span>
                  <span>Tramos</span>
                  <div className="cnx-logistic-control-action-buttons-container-clcabc">
                    <button
                      type="button"
                      onClick={() => {
                        document
                          .querySelector(
                            ".cnx-logistic-control-loaded-container-max-window-clclcmw"
                          )
                          ?.classList.remove("cnx-display-none");
                        setMaxSelectedData(item?.orders?.groupOne);
                        setGroupTitle("Tramos");
                        setGroup("group1");
                      }}
                    >
                      <MiniExpandIcon />
                    </button>
                  </div>
                </div>
                <div className="cnx-logistic-control-table-container-clctc">
                  <table className="cnx-logistic-control-table-clct">
                    <thead className="cnx-logistic-control-thead-clct">
                      <tr className="cnx-logistic-control-tr-clct">
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Tramo
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Carreta
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Ordem
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Destino
                        </th>
                        {/* <th className="cnx-logistic-control-tr-th-clctt">
                          Cavalo
                        </th> */}
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Situação
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Estágio
                        </th>
                      </tr>
                    </thead>
                    <tbody className="cnx-logistic-control-tbody-clct">
                      {item?.orders?.groupOne?.map(
                        (tramo: any, indexTramos: number) => (
                          <tr
                            id={`cnx-tramo-${indexTramos}-${indexCard}`}
                            className="cnx-logistic-control-tr-clct"
                            onClick={() =>
                              setSelectRow(
                                `cnx-tramo-${indexTramos}-${indexCard}`,
                                tramo
                              )
                            }
                          >
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {
                                tramo?.orderProductions[0]
                                  ?.orderProductionOperation?.resource?.code
                              }
                            </td>
                            <td className="cnx-plate-min-screen cnx-logistic-control-tr-td-clctt">
                              {tramo?.orderCustom?.customVehicle?.plate}
                            </td>
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {tramo?.orderNumber}
                            </td>
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {cardView === "bases"
                                ? tramo?.client?.name
                                : tramo?.orderCustom?.customBase?.name}
                            </td>
                            {/* <td className="cnx-logistic-control-tr-td-clctt">
                              {
                                tramo?.orderProductions[0]
                                  ?.orderProductionOperation?.customCavalo
                                  ?.plate
                              }
                            </td> */}
                            <td
                              className={`${handleStatusColor(
                                tramo?.orderProductions[0]?.status
                              )} cnx-logistic-control-tr-td-clctt`}
                            >
                              {tramo?.orderProductions[0]?.strStatus}
                            </td>
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {
                                tramo?.orderProductions[0]
                                  ?.orderProductionOperation
                                  ?.orderProductionOperationElipseResults[
                                  tramo?.orderProductions[0]
                                    ?.orderProductionOperation
                                    ?.orderProductionOperationElipseResults
                                    .length - 1
                                ]?.statusDescription
                              }
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="cnx-logistic-control-loaded-container2-clclc">
                <div className="cnx-logistic-control-header-action-clch">
                  <span className="cnx-logistic-control-header-count-clchc">
                    {item?.orders?.groupZero?.length}
                  </span>
                  <span>Fila de Espera</span>
                  <button
                    type="button"
                    onClick={() => {
                      document
                        .querySelector(
                          ".cnx-logistic-control-loaded-container-max-window-clclcmw"
                        )
                        ?.classList.remove("cnx-display-none");
                      setMaxSelectedData(item?.orders?.groupZero);
                      setGroupTitle("Fila de Espera");
                      setGroup("group0");
                    }}
                  >
                    <MiniExpandIcon />
                  </button>
                </div>
                <div className="cnx-logistic-control-table-container-clctc">
                  <table className="cnx-logistic-control-table-clct">
                    <thead className="cnx-logistic-control-thead-clct">
                      <tr className="cnx-logistic-control-tr-clct">
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Tramo
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Carreta
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Ordem
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Destino
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Cavalo
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Situação
                        </th>
                      </tr>
                    </thead>
                    <tbody className="cnx-logistic-control-tbody-clct">
                      {item?.orders?.groupZero?.map(
                        (tramo: any, indexTramos: number) => (
                          <tr
                            id={`cnx-group-zero-${indexTramos}-${indexCard}`}
                            className="cnx-logistic-control-tr-clct"
                            onClick={() =>
                              setSelectRow(
                                `cnx-group-zero-${indexTramos}-${indexCard}`,
                                tramo
                              )
                            }
                          >
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {
                                tramo?.orderProductions[0]
                                  ?.orderProductionOperation?.resource?.code
                              }
                            </td>
                            <td className="cnx-plate-min-screen cnx-logistic-control-tr-td-clctt">
                              {tramo?.orderCustom?.customVehicle?.plate}
                            </td>
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {tramo?.orderNumber}
                            </td>
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {cardView === "bases"
                                ? tramo?.client?.name
                                : tramo?.orderCustom?.customBase?.name}
                            </td>
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {
                                tramo?.orderProductions[0]
                                  ?.orderProductionOperation?.customCavalo
                                  ?.plate
                              }
                            </td>
                            <td
                              className={`${handleStatusColor(
                                tramo?.orderProductions[0]?.status
                              )} cnx-logistic-control-tr-td-clctt`}
                            >
                              {tramo?.orderProductions[0]?.strStatus}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="cnx-logistic-control-queue-container2-clcqc">
                <div className="cnx-logistic-control-header-action-clch">
                  <span className="cnx-logistic-control-header-count-clchc">
                    {item?.orders?.groupThree?.length}
                  </span>
                  <span>Aguarda Transporte</span>
                  <button
                    type="button"
                    onClick={() => {
                      document
                        .querySelector(
                          ".cnx-logistic-control-loaded-container-max-window-clclcmw"
                        )
                        ?.classList.remove("cnx-display-none");
                      setMaxSelectedData(item?.orders?.groupThree);
                      setGroupTitle("Aguarda Transporte");
                      setGroup("group2");
                    }}
                  >
                    <MiniExpandIcon />
                  </button>
                </div>
                <div className="cnx-logistic-control-table-container-clctc">
                  <table className="cnx-logistic-control-table-clct">
                    <thead className="cnx-logistic-control-thead-clct">
                      <tr className="cnx-logistic-control-tr-clct">
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Carreta
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Ordem
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Destino
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Cavalo
                        </th>
                      </tr>
                    </thead>
                    <tbody className="cnx-logistic-control-tbody-clct">
                      {item?.orders?.groupThree?.map(
                        (queue: any, indexQueue: number) => (
                          <tr
                            id={`cnx-queue-${indexQueue}-${indexCard}`}
                            className="cnx-logistic-control-tr-clct"
                            onClick={() =>
                              setSelectRow(
                                `cnx-queue-${indexQueue}-${indexCard}`,
                                queue
                              )
                            }
                          >
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {queue?.orderCustom?.customVehicle?.plate}
                            </td>
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {queue?.orderNumber}
                            </td>
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {cardView === "bases"
                                ? queue?.client?.name
                                : queue?.orderCustom?.customBase?.name}
                            </td>
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {
                                queue?.orderProductions[0]
                                  ?.orderProductionOperation?.customCavalo
                                  ?.plate
                              }
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="cnx-logistic-control-loaded-container2-clclc">
                <div className="cnx-logistic-control-header-action-clch">
                  <span className="cnx-logistic-control-header-count-clchc">
                    {item?.orders?.groupTwo?.length}
                  </span>
                  <span>Transporte</span>
                  <button
                    type="button"
                    onClick={() => {
                      document
                        .querySelector(
                          ".cnx-logistic-control-loaded-container-max-window-clclcmw"
                        )
                        ?.classList.remove("cnx-display-none");
                      setMaxSelectedData(item?.orders?.groupTwo);
                      setGroupTitle("Transporte");
                      setGroup("group3");
                    }}
                  >
                    <MiniExpandIcon />
                  </button>
                </div>
                <div className="cnx-logistic-control-table-container-clctc">
                  <table className="cnx-logistic-control-table-clct">
                    <thead className="cnx-logistic-control-thead-clct">
                      <tr className="cnx-logistic-control-tr-clct">
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Carreta
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Ordem
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Destino
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Cavalo
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Chegada prevista
                        </th>
                        <th className="cnx-logistic-control-tr-th-clctt">
                          Estágio
                        </th>
                      </tr>
                    </thead>
                    <tbody className="cnx-logistic-control-tbody-clct">
                      {item?.orders?.groupTwo?.map(
                        (trans: any, indexTransport: number) => (
                          <tr
                            id={`cnx-transport-${indexTransport}-${indexCard}`}
                            className="cnx-logistic-control-tr-clct"
                            onClick={() =>
                              setSelectRow(
                                `cnx-transport-${indexTransport}-${indexCard}`,
                                trans
                              )
                            }
                          >
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {trans?.orderCustom?.customVehicle?.plate}
                            </td>
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {trans?.orderNumber}
                            </td>
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {cardView === "bases"
                                ? trans?.client?.name
                                : trans?.orderCustom?.customBase?.name}
                            </td>
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {
                                trans?.orderProductions[0]
                                  ?.orderProductionOperation?.customCavalo
                                  ?.plate
                              }
                            </td>
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {useFormatDate(
                                trans?.orderProductions[0]
                                  ?.orderProductionOperation
                                  ?.orderProductionOperationAngelLiraResult
                                  ?.estimatedDestinationArrivedDateTime
                              ) || ""}
                            </td>
                            <td className="cnx-logistic-control-tr-td-clctt">
                              {
                                trans?.orderProductions[0]
                                  ?.orderProductionOperation
                                  ?.orderProductionOperationAngelLiraResult
                                  ?.status
                              }
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
