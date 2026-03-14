import API_BASE from "./api"

export default async function analyzeLink(url) {
  const res = await fetch(`${API_BASE}/scan-link`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url })
  })

  if (!res.ok) {
    throw new Error("Link scan failed")
  }

  return res.json()
}
