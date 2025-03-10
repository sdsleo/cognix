export interface IFormModal {
    open: boolean;
    close?: (data: any) => any;
    title: string;
    saveButton?: (data: any) => any;
    saving?: boolean;
    clearButton?: (data: any) => any;
    startOpened?: boolean;
    noDefaultForm?: boolean;
    noTabs?: boolean;
    contractDisable?: boolean;
    formInputs?: React.ReactElement<string | React.JSXElementConstructor<any>>;
    formParameters?: React.ReactElement<string | React.JSXElementConstructor<any>>;
    activity?: React.ReactElement<string | React.JSXElementConstructor<any>>;
    historic?: React.ReactElement<string | React.JSXElementConstructor<any>>;
    file?: React.ReactElement<string | React.JSXElementConstructor<any>>;
    customTab?: {
        title: string;
        content: React.ReactElement<string | React.JSXElementConstructor<any>>;
    }
}