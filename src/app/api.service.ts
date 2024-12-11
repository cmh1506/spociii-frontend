import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable, of, tap } from "rxjs";
import { Material } from "./models/material";
import { Energierueckgewinnung } from "./models/energierueckgewinnung";
import { NutzenergieCO2Equivalent } from "./models/nutzenergieCO2Equivalent";
import { Transportmittel } from "./models/transportmittel";
import { Verarbeitung } from "./models/verarbeitung";
import { Verpackung } from "./models/verpackung";
import { Berechnung } from "./models/berechnung";
import { Store } from "@ngrx/store";
import { MaterialsState } from "./+state/materials.reducer";
import { selectMaterials } from "./+state/material.selectors";
import { environment } from "../environments/environment.prod";
import { VerarbeitungsState } from "./+state/verarbeitungs.reducer";
import { selectVerarbeitungs } from "./+state/verarbeitung.selector";
import { EnergierueckgewinnungsState } from "./+state/energierueckgewinnungs.reducer";
import { selectEnergierueckgewinnungs } from "./+state/energierueckgewinnung.selectors";
import { TransportmittelsState } from "./+state/transportmittels.reducer";
import { selectTransportmittels } from "./+state/transportmittel.selectors";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  path = environment.path
  constructor(private httpClient: HttpClient,
    private store: Store<MaterialsState>,
    private verarbeitungsStore: Store<VerarbeitungsState>,
    private energierueckgewinnungsStore: Store<EnergierueckgewinnungsState>,
    private transportmittelsStore: Store<TransportmittelsState>
  ) { 
    
  }

  

  materials$ = this.store.select(selectMaterials)

  verpackungs$ = this.httpClient.get<Verpackung[]>(this.path + '/verpackung')
  .pipe(
    tap((vs) => console.log(vs))
  )

  //materials$ = this.httpClient.get<Material[]>(this.path + '/materialRefs')

  //energierueckgewinnungs = this.httpClient.get<Energierueckgewinnung[]>(this.path + '/energierueckgewinnung')

  nutzenergieCO2Equivalents$ = this.httpClient.get<NutzenergieCO2Equivalent[]>(this.path + '/nutzenergieCO2Equivalents')

  transportmittels$ = this.transportmittelsStore.select(selectTransportmittels)

  verarbeitungs$ = this.verarbeitungsStore.select(selectVerarbeitungs)

  energierueckgewinnungs$ = this.energierueckgewinnungsStore.select(selectEnergierueckgewinnungs)


 
  saveMaterial(material: Partial<Material>): Observable<Material> {
    if (!material._id || material._id === '') {
      let newMaterial: Partial<Material> = { ...material };
      console.log(newMaterial)
      return this.httpClient.post<Material>(this.path + '/material', newMaterial)
    }
    else
      console.log(material)
    return this.httpClient.put<Material>(this.path + '/material', material)
  }

  saveEnergierueckgewinnung(energierueckgewinnung: Partial<Energierueckgewinnung>): Observable<Energierueckgewinnung> {
    if (!energierueckgewinnung._id || energierueckgewinnung._id === '') {
      let newEnergierueckgewinnung: Partial<Energierueckgewinnung> = { ...energierueckgewinnung };
      return this.httpClient.post<Energierueckgewinnung>(this.path + '/energierueckgewinnung', newEnergierueckgewinnung)
    }
    else
      return this.httpClient.put<Energierueckgewinnung>(this.path + '/energierueckgewinnung', energierueckgewinnung)
  }

  /* energierueckgewinnungs$ = this.httpClient.get<Energierueckgewinnung[]>(this.path + '/energierueckgewinnung')
  .pipe(
    tap(data => console.log('Energierueckgewinnungs: ', JSON.stringify(data)))
  ); */


  getVerpackung(_id: string) {
    return this.httpClient.get<Verpackung>(this.path + '/verpackung/' + _id)
  }

  getBerechnungs(_id: string) {
    if (_id || _id !== '') {
      return this.httpClient.get<Berechnung[]>(this.path + '/berechnungs/' + _id)
    } else {
      return EMPTY
    }    
  }
  

  saveNutzenergieCO2Equivalent(nutzenergieCO2Equivalent: Partial<NutzenergieCO2Equivalent>): Observable<NutzenergieCO2Equivalent> {
    if (!nutzenergieCO2Equivalent._id || nutzenergieCO2Equivalent._id === '') {
      let newNutzenergieCO2Equivalent: Partial<NutzenergieCO2Equivalent> = { ...nutzenergieCO2Equivalent };
      return this.httpClient.post<NutzenergieCO2Equivalent>(this.path + '/nutzenergieCO2Equivalent', newNutzenergieCO2Equivalent)
    }
    else
      return this.httpClient.put<NutzenergieCO2Equivalent>(this.path + '/nutzenergieCO2Equivalent', nutzenergieCO2Equivalent)
  }

  saveTransportmittel(transportmittel: Partial<Transportmittel>): Observable<Transportmittel> {
    if (!transportmittel._id || transportmittel._id === '') {
      let newTransportmittel: Partial<Transportmittel> = { ...transportmittel };
      return this.httpClient.post<Transportmittel>(this.path + '/transportmittel', newTransportmittel)
    }
    else
      return this.httpClient.put<Transportmittel>(this.path + '/transportmittel', transportmittel)
  }

  saveVerarbeitung(verarbeitung: Partial<Verarbeitung>): Observable<Verarbeitung> {
    if (!verarbeitung._id || verarbeitung._id === '') {
      let newVerarbeitung: Partial<Verarbeitung> = { ...verarbeitung };
      return this.httpClient.post<Verarbeitung>(this.path + '/verarbeitung', newVerarbeitung)
    }
    else
      return this.httpClient.put<Verarbeitung>(this.path + '/verarbeitung', verarbeitung)
  } //materialverwendungEingabe


  saveVerpackung(verpackung: Partial<Verpackung>): Observable<Verpackung> {
    if (!verpackung._id || verpackung._id === '') {
      let newVerpackung: Partial<Verpackung> = { ...verpackung };
      return this.httpClient.post<Verpackung>(this.path + '/verpackung', newVerpackung)
    }
    else
      return this.httpClient.put<Verpackung>(this.path + '/verpackung/' + verpackung._id, verpackung)
  }

  

}