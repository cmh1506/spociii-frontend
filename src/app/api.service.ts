import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tick } from "@angular/core/testing";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Material } from "./models/material";
import { Energierueckgewinnung } from "./models/energierueckgewinnung";
import { NutzenergieCO2Equivalent } from "./models/nutzenergieCO2Equivalent";
import { Transportmittel } from "./models/transportmittel";
import { Verarbeitung } from "./models/verarbeitung";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //path = "https://spociii-backend.azurewebsites.net/"
  path = environment.path
  messages = []
  users = []
  constructor(private httpClient: HttpClient) { }
  getMessages(userId: string) {
    this.httpClient.get(this.path + '/posts/' + userId).subscribe((res: any) => {
      this.messages = res
    })
  }
  postMessage(message: any) {
    this.httpClient.post(this.path + '/post', message).subscribe((res: any) => {
      console.log(message)
      this.messages = res
    })
  }

  createVerpackung(verpackung: any) {
    console.log(this.path)
    this.httpClient.post(this.path + '/verpackung', verpackung).subscribe((res: any) => {
      this.messages = res
    })
  }

  getUsers() {
    this.httpClient.get(this.path + '/users').subscribe((res: any) => {
      this.users = res
    })
  }

  getProfile(id: string) {
    return this.httpClient.get<any>(this.path + '/profile/' + id)
  }

  saveMaterial(material: Partial<Material>): Observable<Material> {
    if (!material.id || material.id === '') {
      let newMaterial: Partial<Material> = { ...material };
      console.log(newMaterial)
      return this.httpClient.post<Material>(this.path + '/material', newMaterial)
    }
    else
      console.log(material)
    return this.httpClient.put<Material>(this.path + '/material', material)
  }

  saveEnergierueckgewinnung(energierueckgewinnung: Partial<Energierueckgewinnung>): Observable<Energierueckgewinnung> {
    if (!energierueckgewinnung.id || energierueckgewinnung.id === '') {
      let newEnergierueckgewinnung: Partial<Energierueckgewinnung> = { ...energierueckgewinnung };
      return this.httpClient.post<Energierueckgewinnung>(this.path + '/energierueckgewinnung', newEnergierueckgewinnung)
    }
    else
      return this.httpClient.put<Energierueckgewinnung>(this.path + '/energierueckgewinnung', energierueckgewinnung)
  }

  saveNutzenergieCO2Equivalent(nutzenergieCO2Equivalent: Partial<NutzenergieCO2Equivalent>): Observable<NutzenergieCO2Equivalent> {
    if (!nutzenergieCO2Equivalent.id || nutzenergieCO2Equivalent.id === '') {
      let newNutzenergieCO2Equivalent: Partial<NutzenergieCO2Equivalent> = { ...nutzenergieCO2Equivalent };
      return this.httpClient.post<NutzenergieCO2Equivalent>(this.path + '/nutzenergieCO2Equivalent', newNutzenergieCO2Equivalent)
    }
    else
      return this.httpClient.put<NutzenergieCO2Equivalent>(this.path + '/nutzenergieCO2Equivalent', nutzenergieCO2Equivalent)
  }

  saveTransportmittel(transportmittel: Partial<Transportmittel>): Observable<Transportmittel> {
    if (!transportmittel.id || transportmittel.id === '') {
      let newTransportmittel: Partial<Transportmittel> = { ...transportmittel };
      return this.httpClient.post<Transportmittel>(this.path + '/transportmittel', newTransportmittel)
    }
    else
      return this.httpClient.put<Transportmittel>(this.path + '/transportmittel', transportmittel)
  }

  saveVerarbeitung(verarbeitung: Partial<Verarbeitung>): Observable<Verarbeitung> {
    if (!verarbeitung.id || verarbeitung.id === '') {
      let newVerarbeitung: Partial<Verarbeitung> = { ...verarbeitung };
      return this.httpClient.post<Verarbeitung>(this.path + '/verarbeitung', newVerarbeitung)
    }
    else
      return this.httpClient.put<Verarbeitung>(this.path + '/verarbeitung', verarbeitung)
  }

}