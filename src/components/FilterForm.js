import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import "./FilterForm.css";

const FilterForm = ({ handleFilter }) => {
  return (
    <form onSubmit={handleFilter} className="table-filter">
      <FormControl className="table-filter__input">
        <InputLabel htmlFor="filter">Filter</InputLabel>
        <Input id="filter" />
      </FormControl>
      <Button variant="contained" color="primary" type="submit">
        Найти
      </Button>
    </form>
  );
};

export default FilterForm;
