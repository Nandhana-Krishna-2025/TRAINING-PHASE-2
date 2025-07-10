
import { useState } from 'react';

export default function ProfileCard({ name, image, bio, email, location }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mt-10 transition-colors duration-300">
      <img className="w-24 h-24 mx-auto rounded-full" src={image} alt="Profile" />
      <h2 className="text-xl font-semibold text-center mt-4">{name}</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center">{bio}</p>

      {showDetails && (
        <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Location:</strong> {location}</p>
        </div>
      )}

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        {showDetails ? 'Hide Details' : 'Show More'}
      </button>
    </div>
  );
}
