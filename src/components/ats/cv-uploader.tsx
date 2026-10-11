"use client";

import * as React from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";

export interface CVUploaderProps {
  onFileSelect: (file: File) => void;
  isScanning?: boolean;
}

export const CVUploader: React.FC<CVUploaderProps> = ({
  onFileSelect,
}) => {
  const [dragActive, setDragActive] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const validateAndPass = (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Hanya format PDF (.pdf) yang didukung untuk analisis ATS standar.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB.");
      return;
    }
    setError(null);
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndPass(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndPass(e.target.files[0]);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-8 text-center rounded-lg border-2 border-dashed transition-all cursor-pointer ${
          dragActive
            ? "border-lime-500 bg-lime-50/50"
            : "border-border-default hover:border-navy-200 bg-bg-surface"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleChange}
        />

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-subtle text-navy-950 mb-3">
          {selectedFile ? (
            <FileText className="h-6 w-6 text-emerald-600" />
          ) : (
            <Upload className="h-6 w-6" />
          )}
        </div>

        {selectedFile ? (
          <div>
            <p className="text-sm font-bold text-navy-950">{selectedFile.name}</p>
            <p className="text-xs text-text-secondary mt-0.5">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB · Klik untuk ganti file
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-bold text-navy-950">
              Tarik & Letakkan file CV di sini, atau <span className="underline">Pilih File</span>
            </p>
            <p className="text-xs text-text-secondary mt-1">
              Mendukung format PDF (Maks. 5 MB) · Standar scan ATS internasional
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs text-red-600 font-medium">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
