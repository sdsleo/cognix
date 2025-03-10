export interface IMES_LOGIN {
  username: string;
  password: string;
}

export interface IMES_LOGIN_SESSION {
  token: string;
  userModel: IUserModel;
  departmentName: string;
}

export interface IUserModel {
  id: number;
  code: string;
  name: string;
  username: string;
  password: string;
  acessLevel: number;
  phone: string;
  email: string;
  departmentId: number;
  department: IDepartment;
  status: number;
  groups?: IGroupsEntity[] | null;
  userSessions?: IUserSessionsEntity[] | null;
  userSkillMatrices?: null;
  authFlows?: null;
  thirdPartyConfigs?: null;
  message?: null;
  httpStatusCode: number;
}

export interface IDepartment {
  id: number;
  name: string;
  code: string;
  isActived: number;
  interlockingConfigurationId?: null;
  interlockingConfiguration?: null;
  users?: null[] | null;
}

export interface IGroupsEntity {
  id: number;
  groupId: number;
  group?: null;
  userId: number;
}

export interface IUserSessionsEntity {
  id: number;
  userId: number;
  hostname: string;
  address: string;
  loginDateTime: string;
  logoutDateTime: string;
  status: number;
  workstationId: number;
}
