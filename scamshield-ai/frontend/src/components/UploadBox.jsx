import { useRef, useState } from 'react'

function UploadBox({ activeTab }) {
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState('')
  const [linkValue, setLinkValue] = useState('')

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  if (activeTab === 'link') {
    return (
      <div className="upload-box">
        <div className="upload-icon">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
        </div>
        <h3>Paste a suspicious link</h3>
        <p>We'll analyze the URL for phishing and malware indicators</p>
        <input
          type="text"
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
          placeholder="https://suspicious-link.com..."
          style={{
            background: '#131728',
            border: '0.5px solid #1e2235',
            borderRadius: '8px',
            padding: '10px 14px',
            color: '#c0cce0',
            fontSize: '13px',
            outline: 'none',
            width: '100%',
            maxWidth: '400px',
            marginBottom: '16px',
          }}
        />
        <br />
        <button className="scan-btn">Check Link</button>
      </div>
    )
  }

  if (activeTab === 'voice') {
    return (
      <div className="upload-box">
        <div className="upload-icon">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
            <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
          </svg>
        </div>
        <h3>Upload a voice message</h3>
        <p>MP3, WAV, OGG supported — max 25MB</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {fileName && <p style={{ color: '#00aaff', marginBottom: '12px' }}>{fileName}</p>}
        <button className="scan-btn" onClick={() => fileInputRef.current?.click()}>
          Upload & Analyze
        </button>
      </div>
    )
  }

  return (
    <div
      className="upload-box"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => fileInputRef.current?.click()}
      style={{ cursor: 'pointer' }}
    >
      <div className="upload-icon">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>
      </div>
      <h3>Drop your screenshot here</h3>
      <p>PNG, JPG, WEBP supported — max 10MB</p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {fileName && <p style={{ color: '#00aaff', marginBottom: '12px' }}>{fileName}</p>}
      <button className="scan-btn" onClick={(e) => { e.stopPropagation() }}>
        Scan Now
      </button>
    </div>
  )
}

export default UploadBox
