import { Materialverwendung } from "./materialverwendung";

export interface Verpackung {  
  _id: string,
  name: string,
  beschreibung: string,
  materialverwendungs: Materialverwendung[]

}