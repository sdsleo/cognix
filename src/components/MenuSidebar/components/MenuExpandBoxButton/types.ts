import { ReactElement } from "react";

export interface IMenuExpandBoxButton {
    icon: ReactElement;
    title: string;
    children?: React.ReactNode[] | any;
}