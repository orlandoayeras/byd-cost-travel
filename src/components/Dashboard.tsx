import DonutChart from './DonutChart'
import type { Inputs, Calculations } from '../types'

interface DashboardProps {
  inputs: Inputs
  calculations: Calculations
}

const peso = (n: number) =>
  '₱' + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const num = (n: number, dec = 2) =>
  n.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export default function Dashboard({ inputs, calculations }: DashboardProps) {
  const {
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
  } = calculations

  const updatedAt = new Date().toLocaleString('en-PH', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  return (
    <div className="dashboard">
      {/* ── Header ── */}
      <header className="dash-header">
        <div className="dash-header-text">
          <h1 className="dash-model">BYD {inputs.modelName}</h1>
          <h2 className="dash-headline">
            COST TO TRAVEL <span className="accent">{num(inputs.mileage, 0)} KM</span>
          </h2>
          <p className="dash-subtitle">BASED ON CUMULATIVE AEC</p>
          <div className="dash-meta">
            <span>🕐 Updated: {updatedAt}</span>
            <span>📏 Distance: {num(inputs.mileage, 0)} km</span>
          </div>
          <div className="dash-badges">
            <span className="badge eco">
              🌿 <strong>ECO-FRIENDLY</strong>
              <small>Lower cost, greener future</small>
            </span>
            <span className="badge hybrid">
              🔌 <strong>PLUG-IN HYBRID</strong>
              <small>Smart driving, combined range</small>
            </span>
          </div>
        </div>
      </header>

      {/* ── Stats Bar ── */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-icon">🛣️</div>
          <div className="stat-label">TOTAL DISTANCE</div>
          <div className="stat-value">{num(inputs.mileage, 0)} km</div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">⚡</div>
          <div className="stat-label">CUMULATIVE AEC</div>
          <div className="stat-value">
            {inputs.kwhPer100km} kWh/100km
            <br />+ {inputs.lPer100km} L/100km
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">🔌</div>
          <div className="stat-label">POWERTRAIN</div>
          <div className="stat-value">{powertrain}</div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">₱</div>
          <div className="stat-label">TOTAL COST</div>
          <div className="stat-value gold">{peso(totalCost)}</div>
        </div>
      </div>

      {/* ── Main Panels ── */}
      <div className="panels-wrapper">
        {/* EV Panel */}
        <div className="panel ev-panel">
          <div className="panel-header">⚡ ELECTRICITY (EV)</div>
          <div className="panel-body">
            <div className="metrics-grid">
              <div className="metric">
                <div className="metric-value">{inputs.kwhPer100km} kWh / 100km</div>
                <div className="metric-label">Energy Consumption</div>
              </div>
              <div className="metric">
                <div className="metric-value">{num(totalElectricityUsed)} kWh</div>
                <div className="metric-label">
                  Total Electricity Used
                  <br />
                  (for {num(inputs.mileage, 0)} km)
                </div>
              </div>
              <div className="metric">
                <div className="metric-value">{peso(inputs.electricityRate)} per kWh</div>
                <div className="metric-label">Electricity Rate</div>
              </div>
              <div className="metric">
                <div className="metric-value bold ev-color">{peso(totalElectricityCost)}</div>
                <div className="metric-label">Total Electricity Cost</div>
              </div>
            </div>
            <div className="donut-row">
              <DonutChart
                percentage={evShare}
                primaryColor="#1565c0"
                secondaryColor="#bbdefb"
                label={`EV share ${evShare.toFixed(1)}%`}
              />
              <div className="donut-legend">
                <div className="legend-item">
                  <span className="dot" style={{ background: '#1565c0' }} />
                  Electricity Cost
                  <br />
                  <strong>{peso(totalElectricityCost)}</strong>
                </div>
                <div className="legend-item">
                  <span className="dot" style={{ background: '#bbdefb' }} />
                  Share
                  <br />
                  <strong>{evShare.toFixed(1)}%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="panels-divider">+</div>

        {/* HEV Panel */}
        <div className="panel hev-panel">
          <div className="panel-header">💧 FUEL (HEV)</div>
          <div className="panel-body">
            <div className="metrics-grid">
              <div className="metric">
                <div className="metric-value">{inputs.lPer100km} L / 100km</div>
                <div className="metric-label">Fuel Consumption</div>
              </div>
              <div className="metric">
                <div className="metric-value">{num(totalFuelUsed)} L</div>
                <div className="metric-label">
                  Total Fuel Used
                  <br />
                  (for {num(inputs.mileage, 0)} km)
                </div>
              </div>
              <div className="metric">
                <div className="metric-value">{peso(inputs.fuelPrice)} per L</div>
                <div className="metric-label">Fuel Price</div>
              </div>
              <div className="metric">
                <div className="metric-value bold hev-color">{peso(totalFuelCost)}</div>
                <div className="metric-label">Total Fuel Cost</div>
              </div>
            </div>
            <div className="donut-row">
              <DonutChart
                percentage={hevShare}
                primaryColor="#2e7d32"
                secondaryColor="#c8e6c9"
                label={`HEV share ${hevShare.toFixed(1)}%`}
              />
              <div className="donut-legend">
                <div className="legend-item">
                  <span className="dot" style={{ background: '#2e7d32' }} />
                  Fuel Cost
                  <br />
                  <strong>{peso(totalFuelCost)}</strong>
                </div>
                <div className="legend-item">
                  <span className="dot" style={{ background: '#c8e6c9' }} />
                  Share
                  <br />
                  <strong>{hevShare.toFixed(1)}%</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Stats ── */}
      <div className="bottom-stats">
        <div className="bottom-stat">
          <div className="bottom-stat-icon">👛</div>
          <div className="bottom-stat-label">TOTAL COST</div>
          <div className="bottom-stat-value">{peso(totalCost)}</div>
          <div className="bottom-stat-sub">For {num(inputs.mileage, 0)} km</div>
        </div>
        <div className="bottom-stat">
          <div className="bottom-stat-icon">🏎️</div>
          <div className="bottom-stat-label">COST PER KM</div>
          <div className="bottom-stat-value">{peso(costPerKm)}</div>
          <div className="bottom-stat-sub">Per Kilometer</div>
        </div>
        <div className="bottom-stat">
          <div className="bottom-stat-icon">📏</div>
          <div className="bottom-stat-label">KILOMETERS PER PESO</div>
          <div className="bottom-stat-value">{num(kmPerPeso, 2)} km/₱</div>
          <div className="bottom-stat-sub">
            You get {num(kmPerPeso, 2)} km
            <br />
            for every peso spent.
          </div>
        </div>
      </div>

      {/* ── Quick Summary ── */}
      <div className="summary-section">
        <div className="summary-header">QUICK SUMMARY</div>
        <div className="summary-table-wrap">
          <table className="summary-table">
            <thead>
              <tr>
                <th>METRIC</th>
                <th className="ev-col">ELECTRICITY (EV)</th>
                <th className="hev-col">FUEL (HEV)</th>
                <th>TOTAL (COMBINED)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Consumption (per 100km)</td>
                <td>{inputs.kwhPer100km} kWh</td>
                <td>{inputs.lPer100km} L</td>
                <td>–</td>
              </tr>
              <tr>
                <td>Used for {num(inputs.mileage, 0)} km</td>
                <td>{num(totalElectricityUsed)} kWh</td>
                <td>{num(totalFuelUsed)} L</td>
                <td>–</td>
              </tr>
              <tr>
                <td>Rate</td>
                <td>{peso(inputs.electricityRate)} per kWh</td>
                <td>{peso(inputs.fuelPrice)} per L</td>
                <td>–</td>
              </tr>
              <tr>
                <td>Total Cost</td>
                <td>{peso(totalElectricityCost)}</td>
                <td>{peso(totalFuelCost)}</td>
                <td>
                  <strong>{peso(totalCost)}</strong>
                </td>
              </tr>
              <tr>
                <td>Share of Total Cost</td>
                <td>{evShare.toFixed(1)}%</td>
                <td>{hevShare.toFixed(1)}%</td>
                <td>100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="dash-footer">
        <div className="footer-slogans">
          <div className="footer-slogan">
            <span className="footer-icon">🌿</span>
            <span>
              Drive smarter.
              <br />
              Spend less.
            </span>
          </div>
          <div className="footer-slogan">
            <span className="footer-icon">🛡️</span>
            <span>
              Efficiency meets
              <br />
              sustainability.
            </span>
          </div>
          <div className="footer-slogan">
            <span className="footer-icon">📈</span>
            <span>
              Powered by Innovation.
              <br />
              Built for the future.
            </span>
          </div>
        </div>
        <div className="footer-brand">
          <span className="brand-handle">orlandoayeras</span>
        </div>
      </footer>
    </div>
  )
}
