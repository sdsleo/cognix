interface ILaguange {
  portuguese: string;
  english: string;
  spanish: string;
  japanese: string;
}

interface ITheme {
  dark: string;
  light: string;
}

interface IFontSize {
  small: string;
  medium: string;
  large: string;
}

interface IAccessibility {
  fontSizeTitle: string;
  fontSize: IFontSize;
}

interface IAbout {
  client: string;
  version: string;
  lastUpdate: string;
}

export interface IModalProfile {
  logoutButton: string;
  laguangeSelectorTitle: string;
  themeSelectorTitle: string;
  accessibilitySelectorTitle: string;
  aboutSelectorTitle: string;
  laguange: ILaguange;
  theme: ITheme;
  accessibility: IAccessibility;
  about: IAbout;
}

export interface ILocalesData {
  cnxCommonWords: {
    add: string;
    edit: string;
  },
  inputs: {
    dateRangerPicker: {
      rangerList: {
        today: string;
        yesterday: string;
        thisWeek: string;
        last7days: string;
        last30days: string;
        thisMonth: string;
        lastMonth: string;
        thisYear: string;
        lastYear: string;
        allTime: string;
        custom: string;
      },
      selectButton: string;
      placeholder: string;
    }
  },
  modalProfile: IModalProfile;
  cnxTable: {
    buttons: {
      addButton: string;
      saveButton: string;
      csvImport: string;
      export: string;
      deleteLabel: string;
      editLabel: string;
      reOrderColumnLabel: string;
      filter: string;
    };
    summary: {
      showing: string;
      of: string;
      records: string;
      selected: string;
      selectAll: string;
    };
    refreshList: string;
    loading: string;
  };
  cnxForm: {
    buttons: {
      saveButton: string;
      cleanButton: string;
    };
    tabs: {
      form: string;
      parameters: string;
      historic: string;
      activity: string;
      file: string;
    };
  };
  // ORDERS
  orders: {
    customSummary: {
      all: string;
      released: string;
      inProgress: string;
      finished: string;
      blocked: string;
      canceled: string;
      delayed: string;
      noSchedule: string;
    },
    table: {
      title: string;
      columns: {
        order: string;
        product: string;
        base: string;
        client: string;
        vehicle: string;
        startDateTime: string;
        endDateTime: string;
        plannedVolume: string;
        realVolume: string;
        status: string;
        info: string;
      }
    }
  }
}

export interface ILocales {
  currentLanguage: string;
  localesData: ILocalesData;
}

export interface IActions {
  type: string;
  payload: any;
}
