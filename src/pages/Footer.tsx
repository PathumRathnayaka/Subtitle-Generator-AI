import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-[#0652DD] text-gray-100 py-12">
            <div className="container mx-auto px-6 lg:px-20">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h2 className="text-white text-xl font-bold mb-4">Subtitle Editor</h2>
                        <p className="text-sm">Easily edit, convert, and manage your subtitles with our intuitive platform.</p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-gray-300 hover:text-white"><FaTwitter /></a>
                            <a href="#" className="text-gray-300 hover:text-white"><FaFacebookF /></a>
                            <a href="#" className="text-gray-300 hover:text-white"><FaInstagram /></a>
                            <a href="#" className="text-gray-300 hover:text-white"><FaLinkedinIn /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white text-lg font-semibold mb-4">Useful Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:underline">Home</Link></li>
                            <li><Link to="/about" className="hover:underline">About</Link></li>
                            <li><Link to="/services" className="hover:underline">Services</Link></li>
                            <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white text-lg font-semibold mb-4">Our Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="#" className="hover:underline">Subtitle Editing</Link></li>
                            <li><Link to="#" className="hover:underline">Translation</Link></li>
                            <li><Link to="#" className="hover:underline">Time Synchronization</Link></li>
                            <li><Link to="#" className="hover:underline">Format Conversion</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white text-lg font-semibold mb-4">Contact Us</h4>
                        <p className="text-sm">Colombo, Sri Lanka</p>
                        <p className="text-sm mt-2"><strong>Phone:</strong> +94 76 10 40031</p>
                        <p className="text-sm"><strong>Email:</strong> thilinapathumrathnayaka@gmail.com</p>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center text-gray-200 text-sm border-t border-gray-500 pt-6">
                <p>&copy; {new Date().getFullYear()} Subtitle Editor. All Rights Reserved.</p>
                <p>Designed by <a href="#myFortfolio" className="text-white hover:underline">Pathum Rathnayaka</a></p>
            </div>
        </footer>
    );
}
