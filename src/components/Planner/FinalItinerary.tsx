import NewItineraryButton from "./NewItineraryButton.tsx";
import ReactMarkdown from "react-markdown";
import React from "react";

type FinalItineraryProps = {
  mainText: string;
  newItinerary: () => void;
  days: number;
  place: string;
}

const FinalItinerary = (
  {
    mainText: m,
    newItinerary,
    days,
    place
  }: FinalItineraryProps
) => {

  return (
    <div className="mt-4">
      <NewItineraryButton action={newItinerary} />
      <h2 className="text-xl font-bold">
        {`${days} Day Itinerary for ${place}`}
      </h2>
      <ReactMarkdown className="markdown">
        {m}
      </ReactMarkdown>

      <NewItineraryButton action={newItinerary} />
    </div>
  );
};

export default FinalItinerary;
