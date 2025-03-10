import { ReactElement } from "react";
import ProductGroupVariant from "../../assets/icons/FluentUI/SVGs/ProductGroupVariant";
import AppIconDefaultAdd from "../../assets/icons/FluentUI/SVGs/AppIconDefaultAdd";

// lib
import {
  AddFriendIcon,
  AddGroupIcon,
  AddLinkIcon,
  BIDashboardIcon,
  BranchForkIcon,
  BuildIcon,
  BuildQueueNewIcon,
  CalendarSettingsIcon,
  CarIcon,
  ChevronRightMedIcon,
  ContactIcon,
  DatabaseIcon,
  DeleteIcon,
  DeliveryTruckIcon,
  DeveloperToolsIcon,
  DietPlanNotebookIcon,
  DocLibraryIcon,
  DocumentApprovalIcon,
  EngineeringGroupIcon,
  FixedAssetManagementIcon,
  GroupedListIcon,
  LinkIcon,
  NumberedListIcon,
  PageAddIcon,
  PrintIcon,
  ProductIcon,
  ProductListIcon,
  ProductionFloorManagementIcon,
  SearchIssueIcon,
  SettingsIcon,
  TVMonitorIcon,
  TextDocumentIcon,
  TimerIcon,
  WaitlistConfirmMirroredIcon,
  RingerIcon,
  ImportAllMirroredIcon,
  ReceiptForwardIcon,
  GoToDashboardIcon,
  MergeDuplicateIcon,
  PublicCalendarIcon,
  CalendarDayIcon,
  DOMIcon,
  OrgIcon,
  EventIcon,
  AddEventIcon,
  SpecialEventIcon,
  EventInfoIcon,
  FlowIcon,
  EntitlementPolicyIcon,
  AirplaneIcon,
  ReportWarningIcon
} from "@fluentui/react-icons-mdl2";

export function dynamicSVGImports(icon: string): ReactElement {
  switch (icon) {
    case "AddFriend":
      return <AddFriendIcon />;
    case "AddGroup":
      return <AddGroupIcon />;
    case "Contact":
      return <ContactIcon />;
    case "BIDashboard":
      return <BIDashboardIcon />;
    case "Delete":
      return <DeleteIcon />;
    case "DeveloperTools":
      return <DeveloperToolsIcon />;
    case "DietPlanNotebook":
      return <DietPlanNotebookIcon />;
    case "DocLibrary":
      return <DocLibraryIcon />;
    case "EngineeringGroup":
      return <EngineeringGroupIcon />;
    case "FixedAssetManagement":
      return <FixedAssetManagementIcon />;
    case "GroupedList":
      return <GroupedListIcon />;
    case "Link":
      return <LinkIcon />;
    case "Settings":
      return <SettingsIcon />;
    case "SearchIssue":
      return <SearchIssueIcon />;
    case "WaitlistConfirmMirrored":
      return <WaitlistConfirmMirroredIcon />;
    case "Build":
      return <BuildIcon />;
    case "Print":
      return <PrintIcon />;
    case "AddLink":
      return <AddLinkIcon />;
    case "DocumentApproval":
      return <DocumentApprovalIcon />;
    case "PageAdd":
      return <PageAddIcon />;
    case "BuildQueueNew":
      return <BuildQueueNewIcon />;
    case "TVMonitor":
      return <TVMonitorIcon />;
    case "DeliveryTruck":
      return <DeliveryTruckIcon />;
    case "ProductionFloorManagement":
      return <ProductionFloorManagementIcon />;
    case "Car":
      return <CarIcon />;
    case "Timer":
      return <TimerIcon />;
    case "ProductGroupVariant":
      return <ProductGroupVariant />;
    case "Product":
      return <ProductIcon />;
    case "ProductList":
      return <ProductListIcon />;
    case "NumberedList":
      return <NumberedListIcon />;
    case "TextDocument":
      return <TextDocumentIcon />;
    case "Database":
      return <DatabaseIcon />;
    case "AppIconDefaultAdd":
      return <AppIconDefaultAdd />;
    case "BranchFork":
      return <BranchForkIcon />;
    case "CalendarSettings":
      return <CalendarSettingsIcon />;
    case "Ringer":
      return <RingerIcon />;
    case "ImportAllMirrored":
      return <ImportAllMirroredIcon />;
    case "ReceiptForward":
      return <ReceiptForwardIcon />;
    case "GoToDashboard":
      return <GoToDashboardIcon />;
    case "MergeDuplicate":
      return <MergeDuplicateIcon />;
    case "PublicCalendar":
      return <PublicCalendarIcon />;
    case "CalendarDay":
      return <CalendarDayIcon />;
    case "DOM":
      return <DOMIcon />;
    case "Org":
      return <OrgIcon />;
    case "Event":
      return <EventIcon />;
    case "AddEvent":
      return <AddEventIcon />;
    case "SpecialEvent":
      return <SpecialEventIcon />;
    case "EventInfo":
      return <EventInfoIcon />;
    case "Flow":
      return <FlowIcon />;
    case "EntitlementPolicy":
      return <EntitlementPolicyIcon />;
    case "Airplane":
      return <AirplaneIcon />;
    case "ReportWarning":
      return <ReportWarningIcon />;
    default:
      return <ChevronRightMedIcon />;
  }
}
