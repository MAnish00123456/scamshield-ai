export function getRiskColor(score) {
  if (score >= 7) return '#ff3b3b'
  if (score >= 4) return '#ffaa00'
  return '#00cc66'
}

export function getRiskLevel(score) {
  if (score >= 7) return 'danger'
  if (score >= 4) return 'warning'
  return 'safe'
}
