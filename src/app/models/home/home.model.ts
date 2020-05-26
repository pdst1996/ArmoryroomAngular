export interface GeneralApplicationData {
  success: boolean;
  data: ApplicationData;
  message: string;
}

export interface ApplicationData {
  menus: Array<Menu>;
  profiles: Array<Profile>;
  sites: Array<Site>;
  userInfo: User;
  token: string;
  applicationVersion: string;
  loginType: string;
}

export interface User {
  active: boolean;
  mail: string;
  fullName: string;
  lastName: string;
  id: number;
  name: string;
  employeeNumber: number;
  userName: string;
  message: string;
}

export interface Menu {
  active: boolean;
  description: string;
  idFatherMenu: number;
  idMenu: number;
  link: string;
  name: string;
  orden: number;
}

export interface Site {
  active: boolean;
  alias: string;
  codeSite: string;
  idSite: number;
  name: string;
}

export interface Profile {
  active: boolean;
  description: string;
  idProfile: number;
  name: string;
}
