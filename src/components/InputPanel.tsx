import type { Inputs } from '../types'

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
  min: number
  onChange: (field: keyof Inputs, value: number) => void
}) {
  return (
    <input
      type="number"
      value={value}
      step={step}
      min={min}
      onChange={e => onChange(field, parseFloat(e.target.value) || 0)}
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
          <input
            type="text"
            value={inputs.modelName}
            onChange={e => onChange('modelName', e.target.value)}
            placeholder="e.g. SEAL 5 PREMIUM"
          />
        </div>

        <div className="input-field">
          <label>⚡ Energy Consumption (EV)</label>
          <div className="input-unit-wrap">
            <NumInput value={inputs.kwhPer100km} field="kwhPer100km" step={0.1} min={0} onChange={onChange} />
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
