export interface Materialverwendung {
  layer: number,
  materialId: string,
  verarbeitungId: string,
  recyclingverfahrenId: string,
  energierueckgewinnungId: string,
  transportmittelId: string,
  menge: number,
  flaeche: number,
  dicke: number,
  recyclingQuote: number,
  transportstrecke: number,
  openLoop: boolean
}