import { ReactElement } from "react";

export interface IBoxProfileExpanded {
    icon: ReactElement;
    title: string;
    children?: React.ReactNode[] | any;
}