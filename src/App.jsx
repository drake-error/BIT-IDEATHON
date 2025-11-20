import React, { useState } from 'react';
import { ChevronDown, BookOpen, Scroll, Shield, Scale, Gavel, FileText } from 'lucide-react';

// --- Placeholder Data for Navigation ---
const navLinks = [
  { name: 'Home', path: 'home' },
  { name: 'Acts & Rules', path: 'acts' },
  { name: 'Services', path: 'services' },
  { name: 'Nearby Courts', path: 'courts' },
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
    icon: () => <CustomImageLogo src="data:image/png;base64,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" alt="Business Law Icon" />
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

// --- Sub-Components ---

// Accordion for Parts of the Constitution
const PartAccordion = ({ title, content, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-indigo-200 rounded-xl mb-4 bg-white shadow-md transition-all duration-300">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 flex justify-between items-center text-indigo-800 font-extrabold text-xl hover:bg-indigo-50/50 transition-colors duration-200 rounded-t-xl"
        aria-expanded={isOpen}
      >
        <span className="flex items-center space-x-4">
          <Icon className="w-6 h-6 text-indigo-500" />
          <span>{title}</span>
        </span>
        <ChevronDown 
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : 'text-indigo-400'}`}
        />
      </button>
      
      {/* Content */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1200px] opacity-100 p-5 pt-0' : 'max-h-0 opacity-0'}`}
        style={{ maxHeight: isOpen ? '1200px' : '0' }} // Increased max-height for better content display
      >
        <div className="border-t border-indigo-100 pt-4">
          <p className="text-gray-700 whitespace-pre-line text-lg mb-4">{content.summary}</p>
          
          {content.articles && (
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              {content.articles.map((article, index) => (
                <div key={index} className="p-4 border-l-4 border-amber-400 bg-gray-50 rounded-lg shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-800 mb-1">{article.title}</h4>
                  <p className="text-sm text-gray-600 italic">{article.range}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Data extracted from Indian constitution.pdf
const constitutionParts = {
    // --- PART I: THE UNION AND ITS TERRITORY ---
    unionTerritory: {
        title: 'Part I: The Union and its Territory',
        icon: FileText,
        summary: 'This part defines the name and territory of India, the process for admitting new states, and the procedure for altering the areas, boundaries, or names of existing states.',
        articles: [
            { title: 'Name and territory of the Union (India, that is Bharat)', range: 'Article 1' },
            { title: 'Admission or establishment of new States', range: 'Article 2' },
            { title: 'Formation of new States and alteration of areas, boundaries or names of existing States', range: 'Article 3' },
        ]
    },
    // --- PART II: CITIZENSHIP ---
    citizenship: {
        title: 'Part II: Citizenship',
        icon: Gavel,
        summary: 'This part deals with the laws relating to citizenship at the commencement of the Constitution, rights of migrants from Pakistan and to Pakistan, and the power of Parliament to regulate the right of citizenship by law.',
        articles: [
            { title: 'Citizenship at the commencement of the Constitution', range: 'Article 5' },
            { title: 'Rights of citizenship of certain migrants', range: 'Articles 6-8' },
            { title: 'Persons voluntarily acquiring citizenship of a foreign State not to be citizens', range: 'Article 9' },
            { title: 'Parliament to regulate the right of citizenship by law', range: 'Article 11' },
        ]
    },
    // --- PART III: FUNDAMENTAL RIGHTS ---
    fundamentalRights: {
        title: 'Part III: Fundamental Rights',
        icon: Shield,
        summary: 'These are the basic human rights guaranteed to every citizen of India. They are justiciable, meaning they are enforceable by courts. They are essential for the moral and material development of the individuals and are protected against infringement by the State.',
        articles: [
            { title: 'Right to Equality', range: 'Articles 14-18' },
            { title: 'Right to Freedom', range: 'Articles 19-22' },
            { title: 'Right against Exploitation', range: 'Articles 23-24' },
            { title: 'Right to Freedom of Religion', range: 'Articles 25-28' },
            { title: 'Cultural and Educational Rights', range: 'Articles 29-30' },
            { title: 'Right to Constitutional Remedies', range: 'Article 32' },
        ]
    },
    // --- PART IV: DIRECTIVE PRINCIPLES OF STATE POLICY (DPSP) ---
    dpsp: {
        title: 'Part IV: Directive Principles of State Policy (DPSP)',
        icon: BookOpen,
        summary: 'These principles are guidelines for the framing of laws by the government. They are fundamental in the governance of the country but are non-justiciable (cannot be enforced by court). They aim at establishing a welfare state in India.',
        articles: [
            { title: 'Social Order and Justice', range: 'Articles 38-39A' },
            { title: 'Village Panchayats and Work/Education Rights', range: 'Articles 40-41' },
            { title: 'Humane Work Conditions & Living Wage', range: 'Articles 42-43' },
            { title: 'Uniform Civil Code & Child Care', range: 'Articles 44-45' },
            { title: 'Scheduled Castes/Tribes Promotion', range: 'Article 46' },
            { title: 'Nutrition, Public Health & Agriculture', range: 'Articles 47-48' },
            { title: 'Environment Protection & Judiciary/Executive Separation', range: 'Articles 48A-50' },
        ]
    },
    // --- PART IVA: FUNDAMENTAL DUTIES ---
    fundamentalDuties: {
        title: 'Part IVA: Fundamental Duties',
        icon: Scroll,
        summary: 'These duties were added by the 42nd Amendment Act in 1976. They are intended to be moral obligations on all citizens to help promote a spirit of patriotism and uphold the unity of India. These are non-justiciable.',
        articles: [
            { title: 'Duty to abide by the Constitution and respect ideals', range: 'Article 51A(a)' },
            { title: 'Duty to cherish noble ideals of freedom struggle', range: 'Article 51A(b)' },
            { title: 'Duty to uphold and protect sovereignty, unity, and integrity of India', range: 'Article 51A(c)' },
            { title: 'Duty to defend the country and render national service', range: 'Article 51A(d)' },
            { title: 'Duty to promote harmony and dignity of women', range: 'Article 51A(e)' },
            { title: 'Duty to protect and improve the natural environment', range: 'Article 51A(g)' },
            { title: 'Duty to safeguard public property and abjure violence', range: 'Article 51A(i)' },
            { title: 'Duty of Parent/Guardian to provide education to child', range: 'Article 51A(k)' },
        ]
    }
};

// --- View Components ---

// The Constitution Hub View
const ActsAndRulesView = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
    <div className="text-center mb-12">
      <h1 className="text-5xl font-extrabold text-white mb-2">The Constitution Hub</h1>
      <p className="text-xl text-indigo-200">A simplified, interactive guide to the core principles of the Indian Constitution.</p>
      
    </div>

    {/* Preamble Summary Card */}
    <div className="bg-indigo-100 p-8 rounded-2xl shadow-lg border-l-8 border-indigo-600 mb-12">
        <h3 className="text-2xl font-bold text-indigo-800 mb-3">The Preamble: The Soul of the Constitution</h3>
        <p className="text-lg text-indigo-700 italic leading-relaxed">
            "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, LIBERTY, EQUALITY, and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation..."
        </p>
    </div>

    {/* Section: Major Pillars of the Constitution */}
    <div className="bg-gray-100 p-6 sm:p-10 rounded-2xl shadow-2xl border-b-8 border-amber-400">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <Scale className="w-7 h-7 mr-3 text-amber-600" />
            Key Constitutional Parts
        </h2>
        
        {/* Render Accordions for each Part */}
        <PartAccordion 
            title={constitutionParts.unionTerritory.title}
            content={constitutionParts.unionTerritory}
            icon={constitutionParts.unionTerritory.icon}
        />
        <PartAccordion 
            title={constitutionParts.citizenship.title}
            content={constitutionParts.citizenship}
            icon={constitutionParts.citizenship.icon}
        />
        <PartAccordion 
            title={constitutionParts.fundamentalRights.title}
            content={constitutionParts.fundamentalRights}
            icon={constitutionParts.fundamentalRights.icon}
        />
        <PartAccordion 
            title={constitutionParts.dpsp.title}
            content={constitutionParts.dpsp}
            icon={constitutionParts.dpsp.icon}
        />
        <PartAccordion 
            title={constitutionParts.fundamentalDuties.title}
            content={constitutionParts.fundamentalDuties}
            icon={constitutionParts.fundamentalDuties.icon}
        />
    </div>

    {/* Call to Action for Deeper Dive */}
    <div className="mt-12 text-center">
      <p className="text-lg text-indigo-100 mb-4">Need to search specific Articles or Amendments?</p>
      <button className="px-8 py-3 bg-amber-400 text-indigo-900 font-bold rounded-xl shadow-lg hover:bg-amber-300 transition transform hover:scale-[1.05]">
        Go to Advanced Search
      </button>
    </div>

  </div>
);


// The Home/Landing Page View
const HomeView = ({ lawFeatures }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-[-30px] z-20 relative">
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
);


// --- Main App Component ---
function App() {
  const [activeRoute, setActiveRoute] = useState('home');
  // Highlight the current route in the navigation bar
  const currentActiveLink = navLinks.find(link => link.path === activeRoute)?.name;
  
  const logoSrc = `/logo.png?v=${new Date().getTime()}`;

  // Routing logic
  const renderContent = () => {
    switch (activeRoute) {
      case 'acts':
        return <ActsAndRulesView />;
      case 'home':
      case 'services':
      case 'courts':
      default:
        // Render the default Home view, allowing for navigation links to other non-implemented routes to still show the home content.
        return (
          <>
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
              <h2 className="text-2xl font-semibold text-white mb-12 pt-4">CATEGORIES</h2>
            </div>
            <HomeView lawFeatures={lawFeatures} />
          </>
        );
    }
  };

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
                href={`#${link.path}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveRoute(link.path);
                }}
                className={`
                  px-4 py-3 text-sm font-medium transition duration-150 ease-in-out
                  ${link.name === currentActiveLink
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

      {/* Main Content Wrapper - Purple for all pages */}
      <main className="bg-indigo-700 flex-grow w-full pt-4 sm:pt-8 pb-24">
        {renderContent()}
      </main>
      
      {/* Footer is now correctly separated from the main content */}
      <footer className="w-full pt-16 p-4 bg-gray-200 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Nyaya Mitra. All rights reserved.
      </footer>
    </div>
  );
}

export default App;