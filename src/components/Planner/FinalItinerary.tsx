import React from "react";
import ReactMarkdown from "react-markdown";
import NewItineraryButton from "./NewItineraryButton";

type FinalItineraryProps = {
  mainText: string;
  newItinerary: () => void;
  days: number;
  place: string;
  placeDetails: string;
  onDownload: () => void;
};

const FinalItinerary: React.FC<FinalItineraryProps> = ({
                                                         mainText,
                                                         newItinerary,
                                                         days,
                                                         place,
                                                         placeDetails,
                                                         onDownload,
                                                       }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-600 text-white px-6 py-4">
        <h2 className="text-2xl font-bold">
          {`${days}-Day Itinerary for ${place}`}
        </h2>
      </div>

      <div className="p-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <ReactMarkdown className="prose">{placeDetails}</ReactMarkdown>
        </div>

        <ReactMarkdown className="prose max-w-none">{mainText}</ReactMarkdown>
      </div>

      <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
        <NewItineraryButton action={newItinerary} />
        <button
          onClick={onDownload}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          Download Itinerary
        </button>
      </div>
    </div>
  );
};

export default FinalItinerary;
