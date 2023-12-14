import React from "react";

type PlannerFormProps = {
  place: string;
  setPlace: (place: string) => void;
  days: number;
  setDays: (days: number) => void;
  additionalInfo: string;
  setAdditionalInfo: (additionalInfo: string) => void;
};

const PlannerForm = (
  {
    place,
    setPlace,
    days,
    setDays,
    additionalInfo,
    setAdditionalInfo
  }: PlannerFormProps
) => {

  return (
    <div>
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
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="Any extra instructions or preferences"
          value={additionalInfo}
        />
      </div>
    </div>
  )
};

export default PlannerForm;
