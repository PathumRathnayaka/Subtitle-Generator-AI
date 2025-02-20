import React, { useState, useEffect } from 'react';
import { Upload, Download } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  setPrimarySubtitles,
  setSecondarySubtitles,
  setTranslatedSubtitles,
  TranslationRow
} from '../store/subtitleSlice';
import { compareTexts } from '../utils/gemini';

const API_URL = 'http://localhost:3001/api';

export default function TimeSyncPage() {
  const [primaryFile, setPrimaryFile] = useState<File | null>(null);
  const [secondaryFile, setSecondaryFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const { primarySubtitles, secondarySubtitles, translatedSubtitles } = useSelector((state: RootState) => state.subtitles);

  // Load existing subtitles on component mount
  useEffect(() => {
    const loadSubtitles = async () => {
      setLoading(true);
      setError(null);

      try {
        const [primaryRes, secondaryRes, translatedRes] = await Promise.all([
          fetch(`${API_URL}/subtitles/primary`),
          fetch(`${API_URL}/subtitles/secondary`),
          fetch(`${API_URL}/subtitles/translated`)
        ]);

        if (primaryRes.ok) {
          const primaryData = await primaryRes.json();
          dispatch(setPrimarySubtitles(primaryData));
        }

        if (secondaryRes.ok) {
          const secondaryData = await secondaryRes.json();
          dispatch(setSecondarySubtitles(secondaryData));
        }

        if (translatedRes.ok) {
          const translatedData = await translatedRes.json();
          dispatch(setTranslatedSubtitles(translatedData));
        }
      } catch (error) {
        setError('Error loading subtitles. Please try again.');
        console.error('Error loading subtitles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSubtitles();
  }, [dispatch]);

  // Parse subtitle file
  const parseSubtitleFile = (text: string): TranslationRow[] => {
    const lines = text.split('\n');
    const data: TranslationRow[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.match(/^\d+$/)) {
        const id = parseInt(line, 10);
        const timeRange = lines[++i]?.trim() || '';
        const [from, to] = timeRange.split(' --> ');
        const originalText = lines[++i]?.trim() || '';

        data.push({
          id,
          from: from || '',
          to: to || '',
          originalText,
          translatedText: '',
        });
      }
    }

    return data;
  };

  // Handle file upload
  const handleFileChange = async (file: File | null, isPrimary: boolean) => {
    if (isPrimary) {
      setPrimaryFile(file);
    } else {
      setSecondaryFile(file);
    }

    if (file) {
      setLoading(true);
      setError(null);

      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const parsedData = parseSubtitleFile(text);

        try {
          const response = await fetch(`${API_URL}/subtitles/${isPrimary ? 'primary' : 'secondary'}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedData),
          });

          if (!response.ok) {
            throw new Error('Failed to save subtitles');
          }

          if (isPrimary) {
            dispatch(setPrimarySubtitles(parsedData));
          } else {
            dispatch(setSecondarySubtitles(parsedData));
          }
        } catch (error) {
          setError('Error saving subtitles. Please try again.');
          console.error('Error saving subtitles:', error);
        } finally {
          setLoading(false);
        }
      };
      reader.readAsText(file);
    }
  };

  // Sync subtitles and replace originalText values
  const handleSync = async () => {
    if (primarySubtitles.length === 0 || secondarySubtitles.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const translated = primarySubtitles.map((primary) => {
        // Find the corresponding secondary subtitle based on ID
        const matchedSecondary = secondarySubtitles.find((secondary) => secondary.id === primary.id);

        return {
          ...primary,
          originalText: matchedSecondary ? matchedSecondary.originalText : primary.originalText,
        };
      });

      setTranslatedSubtitles(translated);
      dispatch(setTranslatedSubtitles(translated));

      // Save translated subtitles to the server
      const response = await fetch(`${API_URL}/subtitles/translated`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(translated),
      });

      if (!response.ok) {
        throw new Error('Failed to save translated subtitles');
      }
    } catch (error) {
      setError('Error syncing subtitles. Please try again.');
      console.error('Error syncing subtitles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Convert translated JSON to .srt format
  const convertToSrt = (subtitles: TranslationRow[]): string => {
    return subtitles
        .map((sub) => {
          return `${sub.id}\n${sub.from} --> ${sub.to}\n${sub.originalText}\n`;
        })
        .join('\n');
  };

  // Handle download
  const handleDownload = () => {
    if (translatedSubtitles.length === 0) return;

    const srtContent = convertToSrt(translatedSubtitles);
    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'translated_subtitles.srt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary File Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Primary Subtitle File</label>
                <div className="flex items-center gap-4">
                  <input
                      type="file"
                      accept=".srt"
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null, true)}
                      className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  />
                </div>
                {primarySubtitles.length > 0 && (
                    <p className="text-sm text-green-600">Primary subtitles loaded: {primarySubtitles.length} entries</p>
                )}
              </div>

              {/* Secondary File Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Secondary Subtitle File</label>
                <div className="flex items-center gap-4">
                  <input
                      type="file"
                      accept=".srt"
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null, false)}
                      className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  />
                </div>
                {secondarySubtitles.length > 0 && (
                    <p className="text-sm text-green-600">Secondary subtitles loaded: {secondarySubtitles.length} entries</p>
                )}
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex justify-end gap-4 pt-4">
              <button
                  onClick={handleSync}
                  disabled={primarySubtitles.length === 0 || secondarySubtitles.length === 0 || loading}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload size={18} /> {loading ? 'Syncing...' : 'Sync Files'}
              </button>
              <button
                  onClick={handleDownload}
                  disabled={translatedSubtitles.length === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={18} /> Download SRT
              </button>
            </div>
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
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {translatedSubtitles.map((row) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.from}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.to}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.originalText}</td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}