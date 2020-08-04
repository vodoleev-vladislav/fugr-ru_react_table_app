import React from "react";
import TablePagination from "@material-ui/core/TablePagination";

const Pagination = ({
  entries,
  page,
  handlePageChange,
  handleChangeRowsPerPage,
  rowsPerPage,
}) => {
  return (
    <TablePagination
      component="div"
      count={entries.length}
      page={page}
      onChangePage={handlePageChange}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[10, 25, 50]}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
