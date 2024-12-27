import { Role } from "./role";

export interface User {
  email: string;
  pwd: string;
  name: string;
}

export interface LoginInfo {
  email: string;
  pwd: string;
}

export interface Token {
  token: string
  role: Role
}
