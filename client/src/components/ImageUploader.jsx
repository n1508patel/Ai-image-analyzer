import { useRef, useState } from "react";

export default function ImageUploader({ onUpload, loading }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="uploader-wrap">
      <div
        className={`drop-zone ${dragOver ? "drag-over" : ""} ${preview ? "has-preview" : ""}`}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {preview ? (
          <img src={preview} alt="preview" className="preview-img" />
        ) : (
          <div className="drop-hint">
            <span className="drop-icon">⬆</span>
            <p>Drop an image or click to upload</p>
            <small>JPG, PNG, WEBP — max 5MB</small>
          </div>
        )}
        {loading && (
          <div className="analyzing-overlay">
            <div className="spinner" />
            <span>Analyzing…</span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
      {preview && !loading && (
        <button
          className="btn-secondary"
          onClick={(e) => { e.stopPropagation(); setPreview(null); }}
        >
          Clear
        </button>
      )}
    </div>
  );
}
