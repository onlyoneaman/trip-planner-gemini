import React, { useState } from "react";
import services from "../../services/index.ts";
import helpers from "../../helpers/index.ts";
import PlannerForm from "./PlannerForm.tsx";
import FinalItinerary from "./FinalItinerary.tsx";

const Planner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [placeDetails, setPlaceDetails] = useState("");
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

  const createItineraryCall = async () => {
    setIsLoading(true);
    const template = `Plan me an itinerary for this place ${place} for ${days} days.\n${additionalInfo ? 'Additional instructions: ' + additionalInfo : ''}`;

    const requestData = formGenAiRequestData(template);

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

  const getPlaceDetails = async () => {
    const template = `Give me brief description about this place: ${place}. Keep it less than 400 characters. Respond with "I don't know" if you don't know.`;
    const requestData = formGenAiRequestData(template);
    try {
      const response = await services.googleapis.generateContent(requestData);
      const data = response.data;
      const extractedText = data.candidates[0].content.parts[0].text;
      setPlaceDetails(extractedText);
    } catch (error) {
      console.error('Error during API call:', error);
    } finally {
    }
  };

  const formGenAiRequestData = (text: string) => {
    return {
      contents: [
        {
          parts: [
            {
              text: text
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
  }

  const planMyTrip = () => {
    createItineraryCall();
    getPlaceDetails();
  }

  const newItinerary = () => {
    setResponse("");
    setPlaceDetails("");
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
              onClick={planMyTrip}
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
          placeDetails={placeDetails}
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
