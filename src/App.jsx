import React from 'react';
// We are keeping this file clean for pure frontend focus.

// Placeholder data for the navigation links
const navLinks = [
  { name: 'Home', path: '#home' },
  { name: 'Acts & Rules', path: '#acts' },
  { name: 'Services', path: '#services' },
  { name: 'Nearby Courts', path: '#courts' },
];

function App() {
  // Use a timestamp to create a unique URL every time the component loads (a "cache-buster")
  const logoSrc = `/logo.png?v=${new Date().getTime()}`;
  
  // Set 'Home' as the current active link for styling purposes
  const activeLink = 'Home';

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* Header and Top Bar */}
      <header className="header bg-white shadow-lg sticky top-0 z-10">
        
        {/* --- 1. Logo, Search, and Log In Section --- */}
        <div className="top-bar flex flex-col sm:flex-row items-center justify-between p-4 max-w-7xl mx-auto">
          
          {/* Logo and Site Name + Tagline Container */}
          <div className="logo-container flex flex-col items-center sm:items-start mb-4 sm:mb-0 min-w-[200px]">
            <div className="flex items-center space-x-2"> 
              <img 
                src={logoSrc}
                alt="Nyaya Mitra Logo" 
                className="w-20 h-20"
              />
              <h1 className="site-name text-3xl font-extrabold text-indigo-700 tracking-tight">
                Nyaya Mitra
              </h1>
            </div>
            <p className="tagline text-xs italic text-gray-500 mt-1">
              "Support for Every Step Toward Justice."
            </p>
          </div>
          
          {/* Search Bar (Unified input and button) */}
          <div className="search-container flex-grow max-w-xl mx-4 w-full sm:w-auto flex shadow-md rounded-xl">
            <input 
              type="text" 
              placeholder="Search the Constitution or IPC section..." 
              className="w-full p-3 border border-indigo-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out bg-white text-gray-800"
            />
            <button
              className="p-3 px-6 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 ease-in-out rounded-r-xl whitespace-nowrap"
            >
              Search
            </button>
          </div>
          
          {/* Log In Button */}
          <div className="nav-placeholder mt-4 sm:mt-0">
            <button className="px-5 py-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 font-semibold rounded-lg transition duration-150 ease-in-out">
              Log In
            </button>
          </div>
        </div>
        
        {/* --- 2. Main Navigation Bar (New Section) --- */}
        <nav className="bg-indigo-800 shadow-xl">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center sm:justify-start">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`
                  px-4 py-3 text-sm font-medium transition duration-150 ease-in-out
                  ${link.name === activeLink 
                    ? 'bg-indigo-900 text-white shadow-inner' // Active style (Purple Highlight)
                    : 'text-indigo-200 hover:bg-indigo-700 hover:text-white' // Inactive style
                  }
                `}
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="content p-8 max-w-7xl mx-auto">
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 border-b pb-2">
            Welcome to Nyaya Mitra - A Guide to Justice
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            This platform is your starting point for simplified law explanations. Use the search bar above to look up specific legal sections or topics.
          </p>
          
          {/* Feature blocks - Always visible now */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-indigo-50 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-xl text-indigo-700 mb-2">Simplified Law</h3>
              <p className="text-sm text-indigo-600">Break down complex legal jargon into easy-to-understand summaries.</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-xl text-indigo-700 mb-2">Key Sections</h3>
              <p className="text-sm text-indigo-600">Quickly find the most relevant articles and sections.</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-xl shadow-md hover:shadow-lg transition">
              <h3 className="font-bold text-xl text-indigo-700 mb-2">Legal Context</h3>
              <p className="text-sm text-indigo-600">Understand the historical and practical context of each rule.</p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full mt-10 p-4 bg-gray-200 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Nyaya Mitra. All rights reserved.
      </footer>
    </div>
  );
}

export default App;