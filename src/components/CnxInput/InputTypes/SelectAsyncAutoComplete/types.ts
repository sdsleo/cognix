interface IRequestAPI {
  func(searchValue: string): void;
}
export interface ISelect {
  keyValue: string | number;
  keyLabel: string | number;
  placeholder?: string;
  onChange?: (optionSelected: any) => any;
  inputRef?: any;
  resquestAPI: IRequestAPI;
  id: string;
}
