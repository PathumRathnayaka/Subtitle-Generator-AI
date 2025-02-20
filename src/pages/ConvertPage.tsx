import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Download } from 'lucide-react';

export default function ConvertPage() {
  const subtitles = useSelector((state: RootState) => state.subtitles.subtitles);

  const handleDownload = () => {
    let subtitleContent = '';
    subtitles.forEach((row) => {
      subtitleContent += `${row.id}\n`;
      subtitleContent += `${row.from} --> ${row.to}\n`;
      subtitleContent += `${row.translatedText || row.originalText}\n\n`;
    });

    const blob = new Blob([subtitleContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_subtitles.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Download Converted Subtitles</h2>
        <div className="mb-8">
          <p className="text-gray-600 mb-4">
            You have {subtitles.length} subtitle entries ready for download.
          </p>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download size={20} />
            Download Converted Subtitles
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
          <div className="space-y-4">
            {subtitles.slice(0, 5).map((subtitle) => (
              <div key={subtitle.id} className="bg-white p-4 rounded-md shadow-sm">
                <div className="text-sm text-gray-500 mb-1">
                  {subtitle.from} → {subtitle.to}
                </div>
                <div className="text-gray-900">
                  {subtitle.translatedText || subtitle.originalText}
                </div>
              </div>
            ))}
            {subtitles.length > 5 && (
              <div className="text-center text-gray-500 text-sm">
                + {subtitles.length - 5} more entries
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}