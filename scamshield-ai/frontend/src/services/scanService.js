import API_BASE from './api'

export async function scanScreenshot(file) {
  const formData = new FormData()
  formData.append('image', file)
  const res = await fetch(`${API_BASE}/scan/screenshot`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) throw new Error(`Scan error: ${res.status}`)
  return res.json()
}
