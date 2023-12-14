import React, { useState } from "react";

const Planner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [place, setPlace] = useState("");
  const [days, setDays] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  const callGenerateContentAPI = async () => {
    setIsLoading(true);
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const template = `Plan me an itinerary for this place ${place} for ${days} days.\n${additionalInfo ? 'Additional instructions: ' + additionalInfo : ''}`;

    const requestData = {
      contents: [
        {
          parts: [
            {
              text: template
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
        stopSequences: []
      }
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const extractedText = data.candidates[0].content.parts[0].text;
      setResponse(extractedText);
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Travel Planner</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="place">
          Place
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="place"
          type="text"
          placeholder="Enter destination"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="days">
          Number of Days
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="days"
          type="number"
          placeholder="Enter number of days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="additionalInfo">
          Additional Info
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="additionalInfo"
          placeholder="Any extra instructions or preferences"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </div>

      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={callGenerateContentAPI}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Plan My Trip'}
      </button>

      {response && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Itinerary</h2>
          <p className="text-gray-700">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Planner;
