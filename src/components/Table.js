import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import "./Table.css";

const MainTable = ({
  columns,
  entries,
  changeSort,
  sortParams,
  selectedRow,
  setSelectedRow,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState("");

  const handleTableHeadClick = (field) => (event) => {
    changeSort(field);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(event.target.value);
  };

  const handleFilter = (event) => {
    const { filter } = event.currentTarget.elements;
    event.preventDefault();
    setPage(0);
    setSelectedRow(null);
    setFilter(filter.value);
  };

  const handleRowClick = (event, entry) => {
    setSelectedRow(entry);
  };

  const filteredEntries = filter
    ? entries.filter((entry) => {
        const data = columns.map((column) =>
          entry[column].toString().toLowerCase()
        );
        for (let column of data) {
          if (column.includes(filter.toLowerCase())) return true;
        }
        return false;
      })
    : entries;

  const paginatedEntries = filteredEntries.slice(
    rowsPerPage * page,
    rowsPerPage * (page + 1)
  );

  return (
    <>
      <form onSubmit={handleFilter}>
        <FormControl>
          <InputLabel htmlFor="filter">Filter</InputLabel>
          <Input id="filter" />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Найти
        </Button>
      </form>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column} onClick={handleTableHeadClick(column)}>
                  <b>{column}</b>
                  {column === sortParams.field
                    ? sortParams.order === "asc"
                      ? String.fromCharCode(8593)
                      : String.fromCharCode(8595)
                    : null}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEntries.map((entry) => (
              <TableRow
                key={entry.firstName + entry.lastName + entry.id}
                onClick={(e) => handleRowClick(e, entry)}
                className={selectedRow === entry ? "table-row--selected" : ""}
              >
                {Object.keys(entry).map((column) =>
                  columns.includes(column) ? (
                    <TableCell key={column}>{entry[column]}</TableCell>
                  ) : null
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredEntries.length}
        page={page}
        onChangePage={handlePageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default MainTable;
