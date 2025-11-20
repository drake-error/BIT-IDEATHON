import React from 'react';

// Placeholder data for the navigation links
const navLinks = [
  { name: 'Home', path: '#home' },
  { name: 'Acts & Rules', path: '#acts' },
  { name: 'Services', path: '#services' },
  { name: 'Nearby Courts', path: '#courts' },
];

// --- 1. Reusable Component for Image Logos ---
// This component replaces the placeholder and uses a provided image URL.
const CustomImageLogo = ({ src, alt }) => (
  // Use h-12 w-12 for consistent sizing, mb-3 for spacing.
  <img 
    src={src} 
    alt={alt || "Law Icon"} 
    className="h-12 w-12 mx-auto mb-3 object-contain" 
    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/48x48/CCCCCC/000000?text=?" }} // Fallback on error
  />
);

// --- 2. Empty Logo Placeholder Component (Only needed if you want empty slots) ---
const EmptyLogoPlaceholder = () => (
  // Maintains the space previously occupied by the logo (h-12 w-12 margin-bottom)
  <div className="h-12 w-12 mx-auto mb-3" aria-hidden="true"></div>
);


// --- 3. Feature block data containing titles, descriptions, and their respective icons ---
// Update the 'icon' property here to use CustomImageLogo with your URLs.
const lawFeatures = [
  { 
    title: 'FAMILY LAWS', 
    description: 'Legal guidance on marriage, divorce proceedings, child custody, and adoption matters.', 
    // Replace the URL below with the image URL for Family Laws
    icon: () => <CustomImageLogo src="data:image/jpeg;base64,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" alt="Family Law Icon" /> 
  },
  { 
    title: 'PROPERTY LAWS', 
    description: 'Deals with the rights, ownership, and transfer of real estate and intellectual property.', 
    // Replace the URL below with the image URL for Property Laws
    icon: () => <CustomImageLogo src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMjqpxiykUnbK0tOERVJmMPCptLpStp7Yo1Q&s=09" alt="Property Law Icon" />
  },
  { 
    title: 'AGRICULTURE LAWS', 
    description: 'Regulations covering land tenure, farming practices, crop subsidies, and rural development schemes.', 
    // This one is still empty/using the placeholder logic
    icon:() => <CustomImageLogo src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnzgfSr1bWrfJJe4Z8MWHcamC23tpe6LLMIg&s=09" alt="Agriculture Law Icon" />
  },
  { 
    title: 'BUSINESS LAWS', 
    description: 'The legal framework for companies, contracts, commercial disputes, and corporate compliance.', 
    icon: () => <CustomImageLogo src="https://imgs.search.brave.com/_RV5YBpbNfR2rcjLJyQpng54_Ft4vKfg_Cg4BjJmcTQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA1/MTcyMDM5Ni9waG90/by9idXNpbmVzcy1s/YXctYW5kLWdhdmVs/LWluLWEtY291cnQu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PVNSdDhkc044dExa/SXVlY18wZkZTZzRo/WjBwa0t2RFpZTUdG/S0tObEQwNU09" alt="Business Law Icon" />
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
                className="w-20 h-20" // Prominent logo size retained
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

      {/* Main Content Area: Purple background for the top section */}
      <main className="bg-indigo-700 flex-grow w-full pt-4 sm:pt-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          {/* Welcome Block - Now a distinct white box */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl mb-8 min-h-[150px] text-gray-900">
            <h2 className="text-4xl font-light text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Nyaya Mitra: Your Guide to Justice
            </h2>
            <p className="text-xl leading-relaxed text-gray-600">
              Access simplified laws, key acts, and legal support at your fingertips.
            </p>
          </div>

          {/* New CATEGORIES Header */}
          <h2 className="text-2xl font-semibold text-white mb-12 pt-4">CATEGORIES</h2>
        </div>

        {/* Feature Blocks - Pulled up with large space below header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-[-30px] z-20 relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {lawFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-[1.02] cursor-pointer min-h-[140px] border-b-4 border-indigo-500 flex flex-col items-center justify-start text-center"
              >
                {/* Render the icon component */}
                <feature.icon />

                <h3 className="font-bold text-sm sm:text-lg text-indigo-700 mb-1 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer is now correctly separated from the main content */}
      <footer className="w-full pt-16 p-4 bg-gray-200 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Nyaya Mitra. All rights reserved.
      </footer>
    </div>
  );
}

export default App;