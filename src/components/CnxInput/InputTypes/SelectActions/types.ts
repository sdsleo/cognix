interface IRequestAPI {
  func(searchValue: string): void;
}
export interface ISelectAutoComplete {
  keyValue: string | number;
  keyLabel: string | number;
  options: object[];
  defaultOption?: any;
  placeholder?: string;
  onChange?: (optionSelected: any) => any;
  onSelectNoOption?: () => any;
  inputRef?: any;
  autoComplete?: boolean;
  label?: string;
  mandatory?: boolean;
  cnxStyles?: any;
  className?: string;
  clear?: boolean;
  disabled?: boolean;
}

export interface ICustomTheme {
  searchTextColor?: string;
  searchPlaceholderColor?: string;
  searchBackgroundColor?: string;
  searchBorderColor?: string;
  inputSearchHoverOptionColor?: string;
  inputIconColor?: string;
  optionTextColor?: string;
  optionBackgroundColor?: string;
  optionBorderColor?: string;
  themeBackgroundColor?: string;
}
