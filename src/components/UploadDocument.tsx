import { useState } from "react";
import { Upload, FileText, Image, File, X, CheckCircle, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
}

export function UploadDocument({ onClose }: { onClose: () => void }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "passport_copy.pdf",
      size: 2048576,
      type: "application/pdf",
      uploadDate: "2024-09-03"
    },
    {
      id: "2",
      name: "flight_ticket.jpg",
      size: 1024768,
      type: "image/jpeg",
      uploadDate: "2024-09-02"
    }
  ]);

  const supportedFormats = [
    { type: "PDF", extensions: ".pdf", icon: FileText, color: "red" },
    { type: "Images", extensions: ".jpg, .jpeg, .png", icon: Image, color: "blue" },
    { type: "Documents", extensions: ".doc, .docx", icon: File, color: "green" }
  ];

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
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setUploadedFiles(prev => [...prev, newFile]);
    });
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return FileText;
    if (type.includes('image')) return Image;
    return File;
  };

  const getFileTypeColor = (type: string) => {
    if (type.includes('pdf')) return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    if (type.includes('image')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-gray-900 dark:text-gray-100">Upload Documents</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Supported Formats */}
          <div>
            <h3 className="text-gray-900 dark:text-gray-100 mb-3">Supported Formats</h3>
            <div className="grid grid-cols-1 gap-2">
              {supportedFormats.map((format, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <format.icon className={`w-5 h-5 text-${format.color}-600 dark:text-${format.color}-400`} />
                  <div>
                    <p className="text-sm text-gray-900 dark:text-gray-100">{format.type}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{format.extensions}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-sky-400 hover:bg-sky-50/50 dark:hover:bg-sky-900/10'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Drag and drop files here, or
            </p>
            <label className="inline-block">
              <Button
                variant="outline"
                className="border-sky-500 text-sky-600 hover:bg-sky-50 dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-900/20"
              >
                Browse Files
              </Button>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Maximum file size: 10MB
            </p>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div>
              <h3 className="text-gray-900 dark:text-gray-100 mb-3">Uploaded Documents</h3>
              <div className="space-y-2">
                {uploadedFiles.map((file) => {
                  const FileIcon = getFileIcon(file.type);
                  return (
                    <Card key={file.id} className="p-3">
                      <div className="flex items-center space-x-3">
                        <FileIcon className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-gray-100 truncate">
                            {file.name}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              variant="secondary"
                              className={`text-xs ${getFileTypeColor(file.type)}`}
                            >
                              {file.type.split('/')[1].toUpperCase()}
                            </Badge>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatFileSize(file.size)}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {file.uploadDate}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="flex items-start space-x-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 dark:text-amber-200">Security Notice</p>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                Your documents are encrypted and stored securely. Only you can access them.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              onClick={onClose}
              className="flex-1 bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-800"
            >
              Done
            </Button>
            <Button
              variant="outline"
              onClick={() => setUploadedFiles([])}
              className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}