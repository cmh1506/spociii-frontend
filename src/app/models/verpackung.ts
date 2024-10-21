import { MaterialverwendungEingabe } from "./materialverwendungEingabe";

export interface Verpackung {  
  _id: string,
  name: string,
  beschreibung: string,
  materialverwendungs: MaterialverwendungEingabe[]

}