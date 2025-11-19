import React from 'react';
// We'll assume index.css handles the main styling, but let's add some
// Tailwind-like classes for structure and aesthetics.

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* Header and Top Bar */}
      <header className="header bg-white shadow-lg sticky top-0 z-10">
        <div className="top-bar flex items-center justify-between p-4 max-w-7xl mx-auto">
          
          {/* Logo and Site Name */}
          <div className="logo-container">
            <h1 className="site-name text-3xl font-extrabold text-indigo-700 tracking-tight">
              Nyaya Mitra
            </h1>
          </div>
          
          {/* Search Bar */}
          <div className="search-container flex-grow max-w-md mx-4">
            <input 
              type="text" 
              placeholder="Search the Constitution or IPC section..." 
              className="w-full p-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:border-indigo-500 transition duration-150 ease-in-out shadow-inner"
            />
          </div>
          
          {/* Navigation/User Placeholder (optional, for future expansion) */}
          <div className="nav-placeholder">
            <button className="text-indigo-600 hover:text-indigo-800 font-medium hidden sm:block">
              Log In
            </button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pb-4">
          <p className="tagline text-center text-sm italic text-gray-500">
            "Support for Every Step Toward Justice."
          </p>
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
