import { useContext } from "react";
import { UseContext } from "../../../../context/moduleContext";
import { ACTIONS } from "../../../../context/moduleActions";
import { ILocales } from "../../../../../../locales/types";
import localesContex from "../../../../../../context/localesContex";
import { BlockedIcon, ClockIcon } from "@fluentui/react-icons-mdl2";
import "./styles.css";
import { axiosInstance } from "../../../../../../http/axiosInstance";
import { _GET } from "../../../../routes";
import { IPagination } from "../../../../routes/types";

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

export function OrderSummary(Summary: ISummary) {
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
        onClick={() => 
          page === "orders" ? getList({ PageSize: 100 }) : null
        }
      >
        <span>{`${localesData?.orders?.customSummary?.all || "All"} (${
          Summary.all
        })`}</span>
      </div>
      <div className="cnx-orders-separators-cos" />
      <div
        className="cnx-orders-container-bullet-cocb"
        onClick={() =>
          page === "orders" ? getList({ PageSize: 100, Status: 1 }) : null
        }
      >
        <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-orange" />
        <span>{`Criado (${Summary.created})`}</span>
      </div>
      <div
        className="cnx-orders-container-bullet-cocb"
        onClick={() => 
          page === "orders" ? getList({ PageSize: 100, Status: 2 }) : null
        }
      >
        <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-yellow" />
        <span>{`${
          localesData?.orders?.customSummary?.released || "Released"
        } (${Summary.released})`}</span>
      </div>
      <div className="cnx-orders-separators-cos" />
      <div
        className="cnx-orders-container-bullet-cocb"
        onClick={() => 
          page === "orders" ? getList({ PageSize: 100, Status: 3 }) : null
        }
      >
        <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-blue" />
        <span>{`${
          localesData?.orders?.customSummary?.inProgress || "In Progress"
        } (${Summary.inProgress})`}</span>
      </div>
      <div className="cnx-orders-separators-cos" />
      <div
        className="cnx-orders-container-bullet-cocb"
        onClick={() => 
          page === "orders" ? getList({ PageSize: 100, Status: 4 }) : null
        }
      >
        <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-green" />
        <span>{`${
          localesData?.orders?.customSummary?.finished || "Finished"
        } (${Summary.finished})`}</span>
      </div>
      <div className="cnx-orders-separators-cos" />
      <div
        className="cnx-orders-container-bullet-cocb"
        onClick={() => 
          page === "orders" ? getList({ PageSize: 100, Status: 6 }) : null
        }
      >
        <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-black" />
        <span>{`${localesData?.orders?.customSummary?.blocked || "Blocked"} (${
          Summary.blocked
        })`}</span>
      </div>
      <div className="cnx-orders-separators-cos" />
      <div
        className="cnx-orders-container-bullet-cocb"
        onClick={() => 
          page === "orders" ? getList({ PageSize: 100, Status: 5 }) : null
        }
      >
        <div className="cnx-orders-circular-bullet-cocb cnx-bullet-color-red" />
        <span>{`${
          localesData?.orders?.customSummary?.canceled || "Canceled"
        } (${Summary.canceled})`}</span>
      </div>
      <div className="cnx-orders-separators-cos" />
      <div className="cnx-orders-container-bullet-cocb" onClick={() => null}>
        <ClockIcon className="cnx-orders-icon-clock-coic" />
        <span>{`${localesData?.orders?.customSummary?.delayed || "Delayed"} (${
          Summary.delayed
        })`}</span>
      </div>
      <div className="cnx-orders-separators-cos" />
      <div
        className="cnx-orders-container-bullet-cocb"
        onClick={() => 
          page === "orders" ? getList({ PageSize: 100, Status: 0 }) : null
        }
      >
        <BlockedIcon className="cnx-orders-icon-blocked-coib" />
        <span>{`${
          localesData?.orders?.customSummary?.noSchedule || "No Schedule"
        } (${Summary.noSchedule})`}</span>
      </div>
    </div>
  );
}
