import { ReactElement } from "react";

export interface IMenuBoxButton {
    icon: ReactElement | ReactElement[];
    title: string;
    fn: () => void;
}