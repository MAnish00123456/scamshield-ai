import { apiFetch } from './api'

export async function sendMessage(message) {
  return apiFetch('/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  })
}
