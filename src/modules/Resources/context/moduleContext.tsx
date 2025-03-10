import React, { ReactNode } from "react";
import { IModuleContext } from "./types";
import ModuleRudecer from "./moduleRudecer";

interface PropsUserContext {
  children: ReactNode;
}

const initValue = {
  tableData: [
    {
      level1: [
        {
          level1Id: 1,
          level2: [
            {
              level2Id: 1,
              level3: [
                {
                  level3Id: 1,
                  level4: [
                    {
                      level4Id: 1,
                      id: 1,
                      code: "lvl",
                      name: "lvl",
                      description: "lvl",
                      status: 1
                    },
                    {
                      level4Id: 1,
                      id: 2,
                      code: "lvl",
                      name: "lvl",
                      description: "lvl",
                      status: 1
                    },
                    {
                      level4Id: 1,
                      id: 3,
                      code: "lvl",
                      name: "lvl",
                      description: "lvl",
                      status: 1
                    },
                  ],
                  id: 1,
                  code: "lvl",
                  name: "lvl",
                  description: "lvl",
                  status: 1
                }
              ],
              id: 1,
              code: "lvl",
              name: "lvl",
              description: "lvl",
              status: 1
            }
          ],
          id: 211,
          code: "M002",
          name: "Shortway",
          description: "Carreta Shortway",
          status: 1
        },
      ],
      id: 11,
      code: "P001",
      name: "Pojuca",
      description: "Pojuca",
      status: 1
    },
    {
      level1: [
        {
          level1Id: 1,
          level2: [
            {
              level2Id: 1,
              level3: [
                {
                  level3Id: 1,
                  level4: [
                    {
                      level4Id: 1,
                      id: 1,
                      code: "lvl",
                      name: "lvl",
                      description: "lvl",
                      status: 1
                    },
                    {
                      level4Id: 1,
                      id: 2,
                      code: "lvl",
                      name: "lvl",
                      description: "lvl",
                      status: 1
                    },
                    {
                      level4Id: 1,
                      id: 3,
                      code: "lvl",
                      name: "lvl",
                      description: "lvl",
                      status: 1
                    },
                  ],
                  id: 1,
                  code: "lvl",
                  name: "lvl",
                  description: "lvl",
                  status: 1
                }
              ],
              id: 1,
              code: "lvl",
              name: "lvl",
              description: "lvl",
              status: 1
            }
          ],
          id: 212,
          code: "M002",
          name: "Tubulão",
          description: "Carreta Tubulão",
          status: 1
        },
      ],
      id: 12,
      code: "O001",
      name: "Ouriçangas",
      description: "Ouriçangas",
      status: 1
    },
    {
      level1: [
        {
          level1Id: 1,
          level2: [
            {
              level2Id: 1,
              level3: [
                {
                  level3Id: 1,
                  level4: [
                    {
                      level4Id: 1,
                      id: 1,
                      code: "lvl",
                      name: "lvl",
                      description: "lvl",
                      status: 1
                    },
                    {
                      workboxId: 1,
                      id: 2,
                      code: "lvl",
                      name: "lvl",
                      description: "lvl",
                      status: 1
                    },
                    {
                      workboxId: 1,
                      id: 3,
                      code: "lvl",
                      name: "lvl",
                      description: "lvl",
                      status: 1
                    },
                  ],
                  id: 1,
                  code: "lvl",
                  name: "lvl",
                  description: "lvl",
                  status: 1
                }
              ],
              id: 1,
              code: "lvl",
              name: "lvl",
              description: "lvl",
              status: 1
            }
          ],
          id: 213,
          code: "M002",
          name: "White Martins",
          description: "Carreta White Martins",
          status: 1
        },
      ],
      id: 13,
      code: "N001",
      name: "Nova Soure",
      description: "Nova Soure",
      status: 1
    },
  ],
  selectedResource: {},
  enumerators: {},
  loadingTable: false,
  saving: false,
  addModal: false,
  editModal: false,
  rowData: [],
  dispacth: () => {},
};

export const UseContext = React.createContext<IModuleContext>(initValue);

export const ContextProvider = ({ children }: PropsUserContext) => {
  const [state, dispacth] = React.useReducer(ModuleRudecer, initValue);

  return (
    <UseContext.Provider
      value={{
        tableData: state.tableData,
        selectedResource: state.selectedResource,
        enumerators: state.enumerators,
        loadingTable: state.loadingTable,
        saving: state.saving,
        addModal: state.addModal,
        editModal: state.editModal,
        rowData: state.rowData,
        dispacth,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};
