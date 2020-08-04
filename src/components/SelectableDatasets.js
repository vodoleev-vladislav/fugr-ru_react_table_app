import React, { useState } from "react";
import getEntries from "../services/entries";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./SelectableDatasets.css";

const SelectableDatasets = ({ datasets, setEntries }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleDatasetSelect = async (dataset) => {
    setIsLoading(true);
    const entries = await getEntries(datasets[dataset]);
    setEntries(entries);
  };

  return (
    <div className="datasets">
      {isLoading && <CircularProgress />}
      {!isLoading &&
        Object.keys(datasets).map((dataset) => (
          <Button
            className="datasets__button"
            variant="contained"
            color="primary"
            key={dataset}
            onClick={(e) => handleDatasetSelect(dataset)}
          >
            {dataset}
          </Button>
        ))}
    </div>
  );
};

export default SelectableDatasets;
