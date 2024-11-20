import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FileText, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { PhotoCapture } from './components/PhotoCapture';
import { HandoverHistory } from './components/HandoverHistory';
import { ConfigScreen } from './components/ConfigScreen';
import { HandoverDocument } from './types';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function App() {
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    accountNumber: '',
    name: '',
    documentIndex1: '',
    documentIndex2: '',
    documentIndex3: '',
    documentIndex4: '',
    information: '',
    recipient: '',
    photoProof: '',
  });
  const [history, setHistory] = useState<HandoverDocument[]>([]);

  useEffect(() => {
    if (isSupabaseConfigured()) {
      fetchHistory();
    }
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: supabaseError } = await supabase
        .from('handover_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        throw supabaseError;
      }

      setHistory(data || []);
    } catch (err) {
      setError('Failed to load handover history. Please try again later.');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError(null);
      const document = {
        ...formData,
        date,
        created_at: new Date().toISOString(),
      };

      const { error: supabaseError } = await supabase
        .from('handover_documents')
        .insert([document]);

      if (supabaseError) {
        throw supabaseError;
      }

      setFormData({
        accountNumber: '',
        name: '',
        documentIndex1: '',
        documentIndex2: '',
        documentIndex3: '',
        documentIndex4: '',
        information: '',
        recipient: '',
        photoProof: '',
      });
      setDate(new Date());
      fetchHistory();
    } catch (err) {
      setError('Failed to save document. Please try again.');
      console.error('Error saving document:', err);
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(history);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Handover Documents');
    XLSX.writeFile(wb, 'handover-documents.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Date', 'Account Number', 'Name', 'Recipient']],
      body: history.map(item => [
        new Date(item.date).toLocaleDateString(),
        item.accountNumber,
        item.name,
        item.recipient,
      ]),
    });
    doc.save('handover-documents.pdf');
  };

  if (!isSupabaseConfigured()) {
    return <ConfigScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Minutes of Handover</h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date || new Date())}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Document Index 1</label>
                <input
                  type="text"
                  value={formData.documentIndex1}
                  onChange={(e) => setFormData({...formData, documentIndex1: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Document Index 2</label>
                <input
                  type="text"
                  value={formData.documentIndex2}
                  onChange={(e) => setFormData({...formData, documentIndex2: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Document Index 3</label>
                <input
                  type="text"
                  value={formData.documentIndex3}
                  onChange={(e) => setFormData({...formData, documentIndex3: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Document Index 4</label>
                <input
                  type="text"
                  value={formData.documentIndex4}
                  onChange={(e) => setFormData({...formData, documentIndex4: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Recipient</label>
                <input
                  type="text"
                  value={formData.recipient}
                  onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Information</label>
              <textarea
                value={formData.information}
                onChange={(e) => setFormData({...formData, information: e.target.value})}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo Proof</label>
              <PhotoCapture
                onCapture={(photoData) => setFormData({...formData, photoProof: photoData})}
              />
              {formData.photoProof && (
                <img
                  src={formData.photoProof}
                  alt="Proof"
                  className="mt-2 h-48 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit
              </button>
              
              <button
                type="button"
                onClick={exportToExcel}
                className="inline-flex items-center gap-2 py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FileSpreadsheet size={20} />
                Export to Excel
              </button>
              
              <button
                type="button"
                onClick={exportToPDF}
                className="inline-flex items-center gap-2 py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FileText size={20} />
                Export to PDF
              </button>
            </div>
          </form>

          <HandoverHistory data={history} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;