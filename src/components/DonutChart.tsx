interface DonutChartProps {
  percentage: number
  primaryColor: string
  secondaryColor: string
  label: string
}

const R = 52
const CX = 70
const CY = 70
const CIRC = 2 * Math.PI * R

export default function DonutChart({ percentage, primaryColor, secondaryColor, label }: DonutChartProps) {
  const clampedPct = Math.max(0, Math.min(100, percentage))
  const filled = (clampedPct / 100) * CIRC

  return (
    <svg width="140" height="140" viewBox="0 0 140 140" aria-label={label}>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={secondaryColor} strokeWidth="18" />
      <circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke={primaryColor}
        strokeWidth="18"
        strokeDasharray={`${filled} ${CIRC}`}
        strokeLinecap="butt"
        transform={`rotate(-90 ${CX} ${CY})`}
      />
      <text x={CX} y={CY - 8} textAnchor="middle" fill={primaryColor} fontSize="22" fontWeight="bold" fontFamily="inherit">
        {clampedPct.toFixed(1)}%
      </text>
      <text x={CX} y={CY + 10} textAnchor="middle" fill="#666" fontSize="9" fontFamily="inherit">
        OF TOTAL COST
      </text>
    </svg>
  )
}
