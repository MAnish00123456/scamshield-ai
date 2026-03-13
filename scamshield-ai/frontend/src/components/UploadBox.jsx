import { useRef, useState } from "react"
import { scanImage } from "../imageScanService.js"
import ResultPanel from "./ResultPanel"

function UploadBox({ activeTab }) {

  const fileInputRef = useRef(null)

  const [fileName, setFileName] = useState("")
  const [linkValue, setLinkValue] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [scanResult, setScanResult] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {

      const file = e.target.files[0]

      setFileName(file.name)
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))

    }
  }

  const handleDrop = (e) => {
    e.preventDefault()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {

      const file = e.dataTransfer.files[0]

      setFileName(file.name)
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))

    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const removeFile = () => {
    setFileName("")
    setSelectedFile(null)
    setPreview(null)
  }

  const handleScan = async () => {

    if (!selectedFile) {
      alert("Please upload a screenshot first")
      return
    }

    try {

      const result = await scanImage(selectedFile)

      setScanResult(result)

      console.log("Scan Result:", result)

    } catch (error) {

      console.error("Scan failed:", error)

    }

  }

  // LINK TAB
  if (activeTab === "link") {
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
        />

        <button className="scan-btn">Check Link</button>

      </div>
    )
  }

  // VOICE TAB
  if (activeTab === "voice") {
    return (
      <div className="upload-box">

        <div className="upload-icon">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
            <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" />
          </svg>
        </div>

        <h3>Upload a voice message</h3>

        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {fileName && <p>{fileName}</p>}

        <button
          className="scan-btn"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload & Analyze
        </button>

      </div>
    )
  }

  // IMAGE TAB
  return (
    <>
      {!preview ? (
        <div
          className="upload-box"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          style={{ cursor: "pointer" }}
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
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

        </div>
      ) : (
        <div className="upload-box preview-mode">

          <img
            src={preview}
            alt="preview"
            className="image-preview"
          />

          <div className="file-info">

            <span className="file-name">{fileName}</span>

            <button
              className="remove-btn"
              onClick={removeFile}
            >
              Remove
            </button>

          </div>

          <button
            className="scan-btn"
            onClick={handleScan}
          >
            Scan Now
          </button>

        </div>
      )}

      {scanResult && <ResultPanel result={scanResult} />}

    </>
  )
}

export default UploadBox