import { useRef, useState } from "react"
import { scanImage } from "../imageScanService.js"
import analyzeVoice from "../services/voiceService.js"
import ResultPanel from "./ResultPanel"

function UploadBox({ activeTab }) {

  const fileInputRef = useRef(null)

  const [fileName, setFileName] = useState("")
  const [linkValue, setLinkValue] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [scanResult, setScanResult] = useState(null)

  const [isScanning, setIsScanning] = useState(false)
  const [scanLocked, setScanLocked] = useState(false)

  // FILE SELECT
  const handleFileChange = (e) => {

    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setSelectedFile(file)

    // preview only for screenshots
    if (activeTab === "screenshot") {
      setPreview(URL.createObjectURL(file))
    } else {
      setPreview(null)
    }

    setScanResult(null)
    setScanLocked(false)
  }

  // DRAG DROP (image only)
  const handleDrop = (e) => {

    e.preventDefault()

    if (activeTab !== "screenshot") return

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    setFileName(file.name)
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))

    setScanResult(null)
    setScanLocked(false)
  }

  const handleDragOver = (e) => e.preventDefault()

  const removeFile = () => {

    setFileName("")
    setSelectedFile(null)
    setPreview(null)
    setScanResult(null)
    setScanLocked(false)
  }

  // IMAGE SCAN
  const handleImageScan = async () => {

    if (!selectedFile) {
      alert("Please upload a screenshot first")
      return
    }

    if (isScanning || scanLocked) return

    try {

      setIsScanning(true)

      const result = await scanImage(selectedFile)

      setScanResult(result)
      setScanLocked(true)

    } catch (error) {

      console.error("Image scan failed:", error)

    } finally {

      setIsScanning(false)

    }
  }

  // VOICE SCAN
  const handleVoiceScan = async () => {

    if (!selectedFile) {
      alert("Please upload a voice file first")
      return
    }

    try {

      setIsScanning(true)

      const result = await analyzeVoice(selectedFile)

      setScanResult(result)

    } catch (error) {

      console.error("Voice scan failed:", error)

    } finally {

      setIsScanning(false)

    }
  }

  // =========================
  // LINK TAB
  // =========================

  if (activeTab === "link") {

    return (
      <div className="upload-box">

        <h3>Paste a suspicious link</h3>

        <input
          type="text"
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
          placeholder="https://suspicious-link.com..."
        />

        <button className="scan-btn">
          Check Link
        </button>

      </div>
    )
  }

  // =========================
  // VOICE TAB
  // =========================

if (activeTab === "voice") {

  return (
    <>

      {!selectedFile ? (

        <div
          className="upload-box"
          onClick={() => fileInputRef.current?.click()}
          style={{ cursor: "pointer" }}
        >

          <h3>Upload a voice message</h3>

          <input
            ref={fileInputRef}
            type="file"
            accept=".mp3,.wav,.m4a,.ogg"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <p>MP3, WAV, M4A supported — max 10MB</p>

        </div>

      ) : (

        <div className="upload-box preview-mode">

          <audio
            controls
            src={URL.createObjectURL(selectedFile)}
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
            onClick={handleVoiceScan}
            disabled={isScanning}
          >
            {isScanning ? "Analyzing..." : "Analyze Voice"}
          </button>

        </div>

      )}

      {scanResult && <ResultPanel result={scanResult} />}

    </>
  )
}

  // =========================
  // IMAGE TAB
  // =========================

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

          <h3>Drop your screenshot here</h3>

          <p>PNG, JPG, WEBP, PDF supported — max 10MB</p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
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
            onClick={handleImageScan}
            disabled={isScanning}
          >
            {isScanning ? "Scanning..." : "Scan Now"}
          </button>

        </div>

      )}

      {scanResult && <ResultPanel result={scanResult} />}

    </>
  )
}

export default UploadBox