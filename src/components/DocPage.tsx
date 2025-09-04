import { Upload, Camera, FileText, Image, FolderOpen, Shield, CheckCircle, AlertCircle, Plus, Download, Eye, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useState } from "react";
import { UploadDocument } from "./UploadDocument";

export function DocPage() {
  const [hasFileAccess, setHasFileAccess] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([
    {
      id: 1,
      name: "Passport.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "Dec 28, 2024",
      category: "Travel ID"
    },
    {
      id: 2,
      name: "Flight_Ticket.jpg",
      type: "Image",
      size: "1.8 MB", 
      uploadDate: "Dec 27, 2024",
      category: "Tickets"
    }
  ]);

  const handleDirectFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx';
    input.multiple = true;
    
    input.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        // Handle the selected files here
        Array.from(files).forEach(file => {
          console.log('Selected file:', file.name, file.size, file.type);
          // You can add the file to uploadedDocs state here
          const newDoc = {
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type.includes('pdf') ? 'PDF' : 'Image',
            size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
            uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            category: file.type.includes('pdf') ? 'Travel ID' : 'Tickets'
          };
          setUploadedDocs(prev => [...prev, newDoc]);
        });
      }
    };
    
    input.click();
  };

  const requestFileAccess = () => {
    // Simulate file access request
    setHasFileAccess(true);
  };

  return (
    <>
      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 font-medium">Document Manager</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Upload and manage your travel documents</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={hasFileAccess ? "default" : "secondary"} className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200">
              {hasFileAccess ? "Access Granted" : "Limited Access"}
            </Badge>
          </div>
        </div>

        {/* File Access Permission */}
        {!hasFileAccess && (
          <Card className="p-4 bg-sky-50 dark:bg-sky-900/30 border-sky-200 dark:border-sky-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-100 dark:bg-sky-800 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-sky-800 dark:text-sky-200 font-medium">File Access Required</h3>
                <p className="text-sm text-sky-600 dark:text-sky-400">Allow ScanYatra to access your files for uploading documents and photos</p>
              </div>
            </div>
            <Button 
              onClick={requestFileAccess}
              className="w-full mt-3 bg-sky-600 dark:bg-sky-600 hover:bg-sky-700 dark:hover:bg-sky-700 text-white"
            >
              Grant File Access
            </Button>
          </Card>
        )}

        {/* Upload Options */}
        <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <h3 className="text-gray-800 dark:text-gray-200 font-medium mb-3">Upload Documents</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className={`h-16 flex flex-col items-center space-y-1 ${
                hasFileAccess 
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300' 
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }`}
              disabled={!hasFileAccess}
              onClick={() => hasFileAccess && handleDirectFileUpload()}
            >
              <Upload className="h-5 w-5" />
              <span className="text-xs">Upload Document</span>
            </Button>
            
            <Button 
              variant="outline" 
              className={`h-16 flex flex-col items-center space-y-1 ${
                hasFileAccess 
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300' 
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }`}
              disabled={!hasFileAccess}
            >
              <Camera className="h-5 w-5" />
              <span className="text-xs">Take Photo</span>
            </Button>
          </div>
          
          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Supported formats: PDF, JPG, PNG, DOC • Max size: 10MB
            </p>
          </div>
        </Card>

        {/* Document Categories */}
        <Card className="p-4 bg-white border-gray-200">
          <h3 className="text-gray-800 font-medium mb-3">Document Categories</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "Travel ID", icon: FileText, count: 1, color: "green" },
              { name: "Tickets", icon: Image, count: 1, color: "blue" },
              { name: "Insurance", icon: Shield, count: 0, color: "purple" },
              { name: "Receipts", icon: FolderOpen, count: 0, color: "orange" }
            ].map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.name} className="p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-4 w-4 text-${category.color}-600`} />
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Uploaded Documents */}
        <Card className="p-4 bg-white border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-800 font-medium">Uploaded Documents</h3>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-green-600"
              onClick={() => hasFileAccess && setShowUploadModal(true)}
              disabled={!hasFileAccess}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add New
            </Button>
          </div>
          
          <div className="space-y-3">
            {uploadedDocs.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {doc.type === "PDF" ? (
                      <FileText className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Image className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.size} • {doc.uploadDate}</p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {doc.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button size="sm" variant="ghost" className="text-blue-600 h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-green-600 h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-600 h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Storage Info */}
        <Card className="p-4 bg-white border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FolderOpen className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-800">Storage Used</p>
                <p className="text-xs text-gray-500">4.2 MB of 100 MB</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-600 font-medium">95.8 MB Free</p>
              <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                <div className="w-1 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-12 bg-sky-50 border-sky-200 hover:bg-sky-100 text-sky-700"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Backup Documents
          </Button>
          
          <Button 
            variant="outline" 
            className="h-12 bg-green-50 border-green-200 hover:bg-green-100 text-green-700"
          >
            <Shield className="h-5 w-5 mr-2" />
            Security Settings
          </Button>
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <UploadDocument onClose={() => setShowUploadModal(false)} />
      )}
    </>
  );
}