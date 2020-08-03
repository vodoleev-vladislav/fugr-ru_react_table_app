import React, { useState } from "react";
import getEntries from "../services/entries";

const SelectableDatasets = ({ datasets, setEntries }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDatasetSelect = async (dataset) => {
    setIsLoading(true);
    const entries = await getEntries(datasets[dataset]);
    setEntries(entries);
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading &&
        Object.keys(datasets).map((dataset) => (
          <button onClick={(e) => handleDatasetSelect(dataset)}>
            {dataset}
          </button>
        ))}
    </div>
  );
};

export default SelectableDatasets;
