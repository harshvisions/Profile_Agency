import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-[#0a0a0a]/80 backdrop-blur-xl z-50 border-b border-white/5 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-20 items-center">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-extrabold tracking-tighter text-white hover:text-indigo-400 transition-colors">
                  VELOCORE<span className="text-indigo-500">.</span>
                </Link>
              </div>
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide uppercase">Home</Link>
                <a href="#about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide uppercase">About</a>
                <a href="#work" className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-wide uppercase">Work</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-black py-12 border-t border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} VeloCore. All rights reserved.</p>
            <Link to="/admin" className="text-xs text-gray-700 hover:text-indigo-400 transition-colors uppercase tracking-widest font-bold">
              Admin Login
            </Link>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
