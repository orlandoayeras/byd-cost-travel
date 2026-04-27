export interface Inputs {
  modelName: string
  kwhPer100km: number
  lPer100km: number
  mileage: number
  electricityRate: number
  fuelPrice: number
}

export interface Calculations {
  totalElectricityUsed: number
  totalElectricityCost: number
  totalFuelUsed: number
  totalFuelCost: number
  totalCost: number
  costPerKm: number
  kmPerPeso: number
  evShare: number
  hevShare: number
  powertrain: string
}
