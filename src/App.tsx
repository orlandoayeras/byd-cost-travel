import { useState } from 'react'
import InputPanel from './components/InputPanel'
import Dashboard from './components/Dashboard'
import type { Inputs, Calculations } from './types'

const DEFAULTS: Inputs = {
  modelName: 'SEAL 5 PREMIUM',
  kwhPer100km: 6.6,
  lPer100km: 1.5,
  mileage: 8790,
  electricityRate: 15,
  fuelPrice: 60,
}

function compute(inputs: Inputs): Calculations {
  const { kwhPer100km, lPer100km, mileage, electricityRate, fuelPrice } = inputs
  const totalElectricityUsed = (kwhPer100km * mileage) / 100
  const totalElectricityCost = totalElectricityUsed * electricityRate
  const totalFuelUsed = (lPer100km * mileage) / 100
  const totalFuelCost = totalFuelUsed * fuelPrice
  const totalCost = totalElectricityCost + totalFuelCost
  const costPerKm = totalCost / (mileage || 1)
  const kmPerPeso = mileage / (totalCost || 1)
  const evShare = totalCost > 0 ? (totalElectricityCost / totalCost) * 100 : 0
  const hevShare = totalCost > 0 ? (totalFuelCost / totalCost) * 100 : 0

  let powertrain = 'Plug-in Hybrid (PHEV)'
  if (kwhPer100km > 0 && lPer100km === 0) powertrain = 'Battery Electric (BEV)'
  else if (kwhPer100km === 0 && lPer100km > 0) powertrain = 'Hybrid Electric (HEV)'

  return {
    totalElectricityUsed,
    totalElectricityCost,
    totalFuelUsed,
    totalFuelCost,
    totalCost,
    costPerKm,
    kmPerPeso,
    evShare,
    hevShare,
    powertrain,
  }
}

export default function App() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS)

  const handleChange = (field: keyof Inputs, value: string | number) => {
    setInputs(prev => ({ ...prev, [field]: value }))
  }

  const calculations = compute(inputs)

  return (
    <div className="app">
      <InputPanel inputs={inputs} onChange={handleChange} />
      <Dashboard inputs={inputs} calculations={calculations} />
    </div>
  )
}
