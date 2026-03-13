import React from "react"

export default function RiskMeter({ score }) {

  const radius = 60
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <svg width="160" height="160">

      <circle
        cx="80"
        cy="80"
        r={radius}
        stroke="#1e293b"
        strokeWidth="12"
        fill="none"
      />

      <circle
        cx="80"
        cy="80"
        r={radius}
        stroke="#ef4444"
        strokeWidth="12"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 80 80)"
      />

      <text
        x="80"
        y="90"
        textAnchor="middle"
        fontSize="22"
        fill="white"
      >
        {score}%
      </text>

    </svg>
  )
}