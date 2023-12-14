import React from "react";

type NewItineraryButtonProps = {
  action: () => void;
};

const NewItineraryButton = (
  {
    action
  }: NewItineraryButtonProps
) => {

  return (
    <button
      className={`my-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
      onClick={() => action()}
    >
      New Itinerary
    </button>
  );
};

export default NewItineraryButton;
