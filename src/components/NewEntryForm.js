import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const initObject = (columns) => {
  const newObject = {};
  columns.forEach((column) => (newObject[column] = ""));
  return newObject;
};

const NewEntryForm = ({ columns, addNewEntry }) => {
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
    addNewEntry(state);
    setState(initObject(columns));
  };

  return (
    <FormControl>
      {columns.map((column) => (
        <TextField
          label={column}
          value={state[column]}
          onChange={(e) => updateFormState(e, column)}
        />
      ))}
      <Button disabled={buttonIsDisabled} onClick={handleFormSubmit}>
        Добавить
      </Button>
    </FormControl>
  );
};

export default NewEntryForm;
