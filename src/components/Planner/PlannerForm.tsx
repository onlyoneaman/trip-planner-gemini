import React from 'react';

const popularDestinations = ["Paris", "Tokyo", "New York", "Rome", "Sydney"];

interface PlannerFormProps {
  place: string;
  setPlace: (place: string) => void;
  days: number;
  setDays: (days: number) => void;
  additionalInfo: string;
  setAdditionalInfo: (info: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

const PlannerForm: React.FC<PlannerFormProps> = ({
                                                   place,
                                                   setPlace,
                                                   days,
                                                   setDays,
                                                   additionalInfo,
                                                   setAdditionalInfo,
                                                   isLoading,
                                                   onSubmit
                                                 }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Plan Your Trip</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="place">
            Destination
          </label>
          <input
            id="place"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter destination"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="days">
            Number of Days
          </label>
          <input
            id="days"
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number of days"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="additionalInfo">
            Additional Info
          </label>
          <textarea
            id="additionalInfo"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any extra instructions or preferences"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Popular Destinations</p>
          <div className="flex flex-wrap gap-2">
            {popularDestinations.map((dest) => (
              <button
                key={dest}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition duration-200"
                onClick={() => setPlace(dest)}
              >
                {dest}
              </button>
            ))}
          </div>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Itinerary...
            </span>
          ) : (
            'Plan My Trip'
          )}
        </button>
      </div>
    </div>
  );
};

export default PlannerForm;
