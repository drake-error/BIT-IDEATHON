import React, { useState } from 'react';
import ConstitutionViewer from './ConstitutionViewer.jsx'; 

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
    keywords: ['Marriage', 'Divorce', 'Custody', 'Adoption'], // New field for content
    description: 'Legal guidance on marriage, divorce proceedings, child custody, and adoption matters.', 
    icon: () => <CustomImageLogo src="https://static.vecteezy.com/system/resources/previews/004/329/268/non_2x/family-court-glyph-icon-silhouette-symbol-child-custody-family-law-proceedings-divorce-mediation-legal-separation-negative-space-isolated-illustration-vector.jpg" alt="Family Law Icon" /> 
  },
  { 
    title: 'PROPERTY LAWS', 
    keywords: ['Real Estate', 'Intellectual Property', 'Transfer of Ownership'],
    description: 'Deals with the rights, ownership, and transfer of real estate and intellectual property.', 
    icon: () => <CustomImageLogo src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMjqpxiykUnbK0tOERVJmMPCptLpStp7Yo1Q&s=09" alt="Property Law Icon" />
  },
  { 
    title: 'AGRICULTURE LAWS', 
    keywords: ['Land Tenure', 'Farming', 'Subsidies', 'Rural Development'],
    description: 'Regulations covering land tenure, farming practices, crop subsidies, and rural development schemes.', 
    icon:() => <CustomImageLogo src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnzgfSr1bWrfJJe4Z8MWHcamC23tpe6LLMIg&s=09" alt="Agriculture Law Icon" />
  },
  { 
    title: 'BUSINESS LAWS', 
    keywords: ['Companies Act', 'Contracts', 'Corporate Disputes', 'Compliance'],
    description: 'The legal framework for companies, contracts, commercial disputes, and corporate compliance.', 
    icon: () => <CustomImageLogo src="data:image/jpeg;base64,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" alt="Business Law Icon" />
  },
  { 
    title: 'TRAFFIC LAWS', 
    keywords: ['Vehicle Operations', 'Road Safety', 'Licensing', 'Penalties'],
    description: 'Rules governing vehicle operations, road safety, licensing, and penalties for violations.', 
    icon: () => <CustomImageLogo src="https://imgs.search.brave.com/yFZAwHdYIEJZxn4RJiBRC9lF3oqdvIEYJfLnZ50YF9w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YW5kLWhvbGRpbmct/bmV0d29yay1ncmFw/aGljLW92ZXJsYXkt/YmFubmVyXzUzODc2/LTEyMTQ3Ni5qcGc_/c2VtdD1haXNfaHli/cmlk" alt="Traffic Law Icon" /> 
  },
  { 
    title: 'CRIMINAL LAWS', 
    keywords: ['Offenses', 'Procedure', 'Accused Rights', 'IPC', 'CrPC'],
    description: 'Concerns offenses against the public, criminal procedure, and the rights of the accused.', 
    icon: () => <CustomImageLogo src="https://imgs.search.brave.com/-nPWNrRlc8IVUFkHp6XF99bWW5LEBpD38edtmg7kDFM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzgv/MDQ5LzcyNy9zbWFs/bC9jcmltaW5hbC1p/bGx1c3RyYXRpb24t/ZGVzaWduLWZvci1s/YXctZmlybS12ZWN0/b3IuanBn" alt="Criminal Law Icon" />
  },
];

// --- Law Category Viewer Component (NEW) ---
const LawCategoryViewer = ({ categoryData, onBack }) => {
    
    // Placeholder content generation based on category
    const content = {
        'FAMILY LAWS': {
            mainActs: ['Hindu Marriage Act, 1955', 'Special Marriage Act, 1954', 'Maintenance Laws (CrPC Section 125)'],
            simplified: [
                'Marriage: Laws dictate minimum age, consent requirements, and registration procedures.',
                'Divorce: Both mutual consent and contested divorce procedures are defined.',
                'Child Custody: Decisions prioritize the welfare and best interests of the child.',
            ]
        },
        'PROPERTY LAWS': {
            mainActs: ['Transfer of Property Act, 1882', 'Indian Easements Act, 1882', 'Specific Relief Act, 1963'],
            simplified: [
                'Transfer: Rules for selling, gifting, and mortgaging property (both movable and immovable).',
                'Inheritance: Laws specify how property is distributed after the owner\'s death (often based on religious laws or the Indian Succession Act).',
                'Land Records: Importance of clear title deeds and legal documentation for ownership proof.',
            ]
        },
        'AGRICULTURE LAWS': {
            mainActs: ['State Land Reform Acts', 'APMC Acts (Agricultural Produce Market Committee)'],
            simplified: [
                'Land Ownership: Regulations governing how much land can be owned (ceiling laws).',
                'Farm Trade: Rules for marketing, storage, and pricing of agricultural produce.',
                'Subsidies: Government schemes and legal provisions for supporting farmers.',
            ]
        },
        'BUSINESS LAWS': {
            mainActs: ['Companies Act, 2013', 'Indian Contract Act, 1872', 'GST Act, 2017'],
            simplified: [
                'Company Structure: Rules for forming, managing, and dissolving companies (Pvt. Ltd., Public Ltd.).',
                'Contracts: Essentials for a legally binding agreement (offer, acceptance, consideration).',
                'Dispute Resolution: Commercial courts and arbitration for quick business conflict resolution.',
            ]
        },
        'TRAFFIC LAWS': {
            mainActs: ['Motor Vehicles Act, 1988'],
            simplified: [
                'Road Rules: Detailed rules for safe driving, signaling, and lane discipline.',
                'Licensing: Requirements for obtaining and renewing driving licenses for various vehicle types.',
                'Penalties: Specific fines and imprisonment terms for violations like drunk driving or racing.',
            ]
        },
        'CRIMINAL LAWS': {
            mainActs: ['Indian Penal Code (IPC), 1860', 'Criminal Procedure Code (CrPC), 1973', 'Indian Evidence Act, 1872'],
            simplified: [
                'Offenses: Definitions and punishments for various crimes (Theft, Murder, Assault, etc.).',
                'Procedure: Steps for police investigation, arrest, bail, and trial process.',
                'Rights of Accused: Guarantees like the right to silence, legal aid, and being produced before a magistrate within 24 hours.',
            ]
        },
    }

    const data = content[categoryData.title] || { mainActs: ['No specific Acts listed.'], simplified: ['No simplified guidance available for this topic yet.'] };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 lg:py-12 flex-grow">
            <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 space-y-8">
                
                <button 
                    onClick={onBack}
                    className="flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition mb-6 border border-indigo-200 p-2 rounded-lg"
                >
                    &larr; Back to Categories
                </button>

                <header className="border-b-4 border-indigo-500 pb-4">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        {categoryData.title} Guide
                    </h1>
                    <p className="text-xl text-gray-600 mt-2">{categoryData.description}</p>
                    <p className="text-sm italic text-gray-500 mt-1">Key Topics: {categoryData.keywords.join(', ')}</p>
                </header>

                {/* Simplified Guidance Section */}
                <section>
                    <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                        ⚖️ Simplified Legal Guidance
                    </h2>
                    <ul className="list-disc list-inside space-y-4 text-lg text-gray-800 bg-indigo-50 p-6 rounded-xl border border-indigo-200">
                        {data.simplified.map((point, index) => (
                            <li key={index}>
                                **{point.split(':')[0]}:** {point.split(':')[1] || point}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Major Acts Section */}
                <section>
                    <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                        📜 Major Governing Acts
                    </h2>
                    <p className="text-gray-700 mb-3">
                        These are the primary Central or State Acts governing this category:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        {data.mainActs.map((act, index) => (
                            <li key={index}>{act}</li>
                        ))}
                    </ul>
                    <p className="text-sm italic text-gray-500 mt-4">
                        Note: State-specific laws may also apply (e.g., specific Land Reform Acts).
                    </p>
                </section>
            </div>
        </div>
    );
};
// --- End Law Category Viewer Component ---

// --- Supporting Components (SimplifiedLawQuery and HomeAdditionalContent remain the same) ---

const SimplifiedLawQuery = () => {
    const [query, setQuery] = useState('');
    const [simplifiedResult, setSimplifiedResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSimplify = () => {
        if (!query.trim()) return;

        setLoading(true);
        setSimplifiedResult(null);

        setTimeout(() => {
            let result = {
                article: 'N/A',
                explanation: 'Please enter a valid Article (e.g., "Article 14" or "Article 39A") for a concise explanation.'
            };

            const queryLower = query.toLowerCase();

            if (queryLower.includes('14')) {
                result = {
                    article: 'Article 14 (Equality before law)',
                    explanation: "This Article establishes the principle of **Equality Before Law**. It means the state cannot deny any person, regardless of their status or wealth, equal protection under the laws and equal treatment in the eyes of the law. Basically, everyone is equal in the judicial system."
                };
            } else if (queryLower.includes('39a')) {
                result = {
                    article: 'Article 39A (Equal Justice and Free Legal Aid)',
                    explanation: "This is a Directive Principle of State Policy (DPSP). It requires the government to promote justice on the basis of **equal opportunity** and, specifically, to provide **free legal aid** (free lawyer services) to citizens who cannot afford them due to poverty or other disadvantages. This ensures justice isn't denied due to economic hardship."
                };
            } else if (queryLower.includes('80')) {
                 result = {
                    article: 'Article 80 (Composition of the Council of States)',
                    explanation: "This Article defines the structure of the Rajya Sabha (Council of States). It specifies that the house will consist of members elected by State Assemblies, plus **12 members nominated by the President** who are distinguished in fields like literature, science, art, or social service."
                };
            } else {
                result = {
                    article: query.trim(),
                    explanation: "The system is processing your request for simplification. In a real application, this box would now display a clear, bulleted summary of the legal provisions, their exceptions, and their real-world impact. Try entering 'Article 14' or 'Article 39A' for a specific example."
                };
            }

            setSimplifiedResult(result);
            setLoading(false);
        }, 1500); // 1.5 second delay
    };

    return (
        <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border-t-8 border-indigo-600">
                    <h2 className="text-3xl font-extrabold text-indigo-800 mb-2 flex items-center">
                        💡 Simplified Laws: Get Clarity Now
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                        Paste any Article number (e.g., "Article 21") from the Acts & Rules section to get a simple, understandable explanation.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <input
                            type="text"
                            placeholder="Enter Article (e.g., Article 39A)"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-grow p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150 text-gray-900"
                            disabled={loading}
                        />
                        <button
                            onClick={handleSimplify}
                            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition shadow-md disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Simplifying...' : 'Simplify Law'}
                        </button>
                    </div>

                    {/* --- Simplified Result Box (Light Purple) --- */}
                    {simplifiedResult && (
                        <div className="p-6 rounded-xl bg-purple-50 border-2 border-purple-300 shadow-inner">
                            <h3 className="text-xl font-bold text-purple-800 mb-2 flex items-center">
                                ⚖️ Explanation for {simplifiedResult.article}
                            </h3>
                            <p className="text-gray-800 leading-relaxed">
                                {simplifiedResult.explanation}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

const HomeAdditionalContent = () => {
    return (
        <div className="pt-16 pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">

                {/* --- Section 1: Quick Access Tools (Legal Guides) --- */}
                <section className="text-center">
                    <h2 className="text-4xl font-extrabold text-indigo-800 mb-4">
                        Instant Legal Clarity
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        Navigate complex legal documentation effortlessly with our specialized tools and resources.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 border-t-4 border-amber-500 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="text-5xl mb-4 text-amber-500">⚖️</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                Fundamental Rights Explained
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Deep dive into the core guarantees under **Part III** of the Constitution, simplified for quick understanding.
                            </p>
                            <button className="text-indigo-600 font-semibold hover:text-indigo-800 transition">
                                View Part III
                            </button>
                        </div>

                        <div className="p-6 border-t-4 border-indigo-500 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="text-5xl mb-4 text-indigo-500">📜</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                Key Constitutional Amendments
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Explore major changes like the addition of **Fundamental Duties** (Part IVA) and GST provisions.
                            </p>
                            <button className="text-indigo-600 font-semibold hover:text-indigo-800 transition">
                                See Amendments
                            </button>
                        </div>

                        <div className="p-6 border-t-4 border-green-600 bg-gray-50 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                            <div className="text-5xl mb-4 text-green-600">🏛️</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                Directive Principles Guide
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Understand the framework for governance and policy-making under **Part IV** of the Constitution.
                            </p>
                            <button className="text-indigo-600 font-semibold hover:text-indigo-800 transition">
                                Explore DPSP
                            </button>
                        </div>
                    </div>
                </section>
                
                {/* --- Horizontal Rule Separator --- */}
                <hr className="border-t-2 border-gray-200" />


                {/* --- Section 2: Call to Action (Find a Lawyer/Court) --- */}
                <section className="bg-indigo-50 p-10 rounded-2xl shadow-xl text-center">
                    <h2 className="text-4xl font-extrabold text-indigo-800 mb-3">
                        Need Immediate Legal Assistance?
                    </h2>
                    <p className="text-xl text-gray-700 mb-6">
                        Use our tool to locate nearby legal services and courts.
                    </p>
                    <div className="flex justify-center space-x-6">
                        <button className="px-8 py-3 bg-indigo-600 text-white font-bold text-lg rounded-lg hover:bg-indigo-700 transition shadow-md">
                            Find Nearby Courts
                        </button>
                        <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-bold text-lg rounded-lg hover:bg-indigo-100 transition shadow-md">
                            Get Legal Advice
                        </button>
                    </div>
                </section>
                
                {/* --- Horizontal Rule Separator --- */}
                <hr className="border-t-2 border-gray-200" />

                {/* --- Section 3: Overview of Governance Structure (Panchayats) --- */}
                <section className="text-center">
                     <h2 className="text-4xl font-extrabold text-indigo-800 mb-4">
                        Grassroots Governance
                    </h2>
                    <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        Understand the structure of local self-government (**Panchayats** and **Municipalities**).
                    </p>
                    <div className="flex flex-wrap justify-center items-stretch gap-6">
                        <div className="flex-1 min-w-[300px] p-8 border border-gray-200 rounded-xl text-left">
                            <h3 className="text-2xl font-bold text-green-700 mb-3">
                                The Panchayats (Part IX)
                            </h3>
                            <ul className="text-gray-700 space-y-2 list-disc list-inside">
                                <li>Focuses on self-government for rural areas.</li>
                                <li>Defines the Gram Sabha (village level body).</li>
                                <li>Mandates reservation of seats for SC, ST, and Women.</li>
                            </ul>
                        </div>
                         <div className="flex-1 min-w-[300px] p-8 border border-gray-200 rounded-xl text-left">
                            <h3 className="text-2xl font-bold text-purple-700 mb-3">
                                The Municipalities (Part IXA)
                            </h3>
                            <ul className="text-gray-700 space-y-2 list-disc list-inside">
                                <li>Governs urban local bodies (Nagar Panchayat, Municipal Corporation).</li>
                                <li>Includes provisions for Wards Committees and Metropolitan Planning.</li>
                                <li>Also includes reservation provisions.</li>
                            </ul>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

function App() {
    
    const [activeLink, setActiveLink] = useState('Home'); 
    const [activeCategory, setActiveCategory] = useState(null); // State to track which law category is active

    // Function to handle navigation clicks (Home, Acts & Rules, etc.)
    const handleNavClick = (linkName) => {
        setActiveLink(linkName);
        setActiveCategory(null); // Reset category when switching main links
    };

    // Function to handle category box clicks
    const handleCategoryClick = (category) => {
        setActiveLink('Category'); // Use a generic link name to trigger the new view
        setActiveCategory(category);
    };

    // Function to handle the "Back to Categories" button click
    const handleBackToHome = () => {
        setActiveLink('Home');
        setActiveCategory(null);
    };

    const renderMainContent = () => {
        if (activeLink === 'Acts & Rules') {
            return <ConstitutionViewer />;
        }
        
        // RENDER 1: Law Category Viewer if a category is active
        if (activeCategory) {
            return <LawCategoryViewer categoryData={activeCategory} onBack={handleBackToHome} />;
        }

        // RENDER 2: Default Home Page content
        const logoSrc = `/logo.png?v=${new Date().getTime()}`;

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

                {/* Feature Blocks - ADDED onClick HANDLER */}
                <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-20" style={{ marginTop: '-100px' }}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                        {lawFeatures.map((feature, index) => (
                            <div 
                                key={index} 
                                onClick={() => handleCategoryClick(feature)} // <<<-- THIS IS THE CHANGE
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

                {/* --- Additional Components --- */}
                <SimplifiedLawQuery /> 
                <HomeAdditionalContent />
                
            </div>
        );
    };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      
      {/* Header and Top Bar (Sticky, Z-index 40) */}
      <header className="header bg-white shadow-xl sticky top-0 z-40"> 
        <div className="top-bar flex flex-col sm:flex-row items-center justify-between p-4 max-w-7xl mx-auto">
          <div className="logo-container flex flex-col items-center sm:items-start mb-4 sm:mb-0 min-w-[200px]">
            <div className="flex items-center space-x-4"> 
              <img 
                src="/logo.png"
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
        
        {/* Main Navigation Bar */}
        <nav className="bg-indigo-800 shadow-inner">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center sm:justify-start">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault(); 
                  handleNavClick(link.name); 
                }}
                className={`
                  px-4 py-3 text-sm font-medium transition duration-150 ease-in-out
                  ${
                        (link.name === activeLink || (link.name === 'Home' && activeLink === 'Category'))
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

      {/* Main Content Area */}
      <main className="flex-grow w-full">
        {renderMainContent()}
      </main>
      
      {/* Footer */}
      <footer className="w-full p-4 bg-gray-200 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Nyaya Mitra. All rights reserved.
      </footer>
    </div>
  );
}

export default App;