import { useState, useId, useRef, useEffect, useContext } from "react";

import { SortLinesAscendingIcon, SortLinesIcon } from '@fluentui/react-icons-mdl2'

import CnxDialog from "../../../../../../components/CnxDialog";
import { CnxTable } from "../../../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../../../context/moduleContext";
import { ACTIONS } from "../../../../context/moduleActions";
import { axiosInstance } from "../../../../../../http/axiosInstance";
import {
  _DELETE,
  _GET,
  _GET_BY_FILTERS,
  _GET_ENUMERATOS,
  _GET_ENUMERATOS_ELIPSE,
  _GET_EXPORT_BY_FILTERS,
} from "../../../../routes";
import { IExport, IPagination } from "../../../../routes/types";
// import { OrderSummary } from "../OrderSummary";
import { ILocales } from "../../../../../../locales/types";
import localesContex from "../../../../../../context/localesContex";
import useFormatDate from "../../../../../../hooks/useFormatDate";
import {
  BlockedIcon,
  ChevronDownIcon,
  ChevronDownSmallIcon,
  ChevronUpIcon,
  ChevronUpSmallIcon,
  ClockIcon,
  Link12Icon,
  PageHeaderEditIcon,
  PlaySolidIcon,
  TrackersIcon,
} from "@fluentui/react-icons-mdl2";
import { OperationsDrillDown } from "../OperationsDrillDown";
import { odernationTableWithBaseColumnSelected } from '../../../../../../utils/ordenationTableToColumn';

interface ITable {
  cnxId?: any;
}

const tableName = 'PAGE_ORDEM'
function Table({ cnxId }: ITable) {
  const { dispacth, tableData, loadingTable, appliedFilters, enumerators } =
    useContext(UseContext);
  const { localesData } = useContext<ILocales>(localesContex);
  const dialogModalDelete = useId();
  const CNX_NO_FILTER = useId();
  const orderExportError = useId();
  const dialogModalError = useId();
  const rowsCheckedRef: any = useRef(null);

  const [sort, setSort] = useState('')

  useEffect(() => {
    if (appliedFilters.length > 0) return;
    getList({ PageSize: 100 });
    getEnumerators();
    getEnumeratorsElipse();
  }, []);

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

  const head = {
    id: localesData?.orders?.table?.columns?.order || "Order",
    link: "Link",
    orderSequence: "Seq. Ordem",
    productId: localesData?.orders?.table?.columns?.product || "Product",
    base: localesData?.orders?.table?.columns?.base || "Base",
    client: localesData?.orders?.table?.columns?.client || "Client",
    vehicle: localesData?.orders?.table?.columns?.vehicle || "Veículo",
    startedDateTime:
      localesData?.orders?.table?.columns?.startDateTime || "Start Date Time",
    finishedDateTime:
      localesData?.orders?.table?.columns?.endDateTime || "End Date Time",
    startedDateTimePlan: "Data Hora Início Plan.",
    finishedDateTimePlan: "Data Hora Fim Plan.",
    volume:
      localesData?.orders?.table?.columns?.plannedVolume || "Plan. Volume (m³)",
    status: localesData?.orders?.table?.columns?.status || "Status",
    // info: localesData?.orders?.table?.columns?.info || "Info",
  };

  const customHead = {
    thRow: "thRow",
  };

  const refreshList = () => {
    // getList({ PageSize: 100 });

    if (appliedFilters.length > 0) {
      getListFiltered({
        PageSize: 100,
        PageNumber: 1,
        Filters: handleQueryString(appliedFilters),
      });
    } else {
      getList({ PageSize: 100, PageNumber: 1 });
    }
  };

  const rowClick = (rowData: any) => {
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: rowData,
    });
  };

  const handleRowsChecked = (data: any) => {
    rowsCheckedRef.current = data;
  };

  const openDeleteConfirm = () => {
    const modal: any = document.getElementById(dialogModalDelete);
    modal?.showModal();
  };

  const closeDeleteConfirm = () => {
    const modal: any = document.getElementById(dialogModalDelete);
    modal?.close();
  };

  const openError = () => {
    const modal: any = document.getElementById(dialogModalError);
    modal?.showModal();
  };

  const closeError = () => {
    const modal: any = document.getElementById(dialogModalError);
    modal?.close();
  };

  const openExportError = () => {
    const modal: any = document.getElementById(CNX_NO_FILTER);
    modal?.showModal();
  };
  const openExportRequestError = () => {
    const modal: any = document.getElementById(orderExportError);
    modal?.showModal();
  };

  const closeExportError = () => {
    const modal: any = document.getElementById(CNX_NO_FILTER);
    modal?.close();
  };

  async function DeleteRecords() {
    const ids = rowsCheckedRef.current.map((item: any) => item?.id);
    try {
      await axiosInstance(_DELETE(ids));
      getList({ PageSize: 100 });
    } catch (err: any) {
      console.log("ERRO", err);
    } finally {
      closeDeleteConfirm();
    }
  }

  const toOperations = (rowData: any) => {
    // dispacth({
    //   type: ACTIONS.SET_GROUP_ID,
    //   payload: groupId,
    // });
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: "operations",
    });
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: rowData,
    });
    dispacth({
      type: ACTIONS.SET_ORDER_ID,
      payload: rowData?.id,
    });
  };

  const toOrderResults = () => {
    // dispacth({
    //   type: ACTIONS.SET_ACTIVE_PAGE,
    //   payload: "orderResults",
    // });
  };

  const buttons = [
    {
      renderButton: (rowsChecked: any) => {
        const handleUserSkill = () => { };
        return (
          <button
            title="Edição em Massa"
            className="cnx-order-button-edit-all-cobea"
            type="button"
            onClick={() => handleDialogEditAll()}
          >
            <PageHeaderEditIcon />
          </button>
        );
      },
    },
  ];

  const toResults = (id: number, operationType: number) => {
    if (operationType == 10 || operationType == 30) {
      dispacth({
        type: ACTIONS.SET_ORDER_OPERATION_ID,
        payload: id,
      });

      dispacth({
        type: ACTIONS.SET_ACTIVE_PAGE,
        payload: "elipseResults",
      });
    }
    if (operationType == 20 || operationType == 40) {
      dispacth({
        type: ACTIONS.SET_ACTIVE_PAGE,
        payload: "angeLiraResults",
      });
      dispacth({
        type: ACTIONS.SET_ORDER_OPERATION_ID,
        payload: id,
      });
    }
  };

  const customThFunction = [
    {
      key: "thRow",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <div className="cnx-custom-drop-down-th-container">
            <div className="cnx-custom-drop-down-row-td-container">
              <div
                className="cnx-custom-drop-down-th-item order-number-actions-th"
                onClick={() => {
                  odernationTableWithBaseColumnSelected.setOrder({ column: 'order', tableName })

                  if (sort === 'order_desc') {
                    setSort('order_asc')
                    return
                  }

                  if (sort === 'order_asc') {
                    setSort('')
                    return
                  }

                  setSort('order_desc')

                }}>

                {
                  sort === 'order_desc' && (
                    <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
                  )
                }

                {
                  sort === 'order_asc' && (
                    <SortLinesIcon style={{ marginRight: '5px' }} />
                  )
                }

                Ordem

              </div>

              <div className="cnx-custom-drop-down-th-item cnx-order-link-th-column"
                onClick={() => {
                  // odernationTableWithBaseColumnSelected.setOrder({ column: 'link', tableName })
                  // if (sort === 'link') {
                  //   setSort('')
                  // } else {
                  //   setSort('link')
                  // }
                }}
              >
                {
                  sort === 'link' && (
                    <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
                  )
                }
                Link
              </div>

              <div className="cnx-custom-drop-down-th-item cnx-order-seq-order-th-column"
                onClick={() => {
                  odernationTableWithBaseColumnSelected.setOrder({ column: 'seq.order', tableName })


                  if (sort === 'seq.order_desc') {
                    setSort('seq.order_asc')
                    return
                  }

                  if (sort === 'seq.order_asc') {
                    setSort('')
                    return
                  }

                  setSort('seq.order_desc')
                }}
              >
                {
                  sort === 'seq.order_desc' && (
                    <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
                  )
                }

                {
                  sort === 'seq.order_asc' && (
                    <SortLinesIcon style={{ marginRight: '5px' }} />
                  )
                }
                Seq. Ordem
              </div>

              <div className="cnx-custom-drop-down-th-item"
                onClick={() => {
                  odernationTableWithBaseColumnSelected.setOrder({ column: 'product', tableName })

                  if (sort === 'product_desc') {
                    setSort('product_asc')
                    return
                  }

                  if (sort === 'product_asc') {
                    setSort('')
                    return
                  }

                  setSort('product_desc')
                }}
              >
                {
                  sort === 'product_desc' && (
                    <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
                  )
                }

                {
                  sort === 'product_asc' && (
                    <SortLinesIcon style={{ marginRight: '5px' }} />
                  )
                }
                Produto</div>

              <div className="cnx-custom-drop-down-th-item"
                onClick={() => {
                  odernationTableWithBaseColumnSelected.setOrder({ column: 'base', tableName })
                  if (sort === 'base_desc') {
                    setSort('base_asc')
                    return
                  }

                  if (sort === 'base_asc') {
                    setSort('')
                    return
                  }

                  setSort('base_desc')
                }}
              >
                {
                  sort === 'base_desc' && (
                    <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
                  )
                }

                {
                  sort === 'base_asc' && (
                    <SortLinesIcon style={{ marginRight: '5px' }} />
                  )
                }

                Base</div>

              <div className="cnx-custom-drop-down-th-item"
                onClick={() => {
                  odernationTableWithBaseColumnSelected.setOrder({ column: 'client', tableName })
                  if (sort === 'client_desc') {
                    setSort('client_asc')
                    return
                  }

                  if (sort === 'client_asc') {
                    setSort('')
                    return
                  }

                  setSort('client_desc')
                }}
              >
                {
                  sort === 'client_desc' && (
                    <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
                  )
                }

                {
                  sort === 'client_asc' && (
                    <SortLinesIcon style={{ marginRight: '5px' }} />
                  )
                }
                Cliente</div>

              <div className="cnx-custom-drop-down-th-item" onClick={() => {
                odernationTableWithBaseColumnSelected.setOrder({ column: 'vehicle', tableName })

                if (sort === 'vehicle_desc') {
                  setSort('vehicle_asc')
                  return
                }

                if (sort === 'vehicle_asc') {
                  setSort('')
                  return
                }

                setSort('vehicle_desc')
              }}>
                {
                  sort === 'vehicle_desc' && (
                    <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
                  )
                }
                {
                  sort === 'vehicle_asc' && (
                    <SortLinesIcon style={{ marginRight: '5px' }} />
                  )
                }
                Veículo</div>

              <div className="cnx-custom-drop-down-th-item"
                onClick={() => {
                  odernationTableWithBaseColumnSelected.setOrder({ column: 'DT_start', tableName })


                  if (sort === 'DT_start_desc') {
                    setSort('DT_start_asc')
                    return
                  }

                  if (sort === 'DT_start_asc') {
                    setSort('')
                    return
                  }

                  setSort('DT_start_desc')
                }}
              >
                {
                  sort === 'DT_start_desc' && (
                    <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
                  )
                }

                {
                  sort === 'DT_start_asc' && (
                    <SortLinesIcon style={{ marginRight: '5px' }} />
                  )
                }

                Data Hora Início
              </div>

              <div className="cnx-custom-drop-down-th-item" onClick={() => {
                odernationTableWithBaseColumnSelected.setOrder({ column: 'DT_send', tableName })


                if (sort === 'DT_end_desc') {
                  setSort('DT_end_asc')
                  return
                }

                if (sort === 'DT_end_asc') {
                  setSort('')
                  return
                }

                setSort('DT_end_desc')
              }}>
                {
                  sort === 'DT_end_desc' && (
                    <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
                  )
                }

                {
                  sort === 'DT_end_asc' && (
                    <SortLinesIcon style={{ marginRight: '5px' }} />
                  )
                }
                Data Hora Fim</div>

              <div className="cnx-custom-drop-down-th-item" onClick={() => {
                odernationTableWithBaseColumnSelected.setOrder({ column: 'DT_start_plan', tableName })
                if (sort === 'DT_start_plan_desc') {
                  setSort('DT_start_plan_asc')
                  return
                }

                if (sort === 'DT_start_plan_asc') {
                  setSort('')
                  return
                }

                setSort('DT_start_plan_desc')
              }}>
                {
                  sort === 'DT_start_plan_desc' && (
                    <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
                  )
                }
                {
                  sort === 'DT_start_plan_asc' && (
                    <SortLinesIcon style={{ marginRight: '5px' }} />
                  )
                }

                Data Hora Início Plan.
              </div>

              <div className="cnx-custom-drop-down-th-item" onClick={() => {
                odernationTableWithBaseColumnSelected.setOrder({ column: 'DT_end_plan', tableName })


                if (sort === 'DT_end_plan_desc') {
                  setSort('DT_end_plan_asc')
                  return
                }

                if (sort === 'DT_end_plan_asc') {
                  setSort('')
                  return
                }

                setSort('DT_end_plan_desc')
              }}>
                {
                  sort === 'DT_end_plan_desc' && (
                    <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
                  )
                }

                {
                  sort === 'DT_end_plan_asc' && (
                    <SortLinesIcon style={{ marginRight: '5px' }} />
                  )
                }

                Data Hora Fim Plan.
              </div>

              <div className="cnx-custom-drop-down-th-item" onClick={() => {
                odernationTableWithBaseColumnSelected.setOrder({ column: 'volume', tableName })


                if (sort === 'volume_desc') {
                  setSort('volume_asc')
                  return
                }

                if (sort === 'volume_asc') {
                  setSort('')
                  return
                }

                setSort('volume_desc')
              }}>
                {
                  sort === 'volume_desc' && (
                    <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
                  )
                }
                {
                  sort === 'volume_asc' && (
                    <SortLinesIcon style={{ marginRight: '5px' }} />
                  )
                }

                Volume Plan. (m³)
              </div>

              <div className="cnx-custom-drop-down-th-item" onClick={() => {
                odernationTableWithBaseColumnSelected.setOrder({ column: 'situation', tableName })

                if (sort === 'situation_desc') {
                  setSort('situation_asc')
                  return
                }

                if (sort === 'situation_asc') {
                  setSort('')
                  return
                }

                setSort('situation_desc')
              }}>
                {
                  sort === 'situation_desc' && (
                    <SortLinesAscendingIcon style={{ marginRight: '5px' }} />
                  )
                }
                {
                  sort === 'situation_asc' && (
                    <SortLinesIcon style={{ marginRight: '5px' }} />
                  )
                }
                Situação</div>
            </div>
          </div>
        );
      },
    },
  ];
  const customTdFunction = [
    {
      key: "thRow",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        const [open, setOpen] = useState(false);
        function handleStatusType(type: number) {
          switch (type) {
            case 1:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-orange" />
                  <span>{`Criado`}</span>
                </div>
              );
            case 2:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-yellow" />
                  <span>{`${localesData?.orders?.customSummary?.released || "Released"
                    }`}</span>
                </div>
              );
            case 3:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-blue" />
                  <span>{`${localesData?.orders?.customSummary?.inProgress ||
                    "In Progress"
                    }`}</span>
                </div>
              );
            case 4:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-green" />
                  <span>{`${localesData?.orders?.customSummary?.finished || "Finished"
                    }`}</span>
                </div>
              );
            case 6:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-black" />
                  <span>{`${localesData?.orders?.customSummary?.blocked || "Blocked"
                    }`}</span>
                </div>
              );
            case 5:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-red" />
                  <span>{`${localesData?.orders?.customSummary?.canceled || "Canceled"
                    }`}</span>
                </div>
              );
            case 7:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <ClockIcon className="cnx-orders-icon-clock-coic" />
                  <span>{`${localesData?.orders?.customSummary?.delayed || "Delayed"
                    }`}</span>
                </div>
              );
            case 0:
              return (
                <div className="cnx-orders-container-bullet-cocb">
                  <BlockedIcon className="cnx-orders-icon-blocked-coib" />
                  <span>{`${localesData?.orders?.customSummary?.noSchedule ||
                    "No Schedule"
                    }`}</span>
                </div>
              );
            default:
              return null;
          }
        }
        return (
          <div className="cnx-custom-drop-down-td-container">
            <div className="cnx-custom-drop-down-row-td-container">
              <div className="cnx-custom-drop-down-td-item order-number-actions-td">
                {open ? (
                  <button
                    className="cnx-custom-drop-down-button"
                    type="button"
                    onClick={() => setOpen(!open)}
                  >
                    <ChevronUpSmallIcon />
                  </button>
                ) : (
                  <button
                    className="cnx-custom-drop-down-button"
                    type="button"
                    onClick={() => setOpen(!open)}
                  >
                    <ChevronDownSmallIcon />
                  </button>
                )}

                <div className="cnx-orders-order-custom-column-coocc">
                  <button
                    type="button"
                    className="cnx-add-area-record-th-number-link"
                    onClick={() => handleDialogEdit(rowValue)}
                  >
                    <span className="searchable">
                      {rowValue?.orderNumber || ""}
                    </span>
                  </button>
                </div>
              </div>
              <div className="cnx-custom-drop-down-td-item cnx-order-link-td-column">
                <>
                  {rowValue?.qtdOrderLink !== 0 ||
                    rowValue?.qtdOrderLinkParent !== 0 ? (
                    <button
                      className="cnx-orders-column-info-coci2"
                      type="button"
                      onClick={() => null}
                    >
                      <Link12Icon />
                    </button>
                  ) : null}
                </>
              </div>
              <div className="cnx-custom-drop-down-td-item cnx-order-seq-order-td-column searchable">
                {rowValue?.orderSequence}
              </div>
              <div className="cnx-custom-drop-down-td-item searchable">
                {rowValue?.product?.code}
              </div>
              <div className="cnx-custom-drop-down-td-item searchable">
                {rowValue?.orderCustom?.customBase?.name}
              </div>
              <div className="cnx-custom-drop-down-td-item searchable">
                {rowValue?.client?.name}
              </div>
              <div className="cnx-custom-drop-down-td-item searchable">
                {rowValue?.orderCustom?.customVehicle?.plate}
              </div>
              <div className="cnx-custom-drop-down-td-item searchable">
                {useFormatDate(rowValue?.startedDateTime)}
              </div>
              <div className="cnx-custom-drop-down-td-item searchable">
                {useFormatDate(rowValue?.finishedDateTime)}
              </div>
              <div className="cnx-custom-drop-down-td-item searchable">
                {useFormatDate(rowValue?.startedDateTimePlan)}
              </div>
              <div className="cnx-custom-drop-down-td-item searchable">
                {useFormatDate(rowValue?.finishedDateTimePlan)}
              </div>
              <div className="cnx-custom-drop-down-td-item searchable">
                {`${rowValue?.orderCustom?.volume.toFixed(2)} m³`}
              </div>
              <div className="cnx-custom-drop-down-td-item searchable">
                {handleStatusType(rowValue?.status)}
              </div>
            </div>
            {open ? (
              <OperationsDrillDown
                id={rowValue?.id}
                rowDataOrden={rowValue}
                cnxId={cnxId}
              />
            ) : null}
          </div>
        );
      },
    },
  ];
  // const customThFunction = [
  //   {
  //     key: "id",
  //     func: (tdValue: any, keyValue: string, rowData: any) => {
  //       return (
  //         <div className="cnx-orders-order-th-custom-column-cootcc">
  //           {keyValue}
  //         </div>
  //       );
  //     },
  //   },
  // ];
  // const customTdFunction = [
  //   {
  //     key: "id",
  //     func: (tdValue: any, keyValue: string, rowValue: any) => {
  //       return (
  //         <div className="cnx-orders-order-custom-column-coocc">
  //           {rowValue?.orderProductions?.length > 0 ? (
  //             <button
  //               className="cnx-orders-has-operation-button-cohob"
  //               type="button"
  //               onClick={() => {
  //                 console.log('### rowValue', rowValue)
  //                 toOperations(rowValue);
  //               }}
  //             >
  //               <PlaySolidIcon />
  //             </button>
  //           ) : (
  //             <button
  //               className="cnx-orders-has-operation-button-cohob cnx-orders-visibility-hidden-covh"
  //               type="button"
  //             >
  //               <PlaySolidIcon />
  //             </button>
  //           )}
  //           <button
  //             type="button"
  //             className="cnx-add-area-record-th-number-link"
  //             onClick={() => handleDialogEdit(rowValue)}
  //           >
  //             <span className="searchable">{rowValue?.orderNumber || ""}</span>
  //           </button>
  //         </div>
  //       );
  //     },
  //   },
  //   {
  //     key: "volume",
  //     func: (tdValue: any, keyValue: string, rowValue: any) => {
  //       return (
  //         <span
  //           style={{ fontSize: "14px" }}
  //           className="searchable"
  //         >{`${rowValue?.orderCustom?.volume.toFixed(2)} m³`}</span>
  //       );
  //     },
  //   },
  //   {
  //     key: "startedDateTime",
  //     func: (tdValue: any, keyValue: string, rowValue: any) => {
  //       return (
  //         <span style={{ fontSize: "14px" }} className="searchable">
  //           {useFormatDate(tdValue)}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     key: "finishedDateTime",
  //     func: (tdValue: any, keyValue: string, rowValue: any) => {
  //       return (
  //         <span style={{ fontSize: "14px" }} className="searchable">
  //           {useFormatDate(tdValue)}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     key: "startedDateTimePlan",
  //     func: (tdValue: any, keyValue: string, rowValue: any) => {
  //       return (
  //         <span style={{ fontSize: "14px" }} className="searchable">
  //           {useFormatDate(tdValue)}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     key: "finishedDateTimePlan",
  //     func: (tdValue: any, keyValue: string, rowValue: any) => {
  //       return (
  //         <span style={{ fontSize: "14px" }} className="searchable">
  //           {useFormatDate(tdValue)}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     key: "productId",
  //     func: (tdValue: any, keyValue: string, rowValue: any) => {
  //       return (
  //         <span style={{ fontSize: "14px" }} className="searchable">
  //           {rowValue?.product?.code || ""}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     key: "base",
  //     func: (tdValue: any, keyValue: string, rowValue: any) => {
  //       return (
  //         <span style={{ fontSize: "14px" }} className="searchable">
  //           {rowValue?.orderCustom?.customBase?.name || ""}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     key: "client",
  //     func: (tdValue: any, keyValue: string, rowValue: any) => {
  //       return (
  //         <span style={{ fontSize: "14px" }} className="searchable">
  //           {rowValue?.client?.name || ""}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     key: "vehicle",
  //     func: (tdValue: any, keyValue: string, rowValue: any) => {
  //       return (
  //         <span style={{ fontSize: "14px" }} className="searchable">
  //           {rowValue?.orderCustom?.customVehicle?.plate || ""}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     key: "realVolume",
  //     func: (tdValue: any, keyValue: string, rowValue: any) => {
  //       return (
  //         <span style={{ fontSize: "14px" }} className="searchable">{`${
  //           tdValue || ""
  //         } m³`}</span>
  //       );
  //     },
  //   },
  //   {
  //     key: "status",
  //     func: (tdValue: any, keyValue: string, rowValue: any) => {
  //       function handleStatusType(type: number) {
  //         switch (type) {
  //           case 1:
  //             return (
  //               <div className="cnx-orders-container-bullet-cocb">
  //                 <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-orange" />
  //                 <span>{`Criado`}</span>
  //               </div>
  //             );
  //           case 2:
  //             return (
  //               <div className="cnx-orders-container-bullet-cocb">
  //                 <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-yellow" />
  //                 <span>{`${
  //                   localesData?.orders?.customSummary?.released || "Released"
  //                 }`}</span>
  //               </div>
  //             );
  //           case 3:
  //             return (
  //               <div className="cnx-orders-container-bullet-cocb">
  //                 <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-blue" />
  //                 <span>{`${
  //                   localesData?.orders?.customSummary?.inProgress ||
  //                   "In Progress"
  //                 }`}</span>
  //               </div>
  //             );
  //           case 4:
  //             return (
  //               <div className="cnx-orders-container-bullet-cocb">
  //                 <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-green" />
  //                 <span>{`${
  //                   localesData?.orders?.customSummary?.finished || "Finished"
  //                 }`}</span>
  //               </div>
  //             );
  //           case 6:
  //             return (
  //               <div className="cnx-orders-container-bullet-cocb">
  //                 <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-black" />
  //                 <span>{`${
  //                   localesData?.orders?.customSummary?.blocked || "Blocked"
  //                 }`}</span>
  //               </div>
  //             );
  //           case 5:
  //             return (
  //               <div className="cnx-orders-container-bullet-cocb">
  //                 <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-red" />
  //                 <span>{`${
  //                   localesData?.orders?.customSummary?.canceled || "Canceled"
  //                 }`}</span>
  //               </div>
  //             );
  //           case 7:
  //             return (
  //               <div className="cnx-orders-container-bullet-cocb">
  //                 <ClockIcon className="cnx-orders-icon-clock-coic" />
  //                 <span>{`${
  //                   localesData?.orders?.customSummary?.delayed || "Delayed"
  //                 }`}</span>
  //               </div>
  //             );
  //           case 0:
  //             return (
  //               <div className="cnx-orders-container-bullet-cocb">
  //                 <BlockedIcon className="cnx-orders-icon-blocked-coib" />
  //                 <span>{`${
  //                   localesData?.orders?.customSummary?.noSchedule ||
  //                   "No Schedule"
  //                 }`}</span>
  //               </div>
  //             );
  //           default:
  //             return null;
  //         }
  //       }
  //       return handleStatusType(tdValue);
  //     },
  //   },
  //   {
  //     key: "info",
  //     func: (tdValue: any, keyValue: string, rowValue: any) => {
  //       return (
  //         <button
  //           className="cnx-orders-column-info-coci"
  //           type="button"
  //           onClick={() => toOrderResults()}
  //         >
  //           <TrackersIcon />
  //         </button>
  //       );
  //     },
  //   },
  //   {
  //     key: "link",
  //     func: (tdValue: any, keyValue: string, rowValue: any) => {
  //       return (
  //         <>
  //           {rowValue?.qtdOrderLink !== 0 || rowValue?.qtdOrderLinkParent !== 0 ? (
  //             <button
  //               className="cnx-orders-column-info-coci2"
  //               type="button"
  //               onClick={() => null}
  //             >
  //               <Link12Icon />
  //             </button>
  //           ) : null}

  //         </>
  //       );
  //     },
  //   },
  // ];

  const handleDialogAdd = () => {
    setTimeout(() => {
      const btn = document.getElementById(`${cnxId}cnx-add-order-modal`);
      btn?.click();
    }, 50);
    // dispacth({
    //   type: ACTIONS.SET_ROW_DATA,
    //   payload: {},
    // });
    // dispacth({
    //   type: ACTIONS.ADD_MODAL,
    //   payload: true,
    // });
    // dispacth({
    //   type: ACTIONS.EDIT_MODAL,
    //   payload: false,
    // });
  };

  const handleDialogEdit = (rowValue: any) => {


    // dispacth({
    //   type: ACTIONS.SET_ROW_DATA,
    //   payload: rowValue,
    // });
    sessionStorage.setItem(
      `${cnxId}cnx-order-row-data`,
      JSON.stringify(rowValue)
    );

    setTimeout(() => {
      const btn = document.getElementById(`${cnxId}cnx-set-order-rowdata`);
      btn?.click();
    }, 100);

    setTimeout(() => {
      const btn = document.getElementById(`${cnxId}cnx-edit-order-modal`);
      btn?.click();
    }, 150);
    // dispacth({
    //   type: ACTIONS.EDIT_MODAL,
    //   payload: true,
    // });
    // dispacth({
    //   type: ACTIONS.ADD_MODAL,
    //   payload: false,
    // });
  };

  const handleDialogEditAll = () => {
    const ids = rowsCheckedRef.current.map((item: any) => item?.id);

    if (ids.length > 0) {
      dispacth({
        type: ACTIONS.SET_ROW_IDS,
        payload: ids,
      });
      dispacth({
        type: ACTIONS.EDIT_MODAL,
        payload: false,
      });
      dispacth({
        type: ACTIONS.ADD_MODAL,
        payload: false,
      });
      dispacth({
        type: ACTIONS.EDIT_ALL_MODAL,
        payload: true,
      });
    }
  };

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
    } catch (err) {
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  const [custoState, setCustomState]: any = useState({
    all: null,
    blocked: null,
    created: null,
    canceled: null,
    delayed: null,
    finished: null,
    inProgress: null,
    noSchedule: null,
    released: null,
  });

  useEffect(() => {
    setCustomState({
      all: tableData?.summary?.qtdTodos || 0,
      blocked: tableData?.summary?.qtdBloqueado || 0,
      created: tableData?.summary?.qtdCriado || 0,
      canceled: tableData?.summary?.qtdCancelado || 0,
      delayed: tableData?.summary?.qtdAtrasado || 0,
      finished: tableData?.summary?.qtdEncerrado || 0,
      inProgress: tableData?.summary?.qtdEmProgresso || 0,
      noSchedule: tableData?.summary?.qtdSemProgramacao || 0,
      released: tableData?.summary?.qtdLiberado || 0,
    });
  }, [tableData]);

  const customSummaryOrders = {
    all: 6,
    blocked: 1,
    canceled: 1,
    delayed: 1,
    finished: 1,
    inProgress: 1,
    noSchedule: 1,
    released: 1,
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

  async function getExportByFiltered({ Filters }: IExport) {
    // dispacth({
    //   type: ACTIONS.LOADING_TABLE,
    //   payload: true,
    // });
    document.getElementById('cnx-order-message-loading-export')?.classList.remove('cnx-display-none')
    try {
      const { data } = await axiosInstance(_GET_EXPORT_BY_FILTERS({ Filters }));

      const blob = new Blob([data], { type: "text/csv;charset=utf-8," });
      const objUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", objUrl);
      link.setAttribute("download", "Producao.csv");
      link.click();

      // document!.querySelector("body").append(link);
    } catch (err: any) {
      console.log("ERRO", err);
      openExportRequestError()
    } finally {
      // dispacth({
      //   type: ACTIONS.LOADING_TABLE,
      //   payload: false,
      // });
      document.getElementById('cnx-order-message-loading-export')?.classList.add('cnx-display-none')
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

  const filterOptions = {
    route: "",
    filters: [
      {
        title: "Número da Ordem",
        query: "OrderNumbers",
        type: "text",
        keyLabel: "name",
        keyValue: "id",
      },
      {
        title: "Data programada",
        query: "ScheduleDate",
        type: "DateRangerPicker",
        keyLabel: "name",
        keyValue: "id",
      },
      {
        title: "Data encerrado",
        query: "ClosedDate",
        type: "DateRangerPickerEnd",
        keyLabel: "name",
        keyValue: "id",
      },
      {
        title: "Base",
        query: "BaseIds",
        type: "MultSelectCheckbox",
        keyLabel: "name",
        keyValue: "id",
        options: enumerators?.bases,
      },
      {
        title: "Cliente",
        query: "ClientIds",
        type: "MultSelectCheckbox",
        keyLabel: "name",
        keyValue: "id",
        options: enumerators?.clients,
      },
      {
        title: "Carreta",
        query: "VehicleIds",
        type: "MultSelectCheckbox",
        keyLabel: "plate",
        keyValue: "id",
        options: enumerators?.vehicles,
      },
      {
        title: "Situação",
        query: "Status",
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        autoComplete: true,
        options: enumerators?.status,
      },
    ],
  };

  // const handlePagination = (dataPage: any) => {
  //   if (dataPage === "first") {
  //     if (tableData?.result?.pageNumber === 1) return;
  //     getList({ PageSize: 100, PageNumber: 1 });
  //   }
  //   if (dataPage === "previous") {
  //     if (tableData?.result?.pageNumber === 1) return;
  //     getList({ PageSize: 100, PageNumber: tableData?.result?.pageNumber - 1 });
  //   }
  //   if (dataPage === "next") {
  //     if (tableData?.result?.pageNumber === tableData?.result?.totalPages)
  //       return;
  //     getList({ PageSize: 100, PageNumber: tableData?.result?.pageNumber + 1 });
  //   }
  //   if (dataPage === "last") {
  //     if (tableData?.result?.pageNumber === tableData?.result?.totalPages)
  //       return;
  //     getList({ PageSize: 100, PageNumber: tableData?.result?.totalPages });
  //   }
  // };

  const handlePagination = (dataPage: any) => {
    if (dataPage === "first") {
      if (tableData?.result?.pageNumber === 1) return;
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
      if (tableData?.result?.pageNumber === 1) return;
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
      if (tableData?.result?.pageNumber === tableData?.result?.totalPages)
        return;
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
      if (tableData?.result?.pageNumber === tableData?.result?.totalPages)
        return;
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

  async function clearAppliedFilters() {
    dispacth({
      type: ACTIONS.SET_FILTERS,
      payload: [],
    });
    getList({ PageSize: 100 });
  }

  const summaryPagination = {
    currentPage: tableData?.result?.pageNumber,
    pageCount: tableData?.result?.totalPages,
    itemCount: tableData?.result?.totalItems,
  };

  const CNX_STYLES = {
    cnxColumnGap: {
      paddingRight: "20px",
    },
  };

  interface ISummary {
    all: number;
    released: number;
    created: number;
    inProgress: number;
    finished: number;
    blocked: number;
    canceled: number;
    delayed: number;
    noSchedule: number;
  }

  function OrderSummary(Summary: ISummary) {
    const { dispacth, page } = useContext(UseContext);
    const { localesData } = useContext<ILocales>(localesContex);

    async function getList({ PageSize, PageNumber, Status }: IPagination) {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: true,
      });
      try {
        const { data } = await axiosInstance(
          _GET({ PageSize, PageNumber, Status })
        );
        dispacth({
          type: ACTIONS.SET_TABLE_DATA,
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

    return (
      <div className="cnx-orders-custom-summary-container-ccosc">
        <div
          className="cnx-orders-container-bullet-cocb"
          onClick={() => {
            setTableList(tableData.result?.items);
            // page === "orders" ? getList({ PageSize: 100 }) : null
          }}
        >
          <span>{`${localesData?.orders?.customSummary?.all || "All"} (${Summary.all
            })`}</span>
        </div>
        <div className="cnx-orders-separators-cos" />
        <div
          className="cnx-orders-container-bullet-cocb"
          onClick={() => {
            setTableList(handleSummaryStatus(1));
            // page === "orders" ? getList({ PageSize: 100, Status: 1 }) : null
          }}
        >
          <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-orange" />
          <span>{`Criado (${Summary.created})`}</span>
        </div>
        <div
          className="cnx-orders-container-bullet-cocb"
          onClick={() => {
            setTableList(handleSummaryStatus(2));
            // page === "orders" ? getList({ PageSize: 100, Status: 2 }) : null
          }}
        >
          <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-yellow" />
          <span>{`${localesData?.orders?.customSummary?.released || "Released"
            } (${Summary.released})`}</span>
        </div>
        <div className="cnx-orders-separators-cos" />
        <div
          className="cnx-orders-container-bullet-cocb"
          onClick={() => {
            setTableList(handleSummaryStatus(3));
            // page === "orders" ? getList({ PageSize: 100, Status: 3 }) : null
          }}
        >
          <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-blue" />
          <span>{`${localesData?.orders?.customSummary?.inProgress || "In Progress"
            } (${Summary.inProgress})`}</span>
        </div>
        <div className="cnx-orders-separators-cos" />
        <div
          className="cnx-orders-container-bullet-cocb"
          onClick={() => {
            setTableList(handleSummaryStatus(4));
            // page === "orders" ? getList({ PageSize: 100, Status: 4 }) : null
          }}
        >
          <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-green" />
          <span>{`${localesData?.orders?.customSummary?.finished || "Finished"
            } (${Summary.finished})`}</span>
        </div>
        <div className="cnx-orders-separators-cos" />
        <div
          className="cnx-orders-container-bullet-cocb"
          onClick={() => {
            setTableList(handleSummaryStatus(6));
            // page === "orders" ? getList({ PageSize: 100, Status: 6 }) : null
          }}
        >
          <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-black" />
          <span>{`${localesData?.orders?.customSummary?.blocked || "Blocked"
            } (${Summary.blocked})`}</span>
        </div>
        <div className="cnx-orders-separators-cos" />
        <div
          className="cnx-orders-container-bullet-cocb"
          onClick={() => {
            setTableList(handleSummaryStatus(5));
            // page === "orders" ? getList({ PageSize: 100, Status: 5 }) : null
          }}
        >
          <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-red" />
          <span>{`${localesData?.orders?.customSummary?.canceled || "Canceled"
            } (${Summary.canceled})`}</span>
        </div>
        {/* <div className="cnx-orders-separators-cos" />
        <div className="cnx-orders-container-bullet-cocb" onClick={() => null}>
          <ClockIcon className="cnx-orders-icon-clock-coic" />
          <span>{`${localesData?.orders?.customSummary?.delayed || "Delayed"} (${
            Summary.delayed
          })`}</span>
        </div>
        <div className="cnx-orders-separators-cos" />
        <div
          className="cnx-orders-container-bullet-cocb"
          onClick={() => {
            setTableList(handleSummaryStatus(0))
            // page === "orders" ? getList({ PageSize: 100, Status: 0 }) : null
          }}
        >
          <BlockedIcon className="cnx-orders-icon-blocked-coib" />
          <span>{`${
            localesData?.orders?.customSummary?.noSchedule || "No Schedule"
          } (${Summary.noSchedule})`}</span>
        </div> */}
      </div>
    );
  }

  const [tableList, setTableList]: any = useState([]);

  useEffect(() => {
    setTableList(tableData.result?.items);
  }, [tableData]);

  const handleSummaryStatus = (status: any) => {
    switch (status) {
      case 1:
        return tableData.result?.items?.filter(
          (item: any) => item?.status == 1
        );
      case 2:
        return tableData.result?.items?.filter(
          (item: any) => item?.status == 2
        );
      case 3:
        return tableData.result?.items?.filter(
          (item: any) => item?.status == 3
        );
      case 4:
        return tableData.result?.items?.filter(
          (item: any) => item?.status == 4
        );
      case 5:
        return tableData.result?.items?.filter(
          (item: any) => item?.status == 5
        );
      case 6:
        return tableData.result?.items?.filter(
          (item: any) => item?.status == 6
        );
      case 0:
        return tableData.result?.items?.filter(
          (item: any) => item?.status == 0
        );
    }
  };

  const handleExport = (data: any) => {
    console.log("data?.filtersSelected", appliedFilters);
    if (appliedFilters.length <= 0) {
      openExportError();
      return;
    }
    getExportByFiltered({
      Filters: handleQueryString(appliedFilters),
    });
  };


  // useEffect(() => {
  //   // console.log({ tableList })

  //   // if (sort === 'order') {
  //   //   let a = tableList.sort((a: any, b: any) => {
  //   //     return a.id - b.id
  //   //   })

  //     setTableList(a)
  //   // }

  // }, [sort, tableList])

  return (
    <div className="cnx-modules-main-container-cmmc">
      <span
        id="cnx-order-message-loading-export"
        className="cnx-display-none"
        style={{
          position: "absolute",
          color: "var(--cnx-secondary-text)",
          fontSize: "14px",
          zIndex: 4,
          right: "20px",
          top: "60px",
        }}
      >
        Download da exportação CSV em andamento...
      </span>
      <CnxDialog
        useId={dialogModalDelete}
        type="warning"
        content={{
          title: "Atenção!",
          message: "Deseja realmente excluir este(s) registro(s)?",
        }}
        cancelButton={() => null}
        confirmButton={() => DeleteRecords()}
      />
      <CnxDialog
        useId={CNX_NO_FILTER}
        type="error"
        content={{
          title: "Exportação cancelada!",
          message: "Necessário selecionar um filtro avançado.",
        }}
      />
      <CnxDialog
        useId={orderExportError}
        type="error"
        content={{
          title: "Erro",
          message: "Erro ao exportar o CSV.",
        }}
      />
      <CnxDialog
        useId={dialogModalError}
        type="error"
        content={{
          title: "Erro!",
          message: "Não foi possível salvar o registro",
        }}
      />
      <CnxTable
        title={localesData?.orders?.table?.title || "Orders"}
        sort={sort}
        data={tableList || []}
        head={customHead}
        isLoading={loadingTable}
        reOrderColumn
        refreshTable={refreshList}
        buttons={buttons}
        exportButton={handleExport}
        // enableRowClick={rowClick}
        checkable
        enablePagination={handlePagination}
        summaryPagination={summaryPagination}
        customSummary={OrderSummary(custoState)}
        customTdFunction={customTdFunction}
        customThFunction={customThFunction}
        hoverEffect
        enableSummary
        rowsChecked={handleRowsChecked}
        actionButton={handleDialogAdd}
        filterButton={filterOptions}
        filterResponse={filterResponse}
        clearAppliedFilters={clearAppliedFilters}
        setFilter={appliedFilters}
        // deleteButton={openDeleteConfirm}
        cnxStyles={CNX_STYLES}
        drillDownCheckbox
        customSearchPlaceHolder="Ordem, Seq.Ordem, Produto, Base, Veículo, Data Hora Inicio, Data Hora Fim"
      />
    </div>
  );
}

export default Table;
