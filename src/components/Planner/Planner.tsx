import React, { useState } from "react";
import services from "../../services/index.ts";
import helpers from "../../helpers/index.js";
import PlannerForm from "./PlannerForm.js";
import FinalItinerary from "./FinalItinerary.js";

const Planner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [fullResponse, setFullResponse] = useState(null);

  const [place, setPlace] = useState(
    helpers.DEFAULT_VALUES.FORM.place
  );
  const [days, setDays] = useState(
    helpers.DEFAULT_VALUES.FORM.days
  );
  const [additionalInfo, setAdditionalInfo] = useState(
    helpers.DEFAULT_VALUES.FORM.additionalInfo
  );

  const [error, setError] = useState(null);

  const callGenerateContentAPI = async () => {
    setIsLoading(true);
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
      const response = await services.googleapis.generateContent(requestData);
      setFullResponse(response);
      const data = response.data;
      if(response.err) {
        console.error('Error during API call:', response.err.error);
        setError(response.err?.error?.message);
        return;
      }
      const extractedText = data.candidates[0].content.parts[0].text;
      setResponse(extractedText);
    } catch (error) {
      console.error('Error during API call:', error);
      setError(error?.response?.data?.error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const newItinerary = () => {
    setResponse("");
    setFullResponse(null);
    setError(null);
  }

  return (
    <div className="container mx-auto p-4">

      {
        !response && (
          <>
            <PlannerForm
              place={place}
              setPlace={setPlace}
              days={days}
              setDays={setDays}
              additionalInfo={additionalInfo}
              setAdditionalInfo={setAdditionalInfo}
            />

            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
              onClick={callGenerateContentAPI}
            >
              {isLoading ?
                'Generating Itinerary...'
                : 'Plan My Trip'}
            </button>
          </>
        )
      }

      {response && (
        <FinalItinerary
          mainText={response}
          newItinerary={newItinerary}
          days={days}
          place={place}
        />
      )}

      {
        error && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Error</h2>
            <p className="text-red-700">{error}</p>
          </div>
        )
      }

    </div>
  );
};

export default Planner;
