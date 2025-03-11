import React, { useEffect, useState, useRef, useId } from "react";

import Search from "../../assets/icons/FluentUI/SVGs/Search";
import Filter from "../../assets/icons/FluentUI/SVGs/Filter";
import ColumnOptions from "../../assets/icons/FluentUI/SVGs/ColumnOptions";
import Edit from "../../assets/icons/FluentUI/SVGs/Edit";
import Delete from "../../assets/icons/FluentUI/SVGs/Delete";
import ChevronDownSmall from "../../assets/icons/FluentUI/SVGs/ChevronDownSmall";
import CNX_DND from "./components/CNX_DND";
import { ITable, IButtons, IobjEntriesHead, ITdRow } from "./types";
import { handleCustomTheme } from "./utils/handleCustomTheme";
import "./styles.css";
import CheckList from "../../assets/icons/FluentUI/SVGs/CheckList";
import Sync from "../../assets/icons/FluentUI/SVGs/Sync";
import ErrorBadge from "../../assets/icons/FluentUI/SVGs/ErrorBadge";
import CnxFilter from "./components/CnxFilter";
import { CsvImport } from "./components/CsvImport";
import { useContext } from "react";
import localesContex from "../../context/localesContex";
import { ILocales } from "../../locales/types";
import { Select } from "../../components/CnxInput";
import SelectActions from "../CnxInput/InputTypes/SelectActions";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { ChevronDownSmallIcon } from "@fluentui/react-icons-mdl2";

export const CnxTable: React.FC<ITable> = ({
  actionButton,
  rowActions,
  rowActivatedAction,
  rowCloneAction,
  rowDeleteAction,
  rowEditAction,
  rowInactivatedAction,
  saveButton,
  printButton,
  editButton,
  deleteButton,
  deleteAllButton,
  activeAllButton,
  inactiveAllButton,
  filterButton,
  filterResponse,
  clearAppliedFilters,
  csvImportButton,
  exportButton,
  buttons,
  searchActionButtons,
  cnxStyles,
  reOrderColumn,
  data,
  head,
  hiddenColumns,
  customThFunction,
  customTdFunction,
  checkable,
  rowsChecked,
  enableRowClick,
  enablePagination,
  hoverEffect,
  enableSummary,
  summaryPagination,
  isLoading,
  refreshTable,
  customTheme,
  title,
  customSummary,
  noSearchBar,
  setFilter,
  drillDownCheckbox,
  customSearchPlaceHolder,
  sort = ""
}) => {
  const cnxRowsChecked: any = useRef([]);
  const { localesData } = useContext<ILocales>(localesContex);
  const CNX_ID = Math.random().toString(36).substring(2, 7);
  const filterId = useId();
  const csvImportId = useId();

  const searchInput = useRef<HTMLInputElement>(null);

  const [keys, setKeys] = useState<string[]>([]);

  const [defaultKeys, setDefaultKeys] = useState<string[]>([]);

  const [defaultEntries, setDefaultEntries] = useState<any[]>([]);

  const [entriesList, setEntriesList] = useState<IobjEntriesHead[]>([]);

  const [dataList, setDataList] = useState<object[] | undefined>([]);
  const [dataListClone, setDataListClone] = useState<object[] | undefined>([]);

  const [openReOrderColumn, setOpenReOrderColumn] = useState(false);

  if (customTheme) {
    handleCustomTheme(customTheme);
  }

  useEffect(() => {
    cnxRowsChecked.current = [];

  }, [data]);

  useEffect(() => {
    if (head) {
      const objKeysHead = Object.keys(head);

      const objEntriesHead = Object.entries(head).map(
        (item: string[] | number[]) => {
          return {
            key: item[0],
            value: item[1],
          };
        }
      );
      if (hiddenColumns) {
        const objKeysHeadList = objKeysHead.filter(
          (item: string) => !hiddenColumns.includes(item)
        );
        const objEntriesKeysList = objEntriesHead.filter(
          (item: any) => !hiddenColumns.includes(item.key)
        );
        setTimeout(() => {
          setKeys(objKeysHeadList);
          setEntriesList(objEntriesKeysList);
        }, 100);
      } else {
        setKeys(objKeysHead);
      }
      setEntriesList(objEntriesHead);
      setDefaultEntries(objEntriesHead);
      setDefaultKeys(objKeysHead);
    }
  }, [head, hiddenColumns]);

  const [placeholderSearch, setPlaceHolderSearch] = useState("Pesquisar");
  const handlePlaceholderColumn = (data: any[]) => {
    const temp = data.map((item: any) => {
      return item.value;
    });
    const keyList = temp.join(", ");
    setPlaceHolderSearch(keyList);
  };

  useEffect(() => {
    handlePlaceholderColumn(entriesList);
  }, [entriesList]);

  const handleAddId = (data: object[] | undefined) => {
    const temp = data?.map((item: object, index: number) => {
      return {
        ...item,
        indexId: index + CNX_ID,
      };
    });
    return temp;
  };

  useEffect(() => {

    const values: any = handleAddId(data)

    if (sort === 'orderNumber_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        return b.orderNumber.localeCompare(a.orderNumber);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'orderNumber_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        return a.orderNumber.localeCompare(b.orderNumber);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'destination_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        return b.destination.localeCompare(a.destination);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'destination_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        return a.destination.localeCompare(b.destination);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'origin_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        return b.origin.localeCompare(a.origin);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'origin_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        return a.origin.localeCompare(b.origin);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'maintenanceAditionalInfo_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        if (a.maintenanceAditionalInfo !== null && b.maintenanceAditionalInfo !== null) {
          return b.maintenanceAditionalInfo.localeCompare(a.maintenanceAditionalInfo);
        }
        return b
      })

      setDataList(orderList);
      return
    }

    if (sort === 'maintenanceAditionalInfo_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        if (a.maintenanceAditionalInfo !== null && b.maintenanceAditionalInfo !== null) {
          return a.maintenanceAditionalInfo.localeCompare(b.maintenanceAditionalInfo);
        }
        return a
      })

      setDataList(orderList);
      return
    }

    if (sort === 'maintenanceStatus_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        return b.maintenanceStatus.localeCompare(a.maintenanceStatus);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'maintenanceStatus_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        return a.maintenanceStatus.localeCompare(b.maintenanceStatus);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'cavalo_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        return b.cavalo.localeCompare(a.cavalo);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'cavalo_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        return a.cavalo.localeCompare(b.cavalo);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'status_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        return b.status.localeCompare(a.status);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'status_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        return a.status.localeCompare(b.status);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'location_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        return b.location.localeCompare(a.location);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'location_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        return a.location.localeCompare(b.location);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'vehiclePlate_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        return b.vehiclePlate.localeCompare(a.vehiclePlate);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'vehiclePlate_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        return a.vehiclePlate.localeCompare(b.vehiclePlate);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'strIsActived_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        return b.strIsActived.localeCompare(a.strIsActived);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'strIsActived_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        return a.strIsActived.localeCompare(b.strIsActived);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'model_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        return b.model.localeCompare(a.model);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'model_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        return a.model.localeCompare(b.model);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'plate_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        return b.plate.localeCompare(a.plate);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'plate_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        return a.plate.localeCompare(b.plate);
      })

      setDataList(orderList);
      return
    }

    if (sort === 'order_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        return b.id - a.id
      })

      setDataList(orderList);

      return
    }

    if (sort === 'order_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        return a.id - b.id
      })

      setDataList(orderList);

      return
    }

    if (sort === 'seq.order_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        return b.orderSequence - a.orderSequence
      })

      setDataList(orderList);

      return
    }

    if (sort === 'seq.order_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        return a.orderSequence - b.orderSequence
      })

      setDataList(orderList);

      return
    }

    if (sort === 'product_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (b.product.code < a.product.code) return -1
          if (b.product.code > a.product.code) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'product_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (a.product.code < b.product.code) return -1
          if (a.product.code > b.product.code) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'situation_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (b.strStatus < a.strStatus) return -1
          if (b.strStatus > a.strStatus) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'situation_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (a.strStatus < b.strStatus) return -1
          if (a.strStatus > b.strStatus) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'base_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (b.orderCustom.customBase.name < a.orderCustom.customBase.name) return -1
          if (b.orderCustom.customBase.name > a.orderCustom.customBase.name) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'base_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (a.orderCustom.customBase.name < b.orderCustom.customBase.name) return -1
          if (a.orderCustom.customBase.name > b.orderCustom.customBase.name) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'client_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (b.client.name < a.client.name) return -1
          if (b.client.name > a.client.name) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'client_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (a.client.name < b.client.name) return -1
          if (a.client.name > b.client.name) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'vehicle_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (b.orderCustom.customVehicle.vehicle < a.orderCustom.customVehicle.vehicle) return -1
          if (b.orderCustom.customVehicle.vehicle > a.orderCustom.customVehicle.vehicle) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'vehicle_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (a.orderCustom.customVehicle.vehicle < b.orderCustom.customVehicle.vehicle) return -1
          if (a.orderCustom.customVehicle.vehicle > b.orderCustom.customVehicle.vehicle) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'DT_start_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (b.startedDateTime < a.startedDateTime) return -1
          if (b.startedDateTime > a.startedDateTime) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'DT_start_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (a.startedDateTime < b.startedDateTime) return -1
          if (a.startedDateTime > b.startedDateTime) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'DT_end_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (b.finishedDateTime < a.finishedDateTime) return -1
          if (b.finishedDateTime > a.finishedDateTime) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'DT_end_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (a.finishedDateTime < b.finishedDateTime) return -1
          if (a.finishedDateTime > b.finishedDateTime) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'DT_start_plan_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (b.startedDateTimePlan < a.startedDateTimePlan) return -1
          if (b.startedDateTimePlan > a.startedDateTimePlan) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'DT_start_plan_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (a.startedDateTimePlan < b.startedDateTimePlan) return -1
          if (a.startedDateTimePlan > b.startedDateTimePlan) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'DT_end_plan_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (b.finishedDateTimePlan < a.finishedDateTimePlan) return -1
          if (b.finishedDateTimePlan > a.finishedDateTimePlan) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'DT_end_plan_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {
          if (a.finishedDateTimePlan < b.finishedDateTimePlan) return -1
          if (a.finishedDateTimePlan > b.finishedDateTimePlan) return 1

          return 0
        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'volume_desc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {

          return b.orderCustom.volume - a.orderCustom.volume


        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === 'volume_asc') {
      let orderList = values?.sort((a: any, b: any) => {
        try {

          return a.orderCustom.volume - b.orderCustom.volume


        } catch {
          return 0
        }
      })

      setDataList(orderList);

      return
    }

    if (sort === '') {
      let orderList = values?.sort((a: any, b: any) => {
        return b.id - a.id
      })

      setDataList(orderList);
    }




  }, [data, sort]);

  const handleCustomTdFunction = (
    value: any,
    key: string,
    customTdFunction: any
  ) => {
    return customTdFunction?.func(value[key], key, value);
  };

  const handleCustomThFunction = (
    value: any,
    key: string,
    customThFunction: any
  ) => {
    return customThFunction?.func(key, value);
  };

  const handleData = (value: any, key: string, customTdFunction: any) => {
    // if (value[key] === null || value[key] === undefined || value[key] === "") {
    //   return (
    //     <span
    //       style={{
    //         opacity: 0.3,
    //         fontWeight: "bold",
    //         fontSize: "10px",
    //         textOrientation: "mixed",
    //         writingMode: "vertical-rl",
    //         cursor: "default",
    //       }}
    //     >
    //       |
    //     </span>
    //   );
    // }
    if (value[key] === null) {
      return (
        <span
          style={{
            opacity: 0.3,
            fontWeight: "bold",
            fontSize: "10px",
            textOrientation: "mixed",
            writingMode: "vertical-rl",
            cursor: "default",
          }}
        >
          |
        </span>
      );
    }
    if (customTdFunction) {
      return handleCustomTdFunction(value, key, customTdFunction);
    }

    const data = value[key];
    return typeof value[key] == "object" ? `${key} - [object]` : data;
  };

  const handleThData = (value: any, key: string, customThFunction: any) => {
    if (customThFunction) {
      return handleCustomThFunction(value, key, customThFunction);
    }
    return value;
  };

  const actionBtnSearch = () => {
    const selectedList = document.querySelectorAll(".searchable");
    const searchableList = Array.from(selectedList);

    const filtered = searchableList.filter((item: any) =>
      item.innerText
        .toLowerCase()
        .includes(searchInput.current?.value.toLowerCase())
    );
    const tempIds = filtered.map((item: any) => {
      return item?.dataset?.row_id;
    });

    const ids = Array.from(new Set(tempIds));

    const final = dataList?.filter((item: any) => {
      return ids.indexOf(item.indexId) !== -1;
    });
    setDataList(final);
  };

  const actionKeySearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchInput.current?.value) {
      if (e.key === "Enter") {
        actionBtnSearch();
      }
    }
  };

  const clearEmptySearch = () => {
    setDataList(handleAddId(data));
  };

  const handleCheckedId = () => {
    const tempCheck = document.querySelectorAll(
      `input[class='cnx-td-checkbox-${CNX_ID}']:checked`
    );

    if (tempCheck.length > 1) {
      document
        .getElementById(`cnx-table-summary-actions-buttons-ctsab${CNX_ID}`)
        ?.classList.remove("cnx-display-none");
      // document!
      //   .getElementById("cnx-small-button-delete")!
      //   .classList.remove("cnx-mobile-no-display-cmnd");
    } else {
      document
        .getElementById(`cnx-table-summary-actions-buttons-ctsab${CNX_ID}`)
        ?.classList.add("cnx-display-none");
      // document!
      //   .getElementById("cnx-small-button-delete")!
      //   .classList.add("cnx-mobile-no-display-cmnd");
      document!.getElementById(
        "cnx-select-all-id"
      )!.innerHTML = `Selecionar tudo`;
    }

    if (tempCheck.length == data?.length) {
      const checkedAll: any = document.getElementById(`th-check-${CNX_ID}`);
      checkedAll.checked = true;
    }

    if (tempCheck.length < 1 || tempCheck.length < data?.length) {
      const checkedAll: any = document.getElementById(`th-check-${CNX_ID}`);
      checkedAll.checked = false;
    }
    const itemsChecked: any = [];

    for (let i = 0; i < tempCheck.length; i++) {
      if (tempCheck[i].id === "") {
        // null
      } else {
        const result = dataList?.find(
          (row: any) => row.indexId == tempCheck[i].id
        );
        itemsChecked.push(result);
      }
    }

    if (rowsChecked) {
      rowsChecked(itemsChecked);
      cnxRowsChecked.current = itemsChecked;
    }
    document!.querySelector(
      `.cnx-row-selected-crs-${CNX_ID}`
    )!.innerHTML = `${itemsChecked?.length} Registro(s) selecionada(s).`;
  };

  const toggleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const tempCheck: any = document.querySelectorAll(
        `.cnx-td-checkbox-${CNX_ID}`
      );

      for (const checkbox of tempCheck) {
        checkbox.checked = true;
      }
      const itemsChecked: any = [];

      for (let i = 0; i < tempCheck.length; i++) {
        if (tempCheck[i].id === "") {
          // null
        } else {
          const result = dataList?.find(
            (row: any) => row.indexId === tempCheck[i].id
          );
          itemsChecked.push(result);
        }
      }

      if (rowsChecked) {
        rowsChecked(itemsChecked);
        cnxRowsChecked.current = itemsChecked;
        document
          .getElementById(`cnx-table-summary-actions-buttons-ctsab${CNX_ID}`)
          ?.classList.remove("cnx-display-none");
      }
      document!.querySelector(
        `.cnx-row-selected-crs-${CNX_ID}`
      )!.innerHTML = `${itemsChecked?.length} Registro(s) selecionada(s).`;
    } else {
      const tempCheck: any = document.querySelectorAll(
        `.cnx-td-checkbox-${CNX_ID}`
      );
      if (rowsChecked) {
        rowsChecked([]);
        cnxRowsChecked.current = [];
        document
          .getElementById(`cnx-table-summary-actions-buttons-ctsab${CNX_ID}`)
          ?.classList.add("cnx-display-none");
      }
      for (const checkbox of tempCheck) {
        checkbox.checked = false;
      }

      document!.querySelector(
        `.cnx-row-selected-crs-${CNX_ID}`
      )!.innerHTML = `0 Registro(s) selecionada(s).`;
    }
  };

  const toggleCheckAllByButton = () => {
    if (cnxRowsChecked.current.length > 1) {
      const tempCheck: any = document.querySelectorAll(
        `.cnx-td-checkbox-${CNX_ID}`
      );
      if (rowsChecked) {
        rowsChecked([]);
        cnxRowsChecked.current = [];
      }
      for (const checkbox of tempCheck) {
        checkbox.checked = false;
      }

      document!.querySelector(
        `.cnx-row-selected-crs-${CNX_ID}`
      )!.innerHTML = `0 Registro(s) selecionada(s).`;
      document!.getElementById(
        "cnx-select-all-id"
      )!.innerHTML = `Selecionar tudo`;
      document!
        .getElementById("cnx-small-button-delete")!
        .classList.add("cnx-mobile-no-display-cmnd");
    } else {
      const tempCheck: any = document.querySelectorAll(
        `.cnx-td-checkbox-${CNX_ID}`
      );
      for (const checkbox of tempCheck) {
        checkbox.checked = true;
      }
      const itemsChecked = [];
      for (let i = 0; i < tempCheck.length; i++) {
        if (tempCheck[i].id === "") {
          // null
        } else {
          const result = dataList?.find(
            (row: any) => row.indexId == tempCheck[i].id
          );
          itemsChecked.push(result);
        }
      }

      if (rowsChecked) {
        rowsChecked(itemsChecked);
        cnxRowsChecked.current = itemsChecked;
      }
      document!.querySelector(
        `.cnx-row-selected-crs-${CNX_ID}`
      )!.innerHTML = `${itemsChecked?.length} Registro(s) selecionada(s).`;

      if (itemsChecked.length > 1) {
        document!.getElementById(
          "cnx-select-all-id"
        )!.innerHTML = `Deselecionar Tudo`;
      } else {
        document!.getElementById(
          "cnx-select-all-id"
        )!.innerHTML = `Selecionar tudo`;
      }

      document!
        .getElementById("cnx-small-button-delete")!
        .classList.remove("cnx-mobile-no-display-cmnd");
    }
  };

  const ThRow = ({ keys, head }: any) => {
    return (
      <tr
        style={cnxStyles?.cnxThRow ? cnxStyles?.cnxThRow : null}
        className="cnx-tr"
      >
        {checkable ? (
          <th
            style={cnxStyles?.cnxColumnGap ? cnxStyles?.cnxColumnGap : null}
            className="cnx-th th-action cnx-th-checkbox-cthc"
          >
            <input
              id={`th-check-${CNX_ID}`}
              className="th-checkbox"
              type="checkbox"
              onChange={toggleCheckAll}
            />
          </th>
        ) : null}

        {keys.map((key: string) => (
          <th
            style={cnxStyles?.cnxColumnGap ? cnxStyles?.cnxColumnGap : null}
            className="cnx-th"
            key={key}
          >
            {handleThData(
              !head ? key : head[key] || key,
              key,
              customThFunction?.filter((i: any) => i.key === key)[0] || false
            )}
          </th>
        ))}
        {rowActions && <th className="cnx-th">Ações</th>}
      </tr>
    );
  };

  const handleIndexIdChecked = (indexId: any) => {
    const result = cnxRowsChecked.current.some(
      (item: any) => item.indexId == indexId
    );
    return result;
  };
  const TdRow = ({ entries, value }: ITdRow) => {
    const selectRef: any = useRef(null);
    function closeDialogByOnClickOutside() {
      document
        .getElementById(
          `cnx-table-actions-list-ctala${CNX_ID}${value?.indexId}`
        )
        ?.classList.add("cnx-display-none");
    }
    useOnClickOutside(selectRef, closeDialogByOnClickOutside);
    return (
      <tr
        style={cnxStyles?.cnxTdRow ? cnxStyles?.cnxTdRow : null}
        className={hoverEffect ? "cnx-tr cnx-hover-effect" : "cnx-tr"}
      >
        {checkable ? (
          <td
            // style={{display: 'flex', alignItems: 'flex-start'}}
            style={cnxStyles?.cnxColumnGap ? cnxStyles?.cnxColumnGap : null}
            className={
              drillDownCheckbox
                ? "cnx-td-drill-down-checkbox"
                : "cnx-td td-action"
            }
          >
            <input
              id={value.indexId}
              className={`cnx-td-checkbox-${CNX_ID}`}
              type="checkbox"
              defaultChecked={handleIndexIdChecked(value?.indexId)}
              onChange={() => handleCheckedId()}
            />
            <div className="cnx-row-actions-buttons">
              {editButton ? (
                <button
                  className="cnx-small-icon-button-csib"
                  type="button"
                  onClick={() => editButton("data")}
                >
                  <Edit />
                </button>
              ) : null}
              {deleteButton ? (
                <button
                  className="cnx-small-icon-button-csib"
                  type="button"
                  onClick={() => deleteButton("data")}
                >
                  <Delete />
                </button>
              ) : null}
              {buttons?.map((button: IButtons) => button.renderButton(value))}
            </div>
          </td>
        ) : null}

        {entries?.map((item: any) => (
          <td
            style={cnxStyles?.cnxColumnGap ? cnxStyles?.cnxColumnGap : null}
            className="cnx-td searchable"
            key={item.key}
            data-row_id={value.indexId}
            data-label={item.value}
            onClick={() => (enableRowClick ? enableRowClick(value) : null)}
          >
            {/* {value[item.key]} */}
            {handleData(
              value,
              item.key,
              customTdFunction?.filter((i: any) => i.key === item.key)[0] ||
              false
            )}
          </td>
        ))}
        {rowActions && (
          <td className="cnx-td">
            <button
              className="cnx-table-actions-row-button-ctarb"
              type="button"
              onClick={() => {
                document
                  .getElementById(
                    `cnx-table-actions-list-ctala${CNX_ID}${value?.indexId}`
                  )
                  ?.classList.remove("cnx-display-none");
              }}
            >
              Ações <ChevronDownSmallIcon />
            </button>
            <div
              ref={selectRef}
              id={`cnx-table-actions-list-ctala${CNX_ID}${value?.indexId}`}
              className="cnx-display-none cnx-table-actions-list-li-ctall"
              style={{ position: "absolute" }}
            >
              <ul>
                <li>
                  <button
                    className="cnx-table-actions-list-li-button-ctallb"
                    type="button"
                    onClick={() =>
                      rowEditAction ? rowEditAction(value) : null
                    }
                  >
                    Editar
                  </button>
                </li>
                <li>
                  <button
                    className="cnx-table-actions-list-li-button-ctallb"
                    type="button"
                  >
                    Inativar
                  </button>
                </li>
                <li>
                  <button
                    className="cnx-table-actions-list-li-button-ctallb"
                    type="button"
                  >
                    Ativar
                  </button>
                </li>
                <li>
                  <button
                    className="cnx-table-actions-list-li-button-ctallb"
                    type="button"
                  >
                    Clonar
                  </button>
                </li>
                <li>
                  <button
                    className="cnx-table-actions-list-li-button-ctallb"
                    type="button"
                    onClick={() =>
                      rowDeleteAction ? rowDeleteAction(value) : null
                    }
                  >
                    Excluir
                  </button>
                </li>
              </ul>
            </div>
          </td>
        )}
      </tr>
    );
  };

  const [filtersSelected, setFiltersSelected] = useState([]);

  const handleFilterResponse = (data: any) => {
    if (filterResponse) filterResponse(data);
    setFiltersSelected(data?.filtersSelected);
  };

  const openFilter = () => {
    document
      .getElementById(filterId)
      ?.classList.remove("cnx-filter-display-none-cfdn");
  };

  const [clearFilter, setClearFilter] = useState(true);

  const handleClearFilter = () => {
    setClearFilter(!clearFilter);
    setFiltersSelected([]);
    if (clearAppliedFilters) {
      clearAppliedFilters();
    }
  };

  const handleOpenCsvImport = () => {
    document
      .getElementById(csvImportId)
      ?.classList.remove("cnx-csv-import-container-display-none-ccidn");
  };

  const ref = useRef(null);
  const handleClickOutside = () => {
    if (document.getElementById("cnx-export-ul-id")?.classList.contains("cnx-export-ul-ceu-show")) {

    }
    document.querySelector('.cnx-export-ul-ceu')?.classList.toggle('cnx-export-ul-ceu-show');
    // document.querySelector('.cnx-export-chevron-svg-cecs')?.classList.remove('cnx-factory-plant-chevron-svg-up-cfpcsu');
  }
  const handleToggle = () => {
    // document.querySelector('.cnx-export-chevron-svg-cfpcs')?.classList.toggle('cnx-factory-plant-chevron-svg-up-cfpcsu');
    document.querySelector('.cnx-export-ul-ceu')?.classList.toggle('cnx-export-ul-ceu-show');
  }
  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className="cnx-main-container-cmc">
      {filterButton ? (
        <CnxFilter
          id={filterId}
          filterOptions={filterButton}
          filterResponse={handleFilterResponse}
          setFilter={setFilter}
          clearFilter={clearFilter}
        />
      ) : null}
      <CsvImport id={csvImportId} csvImportButton={csvImportButton} />
      {openReOrderColumn ? (
        <CNX_DND
          keys={keys}
          setKeys={setKeys}
          defaultKeys={defaultKeys}
          entries={entriesList}
          setEntriesList={setEntriesList}
          defaultEntries={defaultEntries}
          head={head}
          setOpenReOrderColumn={setOpenReOrderColumn}
        />
      ) : null}
      <div
        className={
          title
            ? "cnx-table-section-container-ctsc"
            : "cnx-table-section-container-no-title-ctscnt"
        }
      >
        {title ? <h1 className="cnx-table-title-ctt">{title}</h1> : null}
        <section className="cnx-table-actions-cta">
          <div className="cnx-table-actions-ctb">
            {noSearchBar ? null : (
              <div className="cnx-input-search-actions-container-cisac">
                <div className="cnx-input-search-container-cisc">
                  <input
                    type="search"
                    style={
                      cnxStyles?.cnxInputSearch
                        ? cnxStyles?.cnxInputSearch
                        : null
                    }
                    className="cnx-input-search-cis"
                    ref={searchInput}
                    placeholder={customSearchPlaceHolder ? customSearchPlaceHolder : placeholderSearch}
                    onKeyUp={(e) => actionKeySearch(e)}
                    onChange={(e) =>
                      e.target.value.length < 1 ? clearEmptySearch() : null
                    }
                  />
                  <button
                    type="button"
                    style={
                      cnxStyles?.cnxButtonSearch
                        ? cnxStyles?.cnxButtonSearch
                        : null
                    }
                    className="cnx-search-button-csb"
                    onClick={() => actionBtnSearch()}
                  >
                    <Search />
                  </button>
                </div>
              </div>
            )}
            {filterButton ? (
              <div className="cnx-table-filter-button-container-ctfbc">
                <button
                  type="button"
                  className="cnx-table-filter-open-button-ctfob"
                  onClick={() => openFilter()}
                >
                  <Filter />
                  <span>
                    {localesData?.cnxTable?.buttons?.filter || "Filter"}
                  </span>
                </button>
                {setFilter.length > 0 ? (
                  <button
                    type="button"
                    className="cnx-table-filter-clear-button-ctfcb"
                    onClick={() => handleClearFilter()}
                  >
                    <ErrorBadge width="14px" height="14px" />
                  </button>
                ) : null}
              </div>
            ) : null}
            {searchActionButtons?.map((button: IButtons) =>
              button.renderButton(cnxRowsChecked.current)
            )}
          </div>
          <div
            className="cnx-actions-buttons-container-cabc"
            style={
              cnxStyles?.cnxActionButtonsContainer
                ? cnxStyles?.cnxActionButtonsContainer
                : null
            }
          >
            <div
              id={`cnx-table-summary-actions-buttons-ctsab${CNX_ID}`}
              className="cnx-table-summary-actions-buttons-ctsab cnx-display-none"
            >
              {deleteAllButton && (
                <button
                  className="cnx-table-export-button-cteb"
                  type="button"
                  onClick={() => deleteAllButton()}
                >
                  Excluir
                </button>
              )}
              {activeAllButton && (
                <button className="cnx-table-export-button-cteb" type="button">
                  Ativar
                </button>
              )}
              {inactiveAllButton && (
                <button className="cnx-table-export-button-cteb" type="button">
                  Inativar
                </button>
              )}
            </div>
            <div className="cnx-actions-buttons-cab">
              {reOrderColumn ? (
                <button
                  title={
                    localesData?.cnxTable?.buttons?.reOrderColumnLabel ||
                    "Reorder Column"
                  }
                  className="cnx-small-icon-button-csib"
                  type="button"
                  onClick={() => setOpenReOrderColumn(true)}
                >
                  <ColumnOptions />
                </button>
              ) : null}
              {editButton ? (
                <button
                  title={localesData?.cnxTable?.buttons?.editLabel || "Delete"}
                  className="cnx-small-icon-button-csib cnx-mobile-no-display-cmnd"
                  type="button"
                  onClick={() => editButton("data")}
                >
                  <Edit />
                </button>
              ) : null}
              {deleteButton ? (
                <button
                  id="cnx-small-button-delete"
                  title={
                    localesData?.cnxTable?.buttons?.deleteLabel || "Delete"
                  }
                  className="cnx-small-icon-button-csib cnx-mobile-no-display-cmnd"
                  type="button"
                  onClick={() => deleteButton("data")}
                >
                  <Delete />
                </button>
              ) : null}
            </div>
            {buttons?.map((button: IButtons) =>
              button.renderButton(cnxRowsChecked.current)
            )}
            {exportButton ? (
              <div className="cnx-export-button-container-cebc">
                <button
                  className="cnx-table-export-button-cteb"
                  type="button"
                  onClick={() => {
                    handleToggle()
                    // document.getElementById("cnx-export-options-id")?.classList.toggle("cnx-display-none")
                  }}
                >
                  {localesData?.cnxTable?.buttons?.export || "Export"}
                </button>

                <ul id="cnx-export-ul-id" className='cnx-export-ul-ceu'>
                  <li><button onClick={() => {
                    exportButton('o5');
                    // handleClickOutside()
                    document.querySelector('.cnx-export-ul-ceu')?.classList.toggle('cnx-export-ul-ceu-show');
                    // document.getElementById("cnx-export-options-id")?.classList.add("cnx-display-none")
                  }}>CSV</button></li>
                </ul>

              </div>
            ) : null}
            {csvImportButton ? (
              <button
                className="cnx-table-csv-import-button-ctcib"
                type="button"
                onClick={() => handleOpenCsvImport()}
              >
                {localesData?.cnxTable?.buttons?.csvImport || "CSV Import"}
              </button>
            ) : null}

            {actionButton ? (
              <button
                type="button"
                className="cnx-action-button-cab"
                onClick={actionButton}
              >
                {localesData?.cnxTable?.buttons?.addButton || "Add"}
              </button>
            ) : null}
            {saveButton ? (
              <button
                title="Salvar"
                type="button"
                className="cnx-save-button-csb"
                onClick={actionButton}
              >
                {localesData?.cnxTable?.buttons?.saveButton || "Save"}
              </button>
            ) : null}
            {printButton ? (
              <button
                type="button"
                className="cnx-print-button-print-cpbp"
                onClick={printButton}
              >
                Imprimir
              </button>
            ) : null}
          </div>
        </section>

        {isLoading ? (
          <div className="cnx-isloading-table-container-citc">
            <div className="cnx-loading-height-size-clhs">
              <span>{`${localesData.cnxTable.loading || "Loading..."}`}</span>
            </div>
          </div>
        ) : (
          <>
            {customSummary ? customSummary : null}
            {noSearchBar ? null : (
              <div className="cnx-loading-table-container-cltc">
                {enableSummary ? (
                  <div className="cnx-row-summary-crs">
                    <span className="cnx-row-records-crr mr-5px">
                      {summaryPagination ? (
                        <>
                          {`${localesData.cnxTable.summary.showing || "Showing"
                            } ${data?.length} ${localesData.cnxTable?.summary?.of || "of"
                            } ${summaryPagination?.itemCount} ${localesData.cnxTable.summary.records || "record(s)."
                            } `}
                        </>
                      ) : (
                        <>{`${localesData.cnxTable.summary.showing || "Showing"
                          } ${data?.length} ${localesData.cnxTable.summary.records || "record(s)."
                          } `}</>
                      )}
                    </span>
                    {checkable ? (
                      <div className="cnx-row-selected-container-crsc">
                        <span
                          className={`cnx-row-selected-crs cnx-row-selected-crs-${CNX_ID} mr-5px`}
                        >
                          {`0 ${localesData.cnxTable.summary.records || "record(s)."
                            } ${localesData.cnxTable.summary.selected || "selected."
                            } `}
                        </span>
                        <button
                          type="button"
                          className="cnx-select-all-button-csab"
                          onClick={toggleCheckAllByButton}
                        >
                          <CheckList />
                          <span id="cnx-select-all-id">{`${localesData.cnxTable.summary.selectAll ||
                            "Select all"
                            }`}</span>
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div />
                )}
                {refreshTable ? (
                  <button
                    type="button"
                    className="cnx-refresh-table-button-crtb"
                    onClick={() => refreshTable()}
                  >
                    <Sync width="0.9rem" height="0.9rem" />
                    <span>{`${localesData.cnxTable.refreshList || "Refresh list"
                      }`}</span>
                  </button>
                ) : null}
              </div>
            )}
          </>
        )}
        <div className="cnx-table-container-ctc">
          <table className="cnx-table-ct">
            <thead className="cnx-thead-ct">
              <ThRow keys={keys} head={head} />
            </thead>
            <tbody className="cnx-tbody-ct">
              {dataList?.map((value: object, index: number) => (
                <TdRow entries={entriesList} value={value} index={index} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="cnx-table-bottom-ctb">
          {enablePagination ? (
            <div className="cnx-pagination-container-cpc">
              <button
                type="button"
                onClick={() => enablePagination("first")}
                style={
                  cnxStyles?.cnxPaginationButton
                    ? cnxStyles?.cnxPaginationButton
                    : null
                }
                className="cnx-pagination-button-cpb"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="cnx-icon-pagination-cip"
                >
                  <path
                    fill="currentColor"
                    d="M77.25 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C175.6 444.9 183.8 448 192 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L77.25 256zM269.3 256l137.4-137.4c12.5-12.5 12.5-32.75 0-45.25s-32.75-12.5-45.25 0l-160 160c-12.5 12.5-12.5 32.75 0 45.25l160 160C367.6 444.9 375.8 448 384 448s16.38-3.125 22.62-9.375c12.5-12.5 12.5-32.75 0-45.25L269.3 256z"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => enablePagination("previous")}
                style={
                  cnxStyles?.cnxPaginationButton
                    ? cnxStyles?.cnxPaginationButton
                    : null
                }
                className="cnx-pagination-button-cpb"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 512"
                  className="cnx-icon-pagination-cip"
                >
                  <path
                    fill="currentColor"
                    d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
                  />
                </svg>
              </button>
              {summaryPagination ? (
                <>
                  <span className="cnx-span-summary-css">
                    {summaryPagination.currentPage}
                  </span>
                  <span className="cnx-span-summary-css">de</span>
                  <span className="cnx-span-summary-css">
                    {summaryPagination.pageCount}
                  </span>
                </>
              ) : null}
              {/* {SummaryPagination ? (
              <>
                <span>{SummaryPagination.currentPage}</span>
                <span>{translate("dataTable.indexOf")}</span>
                <span>{SummaryPagination.pageCount}</span>
              </>
            ) : null} */}
              <button
                type="button"
                onClick={() => enablePagination("next")}
                style={
                  cnxStyles?.cnxPaginationButton
                    ? cnxStyles?.cnxPaginationButton
                    : null
                }
                className="cnx-pagination-button-cpb"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 512"
                  className="cnx-icon-pagination-cip"
                >
                  <path
                    fill="currentColor"
                    d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => enablePagination("last")}
                style={
                  cnxStyles?.cnxPaginationButton
                    ? cnxStyles?.cnxPaginationButton
                    : null
                }
                className="cnx-pagination-button-cpb"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="cnx-icon-pagination-cip"
                >
                  <path
                    fill="currentColor"
                    d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z"
                  />
                </svg>
              </button>
            </div>
          ) : null}
        </div>
        <div className="cnx-space-bottom-container-csbc">
          <div className="cnx-div-space-bottom-cdsb" />
        </div>
      </div>
    </div>
  );
};
