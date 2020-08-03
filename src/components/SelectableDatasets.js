import React, { useState } from "react";
import getEntries from "../services/entries";

const SelectableDatasets = ({ datasets, setEntries }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDatasetSelect = async (event, dataset) => {
    setIsLoading(true);
    const entries = await getEntries(datasets[dataset]);
    setEntries(entries);
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {Object.keys(datasets).map((dataset) => (
        <button onClick={(e) => handleDatasetSelect(e, dataset)}>
          {dataset}
        </button>
      ))}
    </div>
  );
};

export default SelectableDatasets;
