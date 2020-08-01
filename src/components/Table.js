import React, { useState, useRef } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

const MainTable = ({ columns, entries, changeSort, sortParams }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [filter, setFilter] = useState("");
  const filterRef = useRef();

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
    event.preventDefault();
    setPage(0);
    setFilter(filterRef.current.value);
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
        <label>Filter</label>
        <input ref={filterRef} />
        <button>Найти</button>
      </form>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column} onClick={handleTableHeadClick(column)}>
                  {column}
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
              <TableRow>
                {Object.keys(entry).map((column) =>
                  columns.includes(column) ? (
                    <TableCell>{entry[column]}</TableCell>
                  ) : null
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        count={filteredEntries.length}
        // siblingCount={0}
        page={page}
        onChangePage={handlePageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      ></TablePagination>
    </>
  );
};

export default MainTable;
