
//@ts-nocheck
import { useEffect, useState, useContext } from 'react';
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import Tree from 'react-animated-tree-v2';
// import { FaAngleDown, FaAngleRight, FaDesktop, FaExpand, FaIndustry, FaRegDotCircle, FaRegPlayCircle } from 'react-icons/fa';
// import { CgListTree } from 'react-icons/cg';
// import { useDispatch, useSelector } from 'react-redux';

// import {
//   // getResourcesRequest,
//   setTableData,
//   setSelectedResource,
//   selectors
// } from '../../../store/modules/resources/actions';
import {
  BranchForkIcon,
  DOMIcon,
  CityNextIcon,
  DeliveryTruckIcon,
  FunctionalManagerDashboardIcon,
  ChevronRightSmallIcon,
  ChevronLeftSmallIcon,
  SnapToGridIcon,
  ProductionFloorManagementIcon,
  SquareShapeIcon,
  DeployIcon,
  ToggleBorderIcon,
} from "@fluentui/react-icons-mdl2";
import { TreeContainer } from './styled';

interface ITreeView {
  tableData?: any;
  // eslint-disable-next-line no-unused-vars
  setTableData: (data: any) => void;
  selectedResources?: any;
  // eslint-disable-next-line no-unused-vars
  setSelectedRecource: (data: any) => void;
}

function TreeView(props: ITreeView) {
  const { dispacth } = useContext(UseContext);
  const resourceTreeData: any = [
    {
      plants: [
        {
          plantsId: 1,
          areas: [
            {
              areasId: 1,
              lines: [
                {
                  linesId: 1,
                  boxes: [
                    {
                      boxesId: 1,
                      id: 1,
                      code: "lvl",
                      name: "Cliente - Tramo 1",
                      description: "Cliente - Tramo 1",
                      status: 1
                    },
                    {
                      workboxId: 1,
                      id: 2,
                      code: "lvl",
                      name: "Cliente - Tramo 2",
                      description: "Cliente - Tramo 2",
                      status: 1
                    },
                    {
                      workboxId: 1,
                      id: 3,
                      code: "lvl",
                      name: "Cliente - Tramo 3",
                      description: "Cliente - Tramo 3",
                      status: 1
                    },
                  ],
                  id: 1,
                  code: "lvl",
                  name: "Descarga 1",
                  description: "Descarga 1",
                  status: 1
                }
              ],
              id: 1,
              code: "lvl",
              name: "Descarga",
              description: "Descarga",
              status: 1
            }
          ],
          id: 211,
          code: "M002",
          name: "Brasken",
          description: "Brasken",
          status: 1
        },
      ],
      id: 11,
      code: "P001",
      name: "MDC Bahia",
      description: "MDC Bahia",
      status: 1
    },
    {
      plants: [
        {
          plantsId: 1,
          areas: [
            {
              areasId: 1,
              lines: [
                {
                  linesId: 1,
                  boxes: [
                    {
                      boxesId: 1,
                      id: 1,
                      code: "lvl",
                      name: "Veículo 1",
                      description: "Veículo 1",
                      status: 1
                    },
                    {
                      workboxId: 1,
                      id: 2,
                      code: "lvl",
                      name: "Veículo 2",
                      description: "Veículo 2",
                      status: 1
                    },
                    {
                      workboxId: 1,
                      id: 3,
                      code: "lvl",
                      name: "Veículo 3",
                      description: "Veículo 3",
                      status: 1
                    },
                  ],
                  id: 1,
                  code: "lvl",
                  name: "Transporte 1",
                  description: "Transporte 1",
                  status: 1
                }
              ],
              id: 1,
              code: "lvl",
              name: "Transporte",
              description: "Transporte",
              status: 1
            }
          ],
          id: 212,
          code: "M002",
          name: "Bahia",
          description: "Bahia",
          status: 1
        },
      ],
      id: 12,
      code: "O001",
      name: "MDC Bahia",
      description: "MDC Bahia",
      status: 1
    },
    {
      plants: [
        {
          plantsId: 1,
          areas: [
            {
              areasId: 1,
              lines: [
                {
                  linesId: 1,
                  boxes: [
                    {
                      boxesId: 1,
                      id: 1,
                      code: "lvl",
                      name: "Base1 - Tramo 1",
                      description: "Base1 - Tramo 1",
                      status: 1
                    },
                    {
                      workboxId: 1,
                      id: 2,
                      code: "lvl",
                      name: "Base2 - Tramo 2",
                      description: "Base2 - Tramo 2",
                      status: 1
                    },
                    {
                      workboxId: 1,
                      id: 3,
                      code: "lvl",
                      name: "Base3 - Tramo 3",
                      description: "Base3 - Tramo 3",
                      status: 1
                    },
                  ],
                  id: 1,
                  code: "lvl",
                  name: "Carga 1",
                  description: "Carga 1",
                  status: 1
                }
              ],
              id: 1,
              code: "lvl",
              name: "Carga",
              description: "Carga",
              status: 1
            }
          ],
          id: 213,
          code: "M002",
          name: "Pojuca",
          description: "Pojuca",
          status: 1
        },
      ],
      id: 13,
      code: "N001",
      name: "MDC Bahia",
      description: "MDC Bahia",
      status: 1
    },
  ];

  const [isSelected, setSelected] = useState('');

  const [isViewMax, setIsViewMax] = useState(true);

  const [data, setData] = useState<any>();

  // useEffect(() => {
  //   dispatch(getResourcesRequest());
  // }, [dispatch]);

  // useEffect(() => {
  //   setData(resourceTreeData);
  // }, [resourceTreeData]);

  const addCheckedRootResource = (level: string) => {
    const resource = {
      level,
      levelSelected: {
        id: 100001,
        code: "B001",
        name: "Bases",
        description: "Bases",
        status: 1
      }
    };
    // setSelectedRecource(tempObj);
    // dispatch(setSelectedResource(tempObj));
    dispacth({
      type: ACTIONS.SET_SELECTED_RESOURCE,
      payload: resource,
    });
  };

  const addCheckedResource = (item: any, level: string) => {
    const resource = {
      level,
      levelSelected: item[0]
    };
    // setSelectedRecource(tempObj);
    // dispatch(setSelectedResource(tempObj));
    dispacth({
      type: ACTIONS.SET_SELECTED_RESOURCE,
      payload: resource,
    });
  };

  const setTableData = (data: any) => {
    dispacth({
      type: ACTIONS.SET_TABLE_DATA,
      payload: data,
    });
  };

  return (
    <>
      <TreeContainer>
        {resourceTreeData?.length < 1 ? (
          <div className="cnx-resources-loading">
            <span>Carregando...</span>
          </div>
        ) : null}
        {isViewMax ? (
          <div className="view-max">
            <div className="resource-view-max">
              <h2>
                <DOMIcon className="resource-icon" />
                Recursos
              </h2>
              <button type="button" onClick={() => setIsViewMax(false)}>
                <ChevronLeftSmallIcon />
              </button>
            </div>
            <Tree
              content={
                <span
                  className="tree-resource-title"
                  onClick={() => {
                    setSelected('');
                    addCheckedRootResource('root');
                    setTableData(resourceTreeData);
                  }}
                >
                  MDC
                </span>
              }
              type={
                <input
                  checked={isSelected === ''}
                  className="tree-checkbox"
                  type="radio"
                  name="radio-resource"
                  onChange={() => {
                    setSelected('');
                    addCheckedRootResource('root');
                    setTableData(resourceTreeData);
                  }}
                />
              }
              open
            >
              <span className="resource-icon">
                <CityNextIcon /> Plantsas
              </span>
              {resourceTreeData?.map((root: any) => (
                <Tree
                  content={
                    <span
                      className="tree-resource-title"
                      onClick={() => {
                        addCheckedResource([root], 'plants');
                        setTableData(root.plants);
                        setSelected(`p${root.id}`);
                      }}
                    >
                      {root.name}
                    </span>
                  }
                  type={
                    <input
                      className="tree-checkbox"
                      type="radio"
                      name="radio-resource"
                      checked={isSelected === `p${root.id}`}
                      value={root}
                      onChange={() => {
                        addCheckedResource([root], 'plants');
                        setTableData(root.plants);
                        setSelected(`p${root.id}`);
                      }}
                    />
                  }
                >
                  <span className="resource-icon">
                    <SnapToGridIcon /> Areas
                  </span>
                  {root?.plants?.map((plants: any) => (
                    <Tree
                      content={
                        <span
                          className="tree-resource-title"
                          onClick={() => {
                            addCheckedResource([plants], 'areas');
                            setTableData(plants.areas);
                            setSelected(`a${plants.id}`);
                          }}
                        >
                          {plants.name}
                        </span>
                      }
                      type={
                        <input
                          checked={isSelected === `a${plants.id}`}
                          className="tree-checkbox"
                          type="radio"
                          name="radio-resource"
                          onChange={() => {
                            addCheckedResource([plants], 'areas');
                            setSelected(`a${plants.id}`);
                            setTableData(plants.areas);
                          }}
                        />
                      }
                    >
                      <span className="resource-icon">
                        <ProductionFloorManagementIcon /> Linhas
                      </span>
                      {plants?.areas?.map((areas: any) => (
                        <Tree
                          content={
                            <span
                              className="tree-resource-title"
                              onClick={() => {
                                addCheckedResource([areas], 'lines');
                                setSelected(`l${areas.id}`);
                                setTableData(areas.lines);
                              }}
                            >
                              {areas.name}
                            </span>
                          }
                          type={
                            <input
                              checked={isSelected === `l${areas.id}`}
                              type="radio"
                              className="tree-checkbox"
                              name="radio-resource"
                              onChange={() => {
                                addCheckedResource([areas], 'lines');
                                setSelected(`l${areas.id}`);
                                setTableData(areas.lines);
                              }}
                            />
                          }
                        >
                          <span className="resource-icon">
                            <SquareShapeIcon /> Boxes
                          </span>
                          {areas?.lines?.map((lines: any) => (
                            <Tree
                              content={
                                <span
                                  className="tree-resource-title"
                                  onClick={() => {
                                    addCheckedResource([lines], 'boxes');
                                    setSelected(`b${lines.id}`);
                                    setTableData(lines.boxes);
                                  }}
                                >
                                  {lines.name}
                                </span>
                              }
                              type={
                                <input
                                  type="radio"
                                  checked={isSelected === `b${lines.id}`}
                                  className="tree-checkbox"
                                  name="radio-resource"
                                  onChange={() => {
                                    addCheckedResource([lines], 'boxes');
                                    setTableData(lines.boxes);
                                    setSelected(`b${lines.id}`);
                                  }}
                                />
                              }
                            >
                              <span className="resource-icon">
                                <DeployIcon /> Recurso
                              </span>
                              {lines?.boxes?.map((boxes: any) => (
                                <Tree
                                  content={
                                    <span
                                      className="tree-resource-title"
                                      // onClick={() => {
                                      //   addCheckedResource(
                                      //     [boxes],
                                      //     'boxes'
                                      //   );
                                      //   dispatch(setTableData([boxes]));
                                      //   setSelected(`s${boxes.id}`);
                                      // }}
                                    >
                                      {boxes.name}
                                    </span>
                                  }
                                  // @ts-ignore
                                  type={<ToggleBorderIcon />}
                                  // type={
                                  //   <input
                                  //     type="radio"
                                  //     checked={
                                  //       isSelected === `s${boxes.id}`
                                  //     }
                                  //     className="tree-checkbox"
                                  //     name="radio-resource"
                                  //     onChange={() => {
                                  //       addCheckedResource(
                                  //         [boxes],
                                  //         'boxes'
                                  //       );
                                  //       dispatch(setTableData([boxes]));
                                  //       setSelected(`s${boxes.id}`);
                                  //     }}
                                  //   />
                                  // }
                                />
                              ))}
                            </Tree>
                          ))}
                        </Tree>
                      ))}
                    </Tree>
                  ))}
                </Tree>
              ))}
            </Tree>
          </div>
        ) : (
          <div className="view-min">
            <div className="resource-view-min">
              <button type="button" onClick={() => setIsViewMax(true)}>
                <ChevronRightSmallIcon />
              </button>
              <h2>Recursos</h2>
              <DOMIcon className="resource-icon" />
            </div>
          </div>
        )}
      </TreeContainer>
    </>
  );
};

export default TreeView;
