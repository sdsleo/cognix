import React, { useState, useRef } from "react";
import Sort from "../../../../../../assets/icons/FluentUI/SVGs/Sort";
import "./styles.css";
import {
  DeleteIcon,
  GripperDotsVerticalIcon,
  SearchIcon,
} from "@fluentui/react-icons-mdl2";

interface ICNX_DND {
  keys: object[];
  setKeys: (data: any[]) => void;
}

export function CNX_DND({
  keys,
  setKeys,
}: // setEntriesList,
// entries,
// defaultEntries,
ICNX_DND) {
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
    // const copyListEntriesItems = [...entries];
    // copyListItems
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    // copyListItems
    // copyListEntriesItems
    // const dragEntriesItemContent = copyListEntriesItems[dragItem.current];
    // copyListEntriesItems.splice(dragItem.current, 1);
    // copyListEntriesItems.splice(
    //   dragOverItem.current,
    //   0,
    //   dragEntriesItemContent
    // );
    // copyListEntriesItems
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);

    setKeys(copyListItems);
    // setEntriesList(copyListEntriesItems);
  };

  const isEnable = (key: any) => {
    if (keys.some((item: any) => item === key)) {
      return true;
    }
    return false;
  };

  const handleRemoveColumn = (index: number) => {
    const tempList = [...keys];
    //const tempEntries = [...entries];

    tempList.splice(index, 1);
    // tempEntries.splice(index, 1);
    setKeys(tempList);
    setList(tempList);
    // setEntriesList(tempEntries);
  };

  const handleAddColumn = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "" || !event.target.value) {
      return;
    }
    if (selectColumn.current) {
      selectColumn.current.value = event.target.value;
      const tempList: any = [...keys];
      // const tempEntries: any = [...entries];
      tempList.push(event.target.value);
      // tempEntries.push(handleEntriesObject(event.target.value));
      setKeys(tempList);
      setList(tempList);
      // setEntriesList(tempEntries);
      selectColumn.current.value = "";
    }
  };

  const handleVirtualKeyValue = (data: any) => {
    // const virtualKeyValue = defaultEntries.find(
    //   (item: any) => item.key == data
    // );
    // return virtualKeyValue.value;
  };

  return (
    <div className="cnx-flow-register-dnd-container-cfrdc">
      <div className="cnx-flow-register-action-buttons-container-cfrabc">
        <div className="cnx-flow-register-action-input-search-container-cfraisc">
          <input type="text" placeholder="Pesquisar"/>
          <button type="button"><SearchIcon /></button>
        </div>
        <div className="cnx-flow-register-action-button-cfrab">
          <button
            className="cnx-flow-register-small-button-cfrsb"
            type="button"
          >
            <DeleteIcon />
          </button>
          <button className="cnx-flow-register-add-button-cfrab" type="button">
            Adicionar
          </button>
        </div>
      </div>
      <div className="cnx-flow-register-dnd-header-cfrdh">
        <input type="checkbox" />
        <GripperDotsVerticalIcon />
        <div className="cnx-flow-register-dnd-columns-cfrdc">
          <div className="cnx-flow-register-dnd-th-number-cfrdt">
            <span>Número</span>
          </div>
          <div className="cnx-flow-register-dnd-th-cfrdt">
            <span>Operação</span>
          </div>
          <div className="cnx-flow-register-dnd-th-cfrdt">
            <span>Última Atualização</span>
          </div>
          <div className="cnx-flow-register-dnd-th-cfrdt">
            <span>Situação</span>
          </div>
        </div>
      </div>

      {list &&
        list.map((item: any, index: any) => (
          <div className="cnx-flow-register-dnd-item-container-cfrdic">
            <input type="checkbox" />
            <div
              id={`key${index}`}
              className="cnx-flow-register-dnd-items-cfrdi"
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragLeave={(e) => dragLeave(e, index)}
              onDragEnd={drop}
              key={index}
              draggable
            >
              <GripperDotsVerticalIcon />
              <div className="cnx-flow-register-dnd-columns-cfrdc">
                <div className="cnx-flow-register-dnd-th-number-cfrdt">
                  <span>{item?.number}</span>
                </div>
                <div className="cnx-flow-register-dnd-th-cfrdt">
                  <span>{item?.operationName}</span>
                </div>
                <div className="cnx-flow-register-dnd-th-cfrdt">
                  <span>{item?.latestUpdate}</span>
                </div>
                <div className="cnx-flow-register-dnd-th-cfrdt">
                  <span>{item?.isActived == 1 ? "Ativo" : "Inativo"}</span>
                </div>
              </div>
              {/* {handleVirtualKeyValue(item)} */}
              {/* <button
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
              </button> */}
            </div>
          </div>
        ))}
    </div>
  );
}
