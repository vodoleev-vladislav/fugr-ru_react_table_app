import React, { useState, useEffect } from "react";
import MainTable from "./components/Table";
import getEntries from "./services/entries";
import "./App.css";

const App = () => {
  const [entries, setEntries] = useState([]);
  const columns = ["id", "firstName", "lastName", "email", "phone"];
  const smallData =
    "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
  useEffect(() => {
    (async () => {
      const entries = await getEntries(smallData);
      setEntries(entries);
    })();
  }, []);

  return (
    <div className="App">
      <MainTable columns={columns} entries={entries} />
    </div>
  );
};

export default App;
