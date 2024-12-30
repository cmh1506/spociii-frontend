export interface Material {  
  _id: string
  name: string,
  /* a_wert_pef: number, */
  bioco2verbrennung: number,
  bio_fuelco2: number,
  bioco2prod: number,
  co2recycling: number,
  co2_deponie: number,
  co2verbrennung: number,
  dichte: number,
  energie_recycling: number,
  fossiles: number,
  heizenergie: number,
  productionCO2: number,
  prozessenergie: number,
  r_rate_herstellung: number,
  recyclat_2te_mal: boolean,
  recyclierbar: boolean,
  //recycling_modus: Recyclingverfahren
}