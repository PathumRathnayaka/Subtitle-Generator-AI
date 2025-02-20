import { Home, Edit, RefreshCcw, UserPlus, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              <Home size={18} />
              Home
            </Link>
            <Link to="/edit" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              <Edit size={18} />
              Edit
            </Link>
            <Link to="/convert" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              <RefreshCcw size={18} />
              Convert
            </Link>
            <Link to="/sync" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              <Clock size={18} />
              Time Sync
            </Link>
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
  );
}