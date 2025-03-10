

export interface IMenuSideBar {
    
}

export interface IMenuJSON {
    title: string;
    icon: string;
    id: string;
    submenu?: undefined | {
        title: string;
        icon: string;
        id: string;
    }[];
}