import React, { useState, useEffect } from "react";
import MainTable from "./components/Table";
import getEntries from "./services/entries";
import "./App.css";

const App = () => {
  const [state, setState] = useState({
    entries: [],
    sortParams: {
      field: "",
      order: "",
    },
  });
  const columns = ["id", "firstName", "lastName", "email", "phone"];
  const smallData =
    "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";

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

  useEffect(() => {
    (async () => {
      const entries = await getEntries(smallData);
      setState({ ...state, entries });
    })();
  }, []);

  return (
    <div className="App">
      <MainTable
        columns={columns}
        entries={state.entries}
        changeSort={changeSort}
        sortParams={state.sortParams}
      />
    </div>
  );
};

export default App;
