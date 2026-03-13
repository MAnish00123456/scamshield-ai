import API_BASE from './api'

export default async function analyzeVoice(file) {

  const formData = new FormData()

  // must match FastAPI parameter name
  formData.append('file', file)

  const res = await fetch(`${API_BASE}/scan-audio`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error(`Voice analysis error: ${res.status}`)
  }

  return res.json()
}