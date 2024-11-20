import React from 'react';
import { Settings, ExternalLink } from 'lucide-react';

export function ConfigScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Settings className="h-12 w-12 text-blue-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6">Setup Required</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg mb-2">1. Create a Supabase Project</h2>
            <p className="text-gray-600 mb-4">
              If you haven't already, create a new project on Supabase.
            </p>
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              Go to Supabase <ExternalLink size={16} />
            </a>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">2. Create Required Table</h2>
            <p className="text-gray-600 mb-2">
              Create a table named <code className="bg-gray-100 px-2 py-1 rounded">handover_documents</code> with the following columns:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>id (uuid, primary key)</li>
              <li>date (timestamp)</li>
              <li>account_number (text)</li>
              <li>name (text)</li>
              <li>document_index1 (text)</li>
              <li>document_index2 (text)</li>
              <li>document_index3 (text)</li>
              <li>document_index4 (text)</li>
              <li>information (text)</li>
              <li>recipient (text)</li>
              <li>photo_proof (text)</li>
              <li>created_at (timestamp)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">3. Configure Environment Variables</h2>
            <p className="text-gray-600 mb-4">
              Create a <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file in your project root with:
            </p>
            <div className="bg-gray-50 p-4 rounded-md font-mono text-sm mb-4">
              <p>VITE_SUPABASE_URL=your_project_url</p>
              <p>VITE_SUPABASE_ANON_KEY=your_anon_key</p>
            </div>
            <p className="text-gray-600 text-sm">
              Find these values in your Supabase project settings under Project Settings → API.
            </p>
          </div>

          <div className="pt-4">
            <p className="text-sm text-gray-500 text-center">
              After completing these steps, restart your development server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}