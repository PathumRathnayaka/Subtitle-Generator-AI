import React, { useState } from 'react';
import { Upload, FileUp, Download, RefreshCw, Home, Edit, RefreshCcw, UserPlus } from 'lucide-react';

interface TranslationRow {
  id: number;
  from: string;
  to: string;
  originalText: string;
  translatedText: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<TranslationRow[]>([]);
  const [editingCell, setEditingCell] = useState<{
    rowId: number;
    field: keyof TranslationRow;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const newData: TranslationRow[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.match(/^\d+$/)) {
          const id = parseInt(line, 10);
          const timeRange = lines[++i].trim();
          const [from, to] = timeRange.split(' --> ');
          const originalText = lines[++i].trim();

          newData.push({
            id,
            from,
            to,
            originalText,
            translatedText: '',
          });
        }
      }

      setData(newData);
    };
    reader.readAsText(file);
  };

  const handleConvert = () => {
    setData(data.map(row => ({
      ...row,
      translatedText: `Translated: ${row.originalText}`,
    })));
  };

  const handleDownload = () => {
    const content = data
        .map(row => `${row.originalText}\t${row.translatedText}`)
        .join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'translations.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCellEdit = (rowId: number, field: keyof TranslationRow, value: string) => {
    setData(data.map(row =>
        row.id === rowId ? { ...row, [field]: value } : row
    ));
  };

  return (
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="flex space-x-4">
                <button className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                  <Home size={18} />
                  Home
                </button>
                <button className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                  <Edit size={18} />
                  Edit
                </button>
                <button className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                  <RefreshCcw size={18} />
                  Change
                </button>
              </div>
              <div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  <UserPlus size={18} />
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto p-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center gap-4">
              <label className="flex-1">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                />
              </label>
              <button
                  onClick={handleUpload}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Upload size={18} /> Upload
              </button>
              <button
                  onClick={handleConvert}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <RefreshCw size={18} /> Convert
              </button>
              <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                <Download size={18} /> Download
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Text</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Translated Text</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row) => (
                    <tr key={row.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {editingCell?.rowId === row.id && editingCell?.field === 'from' ? (
                            <input
                                type="text"
                                value={row.from}
                                onChange={(e) => handleCellEdit(row.id, 'from', e.target.value)}
                                onBlur={() => setEditingCell(null)}
                                autoFocus
                                className="border rounded px-2 py-1 w-full"
                            />
                        ) : (
                            <div onClick={() => setEditingCell({ rowId: row.id, field: 'from' })}>{row.from}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {editingCell?.rowId === row.id && editingCell?.field === 'to' ? (
                            <input
                                type="text"
                                value={row.to}
                                onChange={(e) => handleCellEdit(row.id, 'to', e.target.value)}
                                onBlur={() => setEditingCell(null)}
                                autoFocus
                                className="border rounded px-2 py-1 w-full"
                            />
                        ) : (
                            <div onClick={() => setEditingCell({ rowId: row.id, field: 'to' })}>{row.to}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {editingCell?.rowId === row.id && editingCell?.field === 'originalText' ? (
                            <input
                                type="text"
                                value={row.originalText}
                                onChange={(e) => handleCellEdit(row.id, 'originalText', e.target.value)}
                                onBlur={() => setEditingCell(null)}
                                autoFocus
                                className="border rounded px-2 py-1 w-full"
                            />
                        ) : (
                            <div onClick={() => setEditingCell({ rowId: row.id, field: 'originalText' })}>{row.originalText}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {editingCell?.rowId === row.id && editingCell?.field === 'translatedText' ? (
                            <input
                                type="text"
                                value={row.translatedText}
                                onChange={(e) => handleCellEdit(row.id, 'translatedText', e.target.value)}
                                onBlur={() => setEditingCell(null)}
                                autoFocus
                                className="border rounded px-2 py-1 w-full"
                            />
                        ) : (
                            <div onClick={() => setEditingCell({ rowId: row.id, field: 'translatedText' })}>{row.translatedText}</div>
                        )}
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;