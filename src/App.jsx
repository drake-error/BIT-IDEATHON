import React, { useState } from 'react'; // Added useState
import ConstitutionViewer from './ConstitutionViewer.jsx';// Import the new viewer component

// Placeholder data for the navigation links
const navLinks = [
  { name: 'Home', path: '#home' },
  { name: 'Acts & Rules', path: '#acts' },
  { name: 'Services', path: '#services' },
  { name: 'Nearby Courts', path: '#courts' },
];

// --- 1. Reusable Component for Image Logos ---
const CustomImageLogo = ({ src, alt }) => (
  <img 
    src={src} 
    alt={alt || "Law Icon"} 
    className="h-12 w-12 mx-auto mb-3 object-contain" 
    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/48x48/CCCCCC/000000?text=?" }} // Fallback on error
  />
);

// --- 3. Feature block data containing titles, descriptions, and their respective icons ---
const lawFeatures = [
  { 
    title: 'FAMILY LAWS', 
    description: 'Legal guidance on marriage, divorce proceedings, child custody, and adoption matters.', 
    icon: () => <CustomImageLogo src="data:image/png;base64,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" alt="Family Law Icon" /> 
  },
  { 
    title: 'PROPERTY LAWS', 
    description: 'Deals with the rights, ownership, and transfer of real estate and intellectual property.', 
    icon: () => <CustomImageLogo src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMjqpxiykUnbK0tOERVJmMPCptLpStp7Yo1Q&s=09" alt="Property Law Icon" />
  },
  { 
    title: 'AGRICULTURE LAWS', 
    description: 'Regulations covering land tenure, farming practices, crop subsidies, and rural development schemes.', 
    icon:() => <CustomImageLogo src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnzgfSr1bWrfJJe4Z8MWHcamC23tpe6LLMIg&s=09" alt="Agriculture Law Icon" />
  },
  { 
    title: 'BUSINESS LAWS', 
    description: 'The legal framework for companies, contracts, commercial disputes, and corporate compliance.', 
    icon: () => <CustomImageLogo src="data:image/jpeg;base64,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" alt="Business Law Icon" />
  },
  { 
    title: 'TRAFFIC LAWS', 
    description: 'Rules governing vehicle operations, road safety, licensing, and penalties for violations.', 
    icon: () => <CustomImageLogo src="https://imgs.search.brave.com/yFZAwHdYIEJZxn4RJiBRC9lF3oqdvIEYJfLnZ50YF9w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YW5kLWhvbGRpbmct/bmV0d29yay1ncmFw/aGljLW92ZXJsYXkt/YmFubmVyXzUzODc2/LTEyMTQ3Ni5qcGc_/c2VtdD1haXNfaHli/cmlk" alt="Traffic Law Icon" /> 
  },
  { 
    title: 'CRIMINAL LAWS', 
    description: 'Concerns offenses against the public, criminal procedure, and the rights of the accused.', 
    icon: () => <CustomImageLogo src="https://imgs.search.brave.com/-nPWNrRlc8IVUFkHp6XF99bWW5LEBpD38edtmg7kDFM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzgv/MDQ5LzcyNy9zbWFs/bC9jcmltaW5hbC1p/bGx1c3RyYXRpb24t/ZGVzaWduLWZvci1s/YXctZmlybS12ZWN0/b3IuanBn" alt="Criminal Law Icon" />
  },
];

function App() {
  const [activeLink, setActiveLink] = useState('Home'); // State to manage the active link for routing

  // Function to handle navigation clicks
  const handleNavClick = (linkName) => {
    setActiveLink(linkName);
  };

  // Use a timestamp to create a unique URL every time the component loads (a "cache-buster")
  const logoSrc = `/logo.png?v=${new Date().getTime()}`;

  const renderMainContent = () => {
    if (activeLink === 'Acts & Rules') {
      return <ConstitutionViewer />;
    }

    // Default content (Home Page)
    return (
      <div className="flex-grow w-full">
        {/* Top Purple Background Section */}
        <div className="bg-indigo-700 pt-4 sm:pt-8 pb-[100px] sm:pb-[140px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl mb-8 min-h-[150px] text-gray-900">
              <h2 className="text-4xl font-light text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Nyaya Mitra: Your Guide to Justice
              </h2>
              <p className="text-xl leading-relaxed text-gray-600">
                Access simplified laws, key acts, and legal support at your fingertips.
              </p>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-12 pt-4">CATEGORIES</h2>
            
          </div>
        </div>

        {/* Feature Blocks - Positioned absolutely to overlap the purple/white sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-20" style={{ marginTop: '-100px' }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {lawFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-[1.02] cursor-pointer min-h-[140px] border-b-4 border-indigo-500 flex flex-col items-center justify-start text-center"
              >
                <feature.icon />
                <h3 className="font-bold text-sm sm:text-lg text-indigo-700 mb-1 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom White Background Section */}
        <div className="bg-white pb-16 pt-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {/* Additional content can go here */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      
      {/* Header and Top Bar (Remains unchanged) */}
      <header className="header bg-white shadow-xl sticky top-0 z-10">
        <div className="top-bar flex flex-col sm:flex-row items-center justify-between p-4 max-w-7xl mx-auto">
          <div className="logo-container flex flex-col items-center sm:items-start mb-4 sm:mb-0 min-w-[200px]">
            <div className="flex items-center space-x-4"> 
              <img 
                src={logoSrc}
                alt="Nyaya Mitra Logo" 
                className="w-20 h-20"
              />
              <h1 className="site-name text-6xl font-extrabold text-indigo-700 tracking-tight">
                Nyaya Mitra
              </h1>
            </div>
            <p className="tagline text-sm italic text-gray-500 mt-1 sm:text-left text-center">
              "Support for Every Step Toward Justice."
            </p>
          </div>
          
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
          
          <div className="nav-placeholder mt-4 sm:mt-0">
            <button className="px-5 py-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 font-semibold rounded-lg transition duration-150 ease-in-out">
              Log In
            </button>
          </div>
        </div>
        
        {/* Main Navigation Bar - Modified to use onClick handler */}
        <nav className="bg-indigo-800 shadow-inner">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center sm:justify-start">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor jump
                  handleNavClick(link.name); // Call the new handler
                }}
                className={`
                  px-4 py-3 text-sm font-medium transition duration-150 ease-in-out
                  ${link.name === activeLink 
                    ? 'bg-indigo-900 text-white shadow-inner border-b-4 border-amber-300'
                    : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                  }
                `}
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content Area: Renders either Home or the Constitution Viewer */}
      <main className="flex-grow w-full">
        {renderMainContent()}
      </main>
      
      {/* Footer (Remains unchanged) */}
      <footer className="w-full p-4 bg-gray-200 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Nyaya Mitra. All rights reserved.
      </footer>
    </div>
  );
}

export default App;