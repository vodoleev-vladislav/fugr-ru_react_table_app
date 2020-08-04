import React, { useState } from "react";
import MainTable from "./components/Table";
import DetailedInfo from "./components/DetailedInfo";
import NewEntryForm from "./components/NewEntryForm";
import SelectableDatasets from "./components/SelectableDatasets";
import Notification from "./components/Notification";
import "./App.css";

const datasets = {
  "small dataset":
    "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
  "big dataset":
    "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}",
};

const columns = ["id", "firstName", "lastName", "email", "phone"];

let timeoutId = null;

const App = () => {
  const [state, setState] = useState({
    entries: [],
    sortParams: {
      field: "",
      order: "",
    },
  });
  const [selectedRow, setSelectedRow] = useState(null);
  const [activeError, setActiveError] = useState(false);
  const changeSort = (field) => {
    const order =
      field !== state.sortParams.field ||
      !state.sortParams.field ||
      state.sortParams.order === "desc"
        ? "asc"
        : "desc";
    const sortParams = {
      field,
      order,
    };
    setState({
      ...state,
      sortParams,
      entries: getSortedEntries(state.entries, getCompareFunction(sortParams)),
    });
  };

  const getCompareFunction = (sortParams) => {
    return sortParams.order === "desc"
      ? (a, b) => compareFunction(a, b, sortParams.field)
      : (a, b) => -compareFunction(a, b, sortParams.field);
  };

  const compareFunction = (a, b, field) => {
    if (a[field] > b[field]) {
      return -1;
    }
    if (a[field] < b[field]) {
      return 1;
    }
    return 0;
  };

  const getSortedEntries = (entries, comparator) => {
    return entries.sort((a, b) => comparator(a, b));
  };

  const addNewEntry = (entry) => {
    setState({ ...state, entries: [entry, ...state.entries] });
  };

  const setEntries = (entries) => {
    setState({ ...state, entries });
  };

  const updateNotification = () => {
    setActiveError(true);
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => setActiveError(false), 2000);
  };

  return (
    <div className="App">
      <Notification
        activeError={activeError}
        message="User is not unique!"
      ></Notification>
      {state.entries.length === 0 && (
        <SelectableDatasets datasets={datasets} setEntries={setEntries} />
      )}
      {state.entries.length !== 0 && (
        <>
          <NewEntryForm
            columns={columns}
            addNewEntry={addNewEntry}
            entries={state.entries}
            updateNotification={updateNotification}
          />
          <MainTable
            columns={columns}
            entries={state.entries}
            changeSort={changeSort}
            sortParams={state.sortParams}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
          />
          {selectedRow && <DetailedInfo entry={selectedRow} />}
        </>
      )}
    </div>
  );
};

export default App;
