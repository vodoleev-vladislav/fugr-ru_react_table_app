import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const MainTable = ({ columns, entries, changeSort, sortParams }) => {
  const handleTableHeadClick = (field) => (event) => {
    changeSort(field);
  };
  return (
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
          {entries.map((entry) => (
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
  );
};

export default MainTable;
