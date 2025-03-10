import { Suspense, ReactElement, useContext, useCallback } from "react";
import menuContex from "../../views/Main/context/menuContex";

import "./styles.css";
import User from "../../modules/User";
import UserGroups from "../../modules/UserGroups";
import ProductGroups from "../../modules/ProductGroups";
import Product from "../../modules/Product";
import GED from "../../modules/GED";
import GEDApproval from "../../modules/GEDAproval";
import { IState } from "../../views/Main/context/types";
import LogisticMonitoring from "../../views/LogisticMonitoring";
import LogisticControl from "../../modules/LogisticControl";
import Operation from "../../modules/Operation";
import Vehicles from "../../modules/Vehicles";
import Driver from "../../modules/Driver";
import Horses from "../../modules/Horses";
import AuthFlow from "../../modules/AuthFlow";
import Bases from "../../modules/Bases";
import Clients from "../../modules/Clients";
import Routes from "../../modules/Routes";
import MaintenanceSchedule from "../../modules/MaintenanceSchedule";
import PCSCalendar from "../../modules/PCSCalendar";
import Turns from "../../modules/Turns";
import OperationSchedule from "../../modules/OperationSchedule";
import Resources from "../../modules/Resources";
import ResourceGroups from "../../modules/ResourceGroups";
import Events from "../../modules/Events";
import EventsType from "../../modules/EventsType";
import EventsRecord from "../../modules/EventsRecord";
import Workflow from "../../modules/Workflow";
import Orders from "../../modules/Orders";
import MonitorConnect from "../../modules/MonitorConnect";
import Occurrences from "../../modules/OccurrencesDashboard";
import Occurrences2 from "../../modules/OccurrencesDashboard2";
import TravelDashboard from "../../modules/TravelDashboard";
import TravelDashboard2 from "../../modules/TravelDashboard2";
import DailyProductionFlowBehavior from "../../modules/DailyProductionFlowBehavior";
import ProductionFlowBehavior from "../../modules/ProductionFlowBehavior";
import DetailProductionBase from "../../modules/DetailProductionBase";
import DetailTransportBasis from "../../modules/DetailTransportBasis";
import Reports from "../../modules/Reports";
import BaseView from "../../modules/Dashboards/BaseView";
import ClientView from "../../modules/Dashboards/ClientView";
import ClientViewFix from "../../modules/Dashboards/ClientViewFix";
import TransportView from "../../modules/Dashboards/TransportView";
import RouteView from "../../modules/Dashboards/RouteView";
import OrderView from "../../modules/Dashboards/OrderView";
import VehicleConsolidateView from "../../modules/Dashboards/VehicleConsolidateView";
import VehicleView from "../../modules/Dashboards/VehicleView";
import TableGantt from "../../modules/TableGannt";

export function MainContainer({ tabs }: any) {
  const { tabsState }: IState = useContext(menuContex);

  function dynamicModuleImport(id: string): ReactElement {
    switch (id) {
      case "cnx-add-user":
        return <User />;
      case "cnx-add-group":
        return <UserGroups />;
      case "cnx-add-group-product":
        return <ProductGroups />;
      case "cnx-operation":
        return <Operation />;
      case "cnx-add-product":
        return <Product />;
      case "cnx-documents":
        return <GED />;
      case "cnx-documents-approval":
        return <GEDApproval />;
      case "cnx-monitoramento-logistico":
        return <LogisticMonitoring />;
      case "cnx-controle-logistico2":
        return <LogisticControl />;
      case "cnx-vehicles":
        return <Vehicles />;
      case "cnx-horses":
        return <Horses />;
      case "cnx-drivers":
        return <Driver />;
      case "cnx-auth-flow":
        return <AuthFlow />;
      case "cnx-bases":
        return <Bases />;
      case "cnx-clients":
        return <Clients />;
      case "cnx-routs":
        return <Routes />;
      case "cnx-maintenance-schedule":
        return <MaintenanceSchedule />;
      case "cnx-operation-schedule":
        return <OperationSchedule />;
      case "cnx-pcs-calendar":
        return <PCSCalendar />;
      case "cnx-turns":
        return <Turns />;
      case "cnx-resources":
        return <Resources />;
      case "cnx-resource-groups":
        return <ResourceGroups />;
      case "cnx-events":
        return <Events />;
      case "cnx-events-type":
        return <EventsType />;
      case "cnx-events-record":
        return <EventsRecord />;
      case "cnx-workflow":
        return <Workflow />;
      case "cnx-orders":
        return <Orders />;
      case "cnx-monitor-connect":
        return <MonitorConnect />;
      case "cnx-dashboard-ocorrencias":
        return <Occurrences />;
      case "cnx-dashboard-ocorrencias2":
        return <Occurrences2 />;
      case "cnx-dashboard-viagens":
        return <TravelDashboard />;
      case "cnx-dashboard-viagens2":
        return <TravelDashboard2 />;
      case "cnx-dashboard-daily-production-flow-behavior":
        return <DailyProductionFlowBehavior />;
      case "cnx-dashboard-daily-production-flow-behavior2":
        return <ProductionFlowBehavior />;
      case "cnx-dashboard-detail-production-base":
        return <DetailProductionBase />;
      case "cnx-dashboard-detail-transport-basis":
        return <DetailTransportBasis />;
      case "cnx-reports":
        return <Reports />;
      case "cnx-dashboard-visao-base":
        return <BaseView />;
      case "cnx-dashboard-visao-cliente":
        return <ClientView />;
      case "cnx-dashboard-visao-cliente-fix":
        return <ClientViewFix />;
      case "cnx-dashboard-visao-transporte":
        return <TransportView />;
      case "cnx-dashboard-visao-rota":
        return <RouteView />;
      case "cnx-dashboard-visao-ordem":
        return <OrderView />;
      case "cnx-dashboard-visao-carreta":
        return <VehicleView />;
      case "cnx-dashboard-visao-carreta-consolidada":
        return <VehicleConsolidateView />;
      case "cnx-table-gantt":
        return <TableGantt />;
      default:
        return <span>default</span>;
    }
  }

  return (
    <Suspense fallback={<span>loading...</span>}>
      <div className="cnx-main-view-container">
        {tabsState?.map((tab: any, index: number) => (
          <div
            key={index}
            id={`${tab.id}${tab.tabCount}`}
            className={`cnx-container-dynamic-ccd ${tab.id}${tab.tabCount}`}
            style={{ order: `${index + 1}` }}
          >
            {dynamicModuleImport(tab.id)}
          </div>
        ))}
      </div>
    </Suspense>
  );
}
