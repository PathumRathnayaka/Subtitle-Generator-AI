import { FileText, Languages, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/backgraound.jpg';

export default function HomePage() {
  return (
      <div className="min-h-screen bg-gray-50">

        <div
            className="relative py-24"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 outline-text">
                Transform Your Subtitles with Ease
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Edit, convert, and manage your subtitle files in one powerful platform
              </p>
              <Link
                  to="/edit"
                  className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-gray-50"></div>
        </div>


        <div className="max-w-6xl mx-auto px-4 py-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Everything You Need for Subtitle Management
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy File Upload</h3>
              <p className="text-gray-600">
                Upload your subtitle files with a simple drag and drop interface
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Languages className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Translation</h3>
              <p className="text-gray-600">
                Convert and translate your subtitles with advanced language processing
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Time Sync</h3>
              <p className="text-gray-600">
                Perfect timing synchronization for all your subtitle entries
              </p>
            </div>
          </div>
        </div>


        <div className="bg-white py-24">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  About Our Platform
                </h2>
                <p className="text-gray-600 mb-6">
                  Our subtitle management platform is designed to make your workflow smoother and more efficient. Whether you're a content creator, translator, or video professional, we provide the tools you need to handle subtitles with precision.
                </p>
                <p className="text-gray-600 mb-8">
                  With features like real-time editing, automatic synchronization, and format conversion, you can focus on what matters most - creating great content for your audience.
                </p>
                <Link
                    to="/edit"
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                >
                  Learn more about our features →
                </Link>
              </div>
              <div className="relative">
                <img
                    src="https://s.studiobinder.com/wp-content/uploads/2020/04/Film-Credits-Order-Hierarchies-with-Free-Film-Credits-Template-StudioBinder.jpg"
                    alt="Video editing workspace"
                    className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}