import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./NewEntryForm.css";

const initObject = (columns) => {
  const newObject = {};
  columns.forEach((column) => (newObject[column] = ""));
  return newObject;
};

const mainColumns = ["id", "firstName", "lastName"];

const isEntryUnique = (state, entries) => {
  for (let i = 0; i < entries.length; i++) {
    for (let j = 0; j < mainColumns.length; j++) {
      if (!(state[mainColumns[j]] === entries[i][mainColumns[j]])) {
        break;
      } else if (j === mainColumns.length - 1) {
        return false;
      }
    }
  }
  return true;
};

const NewEntryForm = ({
  columns,
  addNewEntry,
  entries,
  updateNotification,
}) => {
  const [state, setState] = useState(initObject(columns));
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const updateFormState = (event, column) => {
    setState({ ...state, [column]: event.target.value });
  };

  useEffect(() => {
    setButtonIsDisabled(
      !columns.reduce(
        (acc, column) => (state[column] ? acc || true : false),
        false
      )
    );
  }, [state, columns]);

  const handleFormSubmit = (event) => {
    const newEntry = { ...state, id: parseInt(state.id) };
    if (isEntryUnique(newEntry, entries)) {
      addNewEntry(newEntry);
      setState(initObject(columns));
    } else {
      updateNotification();
    }
  };

  return (
    <form className="table-new-entry">
      {columns.map((column) => (
        <TextField
          key={column}
          type={column === "id" ? "number" : "text"}
          label={column}
          value={state[column]}
          onChange={(e) => updateFormState(e, column)}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        disabled={buttonIsDisabled}
        onClick={handleFormSubmit}
      >
        Добавить
      </Button>
    </form>
  );
};

export default NewEntryForm;
