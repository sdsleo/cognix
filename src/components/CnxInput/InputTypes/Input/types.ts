import { InputHTMLAttributes } from "react";

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type: string;
    placeholder?: string;
    name?: string; 
    value?: string | number;
    min?: string | number;
    max?: string | number;
    defaultValue?: string | number;
    mandatory?: boolean;
    doubleWidth?: boolean;
    textAreaDisabled?: boolean;
    inputRef?: any;
    textAreaRows?: number; 
    textAreaWidth?: string; 
    [rest: string]: any;
}