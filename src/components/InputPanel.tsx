import { useState, useEffect } from 'react'
import type { Inputs } from '../types'

const BYD_MODELS = [
  'BYD Seagull EV',
  'BYD Dolphin EV',
  'BYD Tang EV',
  'BYD Tang DM-i',
  'BYD Han EV',
  'BYD Atto 3 DM-i Dynamic',
  'BYD Atto 3 DM-i Premium',
  'BYD Seal 5 DM-i Dynamic',
  'BYD Seal 5 DM-i Premium',
  'BYD Shark 6 DMO Premium',
  'BYD Shark 6 DMO Advanced',
  'BYD Sealion 6 DM-i',
  'BYD Sealion 5 DM-i',
  'BYD eMAX 7 DM-i Standard',
  'BYD eMAX 7 DM-i Superior Captain',
  'BYD eMAX 9 DM-i Premium',
  'BYD eMAX 9 DM-i Advanced',
]

interface InputPanelProps {
  inputs: Inputs
  onChange: (field: keyof Inputs, value: string | number) => void
}

function NumInput({
  value,
  field,
  step,
  min,
  onChange,
}: {
  value: number
  field: keyof Inputs
  step: number
  min?: number
  onChange: (field: keyof Inputs, value: number) => void
}) {
  const [raw, setRaw] = useState(value === 0 ? '' : String(value))

  useEffect(() => {
    if (value === 0) setRaw('')
  }, [value])

  return (
    <input
      type="number"
      value={raw}
      step={step}
      min={min}
      placeholder="0"
      onChange={e => {
        setRaw(e.target.value)
        onChange(field, parseFloat(e.target.value) || 0)
      }}
    />
  )
}

export default function InputPanel({ inputs, onChange }: InputPanelProps) {
  return (
    <div className="input-panel">
      <div className="input-panel-title">BYD COST TO TRAVEL — INPUTS</div>
      <div className="input-grid">
        <div className="input-field full-width">
          <label>Model Name</label>
          <select
            value={inputs.modelName}
            onChange={e => onChange('modelName', e.target.value)}
          >
            <option value="">— Select a model —</option>
            {BYD_MODELS.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div className="input-field">
          <label>⚡ Energy Consumption (EV)</label>
          <div className="input-unit-wrap">
            <NumInput value={inputs.kwhPer100km} field="kwhPer100km" step={0.1} onChange={onChange} />
            <span className="unit">kWh/100km</span>
          </div>
        </div>

        <div className="input-field">
          <label>💧 Fuel Consumption (HEV)</label>
          <div className="input-unit-wrap">
            <NumInput value={inputs.lPer100km} field="lPer100km" step={0.1} min={0} onChange={onChange} />
            <span className="unit">L/100km</span>
          </div>
        </div>

        <div className="input-field">
          <label>🛣️ Total Mileage</label>
          <div className="input-unit-wrap">
            <NumInput value={inputs.mileage} field="mileage" step={10} min={0} onChange={onChange} />
            <span className="unit">km</span>
          </div>
        </div>

        <div className="input-field">
          <label>⚡ Electricity Rate</label>
          <div className="input-unit-wrap">
            <span className="unit prefix">₱</span>
            <NumInput value={inputs.electricityRate} field="electricityRate" step={0.5} min={0} onChange={onChange} />
            <span className="unit">/kWh</span>
          </div>
        </div>

        <div className="input-field">
          <label>⛽ Fuel Price</label>
          <div className="input-unit-wrap">
            <span className="unit prefix">₱</span>
            <NumInput value={inputs.fuelPrice} field="fuelPrice" step={1} min={0} onChange={onChange} />
            <span className="unit">/L</span>
          </div>
        </div>
      </div>
    </div>
  )
}
