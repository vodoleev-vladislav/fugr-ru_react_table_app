import React, { useState } from "react";
import MainTable from "./components/Table";
import DetailedInfo from "./components/DetailedInfo";
import NewEntryForm from "./components/NewEntryForm";
import SelectableDatasets from "./components/SelectableDatasets";
import Notification from "./components/Notification";
import FilterForm from "./components/FilterForm";
import Pagination from "./components/Pagination";
import { Button } from "@material-ui/core";
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
  const [activeNewEntry, setActiveNewEntry] = useState(false);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleFilter = (event) => {
    const { filter } = event.currentTarget.elements;
    event.preventDefault();
    setPage(0);
    setSelectedRow(null);
    setFilter(filter.value);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(event.target.value);
  };

  const filteredEntries = filter
    ? state.entries.filter((entry) => {
        const data = columns.map((column) =>
          entry[column].toString().toLowerCase()
        );
        for (let column of data) {
          if (column.includes(filter.toLowerCase())) return true;
        }
        return false;
      })
    : state.entries;

  const paginatedEntries = filteredEntries.slice(
    rowsPerPage * page,
    rowsPerPage * (page + 1)
  );

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
    <div className="app">
      <Notification activeError={activeError} message="User is not unique!" />
      {state.entries.length === 0 && (
        <SelectableDatasets datasets={datasets} setEntries={setEntries} />
      )}
      {state.entries.length !== 0 && (
        <>
          <div className="table-upper-panel">
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => setActiveNewEntry(!activeNewEntry)}
            >
              Добавить
            </Button>
            <FilterForm handleFilter={handleFilter} />
          </div>
          {activeNewEntry && (
            <NewEntryForm
              columns={columns}
              addNewEntry={addNewEntry}
              entries={state.entries}
              updateNotification={updateNotification}
            />
          )}

          <MainTable
            columns={columns}
            entries={paginatedEntries}
            changeSort={changeSort}
            sortParams={state.sortParams}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
          />
          <Pagination
            entries={filteredEntries}
            page={page}
            handlePageChange={handlePageChange}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            rowsPerPage={rowsPerPage}
          />
          {selectedRow && <DetailedInfo entry={selectedRow} />}
        </>
      )}
    </div>
  );
};

export default App;
