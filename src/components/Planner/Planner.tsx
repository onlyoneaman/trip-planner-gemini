import React, {useState} from "react";
import services from "../../services/index.ts";
import helpers from "../../helpers/index.ts";
import PlannerForm from "./PlannerForm";
import FinalItinerary from "./FinalItinerary";
import ErrorDisplay from "../ErrorDisplay.tsx";
import ReactGA from "react-ga4";
import downloadItinerary from "../../helpers/download.js";

const Planner: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [placeDetails, setPlaceDetails] = useState("");
  const [fullResponse, setFullResponse] = useState(null);

  const [place, setPlace] = useState(helpers.DEFAULT_VALUES.FORM.place);
  const [days, setDays] = useState(helpers.DEFAULT_VALUES.FORM.days);
  const [additionalInfo, setAdditionalInfo] = useState(helpers.DEFAULT_VALUES.FORM.additionalInfo);

  const [error, setError] = useState<string | null>(null);

  const createItineraryCall = async () => {
    if (!place || !days) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setError(null);
    const template = `Plan me an itinerary for this place ${place} for ${days} days.\n${additionalInfo ? 'Additional instructions: ' + additionalInfo : ''}`;

    const requestData = formGenAiRequestData(template);
    ReactGA.event({
      category: "Planner",
      action: "Create Itinerary",
      label: "Planner",
    });
    try {
      const response = await services.googleapis.generateContent(requestData);
      setFullResponse(response);
      const data = response.data;
      if (response.err) {
        console.error('Error during API call:', response.err.error);
        setError(response.err?.error?.message || "An error occurred while generating the itinerary.");
        return;
      }
      const extractedText = data.candidates[0].content.parts[0].text;
      setResponse(extractedText);
      getPlaceDetails();
    } catch (error) {
      console.error('Error during API call:', error);
      setError(error?.response?.data?.error?.message || "An error occurred while generating the itinerary.");
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

  const newItinerary = () => {
    setResponse("");
    setPlaceDetails("");
    setFullResponse(null);
    setError(null);
  }

  const downloadItineraryFunc = () => {
    downloadItinerary(place, days, placeDetails, response);

    ReactGA.event({
      category: "Planner",
      action: "Download Itinerary",
      label: "Planner",
    });
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Trip Planner</h1>
        <p className="text-gray-600">Plan your perfect getaway with AI assistance</p>
      </header>

      {!response ? (
        <PlannerForm
          place={place}
          setPlace={setPlace}
          days={days}
          setDays={setDays}
          additionalInfo={additionalInfo}
          setAdditionalInfo={setAdditionalInfo}
          isLoading={isLoading}
          onSubmit={createItineraryCall}
        />
      ) : (
        <FinalItinerary
          mainText={response}
          newItinerary={newItinerary}
          days={days}
          place={place}
          placeDetails={placeDetails}
          onDownload={downloadItineraryFunc}
        />
      )}

      <ErrorDisplay error={error}/>

      <footer className="mt-8 text-center text-gray-600">
        <p>&copy; 2024 Trip Planner. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Planner;
