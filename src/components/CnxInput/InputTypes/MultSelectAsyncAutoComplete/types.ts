interface IRequestAPI {
  func(searchValue: string): void;
}
export interface IMultSelect {
  keyValue: string | number;
  keyLabel: string | number;
  placeholder?: string;
  onChange?: (optionSelected: any) => any;
  inputRef?: any | null;
  resquestAPI: IRequestAPI;
  label?: string;
  mandatory?: boolean;
}

export interface ICustomTheme {
  searchTextColor?: string;
  searchPlaceholderColor?: string;
  searchBackgroundColor?: string;
  searchBorderColor?: string;
  inputSearchHoverOptionColor?: string;
  circleBackgroundColor?: string;
  circleTextColor?: string;
  inputIconColor?: string;
  optionTextColor?: string;
  optionBackgroundColor?: string;
  optionBorderColor?: string;
  themeBackgroundColor?: string;
}
