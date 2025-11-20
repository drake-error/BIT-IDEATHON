import React from 'react';

// Placeholder data for the navigation links
const navLinks = [
  { name: 'Home', path: '#home' },
  { name: 'Acts & Rules', path: '#acts' },
  { name: 'Services', path: '#services' },
  { name: 'Nearby Courts', path: '#courts' },
];

function App() {
  // Set 'Home' as the current active link for styling purposes
  const activeLink = 'Home';

  // Use a timestamp to create a unique URL every time the component loads (a "cache-buster")
  const logoSrc = `/logo.png?v=${new Date().getTime()}`;

  return (
    // Overall page container
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      
      {/* Header and Top Bar */}
      <header className="header bg-white shadow-xl sticky top-0 z-10">
        
        {/* --- 1. Logo, Search, and Log In Section --- */}
        <div className="top-bar flex flex-col sm:flex-row items-center justify-between p-4 max-w-7xl mx-auto">
          
          {/* Logo and Site Name + Tagline Container */}
          <div className="logo-container flex flex-col items-center sm:items-start mb-4 sm:mb-0 min-w-[200px]">
            <div className="flex items-center space-x-4"> 
              <img 
                src={logoSrc}
                alt="Nyaya Mitra Logo" 
                className="w-60 h-60" // Prominent logo size retained
              />
              <h1 className="site-name text-6xl font-extrabold text-indigo-700 tracking-tight">
                Nyaya Mitra
              </h1>
            </div>
            <p className="tagline text-sm italic text-gray-500 mt-1 sm:text-left text-center">
              "Support for Every Step Toward Justice."
            </p>
          </div>
          
          {/* Search Bar (Unified input and button) - Non-functional placeholder */}
          <div className="search-container flex-grow max-w-xl mx-4 w-full sm:w-auto flex shadow-lg rounded-xl">
            <input 
              type="text" 
              placeholder="Search the Constitution or IPC section..." 
              className="w-full p-3 border border-indigo-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out bg-white text-gray-800"
            />
            <button
              type="button"
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
        
        {/* --- 2. Main Navigation Bar --- */}
        <nav className="bg-indigo-800 shadow-inner">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center sm:justify-start">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`
                  px-4 py-3 text-sm font-medium transition duration-150 ease-in-out
                  ${link.name === activeLink 
                    ? 'bg-indigo-900 text-white shadow-inner border-b-4 border-amber-300' // Active style
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

      {/* Main Content Area: Applying the purple background here */}
      <main className="bg-indigo-700 pb-16 flex-grow w-full">
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          
          {/* Welcome Block - Now a distinct white box */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl mb-8 min-h-[150px] text-gray-900">
            <h2 className="text-4xl font-light text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Nyaya Mitra: Your Guide to Justice
            </h2>
            <p className="text-xl leading-relaxed text-gray-600">
              Access simplified laws, key acts, and legal support at your fingertips.
            </p>
          </div>
          
          {/* Feature Blocks - Retained inside the purple container but with their original bg-indigo-50 styling */}
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