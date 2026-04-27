import type { Inputs } from '../types'

type ModelOption = { label: string; value: string; isVariant?: boolean }

const BYD_MODELS: ModelOption[] = [
  { label: 'BYD Seagull', value: 'BYD Seagull' },
  { label: 'BYD Seal', value: 'BYD Seal' },
  { label: '  Performance', value: 'BYD Seal Performance', isVariant: true },
  { label: '  Advanced', value: 'BYD Seal Advanced', isVariant: true },
  { label: 'BYD Dolphin', value: 'BYD Dolphin' },
  { label: 'BYD Tang', value: 'BYD Tang' },
  { label: 'BYD Han', value: 'BYD Han' },
  { label: 'BYD Atto 3', value: 'BYD Atto 3' },
  { label: '  Dynamic', value: 'BYD Atto 3 Dynamic', isVariant: true },
  { label: '  Premium', value: 'BYD Atto 3 Premium', isVariant: true },
  { label: 'BYD eMAX 7', value: 'BYD eMAX 7' },
  { label: '  Standard', value: 'BYD eMAX 7 Standard', isVariant: true },
  { label: '  Superior Captain', value: 'BYD eMAX 7 Superior Captain', isVariant: true },
  { label: 'BYD Sealion 6', value: 'BYD Sealion 6' },
  { label: 'BYD Sealion 5', value: 'BYD Sealion 5' },
  { label: 'BYD Shark 6', value: 'BYD Shark 6' },
  { label: '  Premium', value: 'BYD Shark 6 Premium', isVariant: true },
  { label: '  Advanced', value: 'BYD Shark 6 Advanced', isVariant: true },
  { label: 'BYD Tang DM-i', value: 'BYD Tang DM-i' },
  { label: 'BYD Seal 5', value: 'BYD Seal 5' },
  { label: '  Dynamic', value: 'BYD Seal 5 Dynamic', isVariant: true },
  { label: '  Premium', value: 'BYD Seal 5 Premium', isVariant: true },
  { label: 'BYD eMAX 9', value: 'BYD eMAX 9' },
  { label: '  Premium', value: 'BYD eMAX 9 Premium', isVariant: true },
  { label: '  Advanced', value: 'BYD eMAX 9 Advanced', isVariant: true },
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
          <select
            value={inputs.modelName}
            onChange={e => onChange('modelName', e.target.value)}
          >
            <option value="">— Select a model —</option>
            {BYD_MODELS.map(opt => (
              <option key={opt.value} value={opt.value} style={opt.isVariant ? { paddingLeft: '1.5rem' } : undefined}>
                {opt.label}
              </option>
            ))}
          </select>
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
