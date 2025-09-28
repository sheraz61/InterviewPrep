import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <span className="text-blue-600 font-bold text-xl">💼</span>
              </div>
              <h2 className="text-2xl font-bold">InterviewPrep</h2>
            </Link>
            <p className="text-gray-400 text-lg mb-6 max-w-md">
              Master your interview skills with AI-powered practice sessions, real-time feedback, and comprehensive preparation tools.
            </p>
           {/* Footer Links (fixed bottom, no scroll) */}
  <div className="w-full backdrop-blur-md shadow px-6 py-4 flex gap-6">
     {/* LinkedIn */}
     <a
        href="https://www.linkedin.com/in/hsheraz"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition"
      >
        <FaLinkedin size={24} />
      </a>

      {/* GitHub */}
      <a
        href="https://github.com/sheraz61"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 hover:bg-gray-800 hover:text-white transition"
      >
        <FaGithub size={24} />
      </a>

      {/* LeetCode */}
      <a
        href="https://leetcode.com/u/Sheraz6_1/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 hover:bg-orange-500 hover:text-white transition"
      >
        <SiLeetcode size={24} />
      </a>
  </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition duration-300 flex items-center space-x-2">
                  <span>→</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/interview" className="text-gray-400 hover:text-white transition duration-300 flex items-center space-x-2">
                  <span>→</span>
                  <span>Practice Interview</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition duration-300 flex items-center space-x-2">
                  <span>→</span>
                  <span>Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center space-x-3">
                <span className="bg-blue-600 p-2 rounded-lg">📧</span>
                <span>hsheraz271@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-green-600 p-2 rounded-lg">📱</span>
                <span>+92 (305) 2094845</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-purple-600 p-2 rounded-lg">🏢</span>
                <span>Sahiwal Sargodha</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} InterviewPrep. All rights reserved. Crafted with ❤️ for job seekers worldwide.
            </p>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition duration-300">Terms of Service</a>
              <a href="#" className="hover:text-white transition duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;