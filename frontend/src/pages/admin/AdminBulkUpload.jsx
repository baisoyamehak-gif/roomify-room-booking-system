import { useState } from 'react';
import { Upload, Download, Users, RefreshCw, X } from 'lucide-react';
import Button from '../../components/common/Button';
import { bulkUploadAPI } from '../../services/api';

const AdminBulkUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [templateDownloaded, setTemplateDownloaded] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadResult(null);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await bulkUploadAPI.downloadTemplate();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'user_upload_template.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      setTemplateDownloaded(true);
    } catch (error) {
      console.error('Failed to download template:', error);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

      const users = [];
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const user = {};
        headers.forEach((header, index) => {
          user[header] = values[index];
        });
        if (user.employeeid && user.name && user.email && user.password) {
          // Map employeeid to employeeId (camelCase for backend)
          user.employeeId = user.employeeid;
          delete user.employeeid;
          users.push(user);
        }
      }

      const response = await bulkUploadAPI.uploadUsers(users);
      setUploadResult({
        success: true,
        message: 'Users uploaded successfully!',
        details: response.data.data.results
      });
      setFile(null);
    } catch (error) {
      setUploadResult({
        success: false,
        message: error.response?.data?.message || 'Failed to upload users',
        details: null
      });
    } finally {
      setUploading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setUploadResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Bulk Upload Users</h1>
        <p className="text-gray-500 text-sm mt-1">Upload multiple users via Excel file</p>
      </div>

      {/* Instructions Card */}
      <div className="bg-white rounded-xl border p-4 md:p-6" style={{ borderColor: '#E5E7EB' }}>
        <h2 className="font-semibold text-gray-800 mb-3">Instructions</h2>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">1.</span>
            <span>Download the CSV template first</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">2.</span>
            <span>Fill in the user details following the same format</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">3.</span>
            <span>Upload the completed file</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">4.</span>
            <span>Review and confirm the upload</span>
          </li>
        </ul>

        <div className="mt-4 p-3 rounded-lg" style={{ background: '#EFF6FF' }}>
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Roles must be one of: admin, approver, requester
          </p>
        </div>
      </div>

      {/* Download Template */}
      <div className="bg-white rounded-xl border p-4 md:p-6" style={{ borderColor: '#E5E7EB' }}>
        <h2 className="font-semibold text-gray-800 mb-3">Download Template</h2>
        <Button onClick={handleDownloadTemplate}>
          <Download size={18} className="mr-2" />
          Download CSV Template
        </Button>
        {templateDownloaded && (
          <p className="text-sm text-green-600 mt-2">Template downloaded successfully!</p>
        )}
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl border p-4 md:p-6" style={{ borderColor: '#E5E7EB' }}>
        <h2 className="font-semibold text-gray-800 mb-3">Upload Users File</h2>

        <div
          className="border-2 border-dashed rounded-xl p-6 md:p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          style={{ borderColor: '#D1D5DB' }}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <input
            id="fileInput"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          <Upload size={32} className="mx-auto mb-3 text-gray-400" />
          <p className="text-gray-600 text-sm">
            {file ? file.name : 'Click to select or drag and drop your CSV file'}
          </p>
          <p className="text-xs text-gray-400 mt-1">Only .csv files are accepted</p>
        </div>

        {file && (
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg gap-3" style={{ background: '#F3F4F6' }}>
            <div className="flex items-center gap-3">
              <Users size={20} className="text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">{file.name}</p>
                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button onClick={handleClear} className="text-gray-400 hover:text-gray-600 self-start sm:self-auto">
              <X size={18} />
            </button>
          </div>
        )}

        {uploadResult && (
          <div className={`mt-4 p-4 rounded-lg ${uploadResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className={`font-medium ${uploadResult.success ? 'text-green-800' : 'text-red-800'}`}>
              {uploadResult.message}
            </p>
            {uploadResult.details && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Added: {uploadResult.details.added}</p>
                <p>Updated: {uploadResult.details.updated}</p>
                <p>Failed: {uploadResult.details.failed}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-4">
          <Button onClick={handleUpload} disabled={!file || uploading} className="w-full sm:w-auto">
            {uploading ? (
              <>
                <RefreshCw size={18} className="mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} className="mr-2" />
                Upload Users
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminBulkUpload;
