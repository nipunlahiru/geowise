import { Link } from 'react-router-dom';

const LearnMore = () => {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center px-0 py-0">
      <div className="w-full bg-gray-800 rounded-none shadow-none p-0 flex flex-col items-center">
        <div className="w-full flex flex-col items-center py-16 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-4 text-center w-full">About Countries Explorer</h1>
          <p className="text-lg text-gray-300 mb-8 text-center w-full max-w-4xl">
            Countries Explorer is your gateway to discovering the world. Our platform provides up-to-date, reliable information about every country, including population, region, capital, languages, currencies, and more. Whether you're a student, traveler, or just curious, our intuitive interface and powerful search make it easy to explore global data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-8">
            <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center">
              <svg className="w-10 h-10 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <h2 className="text-xl font-bold mb-2">Comprehensive Data</h2>
              <p className="text-gray-400 text-center">Access detailed facts about every country, updated regularly from trusted sources.</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center">
              <svg className="w-10 h-10 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h2 className="text-xl font-bold mb-2">User Friendly</h2>
              <p className="text-gray-400 text-center">Enjoy a seamless, responsive experience on any device, with a modern dark theme.</p>
            </div>
          </div>
          <div className="mb-8 w-full max-w-4xl">
            <h3 className="text-2xl font-semibold text-white mb-2 text-center">Why Choose Us?</h3>
            <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
              <li>Fast, real-time search and filtering</li>
              <li>Attractive, accessible design</li>
              <li>Mobile-first, fully responsive layout</li>
              <li>Free and open to everyone</li>
            </ul>
          </div>
          <Link
            to="/home"
            className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors duration-200"
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearnMore; 