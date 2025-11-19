import React from 'react';
// We are keeping this file clean for pure frontend focus.

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* Header and Top Bar */}
      <header className="header bg-white shadow-lg sticky top-0 z-10">
        <div className="top-bar flex flex-col sm:flex-row items-center justify-between p-4 max-w-7xl mx-auto">
          
          {/* Logo and Site Name + Tagline Container (Stacked on Mobile, Side-by-Side on Desktop) */}
          <div className="logo-container flex flex-col items-center sm:items-start mb-4 sm:mb-0 min-w-[200px]">
            {/* New container for the logo image and text, using flex for alignment */}
            <div className="flex items-center space-x-2"> 
              {/* Logo: Now pointing to the static file in the /public folder */}
              <img 
                src="/logo.png" 
                alt="Nyaya Mitra Logo" 
                className="w-10 h-10 rounded-full"
              />
              <h1 className="site-name text-3xl font-extrabold text-indigo-700 tracking-tight">
                Nyaya Mitra
              </h1>
            </div>
            {/* Tagline moved directly under the name for better grouping */}
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
          
          {/* Navigation/User Placeholder - Now a prominent button */}
          <div className="nav-placeholder mt-4 sm:mt-0">
            <button className="px-5 py-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 font-semibold rounded-lg transition duration-150 ease-in-out">
              Log In
            </button>
          </div>
        </div>
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

// FIX: Added the missing default export to resolve the SyntaxError
export default App;
