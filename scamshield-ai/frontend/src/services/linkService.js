import { apiFetch } from './api'

export async function checkLink(url) {
  return apiFetch('/scan/link', {
    method: 'POST',
    body: JSON.stringify({ url }),
  })
}
