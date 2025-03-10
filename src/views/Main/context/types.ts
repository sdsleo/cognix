export interface IState {
  tabsState: any[];
  pinnedTab: {
    pinned: {
      title: string;
      icon: string;
      id: string;
    } | any;
  };
  factoryPlant: null;
  activeTab: any;
  setTabsState?: any;
  setFactoryPlant?: any;
  theme: string;
  tabSessionOn: boolean;
  setTabSession?: any;
}
