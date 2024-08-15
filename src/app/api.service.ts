import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Material } from "./models/material";
import { Energierueckgewinnung } from "./models/energierueckgewinnung";
import { NutzenergieCO2Equivalent } from "./models/nutzenergieCO2Equivalent";
import { Transportmittel } from "./models/transportmittel";
import { Verarbeitung } from "./models/verarbeitung";
import { Verpackung } from "./models/verpackung";
import { EnergieCO2MV } from "./models/energieCO2MV";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  messages = []
  users = []
  constructor(private httpClient: HttpClient) { }
  getMessages(userId: string) {
    this.httpClient.get('/posts/' + userId).subscribe((res: any) => {
      this.messages = res
    })
  }
  postMessage(message: any) {
    this.httpClient.post('/post', message).subscribe((res: any) => {
      console.log(message)
      this.messages = res
    })
  }

  createVerpackung(verpackung: any) {
    this.httpClient.post('/verpackung', verpackung).subscribe((res: any) => {
      this.messages = res
    })
  }

  getUsers() {
    this.httpClient.get('/users').subscribe((res: any) => {
      this.users = res
    })
  }

  getProfile(id: string) {
    return this.httpClient.get<any>('/profile/' + id)
  }

  saveMaterial(material: Partial<Material>): Observable<Material> {
    if (!material._id || material._id === '') {
      let newMaterial: Partial<Material> = { ...material };
      console.log(newMaterial)
      return this.httpClient.post<Material>('/material', newMaterial)
    }
    else
      console.log(material)
    return this.httpClient.put<Material>('/material', material)
  }

  saveEnergierueckgewinnung(energierueckgewinnung: Partial<Energierueckgewinnung>): Observable<Energierueckgewinnung> {
    if (!energierueckgewinnung._id || energierueckgewinnung._id === '') {
      let newEnergierueckgewinnung: Partial<Energierueckgewinnung> = { ...energierueckgewinnung };
      return this.httpClient.post<Energierueckgewinnung>('/energierueckgewinnung', newEnergierueckgewinnung)
    }
    else
      return this.httpClient.put<Energierueckgewinnung>('/energierueckgewinnung', energierueckgewinnung)
  }

  energierueckgewinnungs$ = this.httpClient.get<Energierueckgewinnung[]>('/energierueckgewinnungs')
  .pipe(
    tap(data => console.log('Energierueckgewinnungs: ', JSON.stringify(data)))
  );

  verpackungs$ = this.httpClient.get<Verpackung[]>('/verpackungs')

  materials$ = this.httpClient.get<Material[]>('/materials')

  energierueckgewinnungs = this.httpClient.get<Energierueckgewinnung[]>('/energierueckgewinnungs')

  nutzenergieCO2Equivalents$ = this.httpClient.get<NutzenergieCO2Equivalent[]>('/nutzenergieCO2Equivalents')

  transportmittels$ = this.httpClient.get<Transportmittel[]>('/transportmittels')

  verarbeitungs$ = this.httpClient.get<Verarbeitung[]>('/verarbeitungs')

  getVerpackung(_id: string) {
    return this.httpClient.get<Verpackung>('/verpackung/' + _id)
  } 


  getEnergieCO2MVs(_id: string) {
    return this.httpClient.get<EnergieCO2MV[]>('/energieCO2MVs/' + _id)
  }
  

  saveNutzenergieCO2Equivalent(nutzenergieCO2Equivalent: Partial<NutzenergieCO2Equivalent>): Observable<NutzenergieCO2Equivalent> {
    if (!nutzenergieCO2Equivalent._id || nutzenergieCO2Equivalent._id === '') {
      let newNutzenergieCO2Equivalent: Partial<NutzenergieCO2Equivalent> = { ...nutzenergieCO2Equivalent };
      return this.httpClient.post<NutzenergieCO2Equivalent>('/nutzenergieCO2Equivalent', newNutzenergieCO2Equivalent)
    }
    else
      return this.httpClient.put<NutzenergieCO2Equivalent>('/nutzenergieCO2Equivalent', nutzenergieCO2Equivalent)
  }

  saveTransportmittel(transportmittel: Partial<Transportmittel>): Observable<Transportmittel> {
    if (!transportmittel._id || transportmittel._id === '') {
      let newTransportmittel: Partial<Transportmittel> = { ...transportmittel };
      return this.httpClient.post<Transportmittel>('/transportmittel', newTransportmittel)
    }
    else
      return this.httpClient.put<Transportmittel>('/transportmittel', transportmittel)
  }

  saveVerarbeitung(verarbeitung: Partial<Verarbeitung>): Observable<Verarbeitung> {
    if (!verarbeitung._id || verarbeitung._id === '') {
      let newVerarbeitung: Partial<Verarbeitung> = { ...verarbeitung };
      return this.httpClient.post<Verarbeitung>('/verarbeitung', newVerarbeitung)
    }
    else
      return this.httpClient.put<Verarbeitung>('/verarbeitung', verarbeitung)
  } //materialverwendungEingabe


  saveVerpackung(verpackung: Partial<Verpackung>): Observable<Verpackung> {
    if (!verpackung._id || verpackung._id === '') {
      let newVerpackung: Partial<Verpackung> = { ...verpackung };
      return this.httpClient.post<Verpackung>('/verpackung', newVerpackung)
    }
    else
      return this.httpClient.put<Verpackung>('/verpackung', verpackung)
  }

  

}