import React, { useState, useRef } from "react";
import Sort from "../../../../assets/icons/FluentUI/SVGs/Sort";
import "./styles.css";

interface ICNX_DND {
  keys: string[];
  setKeys: (data: string[]) => void;
  defaultKeys: string[];
  entries?: any;
  setEntriesList: (data: any) => void;
  defaultEntries: any;
  head: object;
  setOpenReOrderColumn: (data: boolean) => void;
}

const CNX_DND: React.FC<ICNX_DND> = ({
  defaultKeys,
  keys,
  head,
  setKeys,
  setEntriesList,
  entries,
  defaultEntries,
  setOpenReOrderColumn,
}) => {
  const selectColumn: any = useRef();
  const dragItem: any = useRef();
  const dragOverItem: any = useRef();
  const [list, setList] = useState(keys);

  const dragStart = (e: any, position: any) => {
    dragItem.current = position;
    // console.log(e.target.innerHTML);
  };

  const dragEnter = (e: any, position: any) => {
    dragOverItem.current = position;
    document.getElementById(`key${position}`)?.classList.add("hover-drag");
  };

  const dragLeave = (e: any, position: any) => {
    dragOverItem.current = position;
    document.getElementById(`key${position}`)?.classList.remove("hover-drag");
  };

  const drop = (e: any) => {
    const copyListItems = [...list];
    const copyListEntriesItems = [...entries];
    // copyListItems
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    // copyListItems
    // copyListEntriesItems
    const dragEntriesItemContent = copyListEntriesItems[dragItem.current];
    copyListEntriesItems.splice(dragItem.current, 1);
    copyListEntriesItems.splice(
      dragOverItem.current,
      0,
      dragEntriesItemContent
    );
    // copyListEntriesItems
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);

    setKeys(copyListItems);
    setEntriesList(copyListEntriesItems);
  };

  const isEnable = (key: any) => {
    if (keys.some((item: any) => item === key)) {
      return true;
    }
    return false;
  };

  const handleKeyNameColumn = (keyName: any) => {
    if (head) {
      const asArray = Object.entries(head);
      const columnList = asArray.filter(([key]) => key === keyName);
      const columnName = columnList[0];
      return columnName[1];
    }
    return keyName;
  };

  const handleRemoveColumn = (index: number) => {
    const tempList = [...keys];
    const tempEntries = [...entries];

    tempList.splice(index, 1);
    tempEntries.splice(index, 1);
    setKeys(tempList);
    setList(tempList);
    setEntriesList(tempEntries);
  };

  const handleEntriesObject = (key: string) => {
    const objEntriesHead: any = Object.entries(head).map((item: any) => {
      return {
        key: item[0],
        value: item[1],
      };
    });
    const objectEntries = objEntriesHead.find((obj: any) => obj.key === key);
    return objectEntries;
  };

  const handleAddColumn = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "" || !event.target.value) {
      return;
    }
    if (selectColumn.current) {
      selectColumn.current.value = event.target.value;
      const tempList: any = [...keys];
      const tempEntries: any = [...entries];
      tempList.push(event.target.value);
      tempEntries.push(handleEntriesObject(event.target.value));
      setKeys(tempList);
      setList(tempList);
      setEntriesList(tempEntries);
      selectColumn.current.value = "";
    }
  };

  const handleVirtualKeyValue = (data: any) => {
    const virtualKeyValue = defaultEntries.find(
      (item: any) => item.key == data
    );
    return virtualKeyValue.value;
  };

  return (
    <div className="cnx-order-column-container-cocc">
      <div className="cnx-order-column-actions-coca">
        <span>Re-ordenador de colunas</span>
        <button
          className="cnx-btn-dnd-modal-cbdm"
          type="button"
          onClick={() => setOpenReOrderColumn(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            className="cnx-svg-xmark-modal-icon-csxmi"
          >
            <path
              fill="currentColor"
              d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
            />
          </svg>
        </button>
      </div>
      <div className="cnx-dnd-select-container-cdsc">
        <select
          className="cnx-select-column-order-csc"
          ref={selectColumn}
          onChange={handleAddColumn}
        >
          <option value="" selected>
            Selecione
          </option>
          {defaultKeys.map((key: string) => (
            <option value={key} disabled={isEnable(key)}>
              {handleVirtualKeyValue(key)}
            </option>
          ))}
        </select>
      </div>

      {list &&
        list.map((item: any, index: any) => (
          <div className="cnx-dnd-item-container-cdic">
            <Sort />
            <div
              id={`key${index}`}
              className="dnd-items"
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragLeave={(e) => dragLeave(e, index)}
              onDragEnd={drop}
              key={index}
              draggable
            >
              {/* <span className="span-dnd-item">{item}</span> */}
              {handleVirtualKeyValue(item)}
              <button
                className="cnx-btn-dnd-item-cbdi"
                type="button"
                onClick={() => {
                  handleRemoveColumn(index);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="cnx-svg-xmark-icon-csxi"
                >
                  <path
                    fill="currentColor"
                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CNX_DND;
