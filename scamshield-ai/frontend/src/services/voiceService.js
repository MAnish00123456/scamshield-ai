import API_BASE from './api'

export async function analyzeVoice(file) {
  const formData = new FormData()
  formData.append('audio', file)
  const res = await fetch(`${API_BASE}/scan/voice`, {
    method: 'POST',
    body: formData,
  })
  if (!res.ok) throw new Error(`Voice analysis error: ${res.status}`)
  return res.json()
}
