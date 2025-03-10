import { InputHTMLAttributes } from "react";

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    keyLabel: string | number;
    keyValue: string | number;
    placeholder?: string;
    name?: string; 
    value?: string | number;
    defaultValue?: string | number;
    defaultOption?: string | number;
    mandatory?: boolean;
    ref?: any;
    logs?: any[];
    options: any[];
    inputRef: any;
    customClassName?: string;
    logOptions?: React.ReactElement<string | React.JSXElementConstructor<any>>;
    [rest: string]: any;
}