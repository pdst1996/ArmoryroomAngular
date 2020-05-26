export interface GeneralResponse {
  success: boolean;
  message: string;
  data: any;
}


export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  loginType: string;
  data: any;
  userInfo: User;
  plants: Plants;
}

export interface User {
  active: boolean;
  email: string;
  fullName: string;
  id: number;
  name: string;
  number: number;
  username: string;
  message: string;
}

export interface Menu {
  link: string;
  name: string;
}

export interface Plants {
  plants: Array<Plant>;
}

export interface Plant {
  idPlant: number;
  plant: string;
}
