import React, { useState } from 'react';

const SimplifiedLawQuery = () => {
    const [query, setQuery] = useState('');
    const [simplifiedResult, setSimplifiedResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Placeholder function for demonstration
    const handleSimplify = () => {
        if (!query.trim()) return;

        setLoading(true);
        setSimplifiedResult(null);

        // Simulate API call delay
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
                            // *** CHANGE MADE HERE: Added bg-white ***
                            className="flex-grow p-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150 text-gray-900 bg-white"
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

export default SimplifiedLawQuery;
